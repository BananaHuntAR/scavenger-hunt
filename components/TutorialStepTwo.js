import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

const TutorialStepTwo = ({ navigation }) => (
  <View>
    <View style={styles.container}>
      <Text h1>How it Works</Text>
      <Text style={styles.text}>
        Items will randomly drop all around you. Once you are within reach of an
        item, a "capture" button will appear!
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

export default TutorialStepTwo;
