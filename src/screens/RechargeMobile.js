import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View, Pressable,BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding, Border } from "../assets/recharge/GlobalStyles";
import MenuHeaders from "../components/menuComponent/MenuHeaders";
import { WIDTH } from "../utils/Dimension";
const RechargeMobile = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Cadeaux");
      return true;  // This will prevent the default behavior of going back
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();  // Remove the listener when the component is unmounted
  }, []);
  return (
    <Pressable
      style={styles.rechargemobile}
      onPress={() => navigation.navigate("Cadeaux")}
    >
      <View style={[styles.maskGroupParent, styles.parentPosition]}>
        <Image
          style={styles.maskGroupIcon}
          resizeMode="cover"
          source={require("../assets/recharge/mask-group18.png")}
        />
        <View style={styles.frameWrapper}>
          <View style={styles.frameParent}>
            <View>
              <Text style={styles.text}>Recharge Mobile 5 dt</Text>
              <View style={styles.frameGroup}>
                <View style={styles.iconsParent}>
                  <Image
                    style={styles.icons}
                    resizeMode="cover"
                    source={require("../assets/recharge/icons45.png")}
                  />
                  <Text style={[styles.text1, styles.textTypo2]}>
                    Disponible jusqu’au 2 Septembre
                  </Text>
                </View>
                <View style={styles.iconsGroup}>
                  <Image
                    style={styles.icons1}
                    resizeMode="cover"
                    source={require("../assets/recharge/icons54.png")}
                  />
                  <Text style={[styles.text2, styles.textTypo2]}>
                    500 Points
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.frameContainer}>
              <View style={styles.textWrapper}>
                <Text style={[styles.text3, styles.textTypo1]}>
Numéro Mobile
                </Text>
              </View>
              <View style={styles.textFieldParent}>
                <View style={styles.textField}>
                  <View style={[styles.wrapper, styles.wrapperBorder]}>
                    <View style={styles.textContainer}>
                      <Text style={[styles.text4, styles.textTypo]}>
                        Numéro
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.buttons, styles.buttonsSpaceBlock]}>
                  <Text style={[styles.text5, styles.textTypo]}>Valider</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.buttonsParent, styles.frameViewPosition]}>
        <View style={[styles.buttons1, styles.icons3Layout]}>
          <Image
            style={styles.icons2}
            resizeMode="cover"
            source={require("../assets/recharge/icons40.png")}
          />
        </View>
        <Text style={styles.text6}>Retour</Text>
      </View>
      <View style={[styles.rechargemobileInner, styles.parentPosition]}>
        <View style={[styles.subtractParent, styles.subtractParentPosition]}>
          <MenuHeaders/>
        </View>
      </View>
    </Pressable>
);

};

const styles = StyleSheet.create({
  parentPosition: {
    left: 0,
    position: "absolute",
  },
  textTypo2: {
    marginLeft: 3,
    color: Color.lightGrey2,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    lineHeight: 16,
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  textTypo1: {
    fontSize: FontSize.customButton1_size,
    fontFamily: FontFamily.poppinsSemiBold,
  },
  wrapperBorder: {
    borderStyle: "solid",
    alignItems: "center",
  },
  textTypo: {
    lineHeight: 24,
    fontSize: FontSize.customButton1_size,
    textAlign: "left",
  },
  buttonsSpaceBlock: {
    paddingHorizontal: Padding.p_base,
    height: 48,
  },
  frameViewPosition: {
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  icons3Layout: {
    width: 32,
    height: 32,
  },
  subtractParentPosition: {
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
  },
  frameChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  parentFlexBox: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
  },
  frTypo: {
    marginLeft: 4,
    lineHeight: 27,
    fontWeight: "600",
    textAlign: "left",
    color: Color.black,
  },
  icons8Layout: {
    height: 16,
    width: 16,
  },
  buttons1FlexBox: {
    backgroundColor: Color.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text3Typo: {
    fontWeight: "600",
    textAlign: "left",
    color: Color.black,
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  maskGroupIcon: {
    height: 185,
    width: WIDTH,
  },
  text: {
    fontSize: FontSize.size_xl,
    width: 224,
    height: 24,
    textAlign: "left",
    fontFamily: FontFamily.poppinsBold,
    lineHeight: 18,
    color: Color.black,
    fontWeight: "700",
  },
  icons: {
    width: 24,
    height: 24,
  },
  text1: {
    width: 226,
  },
  iconsParent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icons1: {
    width: 25,
    height: 24,
  },
  text2: {
    width: 93,
  },
  iconsGroup: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  frameGroup: {
    marginTop: 16,
  },
  text3: {
    lineHeight: 30,
    textShadowColor: "rgba(255, 255, 255, 0.47)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "left",
    color: Color.black,
  },
  textWrapper: {
    width: 272,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  text4: {
    fontFamily: FontFamily.customBody1,
    color: Color.black,
    lineHeight: 24,
  },
  textContainer: {
    justifyContent: "center",
  },
  wrapper: {
    alignSelf: "stretch",
    borderColor: Color.lightGrey3,
    borderWidth: 1,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_5xs,
    minHeight: 48,
    borderRadius: Border.br_41xl,
    flexDirection: "row",
    backgroundColor: Color.background,
    borderStyle: "solid",
  },
  textField: {
    width: 251,
    justifyContent: "center",
  },
  text5: {
    fontFamily: FontFamily.customButton1,
    color: Color.primary,
    lineHeight: 24,
    fontWeight: "700",
  },
  buttons: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.black,
    width: 252,
    paddingVertical: Padding.p_xs,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textFieldParent: {
    marginTop: 10,
    justifyContent: "center",
  },
  frameContainer: {
    width: 290,
    paddingHorizontal: Padding.p_lgi,
    marginTop: 32,
    paddingVertical: 0,
    justifyContent: "center",
  },
  frameParent: {
    justifyContent: "center",
    alignItems: "center",
  },
  frameWrapper: {
    borderRadius: Border.br_xl,
    shadowColor: "rgba(38, 38, 38, 0.04)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 40,
    elevation: 40,
    shadowOpacity: 1,
    height: 357,
    paddingHorizontal: Padding.p_mini,
    paddingTop: Padding.p_13xl,
    paddingBottom: Padding.p_5xs,
    marginTop: -60,
    width: 320,
    backgroundColor: Color.pureWhite,
  },
  maskGroupParent: {
    top: 48,
    alignItems: "center",
  },
  icons2: {
    width: 19,
    height: 19,
  },
  buttons1: {
    borderRadius: Border.br_13xl,
    paddingHorizontal: 13,
    paddingVertical: 10,
    height: 32,
    backgroundColor: Color.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text6: {
    color: Color.background,
    marginLeft: 8,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    lineHeight: 18,
    flex: 1,
  },
  buttonsParent: {
    top: 98,
    justifyContent: "center",
    width: 320,
  },
  subtractIcon: {
    height: 89,
    width: 360,
  },
  maskGroupIcon1: {
    height: "79.33%",
    bottom: "20.67%",
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    maxWidth: "100%",
  },
  component1Icon: {
    width: 40,
    zIndex: 0,
    height: 40,
  },
  frameChild: {
    height: "78.42%",
    width: "66.93%",
    top: "11.61%",
    right: "16.13%",
    bottom: "9.97%",
    left: "16.94%",
    zIndex: 1,
  },
  frameItem: {
    width: 30,
    height: 32,
  },
  text7: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.customButton1_size,
  },
  groupParent: {
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  frameParent1: {
    width: 116,
  },
  translateFill0Wght400Grad0Icon: {
    overflow: "hidden",
  },
  fr: {
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.interSemiBold,
    lineHeight: 27,
  },
  translateFill0Wght400Grad0Parent: {
    backgroundColor: Color.colorGoldenrod_100,
    width: 55,
    padding: Padding.p_5xs,
    height: 40,
    borderRadius: Border.br_41xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  component3Icon: {
    width: 75,
    height: 51,
    marginLeft: 8,
  },
  frameParent3: {
    width: 131,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  iconsetStructure: {
    display: "none",
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    bottom: "0%",
    height: "100%",
  },
  vectorIcon: {
    width: 21,
    height: 25,
  },
  iconsChild: {
    top: -2,
    left: 17,
    borderRadius: Border.br_8xs,
    backgroundColor: Color.error,
    borderColor: Color.primary,
    borderWidth: 2,
    width: 12,
    height: 12,
    justifyContent: "center",
    position: "absolute",
  },
  subtractParent: {
    bottom: "0%",
    left: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
  },
  icons3: {
    height: 32,
  },
  iconsWrapper: {
    height: 39,
    marginLeft: 14,
    width: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  frameParent2: {
    marginLeft: 34,
    flexDirection: "row",
    alignItems: "center",
  },
  frameView: {
    top: 25,
  },
  rechargemobileInner: {
    top: 0,
    height: 105,
    width: 360,
  },
  cadeaux: {
    fontSize: FontSize.size_3xs,
    marginLeft: 2,
    fontFamily: FontFamily.poppinsSemiBold,
    lineHeight: 16,
    fontWeight: "600",
  },
  iconsContainer: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_base,
    height: 48,
    borderRadius: Border.br_41xl,
  },
  icon3: {
    overflow: "hidden",
  },
  navMenu: {
    backgroundColor: Color.lightGrey4,
    height: 64,
    justifyContent: "space-between",
    paddingHorizontal: Padding.p_xl,
    paddingVertical: 0,
    flexDirection: "row",
    width: 360,
    alignItems: "center",
  },
  line: {
    marginLeft: -68,
    bottom: 8,
    left: "50%",
    borderRadius: Border.br_81xl,
    backgroundColor: Color.lightGrey5,
    width: 135,
    height: 5,
    position: "absolute",
  },
  frame9340variant6: {
    height: 30,
    backgroundColor: Color.pureWhite,
    width: 360,
  },
  navMenuParent: {
    top: 706,
  },
  rechargemobile: {
    height: 800,
    overflow: "hidden",
    width: "100%",
    flex: 1,
    backgroundColor: Color.background,
  },
});

export default RechargeMobile;
