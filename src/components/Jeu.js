import * as React from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { Padding, Border, FontFamily, Color, FontSize } from "../assets/home6/GlobalStyles";

const Jeu = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.instanceParent}>
        <View style={[styles.subtractParent, styles.subtractSpaceBlock]}>
          <Image
            style={styles.subtractIcon}
            resizeMode="cover"
            source={require("../assets/home6/subtract2.png")}
          />
          <Text style={[styles.text1, styles.textTypo]}>Catshoot</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Game')}>

          <Image
            style={styles.instanceChild}
            resizeMode="cover"
            source={require("../assets/home6/group-63565451.png")}
          />
                  </TouchableOpacity>

        </View>
        <View style={[styles.subtractGroup, styles.subtractSpaceBlock]}>
          <Image
            style={styles.subtractIcon}
            resizeMode="cover"
            source={require("../assets/home6/subtract3.png")}
          />
          <Text style={[styles.text2, styles.textTypo]}>Catchy Market</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Game2')}>

          <Image
            style={styles.instanceItem}
            resizeMode="cover"
            source={require("../assets/home6/group-63565501.png")}
          />
                            </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subtractSpaceBlock: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: Padding.p_11xl,
    paddingTop: Padding.p_lgi,
    paddingHorizontal: Padding.p_3xs,
    overflow: "hidden",
    height: 144,
    borderRadius: Border.br_xl,
    width: 139,
  },
  textTypo: {
    zIndex: 1,
    fontFamily: FontFamily.poppinsSemiBold,
    top: 0,
    position: "absolute",
    textAlign: "left",
    color: Color.black1,
    fontWeight: "900",
    lineHeight: 24,
    fontSize: FontSize.size_sm,
  },
  text: {
    fontFamily: FontFamily.interSemiBold,
    textAlign: "left",
    color: Color.black1,
    fontWeight: "600",
    lineHeight: 24,
    fontSize: FontSize.size_sm,
  },
  subtractIcon: {
    height: 58,
    zIndex: 0,
    width: 139,
  },
  text1: {
    left: 36,
  },
  instanceChild: {
    width: 119,
    height: 66,
    zIndex: 2,
  },
  subtractParent: {
    backgroundColor: Color.goldVariant,
  },
  text2: {
    left: 17,
  },
  instanceItem: {
    width: 121,
    height: 67,
    zIndex: 2,
  },
  subtractGroup: {
    backgroundColor: Color.primaryVarient2,
    marginLeft: 12,
  },
  instanceParent: {
   left: 40,
    flexDirection: "row",
    marginTop: 5,
  },
});

export default Jeu;
