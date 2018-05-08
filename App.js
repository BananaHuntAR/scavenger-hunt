import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation';
import Home from './components/Home';
import Game from './components/Game';
import TutorialStep from './components/TutorialStep';
import { Ionicons } from '@expo/vector-icons';

const InstructionsNavigator = TabNavigator({
  TutorialStepOne: {
    screen: () => <TutorialStep title={'Game overview'} desc={`This is a simulated scavenger hunt, but with Augmented Reality!`}/>,
    navigationOptions: {
      headerTitle: 'Game Overview'
    }
  },
  TutorialStepTwo: {
    screen: () => <TutorialStep title={'How to play'} desc={`Items will randomly drop all around you. Once you are within reach of an
    item, a "capture" button will appear!`} />,
    navigationOptions: {
      headerTitle: 'How to play'
    }
  },
  TutorialStepThree: {
    screen: () => <TutorialStep title={'Mission'} desc={`Your task is to capture the items as quickly as possible. Get ready to search!`} />,
    navigationOptions: {
      headerTitle: 'Mission'
    }
  }
}, {
  navigationOptions: {
    tabBarIcon: ({focused, tintColor }) => <Ionicons name='ios-radio-button-on' size={15} color={tintColor} />,
    swipeEnabled: true,
    animationEnabled: true
  },
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    showLabel: false
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
