import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Body, Right, Text } from 'native-base';

const LeaderboardItem = ({ rank, name, time }) => {
  return (
    <ListItem>
      <Body>
        <Text style={styles.text}>
          {rank}.{'  '}
          {name}
        </Text>
      </Body>
      <Right>
        <Text style={styles.text}>{time}</Text>
      </Right>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 15,
    paddingRight: 13
  }
});

export default LeaderboardItem;
