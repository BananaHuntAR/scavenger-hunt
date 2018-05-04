import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
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
      onPress={() => navigation.navigate('Start')}
      raised
      rounded
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
