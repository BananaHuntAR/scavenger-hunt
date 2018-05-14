import React from 'react';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const HomeIcon = ({ navigation }) => (
  <Icon
    iconStyle={{
      paddingTop: 100,
      alignSelf: 'flex-end'
    }}
    name="home"
    color="white"
    underlayColor="#3FBE94"
    onPress={() => navigation.navigate('Home')}
  />
);

export default withNavigation(HomeIcon);
