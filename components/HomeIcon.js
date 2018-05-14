import React from 'react';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const HomeIcon = ({ navigation }) => (
  <Icon
    iconStyle={{
      paddingTop: 50,
      alignSelf: 'flex-end'
    }}
    name="home"
    color="#F3EED9"
    underlayColor="#3FBE94"
    onPress={() => navigation.navigate('Home')}
  />
);

export default withNavigation(HomeIcon);
