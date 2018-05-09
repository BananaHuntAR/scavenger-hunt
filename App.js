import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Home from './components/Home';
import Game from './components/Game';
import TutorialStep from './components/TutorialStep';
import { Ionicons } from '@expo/vector-icons';

const InstructionsNavigator = TabNavigator(
  //Nested navigator within the main navigator in order to separate the tutorial swipe view
  {
    TutorialStepOne: {
      screen: () => (
        <TutorialStep
          //passing title & desc props so that we can reuse our TutorialStep component
          title={'Game Overview'}
          desc={`This is a simulated scavenger hunt, but with Augmented Reality!`}
          iconName={'ios-phone-portrait'}
        />
      ),
      navigationOptions: {
        headerTitle: 'Game Overview'
      }
    },
    TutorialStepTwo: {
      screen: () => (
        <TutorialStep
          title={'How to Play'}
          desc={`Items will randomly drop all around you. Once you are within reach of an item, a "capture" button will appear!`}
          iconName={'ios-basket-outline'}
        />
      ),
      navigationOptions: {
        headerTitle: 'How to Play'
      }
    },
    TutorialStepThree: {
      screen: () => (
        <TutorialStep
          title={'Mission'}
          desc={`Your task is to capture the items as quickly as possible. Get ready to search!`}
          iconName={'ios-alarm-outline'}
        />
      ),
      navigationOptions: {
        headerTitle: 'Mission'
      }
    }
  },
  {
    navigationOptions: {
      tabBarIcon: ({ focused, tintColor }) => (
        <Ionicons name="ios-radio-button-on" size={15} color={tintColor} />
      ),
      swipeEnabled: true
    },
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      showLabel: false,
      style: {
        width: 100,
        alignSelf: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderTopWidth: 0
      }
    }
  }
);

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
      headerTitle: 'Get Ready!'
    }
  },
  Game: {
    screen: Game,
    navigationOptions: {
      header: 'none'
    }
  }
});

export default RootNavigator;
