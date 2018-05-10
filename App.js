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
    }
  }
});

const App = () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
)

export default App;
