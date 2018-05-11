import React, {Component} from 'react';
import {Modal, Text, View, StyleSheet, Dimensions, TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { postResult } from '../store';

class ResultSubmitForm extends Component {
  state = {
    modalVisible: false,
    name: ''
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.isGameOver) {
      return {modalVisible: true};
    }
    return null;
  }

  componentWillUnmount() {
    this.setModalVisible(false);
  }

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={styles.container}>
            <View style={styles.modal}>
              <Text style={styles.text}>Please enter your name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Your name here..."
                onChangeText={(name) => this.setState({name})}
              />
              <Text style={styles.text}>Time:</Text>
              <Text style={styles.text}>{this.props.time}</Text>
              <Button
                title="Submit"
                onPress={() => {
                  this.props.postResult(this.state.name, this.props.time)
                  this.props.navigation.replace('Leaderboard');
                }} />
              <Button
                title="Cancel"
                onPress={() => {
                  this.props.navigation.popToTop()
                }} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080'
  },
  modal: {
    width: width * 0.8,
    height: height * 0.6,
    backgroundColor: '#39A792'
  },
  text: {
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    fontSize: 23
  },
  textInput: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    width: width * 0.5
  }
});

const mapState = state => {
  return { time: state.time };
};

const mapDispatch = dispatch => {
  return {
    postResult(name, time) {
      dispatch(postResult(name, time));
    }
  }
}

export default connect(mapState, mapDispatch)(withNavigation(ResultSubmitForm));
