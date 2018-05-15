import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home';
import Game from './components/Game';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import GameOptionPage from './components/GameOptionPage';
import Leaderboard from './components/Leaderboard';
import CustomGameList from './components/CustomGameList';
import CreateMap from './components/CreateMap';
import TutorialNavigator from './components/Navigators/TutorialNavigator';
import CustomTutorialNavigator from './components/Navigators/CustomTutorialNavigator';
import { isSignedIn } from './auth';

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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
