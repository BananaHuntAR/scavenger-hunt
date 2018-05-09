import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { EvilIcons, Ionicons } from '@expo/vector-icons';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <View >
    <Text h2 style={styles.text}>Welcome to ScavengAR Hunt!</Text>
    <Text h4 style={styles.text}>An Augmented Reality Scavenger Hunt</Text>
      <EvilIcons
        name="play"
        size={100}
        color='white'
        onPress={() => navigation.navigate('Game')}
      />
      <Text>Start</Text>
    </View>
    <View style={{ flexDirection: 'row', padding: 100}}>
    <View>
      <Ionicons
        name='ios-clipboard-outline'
        size={60} color='white'
        onPress={() => navigation.navigate('Instructions')}
      />
      <Text>Tutorial</Text>
    </View>
    <View>
      <EvilIcons
        name="trophy"
        size={60}
        color='white'
        onPress={() => navigation.navigate('Ranking')}
      />
      <Text>Leader Board</Text>
    </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E96B63',
    paddingTop: 200
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
