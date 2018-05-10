import React from 'react';
import axios from 'axios';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { List, ListItem, Body, Right, Text, Button } from 'native-base';

export default class Leaderboard extends React.Component {
  state = {
    top10Results: []
  };

  componentDidMount() {
    axios
      .get('http://scavengar-hunt.herokuapp.com/api/results')
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
                  <Text>{result.time}</Text>
                </Right>
              </ListItem>
            );
          })}
        </List>

        <Button onPress={() => this.props.navigation.replace('Home')} rounded>
          <Text>Home</Text>
        </Button>
        <Button rounded>
          <Text>Play Again!</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E96B63',
    paddingTop: 200,
    paddingBottom: 100
  },
  text: {
    color: 'white',
    fontFamily: 'OriyaSangamMN',
    padding: 10
  }
});
