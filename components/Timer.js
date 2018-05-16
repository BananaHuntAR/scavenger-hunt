import React from 'react';
import { Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { incrementTime, resetTime } from '../store';
import { convertToTime } from '../utils';

class Timer extends React.Component {
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
    this.intervalId = setInterval(
      () => this.props.incrementTime(this.props.time),
      1000
    );
  };

  render() {
    const { time } = this.props;
    return (
      <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 8 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Icon name="timer" />
            <Text>{convertToTime(time)}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: 20, height: 20, marginRight: 5 }} source={require('../assets/banana_icon.png')} />
            <Text>
              {this.props.capturedItems} / {this.props.itemsNum}
            </Text>
          </View>
      </View>
    );
  }
}

const mapState = state => {
  return { time: state.time };
};

const mapDispatch = dispatch => {
  return {
    incrementTime(t) {
      dispatch(incrementTime(t + 1));
    },
    resetTime() {
      dispatch(resetTime());
    }
  };
};

export default connect(mapState, mapDispatch)(Timer);
