import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, Card, Dividder, ListItem } from 'react-native-elements';
import HomeIcon from './HomeIcon';
import { connect } from 'react-redux';
import { fetchCustomMapsByUserThunk, fetchResultsByUserThunk } from '../store';

class UserProfile extends React.Component {
  componentDidMount() {
    const currentUser = this.props.navigation.state.params.currentUser;
    this.props.loadPastResults(currentUser.id);
    this.props.loadCustomMaps(currentUser.id);
  }

  render() {
    //currentUser was passed as a prop on navigation from Toolbar
    const { userResults, userMaps } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <HomeIcon />
          <Card title="Past Results">
            {userResults &&
              userResults.map(result => {
                return <View key={result.id} style={styles.result} />;
              })}
          </Card>
          <Text h1>Custom Maps</Text>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = storeState => ({
  userResults: storeState.userResults,
  userMaps: storeState.userMaps
});

const mapDispatchToProps = dispatch => ({
  loadCustomMaps: userId => dispatch(fetchCustomMapsByUserThunk(userId)),
  loadPastResults: userId => dispatch(fetchResultsByUserThunk(userId))
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
  result: {}
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
