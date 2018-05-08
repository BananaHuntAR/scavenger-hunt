import React from 'react';
import { Text, View } from 'react-native';
import { Badge, Icon } from 'react-native-elements';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
  }

  componentDidMount() {
    this.timeIncrement();
  }

  timeIncrement = () =>
    setInterval(() => {
      this.setState(prevState => ({ time: prevState.time + 1 }));
    }, 1000);

  componentWillUnmount() {
    clearInterval(this.timeIncrement);
  }

  convertToTime = time => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds; // displays seconds as two digits
    return `${minutes}:${seconds}`;
  };

  render() {
    return (
      <View>
        <Badge
          containerStyle={{
            backgroundColor: 'white',
            flexDirection: 'row'
          }}
        >
          <Icon name="timer" />
          <Text>{this.convertToTime(this.state.time)}</Text>
        </Badge>
      </View>
    );
  }
}
