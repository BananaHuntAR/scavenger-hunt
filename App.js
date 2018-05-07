import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import Start from './components/Start';
import Game from './components/Game';

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
  },
  Game: {
    screen: Game,
    navigationOptions: {
      headerTitle: 'Find the Items!'
    }
  }
});

export default RootNavigator;
