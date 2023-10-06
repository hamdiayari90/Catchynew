import React, { useMemo } from "react";
import { Image, Text, StyleSheet, View, ImageSourcePropType } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const TypeTextfieldProperty1Defa = ({
  inputValue,
  iconImageUrl,
  typeTextfieldProperty1DefPosition,
  typeTextfieldProperty1DefMarginTop,
}) => {
  const typeTextfieldProperty1DefaStyle = useMemo(() => {
    return {
      ...getStyleValue("position", typeTextfieldProperty1DefPosition),
      ...getStyleValue("marginTop", typeTextfieldProperty1DefMarginTop),
    };
  }, [typeTextfieldProperty1DefPosition, typeTextfieldProperty1DefMarginTop]);

  return (
    <View
      style={[
        styles.typetextfieldproperty1defa,
        typeTextfieldProperty1DefaStyle,
      ]}
    >
      <View style={[styles.wrapper, styles.wrapperFlexBox]}>
        <View style={[styles.frameParent, styles.wrapperFlexBox]}>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{inputValue}</Text>
          </View>
          <Image
            style={styles.icons}
            contentFit="cover"
            source={iconImageUrl}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: FontSize.customButton1_size,
    lineHeight: 24,
    fontFamily: FontFamily.customBody1,
    color: Color.black,
    textAlign: "left",
  },
  textWrapper: {
    justifyContent: "center",
  },
  icons: {
    width: 24,
    height: 24,
  },
  frameParent: {
    width: 272,
    justifyContent: "space-between",
  },
  wrapper: {
    alignSelf: "stretch",
    flex: 1,
    borderRadius: Border.br_41xl,
    backgroundColor: Color.gray_100,
    borderStyle: "solid",
    borderColor: "#dfdfdf",
    borderWidth: 1,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_5xs,
  },
  typetextfieldproperty1defa: {
    width: 320,
    height: 56,
    minHeight: 48,
    justifyContent: "center",
  },
});

export default TypeTextfieldProperty1Defa;
