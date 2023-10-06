import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const TimeDateContainer = () => {
  return (
    <View style={[styles.heureDateParent, styles.parentLayout]}>
      <Text style={styles.heureDate}>{`Heure & Date`}</Text>
      <View style={[styles.groupParent, styles.parentLayout]}>
        <View style={styles.groupContainer}>
          <View style={styles.groupChildPosition}>
            <View style={[styles.groupChild, styles.groupBorder]} />
            <Text style={styles.aujourdhui}>Aujourd'hui</Text>
          </View>
          <View style={[styles.rectangleGroup, styles.groupLayout]}>
            <View style={[styles.groupItem, styles.groupLayout]} />
            <Text style={[styles.demain, styles.demainTypo]}>Demain</Text>
          </View>
          <View style={[styles.rectangleContainer, styles.groupInnerLayout]}>
            <View style={[styles.groupInner, styles.groupInnerLayout]} />
            <Text style={[styles.cetteSemaine, styles.demainTypo]}>
              Cette semaine
            </Text>
          </View>
        </View>
        <View style={[styles.groupView, styles.viewLayout]}>
          <View style={[styles.rectangleView, styles.viewLayout]} />
          <Text style={[styles.utilisezLeCalendrier, styles.demainTypo]}>
            Utilisez le calendrier
          </Text>
          <Image
            style={styles.calendarIcon}
            resizeMode="cover"
            source={require("../assets/calendar.png")}
          />
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require("../assets/vector-6.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentLayout: {
    width: 322,
    position: "absolute",
  },
  groupBorder: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderStyle: "solid",
    backgroundColor: Color.neutralWhite,
    borderRadius: Border.br_3xs,
  },
  groupLayout: {
    width: 110,
    height: 42,
    top: 0,
    position: "absolute",
  },
  demainTypo: {
    fontSize: FontSize.size_mini,
    textAlign: "center",
    lineHeight: 25,
    top: 9,
    fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    position: "absolute",
  },
  groupInnerLayout: {
    width: 107,
    height: 42,
    top: 0,
    position: "absolute",
  },
  viewLayout: {
    width: 241,
    height: 42,
    left: 0,
    position: "absolute",
  },
  heureDate: {
    fontSize: FontSize.bodyNormalRegular_size,
    lineHeight: 34,
    color: Color.colorTypographyTitle,
    textAlign: "left",
    fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupChild: {
    width: 81,
    height: 42,
    left: 0,
    top: 0,
    position: "absolute",
  },
  aujourdhui: {
    left: 7,
    fontSize: FontSize.size_smi,
    textAlign: "center",
    lineHeight: 25,
    top: 9,
    color: Color.gray_100,
    fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    position: "absolute",
  },
  groupChildPosition: {
    width: 81,
    height: 42,
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupItem: {
    backgroundColor: Color.black,
    borderRadius: Border.br_3xs,
    width: 110,
    left: 0,
  },
  demain: {
    left: 29,
    color: Color.neutralWhite,
  },
  rectangleGroup: {
    left: 93,
  },
  groupInner: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderStyle: "solid",
    backgroundColor: Color.neutralWhite,
    borderRadius: Border.br_3xs,
    left: 0,
  },
  cetteSemaine: {
    left: 6,
    color: Color.gray_100,
    fontSize: FontSize.size_mini,
  },
  rectangleContainer: {
    left: 215,
  },
  groupContainer: {
    height: 42,
    left: 0,
    top: 0,
    width: 322,
    position: "absolute",
  },
  rectangleView: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderStyle: "solid",
    backgroundColor: Color.neutralWhite,
    borderRadius: Border.br_3xs,
    top: 0,
    width: 241,
  },
  utilisezLeCalendrier: {
    left: 59,
    color: Color.gray_100,
    fontSize: FontSize.size_mini,
  },
  calendarIcon: {
    height: "55.56%",
    width: "8.71%",
    top: "21.43%",
    right: "85.48%",
    bottom: "23.01%",
    left: "5.81%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    position: "absolute",
  },
  vectorIcon: {
    top: 16,
    width: 7,
    height: 11,
    left: 215,
    position: "absolute",
  },
  groupView: {
    top: 56,
  },
  groupParent: {
    top: 46,
    height: 98,
    left: 0,
  },
  heureDateParent: {
    top: 277,
    left: 20,
    height: 144,
  },
});

export default TimeDateContainer;
