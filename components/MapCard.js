import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body
} from 'native-base';

export default class MapCard extends Component {
  render() {
    const { name, address, instructions } = this.props.customMap;
    return (
          <Card style={{flex: 1}}>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{uri: 'http://www.squishable.com/user_gallery/squish_banana_15/360s/squish_banana_15_design.jpg' }}
                />
                <Body>
                  <Text>{name}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image
                  source={{uri: 'https://media.mnn.com/assets/images/2018/03/banana_stem_rachis.jpg.838x0_q80.jpg' }}
                  style={{height: 100, width: '100%', flex: 1}} />
                <Text>
                  Address: {address}
                </Text>
                <Text>
                  Instructions: {instructions}
                </Text>
              </Body>
            </CardItem>
          </Card>
    );
  }
}
