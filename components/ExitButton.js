import React from 'react';
import { Icon } from 'react-native-elements';

const ExitButton = ({ navigation }) => (
  <Icon
    name="cancel"
    raised
    size={25}
    onPress={() => navigation.navigate('Main')}
  />
);

export default ExitButton;
