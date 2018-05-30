import React, { Component } from 'react';
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
import { incrementItems, resetItems, clearSelectedMap } from '../store';
import ExitButton from './ExitButton';
import Timer from './Timer';
import ResultSubmitForm from './ResultSubmitForm';

console.disableYellowBox = true;

const capturedItemMaterial = new THREE.MeshPhongMaterial({
  color: 0xcccccc,
  specular: 0x555555,
  shininess: 100
});

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInSight: null,
      isGameOver: false,
      gameItems: []
    };
  }

  componentDidMount() {
    this.props.resetItems();
  }

  componentDidUpdate() {
    if (
      this.state.gameItems.length &&
      this.props.capturedItems === this.state.gameItems.length &&
      !this.state.isGameOver
    ) {
      this.gameOver();
    }
  }

  // Kill ARSession and cancel animation frame request
  async componentWillUnmount() {
    this.props.clearSelectedMap();
    cancelAnimationFrame(this.gameRequest);
    try {
      await NativeModules.ExponentGLViewManager.stopARSessionAsync(
        this.arSession.sessionId
      );
    } catch (err) {
      console.error(err);
    }
  }

  gameOver() {
    this.setState({ isGameOver: true });
  }

  // Capture button
  handlePress = () => {
    const currentCube = this.state.gameItems[this.state.itemInSight];
    // User captures an item, stop item from animating and turn its color to gray
    currentCube.speed = 0;
    currentCube.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = capturedItemMaterial;
      }
    });

    // capturedItems increments by 1
    if (!currentCube.captured) {
      this.props.incrementItems(this.props.capturedItems);
      currentCube.captured = true;
    }
  };

  // Creates AR experience
  _onGLContextCreate = async gl => {
    //1. Starts an AR session
    this.arSession = await this._glView.startARSessionAsync();

    //2. Get view dimensions
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;

    //3. Create a renderer (`Expo.GLView`-compatible THREE)
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(width, height);

    //4. Set the scene (Creates video feed)
    const scene = new THREE.Scene();
    scene.background = ExpoTHREE.createARBackgroundTexture(
      this.arSession,
      renderer
    );

    //5. Set up AR camera
    const camera = ExpoTHREE.createARCamera(
      this.arSession, // field of view
      width, // aspect ratio
      height, // aspect ratio
      0.01, // near clipping plane - sets outer fencing of AR field
      1000 // far clipping plane - sets outer fencing of AR field
    );

    //6. Add lighting to the AR scene to show shading
    generateLighting(scene);

    //7. Items are added to the AR scene
    if (Object.keys(this.props.selectedMap).length !== 0) {
      //Custom map
      generateItems(
        scene,
        this.state.gameItems,
        this.props.selectedMap.customItems.length,
        this.props.selectedMap.customItems
      );
    } else {
      //Random map
      generateItems(scene, this.state.gameItems);
    }

    const cameraPos = new THREE.Vector3(0, 0, 0);

    //8. Start animation (listener for events)
    const animate = () => {
      camera.position.setFromMatrixPosition(camera.matrixWorld);
      cameraPos.applyMatrix4(camera.matrixWorld);

      this.state.gameItems.forEach((banana, idx) => {
        // Animates items for live movement
        banana.rotation.x += banana.speed;
        banana.rotation.y += banana.speed;

        // Updates state to indicate if an itemInSight and prompts capture button
        // .distanceTo(vector) returns the distance between the camera and the items
        let dist = banana.position.distanceTo(camera.position);
        if (this.state.itemInSight === null) {
          if (dist < 0.3 && !banana.captured) {
            this.setState({ itemInSight: idx });
          }
        } else {
          if (idx === this.state.itemInSight && dist > 0.3) {
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

  render() {
    const mapId = Object.keys(this.props.selectedMap).length
      ? Number(this.props.selectedMap.id)
      : null;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />

        <Expo.GLView
          // Create an `Expo.GLView` covering the whole screen,
          // tell it to call our `_onGLContextCreate` function once it's initialized.
          ref={ref => (this._glView = ref)}
          style={{ flex: 1 }}
          onContextCreate={this._onGLContextCreate}
        />
        <View style={styles.timer}>
          <Timer
            isGameOver={this.state.isGameOver}
            capturedItems={this.props.capturedItems}
            itemsNum={
              (this.props.selectedMap.customItems &&
                this.props.selectedMap.customItems.length) ||
              3
            }
          />
        </View>
        <View style={styles.exitButton}>
          <ExitButton />
        </View>

        <View style={styles.capture}>
          {this.state.itemInSight !== null &&
          !this.state.gameItems[this.state.itemInSight].captured ? (
            <Button
              raised
              rounded
              title="Capture"
              onPress={this.handlePress}
              buttonStyle={{
                backgroundColor: '#E96B63',
                width: 130,
                height: 130
              }}
            />
          ) : null}
        </View>
        <ResultSubmitForm isGameOver={this.state.isGameOver} mapId={mapId} />
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

async function generateItems(scene, items, num = 3, customItems) {
  // Load banana3.obj file from file system
  const modelAsset = Asset.fromModule(require('../assets/banana3.obj'));
  await modelAsset.downloadAsync();

  const bananaMaterial = new THREE.MeshPhongMaterial({
    color: '#FFFF00',
    specular: 0x555555,
    shininess: 100
  });
  const loader = new THREE.OBJLoader();

  // Makes use of loaded banana
  loader.load(modelAsset.localUri, function(object) {
    //Adds color to banana but will need lighting to see it
    //See generateLighting function
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = bananaMaterial;
      }
    });

    for (let i = 0; i < num; i++) {
      let banana = object.clone();
      if (customItems) {
        banana.position.z = customItems[i].z;
        banana.position.x = customItems[i].x;
        banana.position.y = customItems[i].y;
      } else {
        banana.position.z = randomizePosition(4); // (-5, 5) meters
        banana.position.x = randomizePosition(4); // (-5, 5) meters
        banana.position.y = randomizePosition(1); // (-0.4, 0.4) meters
      }
      banana.speed = 0.02;
      banana.captured = false;
      scene.add(banana);
      items.push(banana);
    }
  });
}

function generateLighting(scene) {
  const leftLight = new THREE.DirectionalLight(0xffffff);
  const rightLight = new THREE.DirectionalLight(0xffffff);
  const bottomLight = new THREE.DirectionalLight(0xffffff);
  leftLight.position.set(-3, 5, 0).normalize();
  rightLight.position.set(3, 5, 0).normalize();
  bottomLight.position.set(0, -5, 0).normalize();
  scene.add(leftLight);
  scene.add(rightLight);
  scene.add(bottomLight);
}

const mapState = state => {
  return {
    capturedItems: state.capturedItems,
    selectedMap: state.selectedMap
  };
};

const mapDispatch = dispatch => {
  return {
    incrementItems(count) {
      dispatch(incrementItems(count + 1));
    },
    resetItems() {
      dispatch(resetItems());
    },
    clearSelectedMap() {
      dispatch(clearSelectedMap());
    }
  };
};

export default connect(mapState, mapDispatch)(Game);
