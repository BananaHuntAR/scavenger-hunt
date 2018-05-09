import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Ionicons from '@expo/vector-icons/Ionicons';

const TutorialStep = ({ navigation, title, desc, iconName }) => (
  <View style={styles.container}>
    <View style={styles.instructionsContainer}>
      <Text h2 style={styles.text}>
        {title}
      </Text>
      <Ionicons name={iconName} size={130} color={'white'} />
      <Text h4 style={styles.text}>
        {desc}
      </Text>
      <Button
        style={{ width: 150 }}
        onPress={() => navigation.navigate('Home')}
        raised
        rounded
        title="Skip Tutorial"
        backgroundColor="white"
        color="gray"
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3FBE94',
    flex: 1
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

export default withNavigation(TutorialStep);
