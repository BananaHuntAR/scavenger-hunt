import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, View } from 'react-native';
import MapCard from './MapCard'

class UserHome extends Component{
  render(){
    <View style={style.container}>
      <ImageBackground style={styles.profileSegment}>
        <Thumbnail style={styles.profilePicture} large source={/*user picture*/} />
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
  }
});
