import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import Game from './components/Game';
import Login from './components/Login';
import Signup from './components/Signup';
import GameOptionPage from './components/GameOptionPage'
import Leaderboard from './components/Leaderboard';
import CustomGameList from './components/CustomGameList'
import CreateMap from './components/CreateMap'
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
      screen: Login,
      swipeEnabled: true
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
    },
    GameOptionPage: {
      screen: GameOptionPage
    },
    CustomGameList: {
      screen: CustomGameList
    },
    CreateMap: {
      screen: CreateMap
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
