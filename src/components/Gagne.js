import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Color, FontFamily, FontSize, Padding, Border } from "../assets/adam/GlobalStyles";

import { useNavigation } from '@react-navigation/native';
const Gagne = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.watchParent}>
            <View style={styles.watchLayout}>
                <Image
                    style={[styles.watchChild, styles.childPosition]}
                    resizeMode="cover"
                    source={require("../assets/adam/ellipse-82.png")}
                />
                <Text style={[styles.text, styles.textPosition]}>{`Tfarrej Werba7`}</Text>

                <TouchableOpacity 
                    style={[styles.watchItem, styles.itemPosition]}
                    onPress={() => navigation.navigate('Promotion')}
                >
                    <Image
                        style={{ flex: 1 }}
                        resizeMode="cover"
                        source={require("../assets/adam/group-63566561.png")}
                    />
                </TouchableOpacity>

                <Image
                    style={[styles.watchInner, styles.innerPosition]}
                    resizeMode="cover"
                    source={require("../assets/adam/group-63566781.png")}
                />
            </View>

            <View style={[styles.statistics, styles.watchLayout]}>
                <Image
                    style={[styles.statisticsChild, styles.childPosition]}
                    resizeMode="cover"
                    source={require("../assets/adam/ellipse-82.png")}
                />
                <Text style={[styles.text1, styles.textPosition]}>Jeweb Werba7</Text>

                <TouchableOpacity 
                    style={[styles.statisticsItem, styles.itemPosition]}
                    onPress={() => navigation.navigate('Survey')}
                >
                    <Image
                        style={{ flex: 1 }}
                        resizeMode="cover"
                        source={require("../assets/adam/group-63566771.png")}
                    />
                </TouchableOpacity>

                <Image
                    style={[styles.statisticsInner, styles.innerPosition]}
                    resizeMode="cover"
                    source={require("../assets/adam/group-63566521.png")}
                />
                <Image
                    style={styles.group6356617defaultIcon}
                    resizeMode="cover"
                    source={require("../assets/adam/group-6356617default2.png")}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
  childPosition: {
    zIndex: 0,
    height: 142,
    width: 242,
    left: -40,
    position: "absolute",
  },
  textPosition: {
    zIndex: 1,
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "900",
    lineHeight: 24,
    fontSize: FontSize.size_sm,
    left: "50%",
    top: 134,
    position: "absolute",
  },
  itemPosition: {
    zIndex: 2,
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  innerPosition: {
    zIndex: 3,
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  watchLayout: {
    paddingVertical: Padding.p_6xs,
    paddingHorizontal: Padding.p_3xs,
    alignItems: "center",
    overflow: "hidden",
    height: 168,
    width: 151,
    backgroundColor: Color.background,
    borderRadius: Border.br_xl,
  },
  watchChild: {
    top: 117,
  },
  text: {
    marginLeft: -46.5,
  },
  watchItem: {
    height: "67.97%",
    width: "90.82%",
    top: "13.69%",
    right: "-2.65%",
    bottom: "18.34%",
    left: "11.83%",
  },
  watchInner: {
    height: "31.27%",
    width: "65.48%",
    top: "0%",
    right: "17.26%",
    bottom: "68.73%",
    left: "17.26%",
  },
  statisticsChild: {
    top: 118,
  },
  text1: {
    marginLeft: -36.5,
  },
  statisticsItem: {
    height: "68.6%",
    width: "77.72%",
    top: "15.48%",
    right: "15.78%",
    bottom: "15.93%",
    left: "6.5%",
  },
  statisticsInner: {
    height: "19.56%",
    width: "16.95%",
    top: "6.25%",
    right: "14.83%",
    bottom: "74.19%",
    left: "68.21%",
  },
  group6356617defaultIcon: {
    top: 49,
    left: 102,
    width: 18,
    height: 18,
    zIndex: 4,
    position: "absolute",
  },
  statistics: {
    marginLeft: 17,
  },
  watchParent: {
    flexDirection: "row",
    left: 20,
  },
});

export default Gagne;
