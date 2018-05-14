import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import Game from './components/Game';
import Login from './components/Login';
import Signup from './components/Signup';
import Leaderboard from './components/Leaderboard';
import TutorialNavigator from './components/TutorialNavigator';

const RootNavigator = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        swipeEnabled: true,
        headerLeft: null
      }
    },
    Login: {
      screen: Login
    },
    Signup: {
      screen: Signup,
      swipeEnabled: true
    },
    Instructions: {
      screen: TutorialNavigator
    },
    Game: {
      screen: Game
    },
    Leaderboard: {
      screen: Leaderboard
    }
  },
  {
    navigationOptions: {
      header: 'none'
    }
  }
);

const App = () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);

export default App;
