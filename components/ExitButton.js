import React from 'react';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';

const ExitButton = ({ navigation }) => (
  <Icon
    name="x"
    raised
    size={15}
    type="feather"
    onPress={() => navigation.replace('GameOptionPage')}
  />
);

export default withNavigation(ExitButton);
