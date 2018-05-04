import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Welcome to ScavengAR!</Text>
    <Text>An Augmented Reality Scavenger Hunt</Text>
    <Button onPress={() => navigation.navigate('Start')} title="Play" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});

export default Home;
