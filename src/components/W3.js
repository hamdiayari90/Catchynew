import * as React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Color, FontSize, FontFamily, Border, Padding } from "../assets/wheel1/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native';

const Frame = () => {
  // Get the navigation prop using the hook
  const navigation = useNavigation();

  // 3. Create a navigation function
  const handleFermerPress = () => {
    navigation.navigate('Home');  // Assumes your event screen is named 'Event'
  }

  return (
    <TouchableOpacity onPress={handleFermerPress} style={styles.frameParent}>
      <View style={styles.frameWrapper}>
        <View style={styles.textParent}>
          <Text style={[styles.text, styles.textTransform]}>Dommage!</Text>
          <Text style={[styles.text1, styles.textTransform]}>
            Vous n’avez rien gagné !
          </Text>
        </View>
        
      </View>
      <View style={styles.frameChild} />
      <TouchableOpacity 
        style={styles.fermerButton} 
        onPress={handleFermerPress}>
        <Text style={styles.fermerButtonText}>Fermer</Text>
      </TouchableOpacity>
      {/* Add Lottie Animation with new style */}
      <LottieView 
        source={require('../assets/animated/catern.json')} 
        autoPlay 
        loop 
        style={styles.lottieAnimationStyle} 
      />
    </TouchableOpacity>
  );
};

// Your existing styles here...


const styles = StyleSheet.create({
  textTransform: {
    transform: [
      {
        rotate: "-0.02deg",
      },
    ],
    textAlign: "left",
    color: Color.black,
  },
  text: {
    fontSize: FontSize.size_lg,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    width: 194,
  },
  lottieAnimationStyle: {
    width: 150,   // Adjust the width as per your requirement
    height: 150,  // Adjust the height as per your requirement
    marginTop: -40, // Space from the top (you can adjust or remove as per your design)
    left: -60, //
  },
  text1: {
    fontSize: FontSize.size_xs,
    lineHeight: 16,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    width: 142,
    marginTop: 8,
  },
  textParent: {
    width: 150,
  },
  fermerButton: {
    marginTop: 20, 
    paddingVertical: 10, 
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  fermerButtonText: {
    color: 'black',
    fontSize: 16,
    left: 90,
    top: 90,
    fontFamily: FontFamily.poppinsSemiBold
  },
  frameWrapper: {
    top: 16,
    left: 166,
    width: 138,
    height: 94,
    justifyContent: "space-between",
    zIndex: 0,
    position: "absolute",
  },

  frameParent: {
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: Color.colorWhitesmoke,
    borderStyle: "solid",
    borderColor: Color.goldVariant,
    borderTopWidth: 3,
    width: 360,
    height: 165,
    overflow: "hidden",
    paddingHorizontal: Padding.p_17xl,
    paddingVertical: Padding.p_base,
    alignItems: "center",
  },
});

export default Frame;
