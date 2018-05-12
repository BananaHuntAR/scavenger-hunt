import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Container,
  Header,
  Content,
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
      <Container>
        <Header />
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'Image URL'}} />
                <Body>
                  <Text>{name}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  Address: {address}
                </Text>
                <Text>
                  Instructions: {instructions}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
