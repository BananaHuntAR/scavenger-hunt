import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import {
  Home,
  Game,
  Login,
  Signup,
  UserProfile,
  GameOptionPage,
  Leaderboard,
  CustomGameList,
  CreateMap,
  InputInstructions,
  TutorialNavigator,
  CustomTutorialNavigator
} from './components';

const RootNavigator = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerLeft: null
      }
    },
    Login: {
      screen: Login
    },
    UserProfile: {
      screen: UserProfile,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Signup: {
      screen: Signup
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
    CustomInstructions: {
      screen: CustomTutorialNavigator
    },
    InputInstructions: {
      screen: InputInstructions
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
