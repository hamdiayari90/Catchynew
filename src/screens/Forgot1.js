import React, { useRef, useState, useEffect, Component } from "react";
import * as Yup from "yup";
import ErrorMessage from "../components/ErrorMessage";
import * as api from "../services/api";
// import TextInput from '../components/TextInput';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Button,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Code } from "native-base";
import { useFormik } from "formik";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "mot de passe doit etre 6 caractères au minimum")
    .required("mot de passe est requis"),
  confirm_password: Yup.string()
    .min(6, "mot de passe doit etre 6 caractères au minimum")
    .required("confirmation de mot de passe est requis")
    .oneOf(
      [Yup.ref("password"), null],
      "confirmation de mot de passe est incorrecte"
    ),
});

export default function NewPassword(props) {
  const [checkStatus, setCheckStatus] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(true);
  useEffect(() => {
    console.log("Mounted or updated NewPassword with props:", props);
  }, []);
  const navigation = props.navigation;
  console.log("Props in NewPassword:", props);

  var data = {
    email: props.route?.params?.email,
    
  };
  console.log("NewPassword props:", props.route.params);

  const {
    handleBlur,
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { password: "", confirm_password: "" },
    onSubmit: (values) => {
      if (values.password === values.confirm_password) {
        api
          .savePassword({ email: data.email, password: values.password })
          .then((res) => {
            if (res.status == 200) {
              Alert.alert(
                "Félicitation : votre mot de passe est rénitialiser avec succès"
              );
              navigation.navigate("Login");
            }
          })
          .catch(function (error) {
            if (error.response.status == 401) {
              Alert.alert("veuillez contacter l'administrateur");
            }
            throw error;
          });
      } else {
      }
    },
  });

  const password = useRef(null);
  const confirm_password = useRef(null);
  return (
    <View style={styles.connection}>
    <Image
      style={styles.maskGroupIcon}
      resizeMode="cover"
      source={require("../assets/assetsnew/forgot/mask-group.png")}
    />
<View style={styles.motDePasseOubliWrapper}>
          <Text style={[styles.motDePasse, styles.textTypo]}>
            Mot de Passe Oubliée
          </Text>
        </View>
        <View style={styles.formContainer}>
            <Text style={styles.nouveauMotDe}>Nouveau Mot De Passe</Text>
            <View style={{ height: 20 }} />

            {/* Password Input */}
            <View style={[styles.textField1, styles.textLayout]}>
                  <Text style={[styles.text, styles.textClr]}>
                   Taper le nouveau mot de passe
                  </Text>
                  </View>
                              <View style={[styles.wrapper, styles.parentFlexBox]}>
            <View style={[styles.frameGroup, styles.parentFlexBox]}>
            <View style={[styles.iconsParent, styles.parentFlexBox]}>
                        <Image
                          style={styles.icons}
                          resizeMode="cover"
                          source={require("../assets/assetsnew/forgot/icons.png")}
                        />
            <View style={styles.textWrapper}>

                <TextInput
                style={[styles.text1, styles.textTypo]}
                    placeholder="Entrez votre Mot de passe"
                    onChangeText={handleChange("password")}
                    secureTextEntry={true}
                    backgroundColor='transparent'
                />
       
            </View>
            </View>
            </View>
            </View>

            {/* Confirm Password Input */}
            <View style={[styles.textField1, styles.textLayout]}>
                  <Text style={[styles.text, styles.textClr]}>
                    Retaper le nouveau mot de passe
                  </Text>
                  </View>
                              <View style={[styles.wrapper, styles.parentFlexBox]}>
            <View style={[styles.frameGroup, styles.parentFlexBox]}>
            <View style={[styles.iconsParent, styles.parentFlexBox]}>
            <Image
                          style={styles.icons}
                          resizeMode="cover"
                          source={require("../assets/assetsnew/forgot/icons.png")}
                        />
                        <View style={styles.textWrapper}>
                      
                     <TextInput
                     style={[styles.text1, styles.textTypo]}
                    placeholder="confirmer votre Mot de passe"
                    onChangeText={handleChange("confirm_password")}
                    secureTextEntry={true}
                    backgroundColor='transparent'
                />
            </View>
            </View>
            </View>
            </View>

            <View style={styles.buttonsWrapper}>
                <TouchableOpacity style={[styles.buttons, styles.buttonsFlexBox]} onPress={handleSubmit}>
                    <Text style={[styles.text4, styles.textTypo, styles.buttonText]}>Valider</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Section */}
            <View style={[styles.buttonsParent, styles.parentFlexBox]}>
            <TouchableOpacity onPress={() => navigation.navigate('Forgot2')}>

        <View style={[styles.buttons1, styles.buttonsFlexBox]}>
          <Image
            style={styles.icons}
            resizeMode="cover"
            source={require("../assets/assetsnew/forgot/icons3.png")}
          />
        </View>
        </TouchableOpacity>
        </View>
        </View>
    </View>
);

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
},
headerImage: {
    width: '100%',
    height: 200
},
formContainer: {
    padding: 10,
    width: '100%',
    alignItems: 'center'
},
headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
},

labelText: {
    fontSize: 16,
    marginBottom: 5
},
inputField: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5
},
footerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
},
footerIcon: {
    width: 40,
    height: 40,
    marginRight: 10
},
footerText: {
    fontSize: 16
},
  buttonsParentPosition: {
    left: 20,
    position: "absolute",
  },
  textLayout: {
    height: 45,
    justifyContent: "center",
    width: 400,
  },
  textClr: {
    color: Color.black,
    top: 5,
    fontFamily: FontFamily.customBody1,
  },

  textTypo: {
    fontSize: FontSize.customBody1_size,
    lineHeight: 24,
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
    width: 361,
    height: 96,
    position: "absolute",
  },
  nouveauMotDe: {
    fontSize: FontSize.size_xl,
    lineHeight: 39,
    fontFamily: FontFamily.poppinsBold,
    width: 238,
    height: 32,
    top: 60,
    left: -50,
    textAlign: "left",
    color: Color.colorBlack,
    fontWeight: "700",
  },
  text: {
    fontSize: FontSize.size_sm,
    letterSpacing: -0.1,
    lineHeight: 24,
    color: Color.black,
    fontFamily: FontFamily.customBody1,
    textAlign: "left",
  },
  icons: {
    width: 24,
    height: 24,
  },
  text1: {
    color: Color.black,
    fontFamily: FontFamily.customBody1,
  },
  textWrapper: {
    marginLeft: 8,
    marginTop: -5,
    justifyContent: "center",
  },
  iconsParent: {
    flexWrap: "wrap",
  },
  frameGroup: {
    width: 200,
  },
  wrapper: {
    alignSelf: "stretch",
    borderRadius: Border.br_41xl,
    backgroundColor: Color.colorWhite,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro,
    borderWidth: 1,
    height: 49,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_5xs,
    marginTop: 0,
  },
  textField: {
    justifyContent: "center",
  },
  textField1: {
    marginTop: 50,
    left: 50,
    justifyContent: "center",
  },
  
  text4: {
    fontFamily: FontFamily.customButton1,
    color: Color.colorGold,
    fontWeight: "700",
    fontSize: FontSize.customBody1_size,
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
    top: 138,
    alignItems: "center",
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
    top: -40,
    left: -10,
  },
  motDePasse: {
    fontWeight: "600",
    top: 20,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorBlack,
    fontSize: FontSize.customBody1_size,
  },
  motDePasseOubliWrapper: {
    marginLeft: 43,
  
    alignItems: "center",
  },
  buttonsParent: {
    top: 29,
    width: 320,
    left: 20,
    position: "absolute",
  },
  connection: {
    backgroundColor: Color.background,
    flex: 1,
    width: "100%",
    height: 200,
    overflow: "hidden",
  },
});

