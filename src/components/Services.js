import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize, Border, Padding } from "../assets/recharge/GlobalStyles";
import { WIDTH } from "../utils/Dimension";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
const Services = () => {
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate('RechargeArgent'); // 'RechargeMobile' should be the name of the screen in your navigator
};
  return (
    <TouchableOpacity onPress={handleNavigation} activeOpacity={0.7}>

    <View style={styles.services}>
      <View
        style={[styles.cemrekArtworksFanta1Parent, styles.iconsParentFlexBox]}
      >
        <Image
          style={styles.cemrekArtworksFanta1Icon}
          resizeMode="cover"
          source={require("../assets/recharge/cemrekartworksfanta-15.png")}
        />
        <View style={styles.frameParent}>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{`Solde IZI `}</Text>
          </View>
          <View style={styles.frameGroup}>
            <View style={[styles.iconsParent, styles.iconsParentFlexBox]}>
              <Image
                style={styles.icons}
                resizeMode="cover"
                source={require("../assets/recharge/icons43.png")}
              />
              <Text style={[styles.text1, styles.textTypo]}>600 Points</Text>
            </View>
            <View style={[styles.iconsGroup, styles.iconsParentFlexBox]}>
              <Image
                style={styles.icons1}
                resizeMode="cover"
                source={require("../assets/recharge/icons52.png")}
              />
              <View style={[styles.textContainer, styles.iconsParentFlexBox]}>
                <Text style={styles.textTypo}>Jusqu’au 25 Septembre</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  iconsParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  textTypo: {
    color: Color.lightGrey2,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    lineHeight: 16,
    fontSize: FontSize.size_2xs,
    textAlign: "left",
  },
  cemrekArtworksFanta1Icon: {
    borderRadius: Border.br_3xs,
    width: 91,
    height: 97,
  },
  text: {
    fontSize: FontSize.size_sm,
    lineHeight: 18,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.black,
    textAlign: "left",
    alignSelf: "stretch",
  },
  textWrapper: {
    alignSelf: "stretch",
  },
  icons: {
    width: 13,
    height: 12,
  },
  text1: {
    flex: 1,
    marginLeft: 4,
  },
  iconsParent: {
    alignSelf: "stretch",
  },
  icons1: {
    width: 12,
    height: 12,
  },
  textContainer: {
    width: WIDTH,
    marginLeft: 4,
  },
  iconsGroup: {
    marginTop: 4,
    alignSelf: "stretch",
  },
  frameGroup: {
    marginTop: 8,
    alignSelf: "stretch",
  },
  frameParent: {
    width: 169,
    height: 95,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_5xs,
    marginLeft: 24,
  },
  cemrekArtworksFanta1Parent: {
    width: 284,
    height: 97,
  },
  services: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.pureWhite,
    width: 320,
    height: 117,
    justifyContent: "center",
    padding: Padding.p_3xs,
  },
});

export default Services;
