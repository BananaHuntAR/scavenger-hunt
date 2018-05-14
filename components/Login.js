import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import HomeIcon from './HomeIcon';
import { connect } from 'react-redux';
import { login } from '../store/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error:
        '' ||
        (this.props.navigation.state.params &&
          this.props.navigation.state.params.error)
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(value) {
    this.setState({ email: value });
  }

  handleChangePassword(value) {
    this.setState({ password: value });
  }

  handleSubmit() {
    const email = this.state.email;
    const password = this.state.password;
    this.props.login(
      {
        email,
        password
      },
      this.props.navigation
    );
    // clear the state after login for security
    this.setState({
      email: '',
      password: '',
      error: ''
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <ScrollView>
          <HomeIcon />
          <Text style={styles.title}>Log in to get playing!</Text>
          <Text style={styles.error}>{this.state.error}</Text>
          <Text style={styles.textLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={30}
            placeholder="Enter email here"
            placeholderTextColor="white"
            value={this.state.email}
            onChangeText={email => this.handleChangeEmail(email)}
          />
          <Text style={styles.textLabel}>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={15}
            placeholder="Enter password here"
            placeholderTextColor="white"
            value={this.state.password}
            onChangeText={password => this.handleChangePassword(password)}
          />
          <Button
            rounded
            raised
            style={styles.loginButton}
            backgroundColor="white"
            color="gray"
            title="Login"
            onPress={this.handleSubmit}
          />
          <Text style={styles.or}>OR</Text>
          <SocialIcon
            title="Sign in with Google"
            button
            style={styles.googleButton}
            width={280}
            type="google-plus-official"
          />
          <Button
            rounded
            raised
            style={styles.signupbutton}
            backgroundColor="gray"
            color="white"
            title="New to Banana Hunt? Sign Up"
            onPress={() => {
              this.props.navigation.navigate('Signup');
              this.setState({
                email: '',
                password: '',
                error: ''
              });
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (credentials, navigation) => dispatch(login(credentials, navigation))
});

export default connect(null, mapDispatchToProps)(Login);

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
    paddingTop: 10,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    width: 290
  },
  textLabel: {
    fontSize: 20,
    paddingLeft: 10,
    color: 'white'
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
    borderColor: 'white',
    marginBottom: 20
  },
  loginButton: {
    alignSelf: 'center',
    width: 290,
    height: 50
  },
  or: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    padding: 10
  },
  googleButton: {
    alignSelf: 'center',
    width: 290,
    backgroundColor: '#4885ed',
    height: 50
  },
  signupButton: {
    alignSelf: 'center',
    height: 50
  },
  error: {
    fontSize: 15,
    color: 'black',
    marginVertical: 0,
    paddingTop: 10,
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});
