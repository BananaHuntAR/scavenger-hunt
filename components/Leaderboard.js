import React from 'react';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { List, ListItem, Body, Right, Text } from 'native-base';

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    // make the API call for the leaderboard here
  }

  render() {
    return (
      <View>
        <List>
          {this.state.results.map(result => (
            <ListItem key={result.id}>
              <Body>
                <Text>{result.name}</Text>
              </Body>
              <Right>
                <Text>{result.score}</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </View>
    );
  }
}
