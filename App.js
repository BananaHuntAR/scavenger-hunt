import { StackNavigator, TabNavigator } from 'react-navigation';
import Home from './components/Home';
import Game from './components/Game';
import TutorialStepOne from './components/TutorialStepOne';
import TutorialStepTwo from './components/TutorialStepTwo';

const InstructionsNavigator = TabNavigator({
  TutorialStepOne: {
    screen: TutorialStepOne,
    navigationOptions: {
      headerTitle: 'Game Overview',
      swipeEnabled: true
    }
  },
  TutorialStepTwo: {
    screen: TutorialStepTwo,
    navigationOptions: {
      headerTitle: 'How it Works',
      swipeEnabled: true
    }
  }
});

const RootNavigator = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home',
      swipeEnabled: true
    }
  },
  Instructions: {
    screen: InstructionsNavigator,
    navigationOptions: {
      headerTitle: 'Get Ready!',
      swipeEnabled: true
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
