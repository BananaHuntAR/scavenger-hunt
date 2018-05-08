import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation';
import Home from './components/Home';
import Game from './components/Game';
import TutorialStep from './components/TutorialStep';

const InstructionsNavigator = TabNavigator({
  TutorialStepOne: {
    screen: () => <TutorialStep title={'Game overview'} desc={`This is a simulated scavenger hunt, but with Augmented Reality!`}/>,
    navigationOptions: {
      headerTitle: 'Game Overview',
      swipeEnabled: true,
    }
  },
  TutorialStepTwo: {
    screen: () => <TutorialStep title={'How to play'} desc={`Items will randomly drop all around you. Once you are within reach of an
    item, a "capture" button will appear!`} />,
    navigationOptions: {
      headerTitle: 'How it Works',
      swipeEnabled: true
    }
  },
  TutorialStepThree: {
    screen: () => <TutorialStep title={'Mission'} desc={`Your task is to capture the items as quickly as possible. Get ready to search!`} />,
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
      swipeEnabled: true,
      headerLeft: null
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
