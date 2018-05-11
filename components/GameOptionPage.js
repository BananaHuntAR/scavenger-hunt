import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

const GameOptionPage = ({ navigation }) => (
  <View style={styles.container}>
    <View>
      <Button
        style={{ width: 150 }}
        onPress={() => navigation.navigate('Game')}
        raised
        rounded
        title='Quick Random Game'
        backgroundColor="white"
        color="gray"
      />
      <Button
        style={{ width: 150 }}
        onPress={() => navigation.navigate('CustomGameList')}
        raised
        rounded
        title='Custom Games'
        backgroundColor="white"
        color="gray"
      />
      <Button
        style={{ width: 150 }}
        onPress={() => navigation.navigate('GameCreator')}
        raised
        rounded
        title='Create a Custom Game'
        backgroundColor="white"
        color="gray"
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3FBE94',
    flex: 1,
    paddingBottom: 100
  },
  instructionsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
    padding: 10
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'white',
    padding: 10,
    fontFamily: 'OriyaSangamMN'
  }
});

export default connect()(GameOptionPage);
