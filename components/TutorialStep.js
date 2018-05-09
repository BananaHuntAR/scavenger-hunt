import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const TutorialStep = ({ navigation, title, desc }) => (
  <View style={styles.container}>
    <View>
      <Text h4>{title}</Text>
      <Text style={styles.text}>{desc}</Text>
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
    backgroundColor: '#95CEDA',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20
  },
  text: {
    textAlign: 'center'
  }
});

export default withNavigation(TutorialStep);
