import * as React from "react";
import { Image, StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../../GlobalStyles";

const Popup6 = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={[styles.popup6, styles.popup6FlexBox]}>
          <Image
            style={styles.cancelSvgrepocomIcon}
            resizeMode="cover"
            source={require("../assets/cancel-svgrepocom.png")}
          />
          <View style={styles.malheureusementCetArticleNParent}>
            <Text style={[styles.malheureusementCetArticle, styles.textLayout]}>
              veuillez vérifier votre code
            </Text>
            <TouchableOpacity style={[styles.buttons, styles.popup6FlexBox]} onPress={onClose}>
              <Text style={[styles.text, styles.textLayout]}>ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

//... (rest of the code remains the same)


const styles = StyleSheet.create({
  popup6FlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  textLayout: {
    lineHeight: 24,
    fontSize: FontSize.customButton1_size,
  },
  cancelSvgrepocomIcon: {
    width: 47,
    height: 46,
    overflow: "hidden",
  },
  malheureusementCetArticle: {
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.black,
    textAlign: "center",
    width: 283,
  },
  text: {
    fontWeight: "700",
    fontFamily: FontFamily.customButton1,
    color: Color.primary,
    textAlign: "left",
  },
  buttons: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.black,
    width: 98,
    height: 40,
    flexDirection: "row",
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    marginTop: 14,
  },
  malheureusementCetArticleNParent: {
    height: 89,
    marginTop: 10,
    alignItems: "center",
  },
  popup6: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorWhite,
    width: 347,
    height: 206,
    paddingHorizontal: Padding.p_5xl,
    paddingBottom: Padding.p_5xl,
    overflow: "hidden",
  },
});

export default Popup6;
