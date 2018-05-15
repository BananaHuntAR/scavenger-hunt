import React from 'react';
import { connect } from 'react-redux';
import { fetchResultsThunk } from '../store';
import { StyleSheet, Image, View } from 'react-native';
import {
  Content,
  Card,
  CardItem,
  List,
  ListItem,
  Body,
  Right,
  Button,
  Text
} from 'native-base';
import { EvilIcons } from '@expo/vector-icons';
import LeaderboardItem from './LeaderboardItem';
import HomeIcon from './HomeIcon';

class Leaderboard extends React.Component {
  componentDidMount() {
    this.props.fetchResultsThunk();
  }

  render() {
    let rank = 0;
    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={require('../assets/home-bg.png')}
        />
        <HomeIcon />
        <Content>
          <Card>
            <Image
              style={styles.bgImage}
              source={require('../assets/gold-bg.jpeg')}
            />
            <EvilIcons
              name="trophy"
              size={80}
              color="black"
              style={{ alignSelf: 'center', paddingTop: 10 }}
            />
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
          </Card>
        </Content>
        <Button
          onPress={() => this.props.navigation.navigate('GameOptionPage')}
          rounded
          style={styles.button}
        >
          <Text>Play Again!</Text>
        </Button>
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
    // backgroundColor: '#3FBE94',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  bgImage: {
    position: 'absolute',
    resizeMode: 'stretch',
    top: 0
  },
  columnHeader: {
    color: 'black',
    padding: 5,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'OriyaSangamMN'
  },
  buttonContainer: {
    justifyContent: 'center'
  },
  button: {
    margin: 20,
    backgroundColor: '#3FBE94',
    alignSelf: 'center'
  }
});
