import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../assets/errors/GlobalStyles";

const VideoLoose = ({ points }) => {
  return (
    <View style={styles.videowin}>
      <Image
        style={styles.dcf6fhbyjj1Icon}
        resizeMode="cover"
        source={require("../assets/errors/animation-lmpmsw2p-small-1.png")}
      />
      <Text
        style={styles.bravoEn}
      >Dommage ! Une ou plusieurs réponses sont fausses. Vous n'avez pas gagné {points} points. Vous pouvez revisionner la promotion !
      </Text>
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

export default VideoLoose;
