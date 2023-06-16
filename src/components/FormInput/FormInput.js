import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { Font } from '../../constants/colors/color';
import {windowWidth, windowHeight} from '../../utils/Dimension';
export const FormInput = ({
  labelValue,
  placeholderText,
  iconType,
  maxLength,
  keyboardType,
  onBlur,
  ...rest
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#666" />
      </View>
      <TextInput
        onBlur={onBlur}
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...rest}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '90%',
    marginLeft: 20,

    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconStyle: {
    padding: 10,
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: Font.primary,
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
