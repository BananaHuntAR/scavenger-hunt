import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, ListItem, Text } from 'react-native-elements';
import HomeIcon from './HomeIcon';
import { connect } from 'react-redux';
import { fetchCustomMapsByUserThunk, fetchResultsByUserThunk, selectMap } from '../store';

class UserProfile extends React.Component {
  componentDidMount() {
    const { currentUser } = this.props;
    this.props.loadPastResults(+currentUser.id);
    this.props.loadCustomMaps(+currentUser.id);
  }

  render() {
    //currentUser was passed as a prop on navigation from Toolbar
    const { userResults, userMaps, navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <HomeIcon />
          <Text style={styles.text}>My Account</Text>
          <Card title="Past Results" containerStyle={styles.card}>
            {userResults &&
              userResults.map(result => {
                return (
                  <ListItem
                    hideChevron
                    key={result.id}
                    title={result.time}
                    subtitle={result.createdAt.slice(0, 10)}
                  />
                );
              })}
          </Card>
          <Card title="Created Maps" containerStyle={styles.card}>
            {userMaps &&
              userMaps.map(map => {
                return (
                  <ListItem
                    key={map.id}
                    title={map.name}
                    subtitle={map.createdAt.slice(0, 10)}
                    onPress={() => {
                      this.props.loadMapToGame(map);
                      navigation.navigate('Game');
                    }
                    }
                  />
                );
              })}
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = storeState => ({
  userResults: storeState.userResults,
  userMaps: storeState.userMaps,
  currentUser: storeState.currentUser
});

const mapDispatchToProps = dispatch => ({
  loadCustomMaps: userId => dispatch(fetchCustomMapsByUserThunk(userId)),
  loadPastResults: userId => dispatch(fetchResultsByUserThunk(userId)),
  loadMapToGame: customMap => dispatch(selectMap(customMap))
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3FBE94',
    paddingHorizontal: 5,
    flex: 1
  },
  card: {
    width: 280,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 5,
    borderRadius: 25
  },
  text: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
