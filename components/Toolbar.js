import React, { Component } from 'react';
import { Button, Icon, Fab } from 'native-base';

export default class Toolbar extends Component {
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
        position="topLeft"
        onPress={() => this.setState({ active: !this.state.active })}
      >
        <Icon name="md-settings" />
        <Button style={{ backgroundColor: '#34A34F' }}>
          <Icon name="trophy" />
        </Button>
        <Button style={{ backgroundColor: '#3B5998' }}>
          <Icon name="logo-facebook" />
        </Button>
        <Button disabled style={{ backgroundColor: '#DD5144' }}>
          <Icon name="mail" />
        </Button>
      </Fab>
    );
  }
}
