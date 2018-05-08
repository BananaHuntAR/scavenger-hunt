import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

const TutorialStepOne = ({ navigation }) => (
  <View>
    <View style={styles.container}>
      <Text h1>Game Overview</Text>
      <Text h4 style={styles.text}>
        This is a simulated scavenger hunt, but with Augmented Reality!
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 200
  },
  text: {
    textAlign: 'center'
  }
});

export default TutorialStepOne;

// Mission: Your task is to capture the items as quickly as possible. Get ready to search!
