import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Content } from 'native-base';
import MapCard from './MapCard';
import { fetchCustomMapsThunk } from '../store'

class CustomGameList extends Component{
  componentDidMount(){
    this.props.loadCustomMaps();
  }

  render(){
    return (
      <View style={styles.container} >
        <Content>
        { this.props.customMaps && this.props.customMaps.map(customMap => {
            return (
              <MapCard customMap={customMap} key={customMap.id} />
            )
          })
        }
        </Content>
      </View>
    )
  }
}

const mapState = state => {
  return {
    customMaps: state.customMaps
  }
}

const mapDispatch = dispatch => {
  return {
    loadCustomMaps: function(){
      dispatch(fetchCustomMapsThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(CustomGameList);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E96B63',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 15
  }
});
