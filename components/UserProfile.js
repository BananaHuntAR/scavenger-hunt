import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, ListItem, Text } from 'react-native-elements';
import HomeIcon from './HomeIcon';
import { connect } from 'react-redux';
import {
  fetchCustomMapsByUserThunk,
  fetchResultsByUserThunk,
  logout
} from '../store';

class UserProfile extends React.Component {
  componentDidMount() {
    const { currentUser } = this.props;
    this.props.loadPastResults(+currentUser.id);
    this.props.loadCustomMaps(+currentUser.id);
  }

  render() {
    //currentUser was passed as a prop on navigation from Toolbar
    const { userResults, userMaps, navigation, logoutFunc } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text
              style={styles.logoutText}
              onPress={() => logoutFunc(navigation)}
            >
              Logout
            </Text>
            <HomeIcon />
          </View>
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
                    onPress={() =>
                      navigation.navigate('Game', { customMap: map })
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
  logoutFunc: navigation => dispatch(logout(navigation))
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
  headerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
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
  },
  logoutText: {
    color: 'white',
    fontSize: 20,
    paddingTop: 50
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
