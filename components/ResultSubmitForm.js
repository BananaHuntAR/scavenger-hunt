import React, {Component} from 'react';
import {Modal, Text, View, StyleSheet, Dimensions, TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

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
              <Text style={styles.text}>You Win!{'\n'}Please enter your name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Your name here..."
                onChangeText={(name) => this.setState({name})}
              />
              <Button
                title="Submit"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                  this.props.navigation.navigate('Leaderboard');
                }} />
              <Button
                title="Cancel"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
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
    color: 'white',
    fontSize: 25
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    width: width * 0.5
  }
});

export default withNavigation(ResultSubmitForm);
