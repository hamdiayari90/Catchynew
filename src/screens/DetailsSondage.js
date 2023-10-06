import { Padding, Border, Color, FontSize, FontFamily } from "../assets/sondage2/GlobalStyles";
import React, {useState, useEffect} from 'react';
import * as api from '../services/api';
import moment from 'moment/min/moment-with-locales';

import {
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
  Button,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import LottieView from 'lottie-react-native';
import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import {Card} from 'react-native-paper';
import {GlobalButton} from '../components/Button/GlobalButton';

export default function DetailsSondage(props) {
  // handle press buttom
  const backAction = () => {
    props.navigation.navigate('Sondager');
    return true;
};

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const {survey, userId} = props.route.params;
  const { product: { photo: { name: imageName } } } = survey;

  return (
    <View style={styles.detailSondage}>
      <View style={styles.frameParent}>
        <View>
          <View>
          <View style={{ height: 20 }} />

            <View style={styles.textParent}>
              <Text style={styles.text}>A propos du Sondage</Text>
              <Text style={styles.text1}>
              {survey.description}

              </Text>
            </View>
          </View>
          <View style={styles.frameContainer}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>Partenaire</Text>
            </View>
            <Image
    style={styles.lgrg1Icon}
    resizeMode="cover"
    source={{ uri: `https://www.catchy.tn/media/partner-products/${imageName}` }}

/>

          
          
          </View>
        </View>
        <View style={[styles.frameView, styles.frameShadowBox]}>
          <View style={[styles.textGroup, styles.textFlexBox]}>
            <Text style={styles.text}>{`Nombre de points `}</Text>
            <View style={styles.frameWrapper1}>
              <View style={styles.pointsWrapper}>
                <Text style={[styles.points, styles.text6Typo]}>        
                    {survey.points} Points
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('RespondSurvey', {
  surveyId: survey.id,
  userId: userId,
})}>
  <View style={[styles.buttons, styles.buttonsSpaceBlock]}>
    <Text style={[styles.text5, styles.textTypo]}>Participer</Text>
  </View>
</TouchableOpacity>
      </View>
      <Image
        style={[styles.detailSondageChild, styles.frameParent2Position]}
        resizeMode="cover"
        source={{ uri: `https://www.catchy.tn/media/partner-products/${imageName}` }}
        />
      <View style={[styles.frameParent1, styles.linePosition]}>
        <View style={[styles.textContainer, styles.iconsParentLayout]}>
          <Text style={[styles.text6, styles.textTypo]}>
          {survey.title}          </Text>
        </View>
        <View style={[styles.iconsParent, styles.iconsFlexBox]}>
          <Image
            style={styles.icons}
            resizeMode="cover"
            source={require("../assets/sondage2/icons56.png")}
          />
          <Text style={[styles.text7, styles.text7Typo]}>Disparut au {moment(survey.endDate)
                  .locale('fr')
                  .format('MMMM Do YYYY, h:mm ')}</Text>
        </View>
      </View>
      <View style={[styles.buttons1, styles.iconsFlexBox]}>
      <TouchableOpacity onPress={backAction}>
    <Image
        style={styles.icons1}
        resizeMode="cover"
        source={require("../assets/sondage2/icons57.png")}
    />
</TouchableOpacity>
      </View>
      <View style={[styles.frameParent2, styles.frameParent2Position]}>
        <View style={styles.textParent1}>
          <Text style={styles.text8}>{`Partage sur `}</Text>
          <View style={styles.frameParent3}>
            <View style={styles.parentFlexBox}>
              <View style={styles.facebookMessengerLogo20201}>
                <Image
                  style={styles.facebookMessengerLogo20201Child}
                  resizeMode="cover"
                  source={require("../assets/sondage2/group-6356498.png")}
                />
              </View>
              <Text style={[styles.messanger, styles.text3Typo]}>
                Messanger
              </Text>
            </View>
            <View
              style={[
                styles.vecteezyWhatsappLogoTranspaParent,
                styles.parentFlexBox,
              ]}
            >
              <Image
                style={styles.iconLayout1}
                resizeMode="cover"
                source={require("../assets/sondage2/vecteezy-whatsapplogotransparentpng-22101124-293-1.png")}
              />
              <Text style={[styles.messanger, styles.text3Typo]}>WhatsApp</Text>
            </View>
            <View
              style={[
                styles.vecteezyWhatsappLogoTranspaParent,
                styles.parentFlexBox,
              ]}
            >
              <Image
                style={styles.iconLayout1}
                resizeMode="cover"
                source={require("../assets/sondage2/vecteezy-whatsapplogotransparentpng-22101124-293-1.png")}
              />
              <Text style={[styles.messanger, styles.text3Typo]}>Facebook</Text>
            </View>
            <View
              style={[
                styles.vecteezyWhatsappLogoTranspaParent,
                styles.parentFlexBox,
              ]}
            >
              <Image
                style={[
                  styles.vecteezyTiktokLogoOnTranspIcon,
                  styles.iconLayout1,
                ]}
                resizeMode="cover"
                source={require("../assets/sondage2/vecteezy-whatsapplogotransparentpng-22101124-293-1.png")}
              />
              <Text style={[styles.messanger, styles.text3Typo]}>Tiktok</Text>
            </View>
          </View>
          <View style={styles.frameParent3}>
            <View style={styles.parentFlexBox}>
              <Image
                style={[styles.instagramLogo20161Icon, styles.iconLayout1]}
                resizeMode="cover"
                source={require("../assets/sondage2/vecteezy-whatsapplogotransparentpng-22101124-293-1.png")}
              />
              <Text style={[styles.messanger, styles.text3Typo]}>Story</Text>
            </View>
            <View
              style={[
                styles.vecteezyWhatsappLogoTranspaParent,
                styles.parentFlexBox,
              ]}
            >
              <Image
                style={styles.iconLayout1}
                resizeMode="cover"
                source={require("../assets/sondage2/vecteezy-whatsapplogotransparentpng-22101124-293-1.png")}
              />
              <Text style={[styles.messanger, styles.text3Typo]}>Discord</Text>
            </View>
            <View
              style={[
                styles.vecteezyWhatsappLogoTranspaParent,
                styles.parentFlexBox,
              ]}
            >
              <Image
                style={[styles.instagramLogo20161Icon, styles.iconLayout1]}
                resizeMode="cover"
                source={require("../assets/sondage2/vecteezy-whatsapplogotransparentpng-22101124-293-1.png")}
              />
              <Text style={[styles.messanger, styles.text3Typo]}>Direct</Text>
            </View>
          </View>
        </View>
        <View style={[styles.navMenu, styles.textFlexBox]}>
          <Pressable
            style={styles.icons1}
            onPress={() => navigation.navigate("NewHome")}
          >
            <Image
              style={styles.iconLayout}
              resizeMode="cover"
              source={require("../assets/sondage2/icons1.png")}
            />
          </Pressable>
          <View style={[styles.iconsGroup, styles.iconsFlexBox]}>
            <Image
              style={styles.icons3Layout}
              resizeMode="cover"
              source={require("../assets/sondage2/icons40.png")}
            />
            <Text style={[styles.vnements, styles.text7Typo]}>Événements</Text>
          </View>
          <Pressable
            style={styles.icons1}
            onPress={() => navigation.navigate("WinPage")}
          >
            <Image
              style={styles.iconLayout}
              resizeMode="cover"
              source={require("../assets/sondage2/icons58.png")}
            />
          </Pressable>
          <Pressable
            style={styles.icons1}
            onPress={() => navigation.navigate("Cadeaux")}
          >
            <Image
              style={styles.iconLayout}
              resizeMode="cover"
              source={require("../assets/sondage2/icons4.png")}
            />
          </Pressable>
          <Pressable
            style={styles.icons1}
            onPress={() => navigation.navigate("ECatalogueHOME")}
          >
            <Image
              style={[styles.icon3, styles.iconLayout]}
              resizeMode="cover"
              source={require("../assets/sondage2/icons59.png")}
            />
          </Pressable>
        </View>
        <View style={styles.frame9340variant6}>
          <View style={[styles.line, styles.linePosition]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icons3Layout: {
    height: 16,
    width: 16,
  },
  text3Layout: {
    lineHeight: 12,
    textAlign: "left",
  },
  frameShadowBox: {
    paddingHorizontal: Padding.p_mini,
    shadowOpacity: 1,
    elevation: 0,
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "#fed544",
    width: 320,
    borderRadius: Border.br_xl,
  },
  textFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  text6Typo: {
    fontWeight: "900",
    color: Color.black,
  },
  buttonsSpaceBlock: {
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_21xl,
    paddingHorizontal: Padding.p_base,
  },
  textTypo: {
    fontSize: FontSize.customButton1_size,
    textAlign: "left",
    fontWeight: "900",
  },
  frameParent2Position: {
    left: 0,
    position: "absolute",
  },
  linePosition: {
    left: "50%",
    position: "absolute",
  },
  iconsParentLayout: {
    width: 291,
    height: 30,
  },
  iconsFlexBox: {
    backgroundColor: Color.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text7Typo: {
    lineHeight: 16,
    fontWeight: "600",
    textAlign: "left",
    color: Color.black,
  },
  text3Typo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  parentFlexBox: {
    width: 74,
    justifyContent: "center",
    alignItems: "center",
  },
  iconLayout1: {
    height: 46,
    width: 46,
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  text: {
    fontSize: FontSize.size_sm,
    lineHeight: 18,
    textTransform: "capitalize",
    fontFamily: FontFamily.poppinsBold,
    textAlign: "left",
    color: Color.black,
    fontWeight: "700",
  },
  text1: {
    width: 307,
    height: 49,
    marginTop: 8,
    color: Color.lightGrey2,
    fontFamily: FontFamily.interMedium,
    fontWeight: "900",
    lineHeight: 17,
    fontSize: 17,
    textAlign: "left",
  },
  textParent: {
    height: 59,
  },
  textWrapper: {
    zIndex: 0,
    alignItems: "center",
    flexDirection: "row",
  },
  lgrg1Icon: {
    height: 103,
    zIndex: 1,
    width: 320,
    borderRadius: Border.br_xl,
    marginTop: 8,
  },
  unionIcon: {
    width: 31,
    zIndex: 2,
    height: 30,
  },
  text3: {
    fontSize: 9,
    color: Color.background,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  notificationBadges: {
    top: 50,
    left: 151,
    borderRadius: 7,
    backgroundColor: Color.error,
    borderColor: Color.black1,
    borderWidth: 1.4,
    zIndex: 3,
    justifyContent: "center",
    borderStyle: "solid",
    alignItems: "center",
    position: "absolute",
  },
  frameContainer: {
    marginTop: 16,
  },
  points: {
    fontFamily: FontFamily.interSemiBold,
    fontSize: FontSize.size_3xs,
    lineHeight: 12,
    textAlign: "left",
  },
  pointsWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  frameWrapper1: {
    borderRadius: Border.br_mini,
    backgroundColor: Color.primaryVarient2,
    width: 80,
    height: 32,
    paddingHorizontal: 11,
    paddingVertical: Padding.p_2xs_5,
    justifyContent: "center",
  },
  textGroup: {
    width: 283,
  },
  frameView: {
    paddingVertical: Padding.p_5xs,
    backgroundColor: Color.pureWhite,
    marginTop: 16,
  },
  text5: {
    lineHeight: 24,
    fontFamily: FontFamily.customButton1,
    color: Color.primary,
    fontWeight: "700",
    fontSize: FontSize.customButton1_size,
  },
  buttons: {
    backgroundColor: Color.black,
    height: 48,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_21xl,
    justifyContent: "center",
    width: 320,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 16,
  },
  frameParent: {
    top: 195,
    height: 495,
    left: 20,
    position: "absolute",
    backgroundColor: Color.background,
  },
  detailSondageChild: {
    top: 0,
    height: 195,
    width: 360,
  },
  text6: {
    alignSelf: "stretch",
    lineHeight: 30,
    width: 159,
    textShadowColor: "rgba(255, 255, 255, 0.47)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    color: Color.black,
  },
  textContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  icons: {
    width: 20,
    height: 20,
  },
  text7: {
    marginLeft: 8,
    fontFamily: FontFamily.interSemiBold,
    fontSize: FontSize.size_xs,
    lineHeight: 16,
  },
  iconsParent: {
    marginTop: 10,
    borderRadius: Border.br_41xl,
    backgroundColor: Color.primary,
    width: 291,
    height: 30,
  },
  frameParent1: {
    marginLeft: -160,
    top: 79,
    paddingVertical: Padding.p_sm,
    paddingHorizontal: Padding.p_mini,
    shadowOpacity: 1,
    elevation: 0,
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "#fed544",
    width: 320,
    borderRadius: Border.br_xl,
    backgroundColor: Color.background,
  },
  icons1: {
    width: 24,
    height: 24,
  },
  buttons1: {
    top: 24,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 20,
    elevation: 20,
    width: 40,
    height: 40,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_21xl,
    paddingHorizontal: Padding.p_base,
    backgroundColor: Color.primary,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    left: 20,
    position: "absolute",
  },
  text8: {
    color: Color.lightGrey2,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    lineHeight: 17,
    fontSize: FontSize.size_xs,
    textAlign: "left",
  },
  facebookMessengerLogo20201Child: {
    top: 9,
    left: 9,
    width: 28,
    height: 28,
    zIndex: 0,
    position: "absolute",
  },
  facebookMessengerLogo20201: {
    borderRadius: 116,
    width: 47,
    height: 47,
    alignItems: "flex-end",
    backgroundColor: Color.pureWhite,
    justifyContent: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  messanger: {
    lineHeight: 17,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xs,
    textAlign: "left",
    color: Color.black,
  },
  vecteezyWhatsappLogoTranspaParent: {
    marginLeft: 10,
  },
  vecteezyTiktokLogoOnTranspIcon: {
    borderRadius: 673,
  },
  frameParent3: {
    width: 326,
    marginTop: 20,
    flexDirection: "row",
  },
  instagramLogo20161Icon: {
    overflow: "hidden",
  },
  textParent1: {
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    borderColor: Color.goldVariant,
    borderTopWidth: 4,
    height: 238,
    padding: Padding.p_base,
    opacity: 0,
    width: 360,
    borderStyle: "solid",
    overflow: "hidden",
    backgroundColor: Color.background,
  },
  vnements: {
    marginLeft: 2,
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: FontSize.size_3xs,
  },
  iconsGroup: {
    paddingVertical: Padding.p_9xs,
    borderRadius: Border.br_41xl,
    backgroundColor: Color.primary,
    paddingHorizontal: Padding.p_base,
    height: 48,
  },
  icon3: {
    overflow: "hidden",
  },
  navMenu: {
    backgroundColor: Color.lightGrey,
    height: 64,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: 0,
    width: 360,
  },
  line: {
    marginLeft: -68,
    bottom: 8,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.lightGrey5,
    width: 135,
    height: 5,
  },
  frame9340variant6: {
    width: 360,
    backgroundColor: Color.pureWhite,
    height: 30,
  },
  frameParent2: {
    top: 706,
  },
  detailSondage: {
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.background,
  },
});

