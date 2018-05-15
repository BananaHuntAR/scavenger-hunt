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
import { incrementItems, resetItems } from '../store';
import ExitButton from './ExitButton';
import Timer from './Timer';
import ResultSubmitForm from './ResultSubmitForm';
console.disableYellowBox = true;
const { _getLocationAsync } = require('../utils');

const capturedItemMaterial = new THREE.MeshPhongMaterial({
  ambient: 0x050505,
  color: 0xcccccc,
  specular: 0x555555,
  shininess: 100
});

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInSight: null,
      isGameOver: false
    };
    this.gameItems = [];
    this.itemsNum = 2;
  }

  componentDidMount() {
    _getLocationAsync().then(location => console.log(location.coords));
    this.props.resetItems();
  }

  componentDidUpdate() {
    if (this.props.capturedItems === this.itemsNum && !this.state.isGameOver) {
      this.gameOver();
    }
  }

  gameOver() {
    this.setState({ isGameOver: true });
  }

  // Capture button
  handlePress = () => {
    const currentCube = this.gameItems[this.state.itemInSight];
    // User captures an item, stop item from animating and turn its color to gray
    currentCube.speed = 0;
    currentCube.traverse(function(child){
      if (child instanceof THREE.Mesh ) {
        child.material = capturedItemMaterial;
      }
    })

    // capturedItems increments by 1
    if (!currentCube.captured) {
      this.props.incrementItems(this.props.capturedItems);
      currentCube.captured = true;
    }
  };

  // Creates AR experience
  _onGLContextCreate = async gl => {
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    // Starts an AR session
    this.arSession = await this._glView.startARSessionAsync();
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(width, height);
    const scene = new THREE.Scene();

    scene.background = ExpoTHREE.createARBackgroundTexture(
      this.arSession,
      renderer
    );

    const camera = ExpoTHREE.createARCamera(
      this.arSession, // field of view
      width, // aspect ratio
      height, // aspect ratio
      0.01, // near clipping plane - sets outer fencing of AR field
      1000 // far clipping plane - sets outer fencing of AR field
    );

    // Lighting to show shading
    generateLighting(scene);

    // Items are added to the AR scene
    generateItems(scene, this.gameItems, this.itemsNum);

    const animate = () => {
      camera.position.setFromMatrixPosition(camera.matrixWorld);
      const cameraPos = new THREE.Vector3(0, 0, 0);
      cameraPos.applyMatrix4(camera.matrixWorld);

      this.gameItems.forEach((banana, idx) => {
        // Animates items for live movement
        banana.rotation.x += banana.speed;
        banana.rotation.y += banana.speed;

        // Updates state to indicate if an itemInSight and prompts capture button
        // .distanceTo(vector) returns the distance between the camera and the items
        let dist = banana.position.distanceTo(camera.position);
        if (this.state.itemInSight === null) {
          if (dist < 0.7 && !banana.captured) {
            this.setState({ itemInSight: idx });
          }
        } else {
          if (idx === this.state.itemInSight && dist > 0.7) {
            this.setState({ itemInSight: null });
          }
        }
      });

      // Adds AR overlay over camera view
      renderer.render(scene, camera);
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
        <View style={styles.timer}>
          <Timer
            isGameOver={this.state.isGameOver}
            capturedItems={this.props.capturedItems}
            itemsNum={this.itemsNum}
          />
        </View>
        <View style={styles.exitButton}>
          <ExitButton />
        </View>

        <View style={styles.capture}>
          {this.state.itemInSight !== null &&
          !this.gameItems[this.state.itemInSight].captured ? (
            <Button
              raised
              rounded
              title="Capture"
              onPress={this.handlePress}
              buttonStyle={{
                backgroundColor: '#E96B63',
                width: 130,
                height: 130,
              }}
            />
          ) : null}

        </View>
        <ResultSubmitForm isGameOver={this.state.isGameOver} />
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  capture: {
    position: 'absolute',
    top: height / 2,
    left: width / 2 - 75
  },
  timer: {
    position: 'absolute',
    top: 20,
    left: 20
  },
  exitButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  score: {
    position: 'absolute',
    top: 20,
    left: 150
  }
});

// - range / 2 < (x,y,z) < range / 2 (in meters)
const randomizePosition = (range = 10) => {
  return Math.random() * range - range / 2;
};

async function generateItems(scene, items, num) {
  const modelAsset = Asset.fromModule(require('../assets/banana2.obj'));
  await modelAsset.downloadAsync();

  const bananaMaterial = new THREE.MeshPhongMaterial({
    ambient: 0x050505,
    color: '#FFFF00',
    specular: 0x555555,
    shininess: 100
  });
  const loader = new THREE.OBJLoader();

  loader.load(modelAsset.localUri, function(object){
    object.traverse(function(child){
      if (child instanceof THREE.Mesh ) {
        child.material = bananaMaterial;
      }
    })

    for (let i = 0; i < num; i++) {
      let banana = object.clone();
      banana.position.z = randomizePosition(2);  // (-5, 5) meters
      banana.position.x = randomizePosition(2);  // (-5, 5) meters
      banana.position.y = randomizePosition(1); // (-0.5, 0.5) meters
      banana.speed = 0.02;
      banana.captured = false;
      scene.add(banana);
      items.push(banana);
    }
  })
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
  return { capturedItems: state.capturedItems };
};

const mapDispatch = dispatch => {
  return {
    incrementItems(count) {
      dispatch(incrementItems(count + 1));
    },
    resetItems() {
      dispatch(resetItems());
    }
  };
};

export default connect(mapState, mapDispatch)(Game);
