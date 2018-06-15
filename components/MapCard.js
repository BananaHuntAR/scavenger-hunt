import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet } from 'react-native';
import { CardItem, Text, Body, Button } from 'native-base';
import { selectMap, setMapId } from '../store';
import { withNavigation } from 'react-navigation';
import { EvilIcons } from '@expo/vector-icons';

class MapCard extends Component {
  render() {
    const { name, address, instructions } = this.props.customMap;
    return (
      <CardItem
        button
        style={styles.card}
        onPress={() => {
          //Clicking on a card leads to game starting up
          this.props.loadMap(this.props.customMap);
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
            block
            style={styles.button}
            onPress={() => {
              this.props.selectLeaderboard(this.props.customMap.id);
              this.props.navigation.navigate('Leaderboard');
            }}
          >
            <EvilIcons name="trophy" size={30} style={{ color: 'black' }} />
            <Text style={{ color: 'black' }}>Leaderboard</Text>
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
  },
  button: {
    backgroundColor: '#fced4e'
  }
});

const mapDispatch = dispatch => {
  return {
    loadMap: function(customMap) {
      dispatch(selectMap(customMap));
    },
    selectLeaderboard: function(id) {
      dispatch(setMapId(id));
    }
  };
};

export default connect(
  null,
  mapDispatch
)(withNavigation(MapCard));
