import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const WheelScreen = () => {
  return (
    <View style={styles.container}>
      <Text>WheelScreen</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center', alignContent:'center'
    }
})