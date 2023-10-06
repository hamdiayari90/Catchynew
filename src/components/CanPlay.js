import React, { useRef, useState, useCallback, useEffect, } from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../assets/errors/GlobalStyles";

const VideoWin = ({ points }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            // Close the modal
            // This assumes you have some method or prop to close the modal.
            // Adjust accordingly.
        }, 5000);
    
        return () => clearTimeout(timer); // Cleanup the timer
    }, []);
    
  return (
    <View style={styles.videowin}>
      <Image
        style={styles.dcf6fhbyjj1Icon}
        resizeMode="cover"
        source={require("../assets/errors/roue.png")}
      />
      <Text
        style={styles.bravoEn}
      >Bravo ! Vous Pouvez Jouer La Roue de Fortune OU JackPot !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dcf6fhbyjj1Icon: {
    width: 116,
    height: 117,
  },
  bravoEn: {
    fontSize: FontSize.customButton1_size,
    lineHeight: 20,
    fontWeight: "800",
    fontFamily: FontFamily.interMedium,
    color: Color.black,
    textAlign: "center",
    width: 294,
    marginTop: -7,
  },
  videowin: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.pureWhite,
    width: 347,
    height: 226,
    alignItems: "center",
    paddingHorizontal: Padding.p_5xl,
    paddingTop: 13,
    paddingBottom: Padding.p_5xl,
  },
});

export default VideoWin;
