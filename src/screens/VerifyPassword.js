import React, { useState, useEffect } from "react";
import * as api from "../services/api";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { WIDTH, HEIGHT } from "../utils/Dimension";
import { Font } from "../constants/colors/color";

export default function VerifyCode(props) {
  const [code, setCode] = useState("");
  const [codeErr, setCodeErr] = useState("");
  const email = props.route.params?.email;

  console.log("VerifyCode props:", props.route.params);

  const navigation = props.navigation;

  const sendCode = (textCode) => {
    api.verifyPassword(textCode).then((res) => {
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
        <TextInput 
          style={styles.inputStyle}
          placeholder="Enter code"
          onChangeText={text => setCode(text)}
          value={code}
        />
        <Button title="Submit Code" onPress={() => sendCode(code)} />
        <Button title="Resend Code" onPress={resendCode} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    width: WIDTH - 40,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: Font.primary,
  },
});
