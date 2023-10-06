import React, { useRef, useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { useFormik } from 'formik';
import { GoogleSignin } from '@react-native-community/google-signin';
import * as Yup from 'yup';
import { CostumButton } from '../components/Button/CostumButton';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import * as api from '../services/api';
import ImageLogo from '../components/Image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { TextInput } from 'react-native-paper';
import sanitize from 'sanitize-html';
import { useRecoilState } from 'recoil';
import { userToken, verifyIsSignedIn } from '../atom/auth';
import { HEIGHT, WIDTH } from '../utils/Dimension';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Switch } from 'react-native-paper';
import { Padding, FontFamily, Color, Border, FontSize,Font } from "../../GlobalStyles";
import LottieView from 'lottie-react-native';
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Nom utilisateur requis')
    .matches(/^(?!\s*$).+/, 'Nom utilisateur requis')
    .max(20, 'nom dutilisateur trop long'),
  password: Yup.string()
    .min(6, 'le mot de passe doit comporter au moins 6 caractères!')
    .required('Mot de passe requis'),
});




export default function Login({ navigation }) {
  const [checkStatus, setCheckStatus] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isSignedIn, setIsSignedIn] = useRecoilState(verifyIsSignedIn);
  const [tokenid, setTokenid] = useRecoilState(userToken);
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [keyboardVisible, setKeyboardVisible] = useState(false);


const signInWithGoogle = async () => {
  console.log("Attempting Google Sign-In");

  try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info:", userInfo);  // print user info to console
      
      // Extract email and check in your database
      const email = userInfo.user.email;
      
      api.checkEmail(email)
    .then(result => {
        console.log("API checkEmail Response:", result);  // Log the API response
        if (result) {  // If the API simply returns true/false without the `exists` field
          navigation.navigate('ConfirmUser', { email: email });
              } else {
                  console.log("Email not registered");
                  // Here you can add more logic like redirecting the user to a signup page, etc.
              }
          })
          .catch(error => {
              console.error("API checkEmail Error:", error);
              // Here you can handle the API error, perhaps show a notification to the user.
          });

  } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log("User cancelled Google Sign-In");
      } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log("Google Sign-In is in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log("Google Play Services is not available");
      } else {
          console.error("Google Sign-In Error:", error);
      }
  }
};


useEffect(() => {
  GoogleSignin.configure({
     webClientId: '717122551024-53e9rahfktkbviik3l34t3v6acut6ihq.apps.googleusercontent.com',
     offlineAccess: true
  });
}, []);


  const saveToken = async username => {
    const token = await messaging().getToken();
    if (token) {
      api.sendToken({ username, token }).then(resp => { });
      AsyncStorage.setItem('deviceToken', token);
    }
  };
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

const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
  useFormik({
    validationSchema: LoginSchema,
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      setShowLoadingAnimation(true);
      const sanitizedUsername = sanitize(values.username);
      const sanitizedPassword = sanitize(values.password);

      try {
        if (sanitizedPassword === values.password && sanitizedUsername === values.username) {
          const verifUser = await api.verifusername(values.username);

          if (verifUser.data) {
            const res = await api.getUserByUserName(values.username);

            if (res.data.status) {
              const user = await api.userLogin(values);
              setTokenid(user.data.token);
              await AsyncStorage.setItem('profile', JSON.stringify(user.data.token));
              saveToken(values.username);
              setIsSignedIn(true);
            } else {
              await api.userLogin(values);
              navigation.navigate('ConfirmUser', {
                data: res.data,
                user: { user: values.username, text: values.password },
              });
            }
          } else {
            Alert.alert("utilisateur n'existe pas");
          }
        } else {
          Alert.alert("mauvais nom d'utilisateur ou mot de passe");
        }
      } catch (error) {
        if (error.response && error.response.status == 401) {
          Alert.alert('Veuillez vérifier vos identifiants');
        } else {
          Alert.alert('Une erreur est survenue.');
          console.error(error);
        }
      } finally {
        setShowLoadingAnimation(false);
      }
    },
  });

    const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);

  const password = useRef(null);

  return (
    <View style={styles.connection}>
      <Image
        style={[styles.connectionChild, styles.connectionLayout]}
        resizeMode="cover"
        source={require("../assets/group-63563601.png")}
      />
     {
    !keyboardVisible && (
        <>
           <LottieView
            source={require('../assets/animated/login.json')}
            autoPlay
            loop
            style={styles.connectionItem}
            /> 
        </>
    )
}

      <View style={styles.frameParent}>
        <View style={styles.jeMeConnecteWrapper}>
          <Text style={styles.jeMeConnecte}>Je me Connecte</Text>
        </View>
        <View style={styles.frameGroup}>
          <View style={styles.textFieldParent}>
            <View style={styles.textLayout}>
              <View style={[styles.wrapper, styles.wrapperFlexBox]}>
                <View style={styles.parentFlexBox}>
                  <View style={[styles.iconsParent, styles.parentFlexBox]}>
                    <Image
                      style={[styles.icons, styles.iconsLayout]}
                      resizeMode="cover"
                      source={require("../assets/log.png")}
                    />
                    <View style={styles.textWrapper}>
                      <Text style={[styles.text, styles.textTypo1]}>
                        
                      </Text>
                    </View>
                  </View>
                  
                  <TextInput
                    value={values.username}
                    placeholder="Nom d'utilisateur"
                    autoCapitalize="none"
                    placeholderTextColor="gray"
                    textColor='gray'
                    returnKeyType="next"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    error={errors.username}
                    touched={touched.username}
                    onSubmitEditing={() => password.current?.focus()}
                    style={styles.input}
                  />
                  {(touched.username && errors.username) &&
                    <ErrorMessage errorValue={touched.username && errors.username} />
                  }
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
                    <View style={styles.textWrapper}>
                      <Text style={[styles.text, styles.textTypo1]}>
                      </Text>
                    </View>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={values.password}
                    textColor='gray'
                    ref={password}
                    placeholderTextColor="gray"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={errors.password}
                    touched={touched.password}
                    placeholder="*****************"
                    onSubmitEditing={() => password.current?.focus()}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    onSubmitEditing={() => handleSubmit()}
                    secureTextEntry={passwordVisible}
                  />
                </View>
              </View>
            </View>
            <View style={{ height: 30 }}></View>
            <View style={styles.buttonsParent}>
              <TouchableOpacity
                style={[styles.buttons, styles.buttonsFlexBox]}
                onPress={handleSubmit}
              >
                <Text style={[styles.text4, styles.textTypo]}>Valider</Text>
              </TouchableOpacity>
             
              <TouchableOpacity
    style={[styles.buttons1, styles.buttonsFlexBox]}
    onPress={signInWithGoogle}
>
    <Image
        style={[styles.icons4, styles.iconsLayout]}
        resizeMode="cover"
        source={require("../assets/icons18.png")}
    />
    <Text style={[styles.text5, styles.textTypo]}>
        Continuer avec Google
    </Text>
</TouchableOpacity>
<View style={{ height: 20 }} />

<View
  style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
    alignItems: 'center',
  }}
>
<View style={{ flex: 1,zIndex:20, left: -30, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          thumbColor="#FFF"
          trackColor={{ true: '#FED544', false: '#767577' }}
        />
        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
          Se souvenir de moi
        </Text>
      </View>
    </View>
          <Text onPress={() => navigation.navigate('Forgot2')} style={{fontSize:10,fontWeight:'bold'}}>
            Mot de passe oubliée ?{' '}
          </Text>
          
        </View>
        
      </View>


    
            </View>
          </View>
        </View>
        
      <View
        style={{
          flexDirection: 'row',
          marginTop: '170%',
          marginBottom: '8%',
          justifyContent: 'center',
          padding: '5%',
        }}>
        <Text style={{fontWeight: 'bold', fontSize:16}}>Pas de compte ? </Text>
        <Text
          onPress={() => navigation.navigate('Inscription')}
          style={{fontWeight: 'regular', fontSize:16}}>
          S’enregistrer
        </Text>
      </View>

      {/* Loading Animation Overlay */}
      {showLoadingAnimation && (
       <View style={{
        ...StyleSheet.absoluteFillObject,  // This ensures the Lottie animation covers the entire screen.
        justifyContent: 'center',  // This centers the child vertically.
        alignItems: 'center',  // This centers the child horizontally.
      }}>
        <LottieView
          source={require('../assets/animated/waits.json')}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}  // Adjust width and height as needed.
        />
      </View>
      )}
    </View>

);
};

const styles = StyleSheet.create({
  connectionLayout: {
    flex: 1,                  // Use flexbox to take up all available space
    maxHeight: HEIGHT,
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
  textTypo1: {
    fontFamily: FontFamily.customBody1,
    textAlign: "center",
    color: Color.black,

  },
  textLayout: {
    maxHeight: 48,
    minHeight: 48,
    justifyContent: "center",
    width: 320,
  },
  buttonsLayout: {
    height: 48,
    width: WIDTH * 0.8,
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
    fontSize: FontSize.customButton1_size,
  },
  connectionChild: {
    height: "26.9%",
    width: "126.67%",
    top: "-2.8%",
    left: "-10%",
  },
  
  connectionItem: {
    position: "absolute",
    left: "50%",
    marginLeft: -WIDTH / 2,
    marginTop: -WIDTH / 29,   // Center vertically
    width: WIDTH,
    height: WIDTH, // Assuming you want it to be square
  },
  connectionInner: {
    height: "6%",
    width: "48.89%",
    top: "22.13%",
    right: "25.56%",
    bottom: "71.88%",
    left: "25.56%",
  },
  jeMeConnecte: {
    fontFamily: FontFamily.poppinsBold,
    textAlign: "center",
    color: Color.black,
    left: -10,
    fontWeight: "900",
    lineHeight: 24,
    fontSize: FontSize.customButton1_size,
  },
  jeMeConnecteWrapper: {
    alignItems: "center",
  },
  icons: {
    height: 24,
  },
  text: {
    fontSize: FontSize.customButton1_size,
    fontFamily: FontFamily.customBody1,
  },
  input: {
    height: 40,
    color: 'gray',
    backgroundColor: 'transparent',
  },
  textWrapper: {
    marginLeft: 8,
    justifyContent: "center",
  },
  iconsParent: {
    flexWrap: "wrap",
  },
  wrapper: {
    alignSelf: "stretch",
    paddingHorizontal: Padding.p_5xl,
    borderWidth: 1,
    borderColor: "#dfdfdf",
    borderRadius: Border.br_41xl,
    paddingVertical: Padding.p_5xs,
    borderStyle: "solid",
    backgroundColor: Color.white,
    flex: 1,
  },
  textField1: {
    marginTop: 16,
  },
  text2: {
    fontSize: FontSize.size_xs,
    marginLeft: 2,
  },
  isdVariants: {
    width: 71,
    paddingRight: Padding.p_base,
  },
  icons2: {
    width: 20,
    height: 20,
  },
  isdVariantsParent: {
    width: 76,
    justifyContent: "space-between",
    height: 24,
  },
  wrapper3: {
    borderRadius: Border.br_22xl,
    backgroundColor: Color.whitesmoke_300,
    width: 93,
    height: 40,
    paddingHorizontal: Padding.p_xs,
    justifyContent: "center",
  },
  text3: {
    marginLeft: 8,
    fontSize: FontSize.customButton1_size,
    fontFamily: FontFamily.customBody1,
  },
  wrapper2: {
    top: 0,
    left: 0,
    width: WIDTH,
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
  textField2: {
    marginTop: 16,
  },
  textFieldParent: {
    height: 243,
    alignItems: "center",
  },
  text4: {
    color: Color.primary,
  },
  buttons: {
    backgroundColor: Color.black,
    height: 48,
    width: 320,
  },
  text5: {
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
  icons4: {
    height: 24,
    overflow: "hidden",
  },
  buttonsParent: {
    alignItems: "center",
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
    // ... other styles
  },
  connection: {
    width: "100%",
    height: 800,
    overflow: "hidden",
    flex: 1,
    backgroundColor: Color.white,
  },
});
