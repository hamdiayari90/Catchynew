import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontSize, FontFamily, Border, Padding } from "../assets/event/GlobalStyles";
export const PromotionBannerCarousel = ({ item, navigation, user, promoId }) => {
  const { id, title, points, status, endDate, thumbnail } = item;
const EventC = () => {
  return (
    <View style={styles.instanceParent}>
      <View style={styles.frameWrapper}>
        <View style={styles.maskGroupParent}>
          <Image
            style={styles.maskGroupIcon}
            resizeMode="cover"
            source={require("../assets/event/mask-group.png")}
          />
          <View style={styles.frameParent}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>{item.title}</Text>
            </View>
            <View style={styles.frameContainer}>
              <View style={styles.textWrapper}>
                <View style={styles.textWrapper}>
                  <View style={styles.iconsParent}>
                    <Image
                      style={styles.iconsLayout}
                      resizeMode="cover"
                      source={require("../assets/event/icons.png")}
                    />
                    <Text style={[styles.text1, styles.textTypo]}>
                    {item.endDate}
                    </Text>
                  </View>
                  <View style={styles.iconsGroup}>
                    <Image
                      style={[styles.icons1, styles.iconsLayout]}
                      resizeMode="cover"
                      source={require("../assets/event/icons1.png")}
                    />
                    <View style={styles.textParent}>
                      <Text style={styles.textTypo}>{item.points}</Text>
                      <View style={styles.wrapper}>
                        <Text style={styles.text3}>+9</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.iconsContainer}>
                  <Image
                    style={styles.icons2}
                    resizeMode="cover"
                    source={require("../assets/event/icons2.png")}
                  />
                  <Image
                    style={[styles.frameChild, styles.frameLayout]}
                    resizeMode="cover"
                    source={require("../assets/event/icons3.png")}
                  />
                  <Image
                    style={[styles.frameItem, styles.frameLayout]}
                    resizeMode="cover"
                    source={require("../assets/event/frame-9310.png")}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    color: Color.lightGrey2,
    lineHeight: 16,
    fontSize: FontSize.size_2xs,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  iconsLayout: {
    height: 12,
    width: 12,
  },
  frameLayout: {
    marginLeft: 8,
    height: 30,
    borderRadius: Border.br_21xl,
  },
  maskGroupIcon: {
    width: 115,
    height: 126,
  },
  text: {
    fontSize: FontSize.size_sm,
    lineHeight: 18,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.black1,
    textAlign: "left",
    width: 139,
  },
  textWrapper: {
    alignSelf: "stretch",
  },
  text1: {
    marginLeft: 4,
  },
  iconsParent: {
    alignItems: "center",
    width: 139,
    flexDirection: "row",
  },
  icons1: {
    overflow: "hidden",
  },
  text3: {
    position: "absolute",
    top: 0,
    left: 5,
    fontSize: FontSize.size_4xs_4,
    lineHeight: 11,
    color: Color.white,
    width: 11,
    height: 10,
    zIndex: 0,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  wrapper: {
    borderRadius: Border.br_6xs,
    backgroundColor: Color.error,
    width: 21,
    height: 13,
    marginLeft: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textParent: {
    marginLeft: 4,
    alignItems: "center",
    flexDirection: "row",
  },
  iconsGroup: {
    marginTop: 2,
    alignItems: "center",
    flexDirection: "row",
  },
  icons2: {
    height: 30,
    borderRadius: Border.br_21xl,
    width: 30,
    overflow: "hidden",
  },
  frameChild: {
    width: 31,
    overflow: "hidden",
  },
  frameItem: {
    width: 30,
    marginLeft: 8,
  },
  iconsContainer: {
    marginTop: 8,
    flexDirection: "row",
  },
  frameContainer: {
    marginTop: 8,
    alignSelf: "stretch",
  },
  frameParent: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_5xs,
    marginLeft: 16,
    width: 139,
  },
  maskGroupParent: {
    justifyContent: "center",
    flexDirection: "row",
  },
  frameWrapper: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.pureWhite,
    shadowColor: "rgba(38, 38, 38, 0.04)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 40,
    elevation: 40,
    shadowOpacity: 1,
    height: 146,
    padding: Padding.p_3xs,
    minHeight: 146,
    maxHeight: 146,
  },
  instanceParent: {
    flexDirection: "row",
    overflow: "hidden",
  },
});

export default EventC;
