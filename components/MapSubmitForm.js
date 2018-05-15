import React, {Component} from 'react';
import {Modal, Text, View, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { postMap } from '../store';

class MapSubmitForm extends Component {
  state = {
    modalVisible: false,
    name: '',
    geolocation: [],
    address: '',
    instructions: ''
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.toSave) {
      return { modalVisible: true, geolocation: nextProps.geolocation };
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
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.modal}>
              <Text style={styles.text}>Create New Map:</Text>

              <Text style={[styles.text, { fontSize: 17 }]}>Name:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Name of your map"
                onChangeText={(name) => this.setState({name})}
              />
              <Text style={[styles.text, { fontSize: 17 }]}>Address:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Address of the map"
                onChangeText={(address) => this.setState({address})}
              />
              <Text style={[styles.text, { fontSize: 17 }]}>Instructions:</Text>
              <TextInput
                style={[styles.textInput, { height: 120 }]}
                placeholder="Instructions here..."
                onChangeText={(instructions) => this.setState({instructions})}
              />
              <View style={{ flex: 1, flexDirection: 'row' }}>
              <Button
                raised rounded title="Submit"
                backgroundColor="white" color="black"
                buttonStyle={styles.button}
                onPress={() => {
                  this.props.postMap(this.state.name, this.state.address, this.state.instructions, this.state.geolocation, this.props.customItems)
                  this.props.navigation.replace('GameOptionPage');
                }} />
              <Button
                raised rounded title="Cancel"
                backgroundColor="white" color="black"
                buttonStyle={styles.button}
                onPress={() => {
                  this.setModalVisible(false);
                }} />
              </View>
            </View>
          </KeyboardAvoidingView>
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
    height: height * 0.7,
    paddingTop: 25,
    backgroundColor: '#39A792'
  },
  text: {
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    fontSize: 23,
    margin: 5
  },
  textInput: {
    marginBottom: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    height: 40,
    width: width * 0.5
  },
  button: {
    margin: 10,
    width: 90,
    height: 30,
    padding: 0
  }
});

const mapState = state => {
  return { customItems: state.customItems };
};

const mapDispatch = dispatch => {
  return {
    postMap(name, address, instructions, geolocation, customItems) {
      let map = {
        name,
        address,
        instructions,
        latitude: geolocation[0],
        longitude: geolocation[1],
        customItems
      }
      dispatch(postMap(map));
    }
  }
}

export default connect(mapState, mapDispatch)(withNavigation(MapSubmitForm));
