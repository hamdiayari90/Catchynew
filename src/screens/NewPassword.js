import React, { useRef, useState, useEffect, Component } from "react";
import * as Yup from "yup";
import ErrorMessage from "../components/ErrorMessage";
import * as api from "../services/api";
// import TextInput from '../components/TextInput';
import { TextInput } from "react-native-paper";
import { WIDTH, HEIGHT } from "../utils/Dimension";

import {
  View,
  StyleSheet,
  Button,
  Text,
  SafeAreaView,
  ImageBackground,
  Alert,
} from "react-native";
import { Code } from "native-base";
import { useFormik } from "formik";
import { CostumButton } from "../components/Button/CostumButton";
import { Font } from "../constants/colors/color";

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
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/screenBackground/sighupscreen.png")}
        resizeMode="stretch"
        imageStyle={{ opacity: 0.8 }}
        style={styles.backgroundImage}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>Reset password</Text>
  
          {/* ************************ password input *************************** */}
          <View style={{ paddingHorizontal: 32 }}>
            <TextInput
              ref={password}
              icon="key"
              value={values.password}
              placeholder="Entrez votre Mot de passe"
              autoCompleteType="password"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="done"
              returnKeyLabel="done"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              onSubmitEditing={() => handleSubmit()}
              secureTextEntry={passwordVisible}
              activeUnderlineColor="green" 
              right={
                <TextInput.Icon
                  name={passwordVisible ? "eye" : "eye-off"}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              left={<TextInput.Icon name="form-textbox-password" />}
            />
            <ErrorMessage errorValue={touched.password && errors.password} />
          </View>
  
          {/* ************************ confirm password *************************** */}
          <View style={{ paddingHorizontal: 32 }}>
            <TextInput
              ref={confirm_password}
              icon="key"
              value={values.confirm_password}
              placeholder="confirmer votre Mot de passe"
              autoCompleteType="password"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="done"
              returnKeyLabel="done"
              onChangeText={handleChange("confirm_password")}
              onBlur={handleBlur("confirm_password")}
              error={errors.confirm_password}
              touched={touched.confirm_password}
              onSubmitEditing={() => handleSubmit()}
              secureTextEntry={passwordVisible}
              activeUnderlineColor="green"
              right={
                <TextInput.Icon
                  name={passwordVisible ? "eye" : "eye-off"}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              left={<TextInput.Icon name="form-textbox-password" />}
            />
            <ErrorMessage
              errorValue={touched.confirm_password && errors.confirm_password}
            />
          </View>
          <View style={styles.buttonsWrapper}>
            <View style={[styles.buttons, styles.buttonsFlexBox]}>
              <CostumButton title="confirmer" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: WIDTH,
    height: HEIGHT,
    resizeMode: "cover",
  },
  textContainer: {
    marginTop: "62%",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: Font.primary,
  },
  title: {
    paddingTop: 20,
    color: "#000",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 20,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: "auto",
    marginRight: "auto",
  },
  subTitle: {
    paddingTop: 30,
    color: "#000",
    textAlign: "center",
  },
  nextButton: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 300,
    marginBottom: 30,
    width: "70%",
    alignSelf: "center",
  },
  nextButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    fontFamily: Font.primary,
  },
  headerImage: {
    width: '100%',
    height: 200
},
formContainer: {
    padding: 20,
    width: '80%',
    alignItems: 'center'
},
headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
},
inputWrapper: {
    width: '100%',
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
    borderColor: '#ccc',
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
}
});
