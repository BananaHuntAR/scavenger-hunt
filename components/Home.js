import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'react-native-elements';
import Start from './Start';

// const Home = ({ navigation }) => (
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };

    this.toggleVisible = this.toggleVisible.bind(this);
  }

  toggleVisible() {
    this.setState({ isVisible: !this.state.isVisible });
  }

  render() {
    return (
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
          // onPress={() => navigation.navigate('Start')}
          onPress={() => this.setState({ isVisible: true })}
          raised
          rounded
          title="PLAY"
          backgroundColor="#AD00B2"
        />
        <Start
          visible={this.state.isVisible}
          // navigation={this.props.navigation}
          toggleVisible={this.toggleVisible}
        />
      </View>
    );
  }
}

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
