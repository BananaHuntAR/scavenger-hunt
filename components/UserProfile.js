import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import HomeIcon from './HomeIcon';
import { connect } from 'react-redux';
import { fetchCustomMapsByUserThunk, fetchResultsByUserThunk } from '../store';

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.loadPastResults();
    this.props.loadCustomMaps();
  }

  render() {
    //currentUser was passed as a prop on navigation from Toolbar
    const currentUser = this.props.navigation.state.params.currentUser;
    return (
      <View style={styles.container}>
        <ScrollView>
          <HomeIcon />
          <Text h1>Past Results</Text>
          <Text h1>Custom Maps</Text>
        </ScrollView>
      </View>
    );
  }
}

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
  }
});

export default connect(mapDispatchToProps)(UserProfile);
