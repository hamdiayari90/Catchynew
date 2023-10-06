import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Padding, Border, FontFamily, Color } from "../../GlobalStyles";
import LottieView from 'lottie-react-native';
const OnboardingEvents = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.onboardingEvents}
      onPress={() => navigation.navigate("OnBoarding")}
    >
        <View style={styles.onboardingEvents}>
      <Image
        style={styles.onboardingEventsChild}
        resizeMode="cover"
        source={require("../assets/ellipse-561.png")}
      />
     <LottieView
            source={require('../assets/animated/on1.json')}
            autoPlay
            loop
            style={styles.onboardingEventsItem}
          /> 
      <View style={styles.frameParent}>
        <View style={styles.frameWrapper}>
          <View style={styles.frameFlexBox}>
            <View style={styles.frameWrapper}>
              <Text style={styles.exploreLesVnements}>
                Explore les événements
              </Text>
              <Text style={[styles.text, styles.textTypo]}>
                Découvre et participe à des évènements (en linge ou sur place) à
                proximité de toi
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
                source={require("../assets/ellipse-58.png")}
              />
              <Image
                style={[styles.frameItem, styles.frameLayout]}
                resizeMode="cover"
                source={require("../assets/ellipse-59.png")}
              />
              <Image
                style={[styles.frameItem, styles.frameLayout]}
                resizeMode="cover"
                source={require("../assets/ellipse-59.png")}
              />
            </View>
          </View>
          <View style={styles.buttonsParent}>
            <View style={styles.buttonsFlexBox}  onPress={() => navigation.navigate("Login")}
    >
              
              <Text style={[styles.text1, styles.textTypo]}>Passer</Text>
            </View>
            <View style={[styles.buttons1, styles.buttonsFlexBox]} onPress={() => navigation.navigate("OnBoarding")}>
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
  onboardingEventsChild: {
    top: -230,
    right: -210,
    width: 743,
    height: 550,
    position: "absolute",
  },
  onboardingEventsItem: {
    marginLeft: -131,
    top: 80,
    left: "50%",
    width: 261,
    height: 261,
    position: "absolute",
  },
  exploreLesVnements: {
    fontSize: FontSize.size_5xl,
    lineHeight: 28,
    fontFamily: FontFamily.poppinsBold,
    height: 44,
    textAlign: "left",
    color: Color.black,
    fontWeight: "700",
    alignSelf: "stretch",
  },
  text: {
    fontFamily: FontFamily.customBody1,
    color: Color.grey,
    marginTop: 16,
    alignSelf: "stretch",
    lineHeight: 24,
    fontSize: FontSize.customButton1_size,
  },
  frameWrapper: {
    width: 320,
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
    marginTop: 37,
    width: 320,
  },
  frameParent: {
    top: '60%',
    left: 30 ,
    width: 300,
    position: "absolute",
  },
  onboardingEvents: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default OnboardingEvents;