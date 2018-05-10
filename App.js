import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import TutorialNavigator from './components/TutorialNavigator';

const RootNavigator = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home',
      swipeEnabled: true,
      headerLeft: null
    }
  },
  Instructions: {
    screen: TutorialNavigator,
    navigationOptions: {
      headerTitle: 'Get Ready!'
    }
  },
  Game: {
    screen: Game,
    navigationOptions: {
      header: 'none'
    }
  },
  Leaderboard: {
    screen: Leaderboard,
    navigationOptions: {
      headerTitle: 'Leaderboard'
    }
  }
});

const App = () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);

export default App;
