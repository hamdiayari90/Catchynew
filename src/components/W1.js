import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Color, FontSize, FontFamily, Border, Padding } from "../assets/wheel/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
const W1 = ({ giftName }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.frameParent}>
      <View
        style={[styles.a1ntnf3pjolAcCla21402000Parent, styles.buttonsFlexBox]}
      >
        <Image
          style={styles.a1ntnf3pjolAcCla21402000Icon}
          resizeMode="cover"
          source={require("../assets/wheel/a1ntnf3pjol-ac-cla-21402000-61sdruiwwllpng-00214020000000214002000-1.png")}
        />
        <View style={styles.frameGroup}>
          <View>
            <Text style={[styles.text, styles.textTransform]}>
              Félicitations !
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={[styles.text2, styles.textTypo, { color: 'gold', top: 70, fontSize: 20 }]}>Accepter</Text>
</TouchableOpacity>
            <View style={[styles.frameWrapper, styles.buttonsFlexBox]}>
              <View>
                <View style={styles.textWrapper}>
                <Text style={[styles.text1, styles.textTypo]}>
  Vous avez gagné un {giftName} 🎉
</Text>
                </View>
              </View>
            </View>
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
    fontColor: "ffffff",
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
  frameGroup: {
    marginLeft: 18,
  },
  a1ntnf3pjolAcCla21402000Parent: {
    width: 296,
    flexDirection: "row",
    justifyContent: "center",
  },
  frameParent: {
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: Color.colorWhitesmoke,
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

export default W1;
