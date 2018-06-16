import React from 'react';
import { connect } from 'react-redux';
import { fetchResultsThunk, clearMapId } from '../store';
import { StyleSheet, Image, View } from 'react-native';
import {
  Content,
  Card,
  List,
  ListItem,
  Left,
  Right,
  Button,
  Text
} from 'native-base';
import LeaderboardItem from './LeaderboardItem';
import { Font } from 'expo';

class Leaderboard extends React.Component {
  async componentDidMount() {
    this.props.fetchResultsThunk(this.props.mapId);
    await Font.loadAsync({
      'nanum-pen-script': require('../assets/NanumScript.ttf'),
      'opensans-light': require('../assets/OpenSans-Light.ttf')
    });
  }

  componentWillUnmount() {
    this.props.clearMapId();
  }

  render() {
    let rank = 0;
    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={require('../assets/leaderboard.jpg')}
        />
        <Text style={styles.headerText}>Leaderboard</Text>
        <Image
          style={styles.leaderIcon}
          source={require('../assets/banana_king.png')}
        />

        <Content showsVerticalScrollIndicator={false}>
          <View style={styles.cardContainer}>
            <Card bordered style={styles.card}>
              <List>
                <ListItem>
                  <Left>
                    <Text style={styles.columnHeader}>Name</Text>
                  </Left>
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
          </View>
        </Content>

        <Button
          onPress={() => this.props.navigation.replace('GameOptionPage')}
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
  results: state.results,
  mapId: state.mapId
});

export default connect(
  mapState,
  { fetchResultsThunk, clearMapId }
)(Leaderboard);

const styles = StyleSheet.create({
  container: {
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
  button: {
    marginBottom: 20,
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
    // borderColor: '#8A4F3B',
    // borderWidth: 20,
    backgroundColor: '#F3EED9',
    borderRadius: 25
  }
});
