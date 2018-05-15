import React from 'react';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo, { Asset } from 'expo';
require('../utils/OBJLoader');
import {
  View,
  NativeModules,
  StatusBar,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { addItem, resetCustomItems } from '../store';
import ExitButton from './ExitButton';
import MapSubmitForm from './MapSubmitForm';
const { _getLocationAsync } = require('../utils');

console.disableYellowBox = true;
// Turn off three.js warnings...
const originalWarn = console.warn.bind( console )
console.warn = (text) => !text.includes('THREE') && originalWarn(text);

class CreateMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toSave: false,
      saveClicked: 0
    };
    this.gameItems = [];
    this.geolocation = [];
    this.model = null;
  }

  componentDidMount() {
    _getLocationAsync().then(location => {
      this.geolocation = [location.coords.latitude, location.coords.longitude];
    });
    this.props.resetCustomItems();
  }

  handleDrop = () => {
    const newItem = dropItem(this.model, this.camera.position);
    this.scene.add(newItem);
    this.gameItems.push(newItem);
    const cords = { x: newItem.position.x, y: newItem.position.y, z: newItem.position.z };
    this.props.itemCords.push(cords);
    this.props.addItem(this.props.itemCords);
  };

  handleSave = () => {
    this.setState({ toSave: true, saveClicked: this.state.saveClicked + 1 });
  };

  _onGLContextCreate = async gl => {
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    // Starts an AR session
    this.arSession = await this._glView.startARSessionAsync();
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(width, height);
    this.scene = new THREE.Scene();

    this.scene.background = ExpoTHREE.createARBackgroundTexture(
      this.arSession,
      renderer
    );

    this.camera = ExpoTHREE.createARCamera(
      this.arSession, // field of view
      width, // aspect ratio
      height, // aspect ratio
      0.01, // near clipping plane
      1000 // far clipping plane
    );

    // Lighting to show shading
    generateLighting(this.scene);

    this.model = await loadModel();

    const animate = () => {
      this.camera.position.setFromMatrixPosition(this.camera.matrixWorld);
      const cameraPos = new THREE.Vector3(0, 0, 0);
      cameraPos.applyMatrix4(this.camera.matrixWorld);

      this.gameItems.forEach((banana) => {
        // Animates items for live movement
        banana.rotation.x += banana.speed;
        banana.rotation.y += banana.speed;
      });

      // Adds AR overlay over camera view
      renderer.render(this.scene, this.camera);
      gl.endFrameEXP();
      this.gameRequest = requestAnimationFrame(animate);
    };
    animate();
  };

  // Kill ARSession and cancel animation frame request
  async componentWillUnmount() {
    cancelAnimationFrame(this.gameRequest);
    try {
      await NativeModules.ExponentGLViewManager.stopARSessionAsync(
        this.arSession.sessionId
      );
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />

        <Expo.GLView
          ref={ref => (this._glView = ref)}
          style={{ flex: 1 }}
          onContextCreate={this._onGLContextCreate}
        />

        <View style={styles.exitButton}>
          <ExitButton />
        </View>

        <View style={styles.drop}>
          <Button raised rounded title="Drop" onPress={this.handleDrop} buttonStyle={{
            backgroundColor: '#29B46E',
            width: 100,
            height: 100
          }} />
        </View>

        <View style={styles.save}>
          <Button raised rounded title="Save" onPress={this.handleSave} buttonStyle={{
            backgroundColor: '#29B46E',
            height: 35,
            padding: 0
          }} textStyle={{ fontSize: 13 }} />
        </View>
        <MapSubmitForm toSave={this.state.toSave} saveClicked={this.state.saveClicked} geolocation={this.geolocation} />
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  drop: {
    position: 'absolute',
    top: height - 250,
    left: width / 2 - 60
  },
  save: {
    position: 'absolute',
    top: 17,
    right: 60
  },
  exitButton: {
    position: 'absolute',
    top: 10,
    right: 10
  }
});

async function loadModel() {
  // Load the banana model
  const modelAsset = Asset.fromModule(require('../assets/banana3.obj'));
  await modelAsset.downloadAsync();

  const bananaMaterial = new THREE.MeshPhongMaterial({
    color: '#FFFF00',
    specular: 0x555555,
    shininess: 100
  });
  const loader = new THREE.OBJLoader();

  return new Promise(function executor(resolve) {
    loader.load(modelAsset.localUri, function(object){
      //Adds color to banana but will need lighting to see it
      //See generateLighting function
      object.traverse(function(child){
        if (child instanceof THREE.Mesh ) {
          child.material = bananaMaterial;
        }
      })
      resolve(object);
    })
  })
}

function dropItem(model, dropPos) {
  const item = model.clone();
  item.position.x = dropPos.x;
  item.position.y = dropPos.y;
  item.position.z = dropPos.z;
  item.speed = 0.05;
  return item;
}

function generateLighting(scene) {
  const leftLight = new THREE.DirectionalLight( 0xffffff );
  const rightLight = new THREE.DirectionalLight( 0xffffff );
  const bottomLight = new THREE.DirectionalLight( 0xffffff );
    leftLight.position.set( -3, 5, 0 ).normalize();
    rightLight.position.set( 3, 5, 0 ).normalize();
    bottomLight.position.set( 0, -5, 0 ).normalize();
    scene.add(leftLight);
    scene.add(rightLight);
    scene.add(bottomLight);
}

const mapState = state => {
  return { itemCords: state.customItems };
}

const mapDispatch = dispatch => {
  return {
    addItem(items) {
      dispatch(addItem(items));
    },
    resetCustomItems() {
      dispatch(resetCustomItems());
    }
  }
}

export default connect(mapState, mapDispatch)(CreateMap);
