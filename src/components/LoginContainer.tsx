import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Padding, Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const LoginContainer = () => {
  return (
    <View style={styles.text}>
      <View style={styles.roundedRectangle} />
      <View style={[styles.buttons, styles.buttonsPosition]}>
        <View style={[styles.button, styles.buttonFlexBox]}>
          <Text style={[styles.button1, styles.buttonTypo]}>Login</Text>
        </View>
        <View style={[styles.button2, styles.buttonFlexBox]}>
          <Text style={[styles.button3, styles.buttonTypo]}>
            Create an account
          </Text>
        </View>
        <View style={[styles.button4, styles.buttonFlexBox]}>
          <Text style={[styles.button5, styles.button5Clr]}>Later</Text>
        </View>
      </View>
      <View style={[styles.loginOrSignUp, styles.buttonsPosition]}>
        <Text style={[styles.loginOrSign, styles.loginFlexBox]}>
          Login or Sign Up
        </Text>
        <Text style={[styles.loginOrCreate, styles.loginFlexBox]}>
          Login or create an account to take quiz, take part in challenge, and
          more.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsPosition: {
    width: 311,
    left: 16,
    position: "absolute",
  },
  buttonFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Padding.p_base,
    flexDirection: "row",
    width: 311,
    borderRadius: Border.br_xl,
    left: 0,
    position: "absolute",
  },
  buttonTypo: {
    textAlign: "center",
    fontWeight: "500",
  },
  button5Clr: {
    color: Color.neutralGrey2,
    lineHeight: 24,
    fontSize: FontSize.bodyNormalRegular_size,
  },
  loginFlexBox: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 311,
    left: 0,
    position: "absolute",
  },
  roundedRectangle: {
    backgroundColor: Color.neutralWhite,
    borderRadius: Border.br_xl,
    left: 0,
    top: 0,
    height: 340,
    width: 343,
    position: "absolute",
  },
  button1: {
    color: Color.neutralWhite,
    fontFamily: FontFamily.headingH3,
    lineHeight: 24,
    fontSize: FontSize.bodyNormalRegular_size,
    textAlign: "center",
  },
  button: {
    backgroundColor: Color.colorPrimary,
    paddingHorizontal: Padding.p_114xl,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Padding.p_base,
    flexDirection: "row",
    top: 0,
  },
  button3: {
    color: Color.colorPrimary,
    fontFamily: FontFamily.headingH3,
    lineHeight: 24,
    fontSize: FontSize.bodyNormalRegular_size,
    textAlign: "center",
  },
  button2: {
    top: 72,
    backgroundColor: Color.neutralGrey4,
    paddingHorizontal: Padding.p_114xl,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Padding.p_base,
    flexDirection: "row",
  },
  button5: {
    fontFamily: FontFamily.graphikMedium,
    textAlign: "center",
    fontWeight: "500",
  },
  button4: {
    top: 136,
    paddingHorizontal: Padding.p_35xl,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Padding.p_base,
    flexDirection: "row",
  },
  buttons: {
    top: 132,
    height: 192,
  },
  loginOrSign: {
    fontSize: FontSize.headingH3_size,
    lineHeight: 36,
    color: Color.neutralBlack,
    fontFamily: FontFamily.headingH3,
    fontWeight: "500",
    display: "flex",
    top: 0,
  },
  loginOrCreate: {
    top: 44,
    fontFamily: FontFamily.bodyNormalRegular,
    color: Color.neutralGrey2,
    lineHeight: 24,
    fontSize: FontSize.bodyNormalRegular_size,
  },
  loginOrSignUp: {
    top: 16,
    height: 92,
  },
  text: {
    top: 456,
    height: 340,
    width: 343,
    left: 16,
    position: "absolute",
  },
});

export default LoginContainer;
