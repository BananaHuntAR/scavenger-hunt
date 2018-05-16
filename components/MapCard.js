import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet } from 'react-native';
import {
  CardItem,
  Text,
  Body
} from 'native-base';
import { selectMap } from '../store';
import { withNavigation } from 'react-navigation';

class MapCard extends Component {
  handlePress = (e, customMap) => {
    this.props.loadMapToGame(customMap)
  }

  render() {
    const { name, address, instructions } = this.props.customMap;
    return (
        <CardItem
        button
        style={styles.card}
        onPress={
          (e) => {
            //Clicking on a card leads to game starting up
            this.handlePress(e, this.props.customMap)
            this.props.navigation.navigate('Game')
          }
        }>
          <Body>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>{name}</Text>
            <Image
              source={require('../assets/map_bg.jpg')}
              style={{width: '100%', flex: 1}} />

            <Text style={styles.text}>
              Address: {address}{'\n'}
              Instructions: {instructions}
            </Text>
          </Body>
        </CardItem>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "gray",
    paddingVertical: 10
  },
  card: {
    flex: 1,
    backgroundColor: "#F3EED9",
    borderRadius: 25
  }
});

const mapDispatch = dispatch => {
  return {
    loadMapToGame: function(customMap){
      dispatch(selectMap(customMap))
    }
  }
}

export default connect(null, mapDispatch)(withNavigation(MapCard) )
