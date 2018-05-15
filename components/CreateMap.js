import React from 'react';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo from 'expo';
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

const geometry = new THREE.BoxGeometry(0.07, 0.07, 0.07); // creates template for a cube
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // creates color for a cube

class CreateMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toSave: false,
      saveClicked: 0
    };
    this.gameItems = [];
    this.geolocation = [];
  }

  componentDidMount() {
    _getLocationAsync().then(location => {
      this.geolocation = [location.coords.latitude, location.coords.longitude];
    });
    this.props.resetCustomItems();
  }

  handleDrop = () => {
    dropItem(this.scene, this.gameItems, this.props.itemCords, this.props.addItem, this.camera.position);
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

    const animate = () => {
      this.camera.position.setFromMatrixPosition(this.camera.matrixWorld);
      const cameraPos = new THREE.Vector3(0, 0, 0);
      cameraPos.applyMatrix4(this.camera.matrixWorld);

      this.gameItems.forEach((cube) => {
        // console.log('cube: ', cube);
        // Animates items for live movement
        cube.rotation.x += cube.speed;
        cube.rotation.y += cube.speed;
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


function dropItem(scene, itemsArr, items, addItemFunc, dropPos) {
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = dropPos.x;
  cube.position.y = dropPos.y;
  cube.position.z = dropPos.z;
  cube.speed = 0.05
  scene.add(cube);
  itemsArr.push(cube);
  const cords = { x: cube.position.x, y: cube.position.y, z: cube.position.z };
  items.push(cords);
  addItemFunc(items);
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
