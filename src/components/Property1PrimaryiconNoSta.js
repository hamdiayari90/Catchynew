import React, { useMemo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Property1PrimaryiconNoSta = ({
  buttonFieldLabel,
  property1PrimaryiconNoStaPosition,
  property1PrimaryiconNoStaMarginTop,
}) => {
  const property1PrimaryiconNoStaStyle = useMemo(() => {
    return {
      ...getStyleValue("position", property1PrimaryiconNoStaPosition),
      ...getStyleValue("marginTop", property1PrimaryiconNoStaMarginTop),
    };
  }, [property1PrimaryiconNoStaPosition, property1PrimaryiconNoStaMarginTop]);

  return (
    <View
      style={[styles.property1primaryiconnosta, property1PrimaryiconNoStaStyle]}
    >
      <Text style={styles.text}>{buttonFieldLabel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: FontSize.customButton1_size,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: FontFamily.customButton1,
    color: Color.primary,
    textAlign: "left",
  },
  property1primaryiconnosta: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.black,
    width: 320,
    height: 56,
    flexDirection: "row",
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    alignItems: "center",
    justifyContent: "center",
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
});

export default Property1PrimaryiconNoSta;
