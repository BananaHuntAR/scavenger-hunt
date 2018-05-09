import React from 'react';
import { Text, View } from 'react-native';
import { Badge } from 'react-native-elements';

const Score = ({ score }) => {
  return (
    <View>
      <Badge containerStyle={{ backgroundColor: 'white' }}>
        <Text>Items Collected:</Text>
        <Text>{score} / 10</Text>
      </Badge>
    </View>
  );
};

export default Score;
