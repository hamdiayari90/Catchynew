import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Padding, Border, FontSize, FontFamily, Color } from "../GlobalStyles";

const Dislog = () => {
  return (
    <View style={[styles.dislog, styles.dislogFlexBox]}>
      <View style={styles.dislogFlexBox}>
        <Image
          style={styles.animationLmpmsw2pSmall1Icon}
          resizeMode="cover"
          source={require("../assets/errors/animation-lmpmsw2p-small-1.png")}
        />
        <View style={styles.dislogFlexBox}>
          <Text style={styles.voulezVousQuitter}>
            voulez vous quitter l'application
          </Text>
          <View style={styles.buttonsParent}>
            <View style={[styles.buttons, styles.buttonsLayout]}>
              <Text style={[styles.text, styles.textTypo]}>Confirmer</Text>
            </View>
            <View style={styles.buttonsLayout}>
              <Text style={[styles.text1, styles.textTypo]}>Annuler</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dislogFlexBox: {
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
    lineHeight: 24,
    fontSize: FontSize.size_xs,
  },
  animationLmpmsw2pSmall1Icon: {
    width: 90,
    height: 90,
  },
  voulezVousQuitter: {
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
  dislog: {
    borderRadius: 20,
    backgroundColor: Color.pureWhite,
    width: 347,
    height: 251,
    padding: 24,
  },
});

export default Dislog;
