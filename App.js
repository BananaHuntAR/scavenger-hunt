import React from 'react';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import Expo from 'expo';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
console.disableYellowBox = true;
import Game from './Game';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Game />
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
