import React from "react";
import { View, Text,Image } from "react-native";

export default function ImageLogo({ img,style }) {
  return (
      <Image source={img} style={style} />
  
  );
}
