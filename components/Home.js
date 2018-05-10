import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { logout } from '../store/auth';

const Home = ({ navigation, currentUser, logoutFunc }) => (
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
      <Button
        title={currentUser.email ? 'Logout' : 'Login/Sign Up'}
        rounded
        raised
        style={{ width: 150, alignSelf: 'center' }}
        backgroundColor="white"
        color="gray"
        onPress={() => {
          return currentUser.email
            ? logoutFunc(navigation)
            : navigation.navigate('Login');
        }}
      />
    </View>
    <View
      style={{
        flexDirection: 'row',
        paddingTop: 50,
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
          onPress={() => navigation.navigate('Ranking')}
          style={{ alignSelf: 'center' }}
        />
        <Text style={styles.text}>Leader Board</Text>
      </View>
    </View>
  </View>
);

const mapStateToProps = storeState => ({
  currentUser: storeState.currentUser
});

const mapDispatchToProps = dispatch => ({
  logoutFunc: navigation => dispatch(logout(navigation))
});

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
  },
  backgroundImage: {
    height: '100%',
    position: 'absolute'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
