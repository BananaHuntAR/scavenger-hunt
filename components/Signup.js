import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import HomeIcon from './HomeIcon';
import { connect } from 'react-redux';
import { signup } from '../store/auth';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password1: '',
      password2: '',
      error: ''
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword1 = this.handleChangePassword1.bind(this);
    this.handleChangePassword2 = this.handleChangePassword2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(value) {
    this.setState({ email: value });
  }

  handleChangePassword1(value) {
    this.setState({ password1: value });
  }

  handleChangePassword2(value) {
    this.setState({ password2: value });
  }

  handleSubmit() {
    if (
      this.state.email &&
      this.state.password1 &&
      this.state.password1 === this.state.password2
    ) {
      const email = this.state.email;
      const password = this.state.password1;
      this.props.signup(
        {
          email,
          password
        },
        this.props.navigation
      );
      // clear the state after signup for security
      this.setState({
        email: '',
        password1: '',
        password2: '',
        error: ''
      });
    } else {
      this.setState({
        password1: '',
        password2: '',
        error: 'Email and password cannot be empty. Passwords must also match.'
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HomeIcon />
          <Text style={styles.title}>Create an account</Text>
          <Text style={styles.error}>{this.state.error}</Text>
          <Text style={styles.textLabel}>Email address</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.email}
            onChangeText={email => this.handleChangeEmail(email)}
          />
          <Text style={styles.textLabel}> Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.password1}
            onChangeText={password1 => this.handleChangePassword1(password1)}
          />
          <Text style={styles.textLabel}>Confirm password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.password2}
            onChangeText={password2 => this.handleChangePassword2(password2)}
          />
          <Button
            rounded
            raised
            style={styles.button}
            backgroundColor="white"
            color="gray"
            title="Sign Up"
            onPress={this.handleSubmit}
          />
        </ScrollView>
        </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signup: (credentials, navigation) => dispatch(signup(credentials, navigation))
});

export default connect(null, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3FBE94',
    paddingHorizontal: 5,
    flex: 1
  },
  title: {
    fontSize: 35,
    color: 'white',
    alignSelf: 'center',
    paddingTop: 10,
    textAlign: 'center'
  },
  textLabel: {
    fontSize: 20,
    marginTop: 10,
    color: 'white',
    marginLeft: 10
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 10,
    paddingLeft: 10,
    alignSelf: 'center',
    color: 'white',
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'white'
  },
  button: {
    width: 120,
    margin: 20,
    alignSelf: 'center'
  },
  error: {
    fontSize: 15,
    color: 'black',
    marginVertical: 0,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingTop: 10
  }
});
