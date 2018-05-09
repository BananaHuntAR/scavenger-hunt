import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const TutorialStep = ({ navigation, title, desc }) => (
  <View>
    <View style={styles.container}>
      <Text h1>{title}</Text>
      <Text h4 style={styles.text}>
        {desc}
      </Text>
      <Button
        onPress={() => navigation.navigate('Home')}
        raised
        rounded
        title="Skip tutorial"
        backgroundColor="#AD00B2"
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
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

export default withNavigation(TutorialStep);
