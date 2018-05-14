import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

const GameOptionPage = ({ navigation }) => (
  <View style={styles.container}>
      <Button
        style={styles.gameOptionBtn}
        onPress={() => navigation.navigate('Game')}
        raised
        rounded
        title='Play Game Now'
        backgroundColor="white"
        color="gray"
      />
      <Button
        style={styles.gameOptionBtn}
        onPress={() => navigation.navigate('CustomGameList')}
        raised
        rounded
        title='Custom Games'
        backgroundColor="white"
        color="gray"
      />
      <Button
        style={styles.gameOptionBtn}
        onPress={() => navigation.navigate('CreateMap')}
        raised
        rounded
        title='Create a Custom Game'
        backgroundColor="white"
        color="gray"
      />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E96B63',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameOptionBtn: {
    justifyContent: 'space-around',
    borderRadius: 20,
    margin: 50
  }
});

export default connect()(GameOptionPage);
