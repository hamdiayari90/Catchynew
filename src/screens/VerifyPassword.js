import React, { useState, useEffect } from "react";
import * as api from "../services/api";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ImageBackground,
  Alert,
} from "react-native";

import { CodeInputResetPassword } from "../components/CodeInput/CodeInputResetPassword";
import { WIDTH, HEIGHT } from "../utils/Dimension";
import { Font } from "../constants/colors/color";
export default function VerifyCode(props) {
  const [code, setCode] = useState("");
  const [codeErr, setCodeErr] = useState("");
//const email = props.route.params.email ;
   //const email='rmadi@live.fr';

  const navigation = props.navigation;
  const sendCode = (textCode) => {
    api
      .verifyPassword(textCode)
      .then((res) => {
        if (res.status == 200) {
          if (res.data) {
            Alert.alert("votre code a été envoyé avec succès");
            navigation.navigate("NewPassword", { email });
          } else {
            Alert.alert("Veuillez vérifier votre email");
          }
        }
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          setCodeErr("Veuillez vérifier votre email");
        }
        throw error;
      });
  };
  const resend_code = () => {
    if (email) {
      api.confirmUser(email);
    } else {
      Alert.alert("entrez votre email");
    }
  };

  const resendCode = () => {
    api.forgotPassword(email).then((res) => {
      if (res.status == 200) {
        if (res.data) {
          Alert.alert("Nous avons envoyer une autre code");
        } else {
          Alert.alert("adresse email inéxistante");
        }
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
   
        <View style={styles.textContainer}>
            <CodeInputResetPassword
              sendCode={sendCode}
              resend_code={resendCode}
            />
          </View>
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
  },
  textStyle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: Font.primary,
  },
});
