import React from 'react';
import { connect } from 'react-redux';
import { fetchResultsThunk } from '../store';
import { StyleSheet, View } from 'react-native';
import {
  Content,
  List,
  ListItem,
  Body,
  Right,
  Button,
  Text
} from 'native-base';
import { EvilIcons } from '@expo/vector-icons';
import LeaderboardItem from './LeaderboardItem';

class Leaderboard extends React.Component {
  componentDidMount() {
    this.props.fetchResultsThunk();
  }

  render() {
    let rank = 0;
    return (
      <View style={styles.container}>
        <EvilIcons
          name="trophy"
          size={80}
          color="white"
          style={{ alignSelf: 'center' }}
        />
        <Content>
          <List>
            <ListItem>
              <Body>
                <Text style={styles.columnHeader}>Name</Text>
              </Body>
              <Right>
                <Text style={styles.columnHeader}>Time</Text>
              </Right>
            </ListItem>

            {this.props.results.map(result => {
              rank++;
              return (
                <LeaderboardItem
                  key={result.id}
                  rank={rank}
                  name={result.name}
                  time={result.time}
                />
              );
            })}
          </List>
        </Content>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.navigation.replace('Home')}
            rounded
            style={styles.button}
          >
            <Text>Home</Text>
          </Button>
          <Button rounded style={styles.button}>
            <Text>Play Again!</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapState = state => ({
  results: state.results
});

export default connect(mapState, { fetchResultsThunk })(Leaderboard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3FBE94',
    flex: 1,
    paddingTop: 50
  },
  columnHeader: {
    color: 'white',
    padding: 5,
    fontSize: 20,
    fontFamily: 'OriyaSangamMN'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    margin: 20,
    backgroundColor: '#E96B63'
  }
});
