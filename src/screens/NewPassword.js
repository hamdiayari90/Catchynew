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

  const navigation = props.navigation;

  var data = {
    email: props.route.params.email,
    // email: 'rmadi@live.fr',
  };
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

          <View style={{ paddingHorizontal: 32, marginBottom: 16 }}>
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
              activeUnderlineColor="green" //when this TextInput is active, change its accent color to green
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
              activeUnderlineColor="green" //when this TextInput is active, change its accent color to green
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
          <View style={styles.nextButton}>
            <CostumButton title="confirmer" onPress={handleSubmit} />
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
});
