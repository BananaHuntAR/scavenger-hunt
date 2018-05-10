import { StackNavigator, TabNavigator } from 'react-navigation';
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

export default RootNavigator;
