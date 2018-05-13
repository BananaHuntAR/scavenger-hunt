import React from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
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
        Banana Hunt
      </Text>
      <Image
          style={{width: 100, height: 100}}
          source={require('../assets/logo.png')}
        />
      <FontAwesome
        name="play-circle"
        size={125}
        onPress={() => navigation.navigate('Game')}
        style={styles.icon}
      />
    </View>

    <Text
      h4
      style={styles.loginText}
      onPress={() => {
        return currentUser.email
          ? logoutFunc(navigation)
          : navigation.navigate('Login');
      }}
    >
      {currentUser.email ? 'Logout' : 'Login'}
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
