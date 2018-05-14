/* eslint-disable react/display-name*/

import React from 'react';
import { TabNavigator } from 'react-navigation';
import TutorialStep from './TutorialStep';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const CustomTutorialNavigator = TabNavigator(
  {
    CustomTutorialStepOne: {
      screen: () => (
        <TutorialStep
          //passing title & desc props so that we can reuse our TutorialStep component
          title={'Pin Location'}
          desc={`You'll pin your current location and then enter your address.`}
          iconName={'ios-pin'}
        />
      )
    },
    CustomTutorialStepTwo: {
      screen: () => (
        <TutorialStep
          title={'Give Instructions'}
          desc={`Enter details of where to face to get started. Example: Stand ~1 foot away from the center of the mailbox.`}
          iconName={'ios-create-outline'}
        />
      )
    },
    CustomTutorialStepThree: {
      screen: () => (
        <TutorialStep
          title={'Drop Bananas'}
          desc={`As you walk around, hit the "Drop" button to leave bananas! The map will remember these coordinates for future game play.`}
          img={require('../assets/bananaIcon.png')}
          iconName={'ios-walk-outline'}
        />
      )
    },
    CustomTutorialStepFour: {
      screen: () => (
        <TutorialStep
          title={'Save Map'}
          desc={`Once your all set, hit "Save." If you choose to share, others can participate in your banana hunt as well!`}
          iconName={'ios-share-outline'}
        />
      )
    }
  },

  {
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-radio-button-on" size={15} color={tintColor} />
      )
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      showLabel: false,
      style: {
        width: 100,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderTopWidth: 0,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
      }
    },
    //allows swiping between steps and lazy: false forces the slides to load before they are accessed for the first time
    swipeEnabled: true,
    lazy: false
  }
);

export default CustomTutorialNavigator;
