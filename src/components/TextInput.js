import React from 'react';
import {TextInput as RNTextInput, View, StyleSheet} from 'react-native';
import { Font } from '../constants/colors/color';

import {windowWidth, windowHeight} from '../utils/Dimension';

const SimpleTextInput = (props) => {
  return (
    <View style={styles.inputContainer}>
      <RNTextInput
        style={styles.input}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: windowHeight / 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    width: windowWidth / 1.5,
    fontSize: 16,
    fontFamily: Font.primary,
    textAlign: 'center',
    backgroundColor: 'Transparent',  // Explicitly set a background color
  },
});

export default SimpleTextInput;
