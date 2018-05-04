import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Welcome to ScavengAR Hunt!</Text>
    <Text>An Augmented Reality Scavenger Hunt</Text>
    <Button
      onPress={() => navigation.navigate('Start')}
      title="PLAY"
      backgroundColor="#AD00B2"
    />
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
