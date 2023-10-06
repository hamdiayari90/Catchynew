import React, { useMemo } from "react";
import { Image, View, StyleSheet } from 'react-native';


const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Property1Variant2Image = ({
  imageDimensions,
  property1Variant2IconPosition,
  property1Variant2IconWidth,
  property1Variant2IconHeight,
  property1Variant2IconMarginLeft,
  property1Variant2IconTop,
  property1Variant2IconLeft,
}) => {
  const property1Variant2IconStyle = useMemo(() => {
    return {
      ...getStyleValue("position", property1Variant2IconPosition),
      ...getStyleValue("width", property1Variant2IconWidth),
      ...getStyleValue("height", property1Variant2IconHeight),
      ...getStyleValue("marginLeft", property1Variant2IconMarginLeft),
      ...getStyleValue("top", property1Variant2IconTop),
      ...getStyleValue("left", property1Variant2IconLeft),
    };
  }, [
    property1Variant2IconPosition,
    property1Variant2IconWidth,
    property1Variant2IconHeight,
    property1Variant2IconMarginLeft,
    property1Variant2IconTop,
    property1Variant2IconLeft,
  ]);

  return (
    <Image
      style={[styles.property1variant2Icon, property1Variant2IconStyle]}
      contentFit="cover"
      source={imageDimensions}
    />
  );
};

const styles = StyleSheet.create({
  property1variant2Icon: {
    width: 352,
    height: 298,
  },
});

export default Property1Variant2Image;
