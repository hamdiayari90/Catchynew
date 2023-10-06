import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, View, Text, Pressable,  Alert, SafeAreaView, TouchableOpacity} from "react-native";
import * as api from '../services/api';
import ErrorMessage from '../components/ErrorMessage';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import TextInput from './TextInput';
import {useRecoilState} from 'recoil';
import {globlalUSerInfo} from '../atom/auth';
import {sizes} from '../constants/theme';
import {MenuHeaders} from './menuComponent/MenuHeaders';
import {GlobalButton} from './Button/GlobalButton';
import { Color, Border, FontFamily, Padding, FontSize } from "../assets/feli/GlobalStyles";
import LottieView from 'lottie-react-native';
import { DarkModeProvider, DarkModeContext } from '../../DarkModeContext';

export default function BuyModal({route, navigation}) {
  const data = route.params.data.data;
  const [fetch, setFetch] = useState(false);
  const [mobilePhoneValue, setmobilePhoneValue] = useState();
  const [phoneValue, setPhoneValue] = useState(null);
  const navigationN = useNavigation();
  const [userid, setUserId] = useState([]);
  const { isDarkMode } = React.useContext(DarkModeContext);

  const [user, setUSer] = useRecoilState(globlalUSerInfo);
  const onPhone = v => {
    setmobilePhoneValue(v);
  };
  const {handleBlur, errors, touched} = useFormik({
    //validationSchema: LoginSchema,
  });

  useEffect(() => {
    AsyncStorage.getItem('profile')
      .then(result => {
        if (result !== null) {
          const parsedToken = JSON.parse(result);
          const token = jwt_decode(parsedToken);
          api
            .getUserById(token.id)
            .then(res => {
              if (res.data) {
                setPhoneValue(res.data.mobilePhone);
                setUserId(res.data.id);
              }
            })
            .catch(function (error) {
              Alert.alert("veuillez contacter l'administrateur");
            });
        }
      })

      .catch(error => Alert.alert("veuillez contacter l'administrateur"));
  }, []);

  const Submit = () => {
    if (mobilePhoneValue != null) {
      if (mobilePhoneValue.length === 8) {
        if (mobilePhoneValue.includes('.') === false) {
          if (mobilePhoneValue.includes('-') === false) {
            if (mobilePhoneValue.includes(' ') === false) {
              if (mobilePhoneValue.includes(',') === false) {
                data.contactTel = mobilePhoneValue;

                api
                  .buyProduct({
                    userID: userid,
                    productId: data.productId,
                    points: data.points,
                    contactTel: mobilePhoneValue,
                  })
                  .then(res => {
                    // Linking.openURL('tde://catchy/home');
                    // //  Linking.openURL('tde://catchy/home')
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Home" }],
                    });
                  });
              } else {
                Alert.alert('numéro de téléphone invalide');
              }
            } else {
              Alert.alert('numéro de téléphone invalide');
            }
          } else {
            Alert.alert('numéro de téléphone invalide');
          }
        } else {
          Alert.alert('numéro de téléphone invalide');
        }
      } else {
        Alert.alert('numéro de téléphone invalide');
      }
    } else {
      if (phoneValue != null) {
        data.contactTel = phoneValue;
        api
          .buyProduct({
            userID: userid,
            productId: data.productId,
            points: data.points,
            contactTel: phoneValue,
          })
          .then(res => {
            navigationN.navigate('Home');
            setFetch(true);
          })
          .finally(() => setFetch(false));
      } else 'numéro de téléphone requis';
    }
  };

  return (
<SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#323232" : "#FAFAFA" }]}>
      <View style={{height: HEIGHT / 5}}>
        <MenuHeaders />
      </View>
  
      <View style={[styles.frameParent1, styles.frameParent1Position]}>
        <View>
          <Text style={[styles.text1, styles.textLayout, isDarkMode ? { color: '#FFFFFF' } : {}
]}>
            Votre Commande à été effectuée avec succès
          </Text>
          <Text style={[styles.text2, styles.textLayout]}>
            Vous serez contacté par un de nos conseillers, merci de confirmer
            votre numéro de téléphone
          </Text>
        </View>
        <View style={styles.textField}>
          <Pressable
            style={[styles.wrapper, styles.wrapperBorder]}
            onPress={() => navigation.navigate("Contact2")}
          >
            <View style={styles.wrapperInner}>
              <View style={styles.iconsParent}>
                <Image
                  style={styles.icons2}
                  resizeMode="cover"
                  source={require("../assets/feli/icons52.png")}
                />
                <View style={styles.textWrapper}>
                  <TextInput
                    style={styles.text3}
                    value={mobilePhoneValue}
                    defaultValue={phoneValue}
                    multiline={false}
                    onChangeText={onPhone}
                    maxLength={8}
                    minLength={8}
                    onBlur={handleBlur('mobilePhone')}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
      <LottieView
style={{ width: 80, height: 80, top: -15, left: 70 }}
source={require('../assets/animated/mahie.json')}
    autoPlay
    loop
  />
      <View style={styles.buttonsParent}>
      <TouchableOpacity onPress={Submit}>
        <View style={[styles.buttons, styles.buttonsLayout]}>
          <Text style={[styles.text4, styles.textTypo]}>Valider</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
  <View style={[styles.buttons1, styles.buttonsLayout]}>
    <Text style={[styles.text5, styles.textTypo, isDarkMode ? { color: '#FFFFFF' } : {}
]}>Retour</Text>
  </View>
</TouchableOpacity>

      </View>
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  maskGroupIconPosition: {
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
  },
  frameChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  frameGroupFlexBox: {
    height: 42,
    alignItems: "center",
    flexDirection: "row",
  },
  frSpaceBlock: {
    marginLeft: 4,
    textAlign: "left",
    lineHeight: 27,
    color: Color.black,
  },
  wrapperLayout: {
    borderRadius: Border.br_41xl,
    flexDirection: "row",
  },
  frTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  wrapperBorder: {
    borderStyle: "solid",
    alignItems: "center",
  },
  frameParent1Position: {
    left: "50%",
    position: "absolute",
  },
  textLayout: {
    width: 275,
    textAlign: "center",
  },
  buttonsLayout: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    height: 48,
    width: 275,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textTypo: {
    fontFamily: FontFamily.customButton1,
    lineHeight: 24,
    fontWeight: "700",
    textAlign: "left",
    fontSize: FontSize.customButton1_size,
  },
  subtractIcon: {
    height: 89,
    width: 360,
  },
  maskGroupIcon: {
    height: "79.33%",
    bottom: "20.67%",
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    maxWidth: "100%",
  },
  component1Icon: {
    width: 40,
    zIndex: 0,
    height: 40,
  },
  frameChild: {
    height: "78.42%",
    width: "66.93%",
    top: "11.61%",
    right: "16.13%",
    bottom: "9.97%",
    left: "16.94%",
    zIndex: 1,
  },
  component1Parent: {
    alignItems: "center",
  },
  frameItem: {
    height: 32,
    width: 30,
  },
  text: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: FontSize.customButton1_size,
    textAlign: "left",
    lineHeight: 27,
  },
  groupParent: {
    marginLeft: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  frameGroup: {
    width: 116,
    alignItems: "center",
  },
  translateFill0Wght400Grad0Icon: {
    width: 16,
    height: 16,
    overflow: "hidden",
  },
  fr: {
    fontSize: FontSize.gBoardDefault_size,
    marginLeft: 4,
    textAlign: "left",
    lineHeight: 27,
    color: Color.black,
    fontFamily: FontFamily.interSemiBold,
  },
  translateFill0Wght400Grad0Parent: {
    backgroundColor: Color.colorGoldenrod_100,
    width: 55,
    padding: Padding.p_5xs,
    justifyContent: "center",
    height: 40,
    alignItems: "center",
  },
  component3Icon: {
    width: 75,
    height: 51,
    marginLeft: 8,
  },
  frameView: {
    width: 131,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  iconsetStructure: {
    display: "none",
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    bottom: "0%",
    height: "100%",
  },
  vectorIcon: {
    width: 21,
    height: 25,
  },
  iconsChild: {
    top: -2,
    left: 17,
    borderRadius: Border.br_8xs,
    backgroundColor: Color.error,
    borderColor: Color.primary,
    borderWidth: 2,
    width: 12,
    height: 12,
    justifyContent: "center",
    position: "absolute",
  },
  subtractParent: {
    bottom: "0%",
    height: "100%",
    left: "0%",
    right: "0%",
    top: "0%",
    position: "absolute",
  },
  icons: {
    width: 32,
    height: 32,
  },
  iconsWrapper: {
    height: 39,
    marginLeft: 14,
    justifyContent: "center",
    width: 30,
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  frameContainer: {
    marginLeft: 34,
    alignItems: "center",
    flexDirection: "row",
  },
  frameParent: {
    top: 25,
    left: 20,
    flexDirection: "row",
    position: "absolute",
  },
  oneprodInner: {
    top: 0,
    left: 0,
    height: 105,
    width: 360,
    position: "absolute",
  },
  text1: {
    fontSize: FontSize.size_xl,
    lineHeight: 28,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    width: 275,
    textAlign: "center",
    color: Color.black,
  },
  text2: {
    fontSize: FontSize.size_sm,
    lineHeight: 20,
    color: Color.lightGrey2,
    marginTop: 44,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  icons2: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  text3: {
    fontFamily: FontFamily.customBody1,
    lineHeight: 24,
    textAlign: "left",
    color: Color.black,
    fontSize: FontSize.customButton1_size,
  },
  textWrapper: {
    justifyContent: "center",
    marginLeft: 8,
  },
  iconsParent: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
  },
  wrapperInner: {
    alignItems: "center",
    flexDirection: "row",
  },
  wrapper: {
    alignSelf: "stretch",
    borderColor: Color.lightGrey3,
    borderWidth: 1,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_41xl,
    flexDirection: "row",
    flex: 1,
    backgroundColor: Color.background,
    borderStyle: "solid",
  },
  textField: {
    width: 273,
    minHeight: 48,
    maxHeight: 48,
    marginTop: 35,
    height: 48,
    justifyContent: "center",
    backgroundColor: Color.background,
  },
  frameParent1: {
    marginLeft: -137,
    top: 188,
  },
  animationLmpnu7rlSmall1Icon: {
    marginLeft: -45,
    top: 96,
    width: 90,
    height: 90,
  },
  text4: {
    color: Color.primary,
  },
  buttons: {
    backgroundColor: Color.black,
  },
  text5: {
    color: Color.black,
    fontFamily: FontFamily.customButton1,
  },
  buttons1: {
    marginTop: 14,
  },
  buttonsParent: {
    top: 465,
    left: 43,
    position: "absolute",
  },
  oneprod: {
    height: 800,
    overflow: "hidden",
    width: "100%",
    flex: 1,
    backgroundColor: Color.background,
  },
});

