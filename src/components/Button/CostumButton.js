

  import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
  import React from 'react'
  import {Color} from '../../constants/colors/color.js'
  export const CostumButton = ({ onPress, title }) => {
    return (
      <View>
         <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
      </View>
    )
  }
  
   
  
  const styles = StyleSheet.create({
      // ...
  appButtonContainer: {
    elevation: 8,
    backgroundColor: Color.secondary,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor:Color.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    
    elevation: 12,
    
  },
  appButtonText: {
    fontSize: 18,
    color: Color.primary,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    padding:5,
    paddingRight:20,
    paddingLeft:20

  }
});
