import React from 'react';
import { StyleSheet, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import HomeIcon from './HomeIcon';

class InputInstructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: ''
    };
  }

  handleChange = value => {
    this.setState({ instructions: value });
  };

  handleSubmit = () => {
    const instructions = this.state.instructions;
    this.props.navigation.navigate('CreateMap', { instructions: instructions });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView showsVerticalScrollIndicator={false}>
        <HomeIcon />
        <Text h4 style={styles.text}>
          Please enter starting instructions
        </Text>
        <Text h5 style={styles.text}>
          Example: "Stand directly in front of the red welcome sign on the door"
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleChange}
          multiline={true}
          backgroundColor="white"
        />
        <Button
          rounded
          raised
          style={styles.button}
          backgroundColor="gray"
          color="white"
          title="Ready to drop some bananas!"
          onPress={this.handleSubmit}
        />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3FBE94',
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    textAlign: 'center',
    color: 'white',
    padding: 10,
    fontFamily: 'OriyaSangamMN'
  },
  textInput: {
    height: 200,
    width: 300,
    marginTop: 10,
    paddingLeft: 10,
    alignSelf: 'center',
    color: 'gray',
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'white'
  },
  button: {
    width: 300,
    marginTop: 20,
    alignSelf: 'center'
  }
});

export default InputInstructions;
