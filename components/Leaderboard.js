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
import { Font } from 'expo';

class Leaderboard extends React.Component {
  state = {
    loaded: false
  };

  async componentDidMount() {
    this.props.fetchResultsThunk();
    await Font.loadAsync({
      'nanum-pen-script': require('../assets/NanumScript.ttf'),
      'opensans-light': require('../assets/OpenSans-Light.ttf')
    });
    this.setState({ loaded: true });
  }

  render() {
    let rank = 0;
    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={require('../assets/leaderboard.jpg')}
        />
        {this.state.loaded ? (
          <Text style={styles.headerText}>Leaderboard</Text>
        ) : null}
        <Image
          style={styles.leaderIcon}
          source={require('../assets/banana_king.png')}
        />
        <Content>
          <Card bordered style={styles.card}>
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
  headerText: {
    fontFamily: 'nanum-pen-script',
    fontSize: 55,
    color: '#8A4F3B',
    textAlign: 'center',
    marginTop: 15
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
    marginBottom: 15,
    backgroundColor: '#8A4F3B',
    alignSelf: 'center',
    paddingHorizontal: 30
  },
  leaderIcon: {
    alignSelf: 'center',
    marginBottom: 5,
    height: 100,
    width: 170
  },
  card: {
    borderColor: '#8A4F3B',
    borderWidth: 20,
    borderRadius: 25
  }
});
