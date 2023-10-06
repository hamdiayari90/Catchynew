import React, {useRef} from 'react';

import { Image, StyleSheet, Text, View, Alert, TextInput, TouchableOpacity, } from "react-native";
import { FontSize, Padding, Border, FontFamily, Color,  } from "../GlobalStyles";
import * as api from '../services/api';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import ErrorMessage from '../components/ErrorMessage';
import sanitize from 'sanitize-html';
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('email non valide').required('Required'),
});

export default function Forgot2({navigation}) {
  const {handleBlur, handleSubmit, handleChange, values, errors, touched} =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: {email: ''},
      onSubmit: values => {
        api
          .forgotPassword(values.email)
          .then(res => {
            if (res.status == 200) {
              if (res.data) {
                navigation.navigate('Forgot3', {email: values.email});
              } else {
                Alert.alert('adresse email inéxistante');
              }
            }
          })
          .catch(function (error) {
            throw error;
          });
      },
    });
  const email = useRef(null);

  return (
    <View style={styles.connection}>
      <Image
        style={styles.maskGroupIcon}
        resizeMode="cover"
        source={require("../assets/assetsnew/forgot/mask-group1.png")}
      />
      <View style={styles.connectionInner}>
        <View>
          <View>
            <View>
              <Text style={styles.nousAllonsVous}>
                Nous allons vous envoyer un code OTP sur votre adresse email
                pour changer votre mot de passe.
              </Text>
              <View style={styles.frameContainer}>
                <View style={styles.textFieldWrapper}>
                  <View style={[styles.textField, styles.buttonsLayout]}>
                    
                    <View style={[styles.wrapper, styles.wrapperParentFlexBox]}>
                      <View style={styles.wrapperParentFlexBox}>
                        
                        <View
                          style={[
                            styles.iconsParent,
                            styles.wrapperParentFlexBox,
                          ]}
                        >
                          
                          <Image
                            style={styles.icons}
                            resizeMode="cover"
                            source={require("../assets/assetsnew/forgot/icons5.png")}
                          />
                          
                          <View style={styles.textWrapper}>
                            
                        
                            <TextInput
                            style={[styles.text, styles.textTypo]}
            ref={email}
            value={values.username}
            placeholder="foulen@foulen.com"
            onChangeText={handleChange('email')}
            onSubmitEditing={() => handleSubmit()}
            
          
          />
                          </View>
                          
                         
                        </View>
                      </View>
                      
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.buttonsWrapper}>
            <TouchableOpacity style={[styles.buttons, styles.buttonsFlexBox]} onPress={handleSubmit}>
                <Text style={[styles.text1, styles.textTypo]}>Valider</Text>
              </TouchableOpacity>
              
              </View>
            </View>
          </View>
        </View>

      
      <View style={[styles.buttonsParent, styles.wrapperParentFlexBox]}>
        <View style={[styles.buttons1, styles.buttonsFlexBox]}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
    <Image
        style={styles.icons}
        resizeMode="cover"
        source={require("../assets/assetsnew/forgot/icons3.png")}
    />
</TouchableOpacity>

        </View>
        <View style={styles.motDePasseOubliWrapper}>
          <Text style={[styles.motDePasse, styles.textTypo]}>
            Mot de Passe Oublié
          </Text>
        </View>
      </View>
      </View>

  );
};

const styles = StyleSheet.create({
  buttonsLayout: {
    height: 48,
    width: 320,
  },
  wrapperParentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  textTypo: {
    lineHeight: 24,
    fontSize: FontSize.customBody1_size,
    textAlign: "left",
  },
  buttonsFlexBox: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  maskGroupIcon: {
    top: 0,
    left: 0,
    width: 410,
    height: 96,
    position: "absolute",
  },
  nousAllonsVous: {
    fontSize: FontSize.size_sm,
    lineHeight: 20,
    color: "#606268",
    width: 319,
    textAlign: "left",
    fontFamily: FontFamily.customBody1,
  },
  icons: {
    width: 24,
    height: 24,
  },
  text: {
    color: Color.black,
    fontFamily: FontFamily.customBody1,
    lineHeight: 24,
    fontSize: FontSize.customBody1_size,
  },
  textWrapper: {
    marginLeft: 8,
    marginTop: -10,
    justifyContent: "center",
  },
  iconsParent: {
    flexWrap: "wrap",
  },
  wrapper: {
    alignSelf: "stretch",
    borderRadius: Border.br_41xl,
    backgroundColor: Color.colorWhite,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro,
    borderWidth: 1,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_5xs,
    flex: 1,
  },
  textField: {
    minHeight: 48,
    maxHeight: 48,
    justifyContent: "center",
  },
  textFieldWrapper: {
    alignItems: "center",
  },
  frameContainer: {
    marginTop: 16,
  },
  text1: {
    fontWeight: "700",
    fontFamily: FontFamily.customButton1,
    color: Color.colorGold,
    },
  buttons: {
    backgroundColor: Color.black,
    height: 48,
    width: 320,
  },
  buttonsWrapper: {
    marginTop: 24,
    alignItems: "center",
  },
  connectionInner: {
    top: 148,
    alignItems: "center",
    left: 20,
    position: "absolute",
  },
  buttons1: {
    backgroundColor: Color.colorGold,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 20,
    elevation: 20,
    shadowOpacity: 1,
    width: 40,
    height: 40,
  },
  motDePasse: {
    fontWeight: "900",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorBlack,
  },
  motDePasseOubliWrapper: {
    marginLeft: 43,
    alignItems: "center",
  },
  buttonsParent: {
    top: 29,
    width: 320,
    flexDirection: "row",
    left: 20,
    position: "absolute",
  },
  connection: {
    backgroundColor: Color.background,
    width: "100%",
    height: 800,
    overflow: "hidden",
    flex: 1,
  },
});

