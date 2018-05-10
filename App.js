<<<<<<< HEAD
import React from 'react';
=======
import React from 'react'
>>>>>>> master
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import Game from './components/Game';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';
import TutorialNavigator from './components/TutorialNavigator';

<<<<<<< HEAD
const RootNavigator = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: 'Home',
        swipeEnabled: true,
        headerLeft: null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerTitle: 'Login'
      }
    },
    // SignUp: {
    //   screen: Signup,
    //   navigationOptions: {
    //     headerTitle: 'Signup'
    //   }
    // },
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
=======
const RootNavigator = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: 'none',
      swipeEnabled: true,
      headerLeft: null
    }
  },
  Instructions: {
    screen: TutorialNavigator,
    navigationOptions: {
      header: 'none'
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
      header: 'none'
>>>>>>> master
    }
  }
  // {
  //   navigationOptions: {
  //     header: false
  //   }
  // }
);

const App = () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);

export default App;
