import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import Timer from './Timer';
import Score from './Score';

const Start = ({ navigation, visible, toggleVisible }) => (
  <View>
    <Modal
      isVisible={visible}
      transparent={true}
      backdropOpacity={0.5}
      animationType="slide"
    >
      <View style={styles.container}>
        <Timer />
        <Score score={5} />
        <Text style={styles.text}>To begin the game:</Text>
        <Text style={styles.text}>
          Hold your phone vertically, pointing the camera toward the horizon
        </Text>
        <Button
          onPress={() => {
            toggleVisible();
            navigation.navigate('Game');
          }}
          raised
          rounded
          title="Begin Game"
        />
      </View>
    </Modal>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 200
  },
  text: {
    textAlign: 'center'
  }
});

export default withNavigation(Start);
