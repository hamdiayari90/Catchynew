import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import TypeTextfieldProperty1Defa from "./TypeTextfieldProperty1Defa";
import Property1PrimaryiconNoSta from "./Property1PrimaryiconNoSta";
import Property1SecondaryiconLe from "./Property1SecondaryiconLe";
import { FontSize, FontFamily, Color } from "../../GlobalStyles";

const FormContainer = () => {
  return (
    <View style={styles.inscrivezVousParent}>
      <Text style={styles.inscrivezVous}>Inscrivez-vous</Text>
      <View style={styles.frameWrapper}>
        <View style={styles.textFieldParent}>
          <TypeTextfieldProperty1Defa
            inputValue="Email"
            iconImageUrl={require("../assets/icons.png")}
            typeTextfieldProperty1DefPosition="unset"
            typeTextfieldProperty1DefMarginTop="unset"
          />
          <TypeTextfieldProperty1Defa
            inputValue="Password"
            iconImageUrl={require("../assets/icons1.png")}
            typeTextfieldProperty1DefPosition="unset"
            typeTextfieldProperty1DefMarginTop={24}
          />
          <Property1PrimaryiconNoSta
            buttonFieldLabel="Valider"
            property1PrimaryiconNoStaPosition="unset"
            property1PrimaryiconNoStaMarginTop={24}
          />
          <Property1SecondaryiconLe
            buttonIcon={require("../assets/icons2.png")}
            buttonFieldText="Continuer avec Google"
            property1SecondaryiconLePosition="unset"
            property1SecondaryiconLeMarginTop={24}
            iconsOverflow="hidden"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inscrivezVous: {
    fontSize: FontSize.customButton1_size,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.black,
    textAlign: "left",
  },
  textFieldParent: {
    alignItems: "center",
  },
  frameWrapper: {
    marginTop: 40,
    alignItems: "center",
  },
  inscrivezVousParent: {
    position: "absolute",
    top: 240,
    left: 20,
    alignItems: "center",
  },
});

export default FormContainer;
