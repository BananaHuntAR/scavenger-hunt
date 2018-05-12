import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import MapCard from './MapCard';

class CustomGameList extends Component{
  render(){
    return (
      <View style={styles.container} >
        { this.props.customMaps && this.props.customMaps.map(customMap => {
            return (
              <MapCard customMap={customMap} key={customMap.id} />
            )
          })
        }
      </View>
    )
  }
}

const mapState = ({customMaps}) => {
  return {
    customMaps
  }
}

export default connect(mapState)(CustomGameList);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3FBE94',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
