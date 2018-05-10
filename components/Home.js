import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { EvilIcons, Ionicons } from '@expo/vector-icons';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <View>
      <Text h2 style={styles.headerText}>
        Welcome to ScavengAR Hunt!
      </Text>
      <Text h4 style={styles.headerText}>
        An Augmented Reality Scavenger Hunt
      </Text>
      <EvilIcons
        name="play"
        size={125}
        onPress={() => navigation.navigate('Game')}
        style={styles.icon}
      />
      <Text style={styles.iconText}>Play!</Text>
    </View>
    <View style={styles.iconContainer}>
      <View>
        <Ionicons
          name="ios-clipboard-outline"
          size={50}
          onPress={() => navigation.navigate('Instructions')}
          style={styles.icon}
        />
        <Text style={styles.iconText}>Tutorial</Text>
      </View>
      <View>
        <EvilIcons
          name="trophy"
          size={60}
          onPress={() => navigation.navigate('Leaderboard')}
          style={styles.icon}
        />
        <Text style={styles.iconText}>Leaderboard</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E96B63',
    paddingTop: 50
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    padding: 10
  },
  iconText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  },
  icon: {
    color: 'white',
    paddingTop: 10,
    alignSelf: 'center'
  },
  iconContainer: {
    flexDirection: 'row',
    paddingTop: 25,
    alignItems: 'flex-end',
    justifyContent: 'space-evenly'
  }
});

export default Home;
