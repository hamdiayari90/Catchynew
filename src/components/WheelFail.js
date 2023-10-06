import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Color, FontSize, Border, FontFamily, Padding } from "../GlobalStyles";

const WheelFail = () => {
  return (
    <View style={[styles.wheelfail, styles.wheelfailFlexBox]}>
      <View style={[styles.frameParent, styles.buttonsFlexBox]}>
        <View style={[styles.groupWrapper, styles.buttonsFlexBox]}>
          <Image
            style={styles.frameChild}
            resizeMode="cover"
            source={require("../assets/group-6356525.png")}
          />
        </View>
        <View style={styles.frameWrapper}>
          <View>
            <View>
              <Text style={[styles.text, styles.textTransform]}>Dommage !</Text>
              <View style={[styles.frameContainer, styles.wheelfailFlexBox]}>
                <View style={styles.frameView}>
                  <View style={styles.textWrapper}>
                    <Text style={[styles.text1, styles.textTypo]}>
                      Dommage ! Retente ta chance et tu feras mieux la prochaine
                      fois.{" "}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.buttons, styles.buttonsFlexBox]}>
              <Text style={[styles.text2, styles.textTypo]}>Rejouer</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wheelfailFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsFlexBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textTransform: {
    transform: [
      {
        rotate: "-0.02deg",
      },
    ],
    color: Color.black,
  },
  textTypo: {
    fontSize: FontSize.size_xs,
    textAlign: "left",
  },
  frameChild: {
    width: 60,
    height: 76,
  },
  groupWrapper: {
    borderRadius: Border.br_xl,
    paddingHorizontal: 11,
    paddingVertical: 21,
  },
  text: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.poppinsBold,
    width: 194,
    textAlign: "left",
    transform: [
      {
        rotate: "-0.02deg",
      },
    ],
    color: Color.black,
    fontWeight: "700",
    lineHeight: 24,
  },
  text1: {
    lineHeight: 16,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    whiteSpace: "pre-wrap",
    width: 197,
    transform: [
      {
        rotate: "-0.02deg",
      },
    ],
    color: Color.black,
    fontSize: FontSize.size_xs,
  },
  textWrapper: {
    height: 32,
  },
  frameView: {
    height: 16,
  },
  frameContainer: {
    marginTop: 8,
  },
  text2: {
    fontFamily: FontFamily.customButton1,
    color: Color.colorGold,
    fontSize: FontSize.size_xs,
    fontWeight: "700",
    lineHeight: 24,
  },
  buttons: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.black,
    width: 98,
    height: 30,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    marginTop: 34,
  },
  frameWrapper: {
    marginLeft: 18,
  },
  frameParent: {
    width: 296,
  },
  wheelfail: {
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: Color.colorGray_100,
    borderStyle: "solid",
    borderColor: Color.goldVariant,
    borderTopWidth: 3,
    width: 347,
    height: 166,
    overflow: "hidden",
    paddingHorizontal: Padding.p_17xl,
    paddingVertical: Padding.p_base,
  },
});

export default WheelFail;
