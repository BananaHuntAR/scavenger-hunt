import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

const Start = ({ navigation }) => (
  <View style={styles.container}>
    <Text>To begin the game:</Text>
    <Text>
      Hold your screen up to your face, pointing your phone's camera toward the
      horizon
    </Text>
    <Button onPress={() => navigation.navigate('Game')} title="Begin Game" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Start;
