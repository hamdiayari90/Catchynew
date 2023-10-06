import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const SurveySection = () => {
  return (
    <View style={[styles.filterInner, styles.parentLayout]}>
      <View style={[styles.groupParent, styles.parentLayout]}>
        <View style={[styles.jeuxParent, styles.jeuxParentLayout]}>
          <Text style={[styles.jeux, styles.jeuxTypo]}>jeux</Text>
          <Image
            style={[styles.groupChild, styles.groupLayout]}
            resizeMode="cover"
            source={require("../assets/group-18314.png")}
          />
        </View>
        <View style={styles.watchAndWinWrapper}>
          <Text style={[styles.watchAndWin, styles.jeuxTypo]}>
            watch and win
          </Text>
        </View>
        <View style={[styles.promoWrapper, styles.jeuxParentLayout]}>
          <Text style={[styles.promo, styles.jeuxTypo]}>promo</Text>
        </View>
        <Image
          style={[styles.groupItem, styles.groupLayout]}
          resizeMode="cover"
          source={require("../assets/group-18321.png")}
        />
        <View style={[styles.sondageParent, styles.parentLayout]}>
          <Text style={[styles.sondage, styles.jeuxTypo]}>sondage</Text>
          <Image
            style={[styles.groupInner, styles.groupLayout]}
            resizeMode="cover"
            source={require("../assets/group-18317.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentLayout: {
    height: 97,
    position: "absolute",
  },
  jeuxParentLayout: {
    width: 63,
    top: 0,
    height: 97,
    position: "absolute",
  },
  jeuxTypo: {
    textAlign: "center",
    color: Color.colorTypographyTitle,
    fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    lineHeight: 23,
    fontSize: FontSize.size_sm,
    position: "absolute",
  },
  groupLayout: {
    height: 63,
    width: 63,
    top: 0,
    position: "absolute",
  },
  jeux: {
    left: 19,
    top: 74,
  },
  groupChild: {
    left: 0,
  },
  jeuxParent: {
    left: 79,
  },
  watchAndWin: {
    left: 0,
    top: 0,
  },
  watchAndWinWrapper: {
    left: 143,
    width: 91,
    height: 23,
    top: 74,
    position: "absolute",
  },
  promo: {
    left: 11,
    top: 74,
  },
  promoWrapper: {
    left: 0,
  },
  groupItem: {
    left: 237,
  },
  sondage: {
    top: 74,
    left: 0,
  },
  groupInner: {
    left: 67,
  },
  sondageParent: {
    left: 249,
    width: 130,
    top: 0,
  },
  groupParent: {
    left: 0,
    top: 0,
    width: 379,
    height: 97,
  },
  filterInner: {
    top: 153,
    left: 20,
    width: 379,
    height: 97,
  },
});

export default SurveySection;
