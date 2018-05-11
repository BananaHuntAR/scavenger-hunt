import React from 'react';
import { Text, View } from 'react-native';
import { Badge } from 'react-native-elements';

const Score = ({ capturedItems, itemsNum }) => {
  return (
    <View>
      <Badge
        containerStyle={{
          backgroundColor: 'white'
        }}
      >
        <Text>Captured:</Text>
        <Text>{capturedItems} / {itemsNum}</Text>
      </Badge>
    </View>
  );
};

export default Score;
