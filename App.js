import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import Start from './components/Start';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';

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
  },
  Leaderboard: {
    screen: Leaderboard,
    navigationOptions: {
      header: 'none'
    }
  }
});

export default RootNavigator;
