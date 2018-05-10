import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { EvilIcons, Ionicons } from '@expo/vector-icons';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <View>
      <Text h2 style={styles.text}>
        Welcome to ScavengAR Hunt!
      </Text>
      <Text h4 style={styles.text}>
        An Augmented Reality Scavenger Hunt
      </Text>
      <EvilIcons
        name="play"
        size={200}
        color="white"
        onPress={() => navigation.navigate('Game')}
        style={{ alignSelf: 'center' }}
      />
      <Text style={styles.text}>Start</Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        paddingTop: 100,
        paddingBottom: 50,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
      }}
    >
      <View>
        <Ionicons
          name="ios-clipboard-outline"
          size={50}
          color="white"
          onPress={() => navigation.navigate('Instructions')}
          style={{ alignSelf: 'center' }}
        />
        <Text style={styles.text}>Tutorial</Text>
      </View>
      <View>
        <EvilIcons
          name="trophy"
          size={60}
          color="white"
          onPress={() => navigation.navigate('Leaderboard')}
          style={{ alignSelf: 'center' }}
        />
        <Text style={styles.text}>Leaderboard</Text>
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
    paddingTop: 200,
    paddingBottom: 100
  },
  text: {
    color: 'white',
    textAlign: 'center',
    padding: 10
  }
});

export default Home;
