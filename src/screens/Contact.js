import * as React from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { FontFamily, FontSize, Padding, Color, Border } from "../assets/home11/GlobalStyles";
import { useNavigation } from '@react-navigation/native';

const Contact = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.contact}>
      <View>
        <View>
          <View>
            <View>
              <Text style={[styles.contactesNous, styles.textTypo1]}>
                Contactes-nous
              </Text>
              <View style={styles.frameContainer}>
                <View
                  style={[styles.buttonsParent, styles.buttonsParentFlexBox]}
                >
                  <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={[styles.buttons, styles.buttonsParentFlexBox]}>
                <Image
                    style={styles.icons}
                    resizeMode="cover"
                    source={require("../assets/home11/icons4.png")}
                />
            </View>
        </TouchableOpacity>
                  <Text style={[styles.text, styles.textTypo1]}>Retour</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.frameContainer}>
            <View style={styles.textField}>
              <View style={styles.wrapper}>
                <View style={styles.textWrapper}>
                  <Text style={[styles.text1, styles.textTypo]}>Prénom</Text>
                </View>
              </View>
            </View>
            <View style={styles.textField1}>
              <View style={styles.wrapper}>
                <View style={styles.textWrapper}>
                  <Text style={[styles.text1, styles.textTypo]}>Nom</Text>
                </View>
              </View>
            </View>
            <View style={styles.textField2}>
              <View style={[styles.wrapper2, styles.wrapperBorder]}>
                <View style={styles.buttonsParentFlexBox}>
                  <View
                    style={[styles.iconsParent, styles.buttonsParentFlexBox]}
                  >
                    <Image
                      style={[styles.icons1, styles.iconsLayout]}
                      resizeMode="cover"
                      source={require("../assets/home11/icons2.png")}
                    />
                    <View style={styles.textFrame}>
                      <Text style={[styles.text1, styles.textTypo]}>
                        99 999 999
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.frameContainer}>
          <View style={styles.textFieldGroup}>
            <View style={styles.textField3}>
              <View style={[styles.wrapper3, styles.wrapperBorder]}>
                <View style={styles.textWrapper}>
                  <Text style={[styles.text1, styles.textTypo]}>Message</Text>
                </View>
              </View>
            </View>
            <View style={[styles.buttons1, styles.buttonsFlexBox]}>
              <Image
                style={[styles.icons1, styles.iconsLayout]}
                resizeMode="cover"
                source={require("../assets/home11/icons5.png")}
              />
              <Text style={[styles.text5, styles.textTypo]}>Attachement</Text>
            </View>
          </View>
          <View style={[styles.buttons2, styles.buttonsFlexBox]}>
            <Text style={[styles.text6, styles.textTypo]}>Envoyer</Text>
            <Image
              style={[styles.icons3, styles.iconsLayout]}
              resizeMode="cover"
              source={require("../assets/home11/icons6.png")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo1: {
    textAlign: "left",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  buttonsParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  textTypo: {
    lineHeight: 24,
    fontSize: FontSize.customButton1_size,
    textAlign: "left",
  },
  wrapperBorder: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_5xl,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: Color.background,
  },
  iconsLayout: {
    height: 24,
    width: 24,
  },
  buttonsFlexBox: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  contactesNous: {
    fontSize: 20,
    lineHeight: 30,
    color: Color.black1,
    width: 177,
  },
  icons: {
    width: 19,
    height: 19,
  },
  buttons: {
    borderRadius: 32,
    backgroundColor: Color.primary,
    width: 32,
    height: 32,
    paddingHorizontal: 13,
    paddingVertical: 10,
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
    marginLeft: 8,
    color: Color.black,
    flex: 1,
    fontFamily: FontFamily.poppinsBold,
  },
  buttonsParent: {
    width: 92,
    justifyContent: "center",
  },
  frameContainer: {
    marginTop: 16,
  },
  text1: {
    fontFamily: FontFamily.customBody1,
    color: Color.black,
  },
  textWrapper: {
    justifyContent: "center",
  },
  wrapper: {
    minHeight: 48,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_5xl,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    borderRadius: Border.br_41xl,
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.background,
  },
  textField: {
    width: 320,
    justifyContent: "center",
  },
  textField1: {
    width: 320,
    marginTop: 16,
    justifyContent: "center",
  },
  icons1: {
    overflow: "hidden",
    height: 24,
    width: 24,
  },
  textFrame: {
    marginLeft: 8,
    justifyContent: "center",
  },
  iconsParent: {
    flexWrap: "wrap",
  },
  wrapper2: {
    borderRadius: Border.br_41xl,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_5xl,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
  },
  textField2: {
    maxHeight: 48,
    height: 48,
    minHeight: 48,
    width: 320,
    marginTop: 16,
    justifyContent: "center",
    backgroundColor: Color.background,
  },
  wrapper3: {
    borderRadius: Border.br_xl,
    height: 191,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_5xl,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    alignSelf: "stretch",
  },
  textField3: {
    width: 320,
  },
  text5: {
    fontFamily: FontFamily.customButton1,
    marginLeft: 8,
    color: Color.black,
    fontWeight: "700",
    lineHeight: 24,
    fontSize: FontSize.customButton1_size,
  },
  buttons1: {
    width: 167,
  },
  textFieldGroup: {
    alignItems: "flex-end",
  },
  text6: {
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.primary,
  },
  icons3: {
    marginLeft: 4,
  },
  buttons2: {
    backgroundColor: Color.black,
    width: 315,
    marginTop: 16,
  },
  contact: {
    width: "100%",
    height: 805,
    paddingTop: 32,
    paddingBottom: 157,
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: Color.background,
    overflow: "hidden",
    flex: 1,
  },
});

export default Contact;
