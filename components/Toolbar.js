import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Button, Icon, Fab } from 'native-base';
import { Feather, EvilIcons, Ionicons } from '@expo/vector-icons';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    const { currentUser } = this.props;
    return (
      <Fab
        active={this.state.active}
        direction="right"
        containerStyle={{}}
        style={{ backgroundColor: '#3FBE94' }}
        position="bottomLeft"
        onPress={() => this.setState({ active: !this.state.active })}
      >
        <Icon name="md-more" />
        <Button
          style={{ backgroundColor: '#fced4e' }}
          onPress={() => {
            !currentUser.email
              ? this.props.navigation.navigate('Login')
              : this.props.navigation.navigate('UserProfile', {
                  currentUser: currentUser
                });
          }}
        >
          {/* if user is logged in, take them to their profile page with past score history
          if user not logged in, redirect them to the login / sign-up page */}
          <Feather name="user" size={21} />
        </Button>
        <Button
          style={{ backgroundColor: '#fced4e' }}
          onPress={() => this.props.navigation.navigate('Leaderboard')}
        >
          <EvilIcons name="trophy" size={30} style={{ color: 'black' }} />
        </Button>
        <Button
          style={{ backgroundColor: '#fced4e' }}
          onPress={() => this.props.navigation.navigate('Instructions')}
        >
          <Ionicons
            name="ios-clipboard-outline"
            size={25}
            style={{ color: 'black' }}
          />
        </Button>
      </Fab>
    );
  }
}

export default withNavigation(Toolbar);
