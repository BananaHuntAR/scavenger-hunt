import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, View } from 'react-native';
import MapCard from './MapCard'
import LeaderBoardItem from './LeaderBoardItem'

class UserHome extends Component{
  state = {
    results: [],
    customMaps: []
  }

  componentDidMount() {
    axios
      .get('http://scavengar-hunt.herokuapp.com/api/users/1/results')
      .then(results => this.setState({ results: results.data }))
      .catch(err => console.error(err));
    axios
      .get('http://scavengar-hunt.herokuapp.com/api/users/1/customMaps')
      .then(customMaps => this.setState({ customMaps: customMaps.data}))
      .catch(err => console.error(err));
  }

  render(){
    <View style={style.container}>
      <ImageBackground style={styles.profileSegment}>
        <Thumbnail style={styles.profilePicture} large source={ /* user picture */ } />
        <Text>User Name</Text>
      </ImageBackground>
      <View>
        { this.props.customMaps && this.props.customMaps.map(customMap => {
            return (
              <MapCard customMap={customMap} />
            )
          })
        }
      </View>
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

          {this.state.results.map(result => {
            rank++;
            return (
              <LeaderboardItem
                key={result.id}
                rank={rank}
                //since its the same user, should really be last attempt
                name={result.name}
                time={result.time}
              />
            );
          })}
        </List>
    </Content>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E96B63',
    paddingTop: 50
  },
  profileSegment: {
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profilePicture: {
    marginBottom: 10
  },
  columnHeader: {
    color: 'white',
    padding: 5,
    fontSize: 20,
    fontFamily: 'OriyaSangamMN'
  }
});
