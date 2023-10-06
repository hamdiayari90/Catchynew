import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, Pressable, TextInput, Keyboard } from "react-native";
import { Color, Border, FontFamily, FontSize, Padding } from "../../GlobalStyles";
import { Alert } from "react-native";
import { HEIGHT, WIDTH } from '../utils/Dimension';

import LottieView from 'lottie-react-native';

export default function Inscription({ navigation }) {
  const [data, setData] = useState({
    username: '',
    password: '',
    email: '',
    mobilePhone: ''
  });
  const validateInput = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const usernamePattern = /^[a-zA-Z0-9._]+$/;
    const phonePattern = /^\d{8}$/;

    if (!data.email || !data.username || !data.password || !data.mobilePhone) {
      Alert.alert('Données incomplètes', 'Merci de compléter tous les champs.');
      return false;
    }

    if (!emailPattern.test(data.email)) {
      Alert.alert('Email invalide', 'E-mail doit être au format foulen@foulen.com');
      return false;
    }

    if (!usernamePattern.test(data.username)) {
      Alert.alert('Username non valide', 'Username ne doit contenir que des lettres, des chiffres, des points et des traits de soulignement.');
      return false;
    }

    if (!phonePattern.test(data.mobilePhone)) {
      Alert.alert('Téléphone invalide', 'Le téléphone doit comporter 8 chiffres.');
      return false;
    }

    return true;
  };
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
              setKeyboardVisible(true);
          }
      );
      const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
              setKeyboardVisible(false);
          }
      );
  
      return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
      };
  }, []);
  const checkEmail = async () => {
    try {
      const response = await fetch(`http://94.237.82.88:8082/verifMail2/${data.email}`);
      const result = await response.json();

      return result; // Returns true if email exists, false otherwise
    } catch (error) {
      console.error('Error verifying email:', error);
      return true; // Default to "exists" if there's an error, to be safe
    }
};

const checkUsername = async () => {
    try {
      const response = await fetch(`http://94.237.82.88:8082/verifUsername2/${data.username}`);
      const result = await response.json();

      return result; // Returns true if username exists, false otherwise
    } catch (error) {
      console.error('Error verifying username:', error);
      return true; // Default to "exists" if there's an error, to be safe
    }
};

const handleValidation = async () => {
    if (!validateInput()) {
      return;
    }

    const isEmailTaken = await checkEmail();
    if (isEmailTaken) {
      Alert.alert('E-mail pris', 'Cet e-mail est déjà enregistré. Merci d\'en choisir un autre.');
      return;
    }

    const isUsernameTaken = await checkUsername();
    if (isUsernameTaken) {
      Alert.alert('Username pris', 'Ce nom d\'utilisateur est déjà pris. Merci d\'en choisir un autre.');
      return;
    }

    navigation.navigate('Step1', { data: data });
};

  return (
    <View style={styles.inscription}>
      <Image
        style={[styles.inscriptionChild, styles.inscriptionLayout]}
        resizeMode="cover"
        source={require("../assets/assetsnew/group-63563602.png")}
      />
      {
    !keyboardVisible && (
        <>
      <LottieView
            source={require('../assets/animated/login.json')}
            autoPlay
            loop
            style={styles.inscriptionItem}
            /> 
            
        </>
    )
}


      <View style={styles.frameParent}>
        <View style={styles.jeMinscrisWrapper}>
        <View style={{ height: 20 }} />
          <Text style={styles.jeMinscris}>Je m’inscris</Text>
        </View>
        <View style={styles.frameGroup}>
          <View style={styles.textFieldParent}>
            <View style={styles.textLayout}>
              <View style={[styles.wrapper, styles.wrapperFlexBox]}>
                <View style={styles.parentFlexBox}>
                  <View style={[styles.iconsParent, styles.parentFlexBox]}>
                    <Image
                      style={[styles.icons, styles.iconsLayout1]}
                      resizeMode="cover"
                      source={require("../assets/assetsnew/mail.png")}
                    />
                    <View style={styles.textWrapper}>
                    <TextInput 
    placeholder="Email"
    color='gray'
    placeholderTextColor="gray"
    onChangeText={text => setData({...data, email: text})}
    style={styles.input}
/>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.textField1, styles.textLayout]}>
              <View style={[styles.wrapper, styles.wrapperFlexBox]}>
                <View style={styles.parentFlexBox}>
                  <View style={[styles.iconsParent, styles.parentFlexBox]}>
                    <Image
                      style={[styles.icons, styles.iconsLayout]}
                      resizeMode="cover"
                      source={require("../assets/log.png")}
                    />
                                        <TextInput placeholder="Username"         color='gray'
placeholderTextColor="gray"
onChangeText={text => setData({...data, username: text})} style={styles.textWrapper} />

                    <View style={styles.textWrapper}>

                      <Text style={[styles.text, styles.textTypo1]}>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.textField1, styles.textLayout]}>
              <View style={[styles.wrapper, styles.wrapperFlexBox]}>
                <View style={styles.parentFlexBox}>
                  <View style={[styles.iconsParent, styles.parentFlexBox]}>
                    <Image
                      style={[styles.icons, styles.iconsLayout]}
                      resizeMode="cover"
                      source={require("../assets/pass.png")}
                    />
                                        <TextInput placeholder="Password"      color='gray'
  placeholderTextColor="gray"
 onChangeText={text => setData({...data, password: text})} secureTextEntry={true} style={styles.textWrapper2} />

                    <View style={styles.textWrapper}>

                      <Text style={[styles.text, styles.textTypo1]}>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.textField3}>
              <View style={[styles.wrapper3, styles.wrapperFlexBox]}>
                <View style={[styles.wrapper4, styles.wrapperFlexBox]}>
                  <View
                    style={[styles.isdVariantsParent, styles.parentFlexBox]}
                  >
                    <View style={[styles.isdVariants, styles.parentFlexBox]}>
                      <Image
                        style={[styles.icons, styles.iconsLayout]}
                        resizeMode="cover"
                        source={require("../assets/assetsnew/flag.png")}
                      />
                      <Text style={[styles.text3, styles.textTypo1]}>+216</Text>
                    </View>
                    <Image
                      style={styles.icons3}
                      resizeMode="cover"
                      source={require("../assets/assetsnew/icons13.png")}
                    />
                  </View>
                  
                </View>
                <TextInput placeholder="Téléphone"       color='gray'
  placeholderTextColor="gray"
onChangeText={text => setData({...data, mobilePhone: text})} style={styles.textWrapper3} />

              </View>
            </View>
          </View>
          <View style={styles.buttonsParent}>
            <Pressable
              style={[styles.buttons, styles.buttonsFlexBox]}
              onPress={handleValidation}             
                >
              <Text style={[styles.text5, styles.textTypo]}>Valider</Text>
            </Pressable>
            
            
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inscriptionLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  wrapperFlexBox: {
    paddingVertical: Padding.p_5xs,
    flexDirection: "row",
    alignItems: "center",
  },
  parentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconsLayout: {
    width: 24,
    height: 24,
  },
  iconsLayout1: {
    width: 15,
    height: 12,
  },
  textTypo1: {
    fontFamily: FontFamily.customBody1,
    textAlign: "left",
    color: Color.black,
    top: 0,
    lineHeight: 24,
  },
  textLayout: {
    maxHeight: HEIGHT * 0.08, // example: 8% of screen height
    minHeight: HEIGHT * 0.08,
    justifyContent: "center",
    width: WIDTH * 0.8, // 80% of screen width
  },
  buttonsFlexBox: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textTypo: {
    fontFamily: FontFamily.interSemiBold,
    textAlign: "left",
    fontWeight: "600",
    lineHeight: 24,
    fontSize: FontSize.nums_size,
  },
  inscriptionChild: {
    height: "26.9%",
    width: "126.67%",
    top: "-2.8%",
    right: "-15.67%",
    bottom: "10.1%",
    left: "-10%",
  },
  inscriptionItem: {
    position: "absolute",
    left: "50%",
    marginLeft: -WIDTH / 2,
    marginTop: -WIDTH / 29,   // Center vertically
    width: WIDTH,
    height: WIDTH, // Assuming you want it to be square
  },
  inscriptionInner: {
    height: "6%",
    width: "48.89%",
    top: "22.13%",
    right: "25.56%",
    bottom: "71.88%",
    left: "25.56%",
  },
  jeMinscris: {
    fontFamily: FontFamily.poppinsBold,
    textAlign: "left",
    color: Color.black,
    fontWeight: "900",
    lineHeight: 24,
    fontSize: 20,
  },
  jeMinscrisWrapper: {
    alignItems: "center",
  },
  icons: {
    height: 24,
  },
  text: {
    fontSize: FontSize.nums_size,
    fontFamily: FontFamily.customBody1,
  },
  textWrapper: {
    marginLeft: 8,
    marginTop: -5,
    justifyContent: "center",
  },
  textWrapper2: {
    marginLeft: 8,
    marginTop: -5,
    justifyContent: "center",
  },
  textWrapper3: {
    marginLeft: WIDTH * 0.,  // Set marginLeft to be 2% of the screen width
    justifyContent: "center",  // Keeps the content vertically centered
    // If needed, adjust padding instead of using negative margin
    paddingTop: HEIGHT * 0.005,  // Set padding to be 0.5% of the screen height
  },
  iconsParent: {
    flexWrap: "wrap",
  },
  wrapper: {
    alignSelf: "stretch",
    paddingHorizontal: WIDTH * 0.05, // 5% of screen width
    borderWidth: 1,
    borderColor: "#dfdfdf",
    borderRadius: Border.br_41xl,
    paddingVertical: HEIGHT * 0.01, // 1% of screen height
    backgroundColor: Color.white,
    flex: 1,
  },
  textField1: {
    marginTop: 16,
  },
  text3: {
    fontSize: FontSize.size_xs,
    marginLeft: 2,
  },
  isdVariants: {
    width: 71,
    paddingRight: Padding.p_base,
  },
  icons3: {
    width: 20,
    height: 20,
  },
  isdVariantsParent: {
    width: 76,
    justifyContent: "space-between",
    height: 24,
  },
  wrapper4: {
    borderRadius: Border.br_22xl,
    backgroundColor: Color.whitesmoke_200,
    width: 93,
    height: 40,
    paddingHorizontal: Padding.p_xs,
    justifyContent: "center",
  },
  text4: {
    marginLeft: 8,
    fontSize: FontSize.nums_size,
    fontFamily: FontFamily.customBody1,
  },
  wrapper3: {
    top: 0,
    left: 0,
    width: WIDTH * 0.8,  // Set the frame width to be 80% of the screen width
    height: 49,
    paddingHorizontal: Padding.p_9xs,
    borderWidth: 1,
    borderColor: "#dfdfdf",
    borderRadius: Border.br_41xl,
    paddingVertical: Padding.p_5xs,
    borderStyle: "solid",
    backgroundColor: Color.white,
    position: "absolute",
  },
  textField3: {
    height: HEIGHT * 0.08, // 8% of screen height
    width: WIDTH * 0.8, // 80% of screen width
    marginTop: HEIGHT * 0.02, // 2% of screen height
  },
  textFieldParent: {
    height: HEIGHT * 0.3, // 30% of screen height
    alignItems: "center",
  },
  text5: {
    color: Color.primary,
  },
  buttons: {
    backgroundColor: Color.black,
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    height: 48,
    width: 320,
  },
  text6: {
    color: Color.darkslategray,
    marginLeft: 8,
  },
  buttons1: {
    borderColor: "#3a3a3a",
    borderWidth: 2,
    width: 322,
    height: 50,
    borderStyle: "solid",
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    marginTop: 16,
    backgroundColor: Color.white,
  },
  icons5: {
    height: 24,
    overflow: "hidden",
  },
  buttonsParent: {
    marginTop: HEIGHT * 0.10,  // Add a top margin to separate it from the above input
    alignItems: 'center',
    justifyContent: 'center',
    // ... other styles
},
  frameGroup: {
    marginTop: 16,
    alignItems: "center",
  },
  frameParent: {
    position: "absolute",
    top: '32%',  // Percentage is fine if it represents the desired offset from the top
    left: WIDTH * 0.1,  // Set the left offset to be 10% of screen width
    width: WIDTH * 0.8,  // Set the frame width to be 80% of the screen width
  },
  inscription: {
    width: "100%",
    height: 800,
    overflow: "hidden",
    flex: 1,
    backgroundColor: Color.white,
  },
});

