import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
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
        style={{flex: 1}}
        onPress={
          (e) => {
            //Clicking on a card leads to game starting up
            this.handlePress(e, this.props.customMap)
            this.props.navigation.navigate('Game')
          }
        }>
          <Body>
            <Image
              source={{uri: 'https://media.mnn.com/assets/images/2018/03/banana_stem_rachis.jpg.838x0_q80.jpg' }}
              style={{height: 200, width: '100%', flex: 1}} />
            <Text>
              Address: {address}
            </Text>
            <Text>
              Instructions: {instructions}
            </Text>
          </Body>
        </CardItem>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    loadMapToGame: function(customMap){
      dispatch(selectMap(customMap))
    }
  }
}

export default connect(null, mapDispatch)(withNavigation(MapCard) )
