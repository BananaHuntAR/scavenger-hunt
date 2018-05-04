import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import Start from './components/Start';

const RootNavigator = StackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'ScavengAR Hunt'
    }
  },
  Start: {
    screen: Start,
    navigationOptions: {
      headerTitle: 'Get Ready!'
    }
  }
});

export default RootNavigator;
