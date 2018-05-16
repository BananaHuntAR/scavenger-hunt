import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem,
  Right,
  Text,
  Left
} from 'native-base';

const LeaderboardItem = ({ rank, name, time }) => {
  return (
    <ListItem>
      <Left>
        <Text style={styles.text}>
          {rank}.{'  '}
          {name}
        </Text>
      </Left>
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
