import React from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      leftIcon={<Icon name={iconName} size={28} color={iconColor} />}
      leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor='grey'
      name={name}
      placeholder={placeholder}
      style={styles.input}
    />
  </View>
)

const styles = StyleSheet.create({
  inputContainer: {
     flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        width:'100%',
        borderRadius: 8,
          padding: 8
  },
  iconStyle: {
    marginRight: 10
  }
})

export default FormInput
