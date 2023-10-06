import * as React from "react";
import { Text, StyleSheet, Image, View, Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, Border, Color, FontFamily, FontSize } from "../assets/home10/GlobalStyles";

const ProfileHome1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.profileHome}>
      <View style={styles.profileHomeInner}>
        <View>
          <View>
            <Text style={styles.partieFaq}>Partie FAQ</Text>
            <View style={styles.frameWrapper}>
              <View style={[styles.buttonsParent, styles.buttonsParentFlexBox]}>
                <View style={[styles.buttons, styles.icons1Layout]}>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileHome')}>
                <Image
                    style={styles.icons}
                    resizeMode="cover"
                    source={require("../assets/home10/icons3.png")}
                />
            </TouchableOpacity>
                </View>
                <Text style={styles.text}>Retour</Text>
              </View>
            </View>
          </View>
          <View style={styles.accordeonsParent}>
            <View style={[styles.accordeons, styles.accordeonsLayout]}>
              <View style={[styles.textParent, styles.buttonsParentFlexBox]}>
                <Text style={styles.textTypo}>
                  Quelles données collectez-vous
                </Text>
                <Image
                  style={[styles.icons1, styles.icons1Layout]}
                  resizeMode="cover"
                  source={require("../assets/home10/icons20.png")}
                />
              </View>
            </View>
            <View style={[styles.accordeons1, styles.accordeonsLayout]}>
              <View style={[styles.textParent, styles.buttonsParentFlexBox]}>
                <Text style={[styles.text2, styles.textTypo]}>
                  Partagez-vous les données avec des tiers?
                </Text>
                <Image
                  style={[styles.icons1, styles.icons1Layout]}
                  resizeMode="cover"
                  source={require("../assets/home10/icons20.png")}
                />
              </View>
            </View>
            <View style={[styles.accordeons1, styles.accordeonsLayout]}>
              <View style={[styles.textParent, styles.buttonsParentFlexBox]}>
                <Text style={styles.textTypo}>Utilisez-vous des cookies</Text>
                <Image
                  style={[styles.icons1, styles.icons1Layout]}
                  resizeMode="cover"
                  source={require("../assets/home10/icons20.png")}
                />
              </View>
            </View>
            <View style={[styles.accordeons1, styles.accordeonsLayout]}>
              <View style={[styles.textParent, styles.buttonsParentFlexBox]}>
                <Text style={[styles.text2, styles.textTypo]}>
                  Quels sont mes droits sur mes données
                </Text>
                <Image
                  style={[styles.icons1, styles.icons1Layout]}
                  resizeMode="cover"
                  source={require("../assets/home10/icons20.png")}
                />
              </View>
            </View>
            <View style={[styles.accordeons1, styles.accordeonsLayout]}>
              <View style={[styles.textParent, styles.buttonsParentFlexBox]}>
                <Text style={[styles.text2, styles.textTypo]}>
                  Pendant combien de temps conservez-vous les données des
                  utilisateurs
                </Text>
                <Image
                  style={[styles.icons1, styles.icons1Layout]}
                  resizeMode="cover"
                  source={require("../assets/home10/icons20.png")}
                />
              </View>
            </View>
            <View style={[styles.accordeons1, styles.accordeonsLayout]}>
              <View style={[styles.textParent, styles.buttonsParentFlexBox]}>
                <Text style={[styles.text2, styles.textTypo]}>
                  Comment les utilisateurs donnent-ils leur consentement pour le
                  traitement des données ?
                </Text>
                <Image
                  style={[styles.icons1, styles.icons1Layout]}
                  resizeMode="cover"
                  source={require("../assets/home10/icons20.png")}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.navMenuParent}>
        <View style={[styles.navMenu, styles.buttonsParentFlexBox]}>
          <Pressable
            style={[styles.icons7, styles.iconsLayout]}
            onPress={() => navigation.navigate("Events")}
          >
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require("../assets/home10/icons4.png")}
            />
          </Pressable>
          <Image
            style={[styles.icons7, styles.iconsLayout]}
            resizeMode="cover"
            source={require("../assets/home10/icons5.png")}
          />
          <Image
            style={styles.icons9}
            resizeMode="cover"
            source={require("../assets/home10/icons6.png")}
          />
          <Image
            style={[styles.icons7, styles.iconsLayout]}
            resizeMode="cover"
            source={require("../assets/home10/icons7.png")}
          />
          <Image
            style={[styles.icons11, styles.iconsLayout]}
            resizeMode="cover"
            source={require("../assets/home10/icons8.png")}
          />
        </View>
        <View style={styles.frame9340variant6}>
          <View style={styles.line} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  icons1Layout: {
    height: 32,
    width: 32,
  },
  accordeonsLayout: {
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_5xl,
    height: 68,
    width: 320,
    borderRadius: Border.br_xl,
    justifyContent: "space-between",
    backgroundColor: Color.pureWhite,
  },
  textTypo: {
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    color: Color.darkGrey2,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  iconsLayout: {
    width: 24,
    height: 24,
  },
  partieFaq: {
    fontSize: 20,
    lineHeight: 30,
    color: Color.black,
    width: 155,
    textAlign: "left",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  icons: {
    width: 19,
    height: 19,
  },
  buttons: {
    borderRadius: Border.br_13xl,
    backgroundColor: Color.primary,
    paddingHorizontal: 13,
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    marginLeft: 8,
    color: Color.darkGrey2,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    flex: 1,
  },
  buttonsParent: {
    width: 92,
    justifyContent: "center",
  },
  frameWrapper: {
    marginTop: 16,
  },
  icons1: {
    borderRadius: Border.br_41xl,
  },
  textParent: {
    width: 282,
    justifyContent: "space-between",
  },
  accordeons: {
    justifyContent: "space-between",
  },
  text2: {
    alignSelf: "stretch",
    width: 241,
  },
  accordeons1: {
    justifyContent: "space-between",
    marginTop: 16,
  },
  accordeonsParent: {
    marginTop: 24,
  },
  profileHomeInner: {
    zIndex: 0,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  icons7: {
    height: 24,
  },
  icons9: {
    width: 25,
    height: 24,
  },
  icons11: {
    height: 24,
    overflow: "hidden",
    width: 24,
  },
  navMenu: {
    backgroundColor: Color.lightGrey4,
    height: 64,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: 0,
    width: 360,
    justifyContent: "space-between",
  },
  line: {
    marginLeft: -68,
    bottom: 8,
    left: "50%",
    borderRadius: Border.br_81xl,
    backgroundColor: Color.lightGrey5,
    width: 135,
    height: 5,
    position: "absolute",
  },
  frame9340variant6: {
    height: 30,
    width: 360,
    backgroundColor: Color.pureWhite,
  },
  navMenuParent: {
    top: 706,
    left: 0,
    zIndex: 1,
    position: "absolute",
  },
  profileHome: {
    backgroundColor: Color.background,
    flexWrap: "wrap",
    paddingTop: 32,
    paddingBottom: 178,
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    overflow: "hidden",
    width: "100%",
  },
});

export default ProfileHome1;
