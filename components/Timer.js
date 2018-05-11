import React from 'react';
import { Text, View } from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { incrementTime, resetTime } from '../store';

class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.resetTime();
    this.timeIncrement();
  }

  componentDidUpdate() {
    if (this.props.isGameOver) {
      clearInterval(this.intervalId);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timeIncrement = () => {
    this.intervalId = setInterval(() => this.props.incrementTime(this.props.time), 1000);
  };

  convertToTime = time => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds; // displays seconds as two digits
    return `${minutes}:${seconds}`;
  };

  render() {
    const { time } = this.props;
    return (
      <View>
        <Badge
          containerStyle={{
            backgroundColor: 'white',
            flexDirection: 'row'
          }}
        >
          <Icon name="timer" />
          <Text>{this.convertToTime(time)}</Text>
        </Badge>
      </View>
    );
  }
}

const mapState = state => {
  return { time: state.time }
}

const mapDispatch = dispatch => {
  return {
    incrementTime(t) {
      dispatch(incrementTime(t + 1));
    },
    resetTime() {
      dispatch(resetTime());
    }
  }
}

export default connect(mapState, mapDispatch)(Timer);
