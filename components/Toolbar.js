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
        <Button style={{ backgroundColor: '#fced4e' }}>
          <Feather name="user" size={21} />
        </Button>
        <Button
          style={{ backgroundColor: '#fced4e' }}
          onPress={() => this.props.navigation.navigate('Leaderboard')}
        >
          <EvilIcons
            name="trophy"
            size={30}
            style={{ color: 'black', fontWeight: 'bold' }}
          />
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
