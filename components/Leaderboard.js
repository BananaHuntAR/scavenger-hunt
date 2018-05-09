import React from 'react';
import axios from 'axios';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { List, ListItem, Body, Right, Text } from 'native-base';

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top10Results: []
    };
  }

  componentDidMount() {
    axios
      .get('http://scavengar-hunt.herokuapp.com/api/ranking')
      .then(results => this.setState({ top10Results: results.data }))
      .catch(err => console.error(err));
  }

  render() {
    let rank = 0;

    return (
      <View>
        <Text>Leaderboard</Text>
        <List>
          <ListItem>
            <Body>
              <Text>Name</Text>
            </Body>
            <Right>
              <Text>Time</Text>
            </Right>
          </ListItem>
          {this.state.top10Results.map(result => {
            rank++;
            return (
              <ListItem key={result.id}>
                <Body>
                  <Text>
                    {rank}. {result.name}
                  </Text>
                </Body>
                <Right>
                  <Text>{result.score}</Text>
                </Right>
              </ListItem>
            );
          })}
        </List>
      </View>
    );
  }
}
