import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Padding, Border, FontSize, FontFamily, Color } from "../assets/errors/GlobalStyles";

const WarVideo = ({ onQuit, onContinue }) => {
  return (
    <View style={[styles.warvideo, styles.warvideoFlexBox]}>
      <View style={styles.warvideoFlexBox}>
        <Image
          style={styles.animationLmpmsw2pSmall1Icon}
          resizeMode="cover"
          source={require("../assets/errors/animation-lmpmsw2p-small-1.png")}
        />
        <View style={styles.warvideoFlexBox}>
          <Text style={styles.enQuittantLa}>
            {" "}
            "En quittant la vidéo maintenant, tu pourrais perdre des points, que
            tu as la possibilité d'accumuler ou ne pas avoir la possibilité de jouer"
          </Text>
          <View style={styles.buttonsParent}>
        <TouchableOpacity 
          style={[styles.buttons, styles.buttonsLayout]}
          onPress={onQuit} // Add the onPress handler
        >
          <Text style={[styles.text, styles.textTypo]}>Quitter</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonsLayout}
          onPress={onContinue} // Add the onPress handler
        >
          <Text style={[styles.text1, styles.textTypo]}>Poursuivre</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    </View>

  );
};

const styles = StyleSheet.create({
  warvideoFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsLayout: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    height: 40,
    width: 98,
    borderRadius: Border.br_21xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textTypo: {
    textAlign: "left",
    lineHeight: 15,
    fontSize: FontSize.size_xs,
  },
  animationLmpmsw2pSmall1Icon: {
    width: 90,
    height: 90,
  },
  enQuittantLa: {
    fontSize: FontSize.customButton1_size,
    lineHeight: 20,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    textAlign: "center",
    width: 228,
    color: Color.black,
  },
  text: {
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.white,
  },
  buttons: {
    backgroundColor: Color.error,
  },
  text1: {
    fontWeight: "700",
    fontFamily: FontFamily.customButton1,
    color: Color.black,
  },
  buttonsParent: {
    width: 226,
    justifyContent: "space-between",
    marginTop: 12,
    flexDirection: "row",
  },
  warvideo: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.pureWhite,
    width: 347,
    height: 251,
    padding: Padding.p_5xl,
  },
});

export default WarVideo;
