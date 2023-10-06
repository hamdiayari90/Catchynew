import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Padding, Border, FontFamily, Color } from "../../GlobalStyles";

const OnboardingECatalogue = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.onboardingECatalogue}
      onPress={() => navigation.navigate("Login")}
    >
      <Image
        style={styles.onboardingECatalogueChild}
        resizeMode="cover"
        source={require("../assets/ellipse-56.png")}
      />
      <Image
        style={styles.onboardingECatalogueItem}
        resizeMode="cover"
        source={require("../assets/frame-9230.png")}
      />
      <View style={styles.frameParent}>
        <View>
          <View style={styles.frameFlexBox}>
            <View>
              <Text style={styles.voirLesECatalogues}>
                Voir les E-Catalogues
              </Text>
              <Text style={[styles.text, styles.textTypo]}>
                Découvre et parcours les pages des catalogues et les offres de
                tes magasins marques préférés.
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.frameGroup, styles.frameFlexBox]}>
          <View style={styles.frameView}>
            <View style={styles.ellipseParent}>
              <Image
                style={styles.frameLayout}
                resizeMode="cover"
                source={require("../assets/ellipse-59.png")}
              />
              <Image
                style={[styles.frameItem, styles.frameLayout]}
                resizeMode="cover"
                source={require("../assets/ellipse-59.png")}
              />
              <Image
                style={[styles.frameItem, styles.frameLayout]}
                resizeMode="cover"
                source={require("../assets/ellipse-58.png")}
              />
            </View>
          </View>
          <View style={styles.buttonsParent}>
            <View style={styles.buttonsFlexBox}>
              <Text style={[styles.text1, styles.textTypo]}>Passer</Text>
            </View>
            <View style={[styles.buttons1, styles.buttonsFlexBox]}>
              <Text style={[styles.text2, styles.textTypo]}>Suivant</Text>
              <Image
                style={styles.icons}
                resizeMode="cover"
                source={require("../assets/icons7.png")}
              />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    lineHeight: 24,
    fontSize: FontSize.customButton1_size,
    textAlign: "left",
  },
  frameFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  frameLayout: {
    height: 8,
    width: 8,
  },
  buttonsFlexBox: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    height: 48,
    borderRadius: Border.br_21xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  onboardingECatalogueChild: {
      top: -230,
      right: -210,
      width: 743,
      height: 550,
      position: "absolute",
  },
  onboardingECatalogueItem: {
    marginLeft: -129,
    top: 165,
    left: "50%",
    width: 258,
    height: 258,
    position: "absolute",
  },
  voirLesECatalogues: {
    fontSize: FontSize.size_5xl,
    lineHeight: 28,
    fontFamily: FontFamily.poppinsBold,
    width: 326,
    textAlign: "left",
    color: Color.black,
    fontWeight: "700",
  },
  text: {
    fontFamily: FontFamily.customBody1,
    color: Color.grey,
    marginTop: 16,
    width: 326,
  },
  frameItem: {
    marginLeft: 4,
  },
  ellipseParent: {
    flexDirection: "row",
  },
  frameView: {
    alignItems: "center",
  },
  text1: {
    fontFamily: FontFamily.customButton1,
    color: Color.black,
    fontWeight: "700",
    lineHeight: 24,
    fontSize: FontSize.customButton1_size,
  },
  text2: {
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.primary,
  },
  icons: {
    width: 24,
    height: 24,
    marginLeft: 4,
  },
  buttons1: {
    backgroundColor: Color.black,
  },
  buttonsParent: {
    justifyContent: "space-between",
    marginTop: 45,
    flexDirection: "row",
    width: 320,
  },
  frameGroup: {
    width: 320,
    marginTop: 16,
  },
  frameParent: {
    top: '60%',
    left: 30 ,
    width: 300,
    position: "absolute",
  },
  onboardingECatalogue: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default OnboardingECatalogue;
