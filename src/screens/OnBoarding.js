import React, {useState, useEffect, useRef, useCallback, memo} from 'react';
import { Image, StyleSheet, Text, View, Pressable, Platform,} from "react-native";
import { FontSize, Padding, Border, FontFamily, Color } from "../../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const Onboarding =   () => {
  const navigation = useNavigation();

  const goToOnboardingECatalogue = () => {
    navigation.navigate('Login');
  };

  return (
    <Pressable
      style={styles.onboardingWinconvert}
    >
      <Image
        style={styles.onboardingWinconvertChild}
        resizeMode="cover"
        source={require("../assets/ellipse-56.png")}
      />
      <View style={styles.frameParent}>
        <View style={styles.frameFlexBox}>
          <View>
            <Text style={styles.gagneEtConvertie}>{`Gagne et converti(e)
tes points`}</Text>
            <Text
              style={[styles.text, styles.textTypo]}
            >{`Avec Catchous joue,gagne et recupère 
les points de ton panier, pour les échanger  contre des cadeaux`}</Text>
          </View>
        </View>
        <View style={[styles.frameGroup, styles.frameFlexBox]}>
          <View style={styles.frameContainer}>
            <View style={styles.ellipseParent}>
              <Image
                style={styles.frameLayout}
                resizeMode="cover"
                source={require("../assets/ellipse-59.png")}
              />
              <Image
                style={[styles.frameItem, styles.frameLayout]}
                resizeMode="cover"
                source={require("../assets/ellipse-58.png")}
              />
              <Image
                style={[styles.frameItem, styles.frameLayout]}
                resizeMode="cover"
                source={require("../assets/ellipse-59.png")}
              />
            </View>
          </View>
          <View style={styles.buttonsParent}>
            
  <View style={styles.buttonsFlexBox}
  onPress={goToOnboardingECatalogue}    >
    <Text style={[styles.text1, styles.textTypo]}>Passer</Text>
   
  </View>
  <Pressable
    style={[styles.buttons1, styles.buttonsFlexBox]}
    onPress={goToOnboardingECatalogue}    >
    <Text style={[styles.text2, styles.textTypo]}>Suivant</Text>
    <Image
      style={styles.icons}
      resizeMode="cover"
      source={require("../assets/icons7.png")}
    />
  </Pressable>

          </View>
        </View>
      </View>
      <LottieView
            source={require('../assets/animated/bording2.json')}
            autoPlay
            loop
            style={styles.onboardingWinconvertItem}
            /> 
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    lineHeight: 24,
    fontSize: FontSize.customButton1_size,
    textAlign: "left",
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
  onboardingWinconvertChild: {
    top: -230,
    right: -210,
    width: 743,
    height: 550,
    position: "absolute",
  },
  gagneEtConvertie: {
    fontSize: FontSize.size_5xl,
    lineHeight: 36,
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
    width: 320,
  },
  frameItem: {
    marginLeft: 4,
  },
  ellipseParent: {
    flexDirection: "row",
  },
  frameContainer: {
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
 
  frameParent: {
    top: '60%',
    left: 30 ,
    width: 300,
    position: "absolute",
  },
  onboardingWinconvertItem: {
    marginLeft: -220,
    top: -30,
    left: "50%",
    width: 440,
    height: 440,
    position: "absolute",
  },
  onboardingWinconvert: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Onboarding;
