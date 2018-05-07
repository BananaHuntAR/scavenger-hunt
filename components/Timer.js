import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Badge, Icon } from 'react-native-elements';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
    this.timeIncrement = this.timeIncrement.bind(this);
    this.convertToTime = this.convertToTime.bind(this);
  }

  timeIncrement() {
    let currentTime = this.state.time;
    setTimeout(() => {
      currentTime++;
      this.setState({ time: currentTime });
    }, 1000);
  }

  convertToTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `${minutes}:${seconds}`;
  }

  render() {
    this.timeIncrement();
    return (
      <View>
        <Badge
          containerStyle={{
            backgroundColor: 'white',
            flexDirection: 'row'
          }}
        >
          <Icon name="timer" />
          <Text> {this.convertToTime(this.state.time)}</Text>
        </Badge>
      </View>
    );
  }
}
