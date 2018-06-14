import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';
import { Content, Card } from 'native-base';
import MapCard from './MapCard';
import { fetchCustomMapsThunk } from '../store';
import HomeIcon from './HomeIcon';

class CustomGameList extends Component {
  componentDidMount() {
    this.props.loadCustomMaps();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.bgImage}
          source={require('../assets/home-bg.jpg')}
        />
        <HomeIcon />
        <Content showsVerticalScrollIndicator={false}>
          {this.props.customMaps &&
            this.props.customMaps.map(customMap => {
              return (
                <Card key={customMap.id} style={styles.card}>
                  <MapCard button customMap={customMap} />
                </Card>
              );
            })}
        </Content>
      </View>
    );
  }
}

const mapState = state => {
  return {
    customMaps: state.customMaps
  };
};

const mapDispatch = dispatch => {
  return {
    loadCustomMaps: function() {
      dispatch(fetchCustomMapsThunk());
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(CustomGameList);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E96B63',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  bgImage: {
    position: 'absolute',
    resizeMode: 'stretch',
    top: 0
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: 25
  }
});
