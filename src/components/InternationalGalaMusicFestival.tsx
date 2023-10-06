import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { FontSize, FontFamily, Border, Color } from "../GlobalStyles";

const InternationalGalaMusicFestival = () => {
  return (
    <View style={[styles.rectangleParent, styles.groupChildLayout]}>
      <View style={[styles.groupChild, styles.june900Position]} />
      <Image
        style={[styles.rectangleIcon, styles.groupItemLayout]}
        resizeMode="cover"
        source={require("../assets/rectangle.png")}
      />
      <View style={styles.imGoingToShakeYParent}>
        <Text style={styles.imGoingTo}>International Gala Music Festival</Text>
        <Image
          style={[styles.groupItem, styles.groupItemLayout]}
          resizeMode="cover"
          source={require("../assets/group-18129.png")}
        />
        <View style={[styles.june900PmWrapper, styles.june900Position]}>
          <Text style={[styles.june900, styles.minTypo]}>
            10 June • 9:00 PM
          </Text>
        </View>
        <View style={styles.minParent}>
          <Text
            style={[styles.min, styles.minTypo]}
          >{`36 Guild Street London, UK  `}</Text>
          <Image
            style={styles.groupInner}
            resizeMode="cover"
            source={require("../assets/group-6.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 109,
    width: 329,
    position: "absolute",
  },
  june900Position: {
    top: 0,
    left: 0,
  },
  groupItemLayout: {
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    position: "absolute",
  },
  minTypo: {
    fontSize: FontSize.size_smi,
    textAlign: "left",
    fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    position: "absolute",
  },
  groupChild: {
    borderRadius: Border.br_sm,
    backgroundColor: Color.neutralWhite,
    left: 0,
    height: 109,
    width: 329,
    position: "absolute",
  },
  rectangleIcon: {
    height: "84.4%",
    width: "28.16%",
    top: "7.34%",
    right: "69.41%",
    bottom: "8.26%",
    left: "2.43%",
    borderRadius: Border.br_3xs,
  },
  imGoingTo: {
    marginTop: -24.5,
    width: "98.97%",
    fontSize: FontSize.bodyNormalRegular_size,
    color: Color.black,
    textAlign: "left",
    fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    left: "0%",
    top: "50%",
    position: "absolute",
  },
  groupItem: {
    height: "16.49%",
    width: "7.85%",
    top: "3.09%",
    right: "0%",
    bottom: "80.41%",
    left: "92.15%",
  },
  june900: {
    lineHeight: 19,
    color: Color.blueviolet,
    left: 0,
    top: 0,
  },
  june900PmWrapper: {
    width: 106,
    height: 20,
    left: 0,
    position: "absolute",
  },
  min: {
    marginTop: -11,
    left: "12.57%",
    color: Color.darkgray_100,
    top: "50%",
  },
  groupInner: {
    top: 1,
    width: 16,
    height: 16,
    left: 0,
    position: "absolute",
  },
  minParent: {
    marginTop: 26.5,
    width: "85.32%",
    right: "14.68%",
    height: 22,
    left: "0%",
    top: "50%",
    position: "absolute",
  },
  imGoingToShakeYParent: {
    marginTop: -46.5,
    width: "62.34%",
    right: "3.31%",
    left: "34.35%",
    height: 97,
    top: "50%",
    position: "absolute",
  },
  rectangleParent: {
    top: 890,
    left: 23,
  },
});

export default InternationalGalaMusicFestival;
