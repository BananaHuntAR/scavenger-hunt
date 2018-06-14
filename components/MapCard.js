import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet } from 'react-native';
import { CardItem, Text, Body, Button } from 'native-base';
import { selectMap } from '../store';
import { withNavigation } from 'react-navigation';
import { EvilIcons } from '@expo/vector-icons';

class MapCard extends Component {
  handlePress = customMap => {
    this.props.loadMap(customMap);
  };

  render() {
    const { name, address, instructions } = this.props.customMap;
    return (
      <CardItem
        button
        style={styles.card}
        onPress={() => {
          //Clicking on a card leads to game starting up
          this.handlePress(this.props.customMap);
          this.props.navigation.navigate('Game');
        }}
      >
        <Body>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>{name}</Text>
          <Image
            source={require('../assets/map_bg.jpg')}
            style={{ width: '100%', flex: 1 }}
          />

          <Text style={styles.text}>
            Address: {address}
            {'\n'}
            Instructions: {instructions}
          </Text>
          <Button
            style={{ backgroundColor: '#fced4e' }}
            onPress={() => this.props.navigation.navigate('Leaderboard')}
          >
            <EvilIcons name="trophy" size={30} style={{ color: 'black' }} />
          </Button>
        </Body>
      </CardItem>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'gray',
    paddingVertical: 10
  },
  card: {
    flex: 1,
    backgroundColor: '#F3EED9',
    borderRadius: 25
  }
});

const mapDispatch = dispatch => {
  return {
    loadMap: function(customMap) {
      dispatch(selectMap(customMap));
    }
  };
};

export default connect(
  null,
  mapDispatch
)(withNavigation(MapCard));
