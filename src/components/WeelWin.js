import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontSize, FontFamily, Border, Padding } from "../GlobalStyles";

const WeelWin = () => {
  return (
    <View style={styles.weelwin}>
      <View
        style={[styles.a1ntnf3pjolAcCla21402000Parent, styles.buttonsFlexBox]}
      >
        <Image
          style={styles.a1ntnf3pjolAcCla21402000Icon}
          resizeMode="cover"
          source={require("../assets/a1ntnf3pjol-ac-cla-21402000-61sdruiwwllpng-00214020000000214002000-1.png")}
        />
        <View style={styles.frameParent}>
          <View>
            <Text style={[styles.text, styles.textTransform]}>
              Félicitations !
            </Text>
            <View style={[styles.frameWrapper, styles.buttonsFlexBox]}>
              <View>
                <View style={styles.textWrapper}>
                  <Text style={[styles.text1, styles.textTypo]}>
                    Vous avez gagné un Tee-shirt Fanta 🎉
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
  );
};

const styles = StyleSheet.create({
  buttonsFlexBox: {
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
  a1ntnf3pjolAcCla21402000Icon: {
    borderRadius: 10,
    width: 79,
    height: 96,
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
  frameWrapper: {
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
    marginTop: 11,
    flexDirection: "row",
    justifyContent: "center",
  },
  frameParent: {
    marginLeft: 18,
  },
  a1ntnf3pjolAcCla21402000Parent: {
    width: 296,
    flexDirection: "row",
    justifyContent: "center",
  },
  weelwin: {
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
    alignItems: "center",
  },
});

export default WeelWin;
