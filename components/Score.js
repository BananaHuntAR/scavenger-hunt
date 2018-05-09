import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Badge, Icon } from 'react-native-elements';

const Score = ({ score }) => {
  return (
    <View>
      <Badge
        containerStyle={{
          backgroundColor: 'white'
        }}
      >
        <Text>Captured:</Text>
        <Text>{score} / 10</Text>
      </Badge>
    </View>
  );
};

export default Score;
