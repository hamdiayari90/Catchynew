import React, { useMemo } from "react";
import { Image,StyleSheet, Text, View, ImageSourcePropType } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Property1SecondaryiconLe = ({
  buttonIcon,
  buttonFieldText,
  property1SecondaryiconLePosition,
  property1SecondaryiconLeMarginTop,
  iconsOverflow,
}) => {
  const property1SecondaryiconLeStyle = useMemo(() => {
    return {
      ...getStyleValue("position", property1SecondaryiconLePosition),
      ...getStyleValue("marginTop", property1SecondaryiconLeMarginTop),
    };
  }, [property1SecondaryiconLePosition, property1SecondaryiconLeMarginTop]);

  const iconsStyle = useMemo(() => {
    return {
      ...getStyleValue("overflow", iconsOverflow),
    };
  }, [iconsOverflow]);

  return (
    <View
      style={[styles.property1secondaryiconle, property1SecondaryiconLeStyle]}
    >
      <Image
        style={[styles.icons, iconsStyle]}
        contentFit="cover"
        source={buttonIcon}
      />
      <Text style={styles.text}>{buttonFieldText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: FontSize.customButton1_size,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: FontFamily.customButton1,
    color: Color.black,
    textAlign: "left",
    marginLeft: 8,
  },
  property1secondaryiconle: {
    borderRadius: Border.br_21xl,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 2,
    width: 322,
    height: 58,
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

export default Property1SecondaryiconLe;
