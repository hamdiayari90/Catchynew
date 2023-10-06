import React, { useState, useRef } from "react";
import { Padding, Color, Border, FontSize, FontFamily } from "../GlobalStyles";
import * as api from "../services/api";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Alert,
} from "react-native";

export default function VerifyCode(props) {
  const [code, setCode] = useState(Array(6).fill(""));
  const [codeErr, setCodeErr] = useState("");
  const email = props.route.params?.email;
  const navigation = props.navigation;
  const otpRefs = useRef([]); // Array of refs for the OTP TextInputs

  const handleOtpChange = (value, index) => {
    if (value && index < 5) {
        otpRefs.current[index + 1].focus();
    }

    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);
  };

  const sendCode = () => {
    const otp = code.join("");
    api.verifyPassword(otp)
      .then((res) => {
        if (res.status == 200) {
          if (res.data) {
            Alert.alert("votre code a été verifié avec succès");
            navigation.navigate("Forgot1", { email });
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
    api.forgotPassword(email)
      .then((res) => {
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
    
    <View style={styles.connection}>
      
      <Image
        style={styles.maskGroupIcon}
        resizeMode="cover"
        source={require("../assets/assetsnew/forgot/mask-group1.png")}
      />
       <TouchableOpacity onPress={() => navigation.navigate('Forgot2')}>
  <View style={[styles.buttons1, styles.buttonsFlexBox]}>
    <Image
      style={styles.iconsLayout}
      resizeMode="cover"
      source={require("../assets/assetsnew/forgot/icons3.png")}
    />
  </View>
</TouchableOpacity>

      <View style={styles.connectionInner}>
        <Text style={styles.codeDeVrification}>Code de vérification</Text>
        <View style={styles.motDePasseOubliWrapper}>
          <Text style={[styles.motDePasse, styles.text5Typo]}>Mot de Passe Oublié</Text>
        </View>
        <View style={styles.otpContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(input) => otpRefs.current[index] = input}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(value) => handleOtpChange(value, index)}
            value={digit}
          />
        ))}
      </View>
        <TouchableOpacity onPress={resendCode}>
          <Text style={styles.jeNaiPas}>Je n’ai pas reçu de code. <Text style={styles.text9Typo}>Renvoyer</Text></Text>
        </TouchableOpacity>
        <View style={{ height: 30 }} />

        <TouchableOpacity style={[styles.buttons, styles.buttonsFlexBox]} onPress={sendCode}>
          <Text style={[styles.text9, styles.text9Typo]}>Valider</Text>
        </TouchableOpacity>

       

      
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  textPosition: {
    bottom: "0%",
    width: "15%",
    height: "100%",
    top: "0%",
    justifyContent: "center",
    position: "absolute",
  },
  wrapperBorder: {
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    borderColor: Color.colorGainsboro,
    borderStyle: "solid",
    borderRadius: Border.br_11xl,
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.background,
  },
  textTypo: {
    fontSize: FontSize.customBody1_size,
    lineHeight: 24,
    textAlign: "left",
  },
  text5Typo: {
    fontWeight: "600",
    fontSize: FontSize.customBody1_size,
    lineHeight: 24,
    textAlign: "left",
  },
  iconsLayout: {
    width: 24,
    height: 24,
  },
  buttonsFlexBox: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text9Typo: {
    fontFamily: FontFamily.customButton1,
    fontWeight: "700",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  otpInput: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    textAlign: "center",
    margin: 5,
  },
  maskGroupIcon: {
    top: 0,
    left: 0,
    width: 361,
    height: 96,
    position: "absolute",
  },
  codeDeVrification: {
    fontSize: FontSize.size_xl,
    lineHeight: 39,
    fontFamily: FontFamily.poppinsBold,
    width: 238,
    height: 32,
    textAlign: "left",
    fontWeight: "700",
    color: Color.colorBlack,
  },
  text1: {
    fontSize: FontSize.size_sm,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: "#ff7a00",
    lineHeight: 24,
    top: "0%",
    left: "0%",
    textAlign: "left",
    position: "absolute",
  },
  text: {
    height: 24,
    width: 40,
  },
  text2: {
    display: "none",
    color: Color.black,
    fontFamily: FontFamily.customBody1,
  },
  textWrapper: {
    justifyContent: "center",
  },
  wrapper: {
    paddingHorizontal: Padding.p_5xl,
    minHeight: 48,
  },
  textField1: {
    right: "68.13%",
    left: "16.88%",
  },
  textField2: {
    right: "85%",
    left: "0%",
    bottom: "0%",
    width: "15%",
    height: "100%",
  },
  textField3: {
    right: "51.25%",
    left: "33.75%",
  },
  text5: {
    fontFamily: FontFamily.interSemiBold,
    display: "none",
    color: Color.black,
  },
  icons: {
    display: "none",
  },
  wrapper3: {
    paddingHorizontal: Padding.p_xs,
    flex: 1,
  },
  textField4: {
    right: "34.38%",
    left: "50.63%",
  },
  textField5: {
    right: "18.13%",
    left: "66.88%",
  },
  textWrapper1: {
    display: "none",
    justifyContent: "center",
  },
  textField6: {
    right: "0.63%",
    left: "84.38%",
  },
  buttonsLayout: {
    height: 48,
    width: 320,
  },
  textFieldWrapper: {
    marginTop: 16,
  },
  textParent: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  jeNaiPas: {
    fontFamily: FontFamily.customBody1,
  },
  text8: {
    color: Color.black,
    marginTop: 30,
  },
  text9: {
    color: Color.colorGold,
    fontSize: FontSize.customBody1_size,
    lineHeight: 24,
    textAlign: "left",
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
    height: 40,
    width: 40,
    left: 5,
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    top: 20,
  },
  motDePasse: {
    top: -150,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorBlack,
    fontWeight: "600",
  },
  motDePasseOubliWrapper: {
    marginLeft: 43,
    alignItems: "center",
  },
  buttonsParent: {
    top: 29,
    flexDirection: "row",
    width: 320,
    alignItems: "center",
    left: 20,
    position: "absolute",
  },
  connection: {
    width: "100%",
    height: 800,
    overflow: "hidden",
    flex: 1,
    backgroundColor: Color.background,
  },
});

