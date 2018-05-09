import React from 'react';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo from 'expo';
import { View, NativeModules, StatusBar, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import ExitButton from './ExitButton';
import Score from './Score';
import Timer from './Timer';
console.disableYellowBox = true;

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // itemInSight: null,
      score: 0
    };
    this.itemInSight = null;
    this.gameItems = [];
    this.capturedItemMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
  }

  handlePress = () => {
    let currentCube = this.gameItems[this.itemInSight]
    // User captures an item, stop item from animating and turn its color to gray
    currentCube.speed = 0
    currentCube.material = this.capturedItemMaterial;

    // User's score increments by 1
    if ( !currentCube.captured ) {
      this.setState({score: this.state.score + 1})
      currentCube.captured = true;
    }
  }

  _onGLContextCreate = async gl => {
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    this.arSession = await this._glView.startARSessionAsync();
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(width, height);
    const scene = new THREE.Scene();
    scene.background = ExpoTHREE.createARBackgroundTexture(this.arSession, renderer);

    const camera = ExpoTHREE.createARCamera(
      this.arSession, // field of view
      width,     // aspect ratio
      height,    // aspect ratio
      0.01,      // near clipping plane
      1000       // far clipping plane
    );

    generateItems(scene, this.gameItems, 10);

    const animate = () => {
      camera.position.setFromMatrixPosition(camera.matrixWorld);
      const cameraPos = new THREE.Vector3(0, 0, 0);
      cameraPos.applyMatrix4(camera.matrixWorld);
      this.setState({ camPos: camera.position });

      this.gameItems.forEach((cube, idx) => {
        cube.rotation.x += cube.speed;
        cube.rotation.y += cube.speed;
        // this.setState({ distance: cube.position.distanceTo(camera.position) });
        let dist = cube.position.distanceTo(camera.position);
        if (this.itemInSight === null) {
          if (dist < 0.3) this.itemInSight = idx;
        } else {
          if (idx === this.itemInSight && dist > 0.3)
            this.itemInSight = null;
        }
      });

      renderer.render(scene, camera);
      gl.endFrameEXP();
      this.gameRequest = requestAnimationFrame(animate);
    };
    animate();
  };

  // Kill ARSession and cancel animation frame request.
  async componentWillUnmount(){
    cancelAnimationFrame(this.gameRequest);
    await NativeModules.ExponentGLViewManager.stopARSessionAsync(this.arSession.sessionId);
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
          <ExitButton  />
        </View>
        <View style={styles.timer}>
          <Timer  />
        </View>
        <View style={styles.score}>
          <Score score={this.state.score} />
        </View>
        {/* <Text>itemInSight: {this.itemInSight}</Text> */}
        <View style={styles.overlay}>
        { this.itemInSight !== null && !this.gameItems[this.itemInSight].captured ?
          (<Button raised rounded title="Capture" onPress={this.handlePress} buttonStyle={{ width: 150 }} />)
          : null
        }
        </View>

      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
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

function generateItems(scene, items, num) {
  // Creating items
  const geometry = new THREE.BoxGeometry(0.07, 0.07, 0.07); // creates template for a cube
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // creates color for a cube

  // -5 < (x,z) < 5 (meters)
  const randomizePosition = () => {
    return Math.random() * 10 - 5; // -5 , 5
  };

  for (let i = 0; i < num; i++) {
    const cube = new THREE.Mesh(geometry, material);
    randomizePosition(cube);
    cube.position.z = randomizePosition();
    cube.position.x = randomizePosition();
    cube.position.y = 0;
    cube.speed = 0.05
    cube.captured = false;
    scene.add(cube);
    items.push(cube);
  }
}
