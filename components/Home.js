import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'react-native-elements';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <Image
      style={styles.backgroundImage}
      source={require('../assets/globe.jpg')}
      resizeMode="cover"
    />
    <Text h2 style={styles.text}>
      Welcome to ScavengAR Hunt!
    </Text>
    <Text h4 style={styles.text}>
      An Augmented Reality Scavenger Hunt
    </Text>
    <Button
      onPress={() => navigation.navigate('Instructions')}
      raised
      rounded
      title="Tutorial"
      backgroundColor="#AD00B2"
    />
    <Button
      onPress={() => navigation.navigate('Game')}
      raised
      rounded
      title="Start Game"
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
  },
  text: {
    color: 'white',
    textAlign: 'center',
    padding: 10
  },
  backgroundImage: {
    height: '100%',
    position: 'absolute'
  }
});

export default Home;

//title: Game overview
//desc: This is a simulated scavenger hunt, but with Augmented Reality!

// Mission: Your task is to capture the items as quickly as possible. Get ready to search!
