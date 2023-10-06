import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const TunisContainer = () => {
  return (
    <View style={[styles.filterInner, styles.filterInnerLayout]}>
      <View style={[styles.groupParent, styles.groupPosition]}>
        <View style={[styles.rectangleParent, styles.groupLayout1]}>
          <View style={[styles.groupChild, styles.groupChildBg]} />
          <Image
            style={styles.groupItem}
            resizeMode="cover"
            source={require("../assets/vector-6.png")}
          />
          <Text style={styles.tunisTunisie}>Tunis, Tunisie</Text>
          <Image
            style={[styles.groupInner, styles.groupLayout]}
            resizeMode="cover"
            source={require("../assets/group-18207.png")}
          />
        </View>
        <View style={[styles.rectangleGroup, styles.groupLayout1]}>
          <View style={[styles.groupChild, styles.groupChildBg]} />
          <Image
            style={styles.groupItem}
            resizeMode="cover"
            source={require("../assets/vector-6.png")}
          />
          <Text style={styles.tunisTunisie}>Coca Cola</Text>
          <View style={[styles.groupInner, styles.groupLayout]}>
            <View style={[styles.groupChild1, styles.groupLayout]} />
            <View style={[styles.groupChild2, styles.groupChildBg]} />
          </View>
        </View>
        <Text style={[styles.location, styles.sponsorTypo]}>Location</Text>
        <Text style={[styles.sponsor, styles.sponsorTypo]}>Sponsor</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterInnerLayout: {
    height: 225,
    width: 334,
    position: "absolute",
  },
  groupPosition: {
    left: 0,
    top: 0,
  },
  groupLayout1: {
    height: 60,
    left: 0,
    width: 334,
  },
  groupChildBg: {
    backgroundColor: Color.neutralWhite,
    position: "absolute",
  },
  groupLayout: {
    height: 45,
    width: 45,
    position: "absolute",
  },
  sponsorTypo: {
    color: Color.colorTypographyTitle,
    lineHeight: 34,
    textAlign: "left",
    fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    fontSize: FontSize.bodyNormalRegular_size,
    position: "absolute",
  },
  groupChild: {
    borderRadius: Border.br_mini,
    borderStyle: "solid",
    borderColor: "#e5e5e5",
    borderWidth: 1,
    height: 60,
    left: 0,
    width: 334,
    top: 0,
    backgroundColor: Color.neutralWhite,
  },
  groupItem: {
    top: 24,
    left: 310,
    width: 7,
    height: 11,
    position: "absolute",
  },
  tunisTunisie: {
    top: 18,
    left: 71,
    lineHeight: 25,
    color: Color.gray_200,
    textAlign: "left",
    fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    fontSize: FontSize.bodyNormalRegular_size,
    position: "absolute",
  },
  groupInner: {
    top: 8,
    left: 8,
  },
  rectangleParent: {
    top: 46,
    position: "absolute",
  },
  groupChild1: {
    borderRadius: 12,
    backgroundColor: Color.mediumslateblue_100,
    opacity: 0.15,
    left: 0,
    top: 0,
  },
  groupChild2: {
    top: 7,
    left: 7,
    borderRadius: 10,
    width: 31,
    height: 31,
  },
  rectangleGroup: {
    top: 165,
    position: "absolute",
  },
  location: {
    left: 0,
    top: 0,
  },
  sponsor: {
    top: 119,
    left: 1,
  },
  groupParent: {
    height: 225,
    width: 334,
    position: "absolute",
  },
  filterInner: {
    top: 447,
    left: 20,
  },
});

export default TunisContainer;
