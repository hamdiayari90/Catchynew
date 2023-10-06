import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";

const PointWin = () => {
  return (
    <View style={styles.pointwin}>
      <View style={[styles.dcf6fhbyjj1Parent, styles.buttonsFlexBox]}>
        <Image
          style={styles.dcf6fhbyjj1Icon}
          resizeMode="cover"
          source={require("../assets/dcf6fhbyjj-1.png")}
        />
        <View style={[styles.frameWrapper, styles.buttonsFlexBox]}>
          <View>
            <View>
              <Text style={[styles.text, styles.textTransform]}>
                Félicitations !
              </Text>
              <View style={styles.frameContainer}>
                <View>
                  <View style={styles.textWrapper}>
                    <Text style={[styles.text1, styles.textTypo]}>
                      Vous avez gagné 600 Points 🎉
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.buttons, styles.buttonsFlexBox]}>
              <Text style={[styles.text2, styles.textTypo]}>Accepter</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsFlexBox: {
    flexDirection: "row",
    justifyContent: "center",
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
  dcf6fhbyjj1Icon: {
    width: 91,
    height: 91,
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
  frameContainer: {
    marginTop: 8,
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
  },
  frameWrapper: {
    width: 296,
    marginLeft: -34,
    justifyContent: "center",
    alignItems: "center",
  },
  dcf6fhbyjj1Parent: {
    justifyContent: "center",
  },
  pointwin: {
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: Color.colorGray_100,
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

export default PointWin;
