import React from 'react';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo from 'expo';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
console.disableYellowBox = true;

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      camPos: { x: 0, y: 0, z: 0 },
      itemInSight: null,
      currScore: 0,
    };
    this.gameItems = [];
    this.capturedItemMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress(e){
    let currentCube = this.gameItems[this.state.itemInSight]
    // User captures an item, stop item from animating and turn its color to gray
    currentCube.speed = 0
    currentCube.material = this.capturedItemMaterial;

    // User's score increments by 1
    if ( !currentCube.captured ) {
      let newScore = this.state.currScore + 1
      this.setState({currScore: newScore})
      currentCube.captured = true;
    }
  }

  _onGLContextCreate = async gl => {
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;
    const arSession = await this._glView.startARSessionAsync();
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);

    const camera = ExpoTHREE.createARCamera(
      arSession,
      width,
      height,
      0.01,
      1000
    );

    const geometry = new THREE.BoxGeometry(0.07, 0.07, 0.07);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    const randomizePosition = () => {
      return Math.round(Math.random() * 5 - 2.5);
    };

    for (let i = 0; i < 10; i++) {
      const cube = new THREE.Mesh(geometry, material);
      randomizePosition(cube);
      cube.position.z = randomizePosition();
      cube.position.x = randomizePosition();
      cube.position.y = 0;
      cube.speed = 0.05
      cube.captured = false;
      scene.add(cube);
      this.gameItems.push(cube);
    }


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
        if (this.state.itemInSight === null) {
          if (dist < 0.3) this.setState({ itemInSight: idx });
        } else {
          if (idx === this.state.itemInSight && dist > 0.3) this.setState({ itemInSight: null });
        }
      });

      renderer.render(scene, camera);
      gl.endFrameEXP();
      requestAnimationFrame(animate);
    };
    animate();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <Expo.GLView
          ref={ref => (this._glView = ref)}
          style={{ flex: 1 }}
          onContextCreate={this._onGLContextCreate}
        />
        <View style={styles.overlay}>
          <Text>Camera X: {this.state.camPos.x}</Text>
          <Text>Camera Y: {this.state.camPos.y}</Text>
          <Text>Camera Z: {this.state.camPos.z}</Text>
          <Text>itemInSight: {this.state.itemInSight}</Text>
          <Text>currScore: {this.state.currScore}</Text>
          { this.state.itemInSight !== null && !this.gameItems[this.state.itemInSight].captured ?
            (<Button title="Capture" onPress={this.handlePress}/>)
            :
            (<Text>Not close enough</Text>)
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%'
  }
});
