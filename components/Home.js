import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Text } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { logout } from '../store/auth';
import Toolbar from './Toolbar';

const Home = ({ navigation, currentUser, logoutFunc }) => (
  <View style={styles.container}>
    <StatusBar hidden={true} />
    <View>
      <Text h2 style={styles.headerText}>
        Welcome to{'\n'}Banana Hunt!
      </Text>
      <Text h4 style={styles.headerText}>
        An Augmented Reality Scavenger Hunt
      </Text>
      <FontAwesome
        name="play-circle"
        size={125}
        onPress={() => navigation.navigate('Game')}
        style={styles.icon}
      />
    </View>

    <Text
      h4
      style={styles.logIn}
      onPress={() => {
        return currentUser.email
          ? logoutFunc(navigation)
          : navigation.navigate('Login');
      }}
      style={styles.loginText}
    >
      {currentUser && currentUser.email ? null : 'Login'}
    </Text>

    <Toolbar />
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
  loginText: {
    color: 'white',
    textAlign: 'center',
    padding: 20,
    fontSize: 16
  },
  icon: {
    color: 'white',
    paddingTop: 10,
    alignSelf: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
