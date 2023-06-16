import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {CostumButton} from '../components/Button/CostumButton';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import * as api from '../services/api';
import ImageLogo from '../components/Image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {TextInput} from 'react-native-paper';
import {Color, Font} from '../constants/colors/color';
import sanitize from 'sanitize-html';
import {useRecoilState} from 'recoil';
import {userToken, verifyIsSignedIn} from '../atom/auth';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Switch} from 'react-native-paper';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Nom utilisateur requis')
    .matches(/^(?!\s*$).+/, 'Nom utilisateur requis')
    .max(20, 'nom dutilisateur trop long'),
  password: Yup.string()
    .min(6, 'le mot de passe doit comporter au moins 6 caractères!')

    .required('Mot de passe requis'),
});

export default function Login({navigation}) {
  const [checkStatus, setCheckStatus] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isSignedIn, setIsSignedIn] = useRecoilState(verifyIsSignedIn);
  const [tokenid, setTokenid] = useRecoilState(userToken);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const saveToken = async username => {
    const token = await messaging().getToken();
    // console.log('token:=======>', token)
    if (token) {
      api.sendToken({username, token}).then(resp => {});
      AsyncStorage.setItem('deviceToken', token);
    }
  };

  const {handleChange, handleBlur, handleSubmit, values, errors, touched} =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: {username: '', password: ''},
      onSubmit: values => {
        const saniteizeUserName = sanitize(values.username); // check if the user send any script in the input and sanitiza wil delete it

        const sanitizaPassword = sanitize(values.password); // check if the user send any script in the inputs and sanitiza wil delete it
        if (
          sanitizaPassword == values.password &&
          saniteizeUserName == values.username
        ) {
          api.verifusername(values.username).then(verifUser => {
            if (verifUser.data == true) {
              api.getUserByUserName(values.username).then(res => {
                if (res.data.status) {
                  api
                    .userLogin(values)
                    .then(user => {
                      setTokenid(user.data.token);
                      AsyncStorage.setItem(
                        'profile',
                        JSON.stringify(user.data.token),
                      );
                      setTokenid(user.data.token);
                      // save the token
                      saveToken(values.username);

                      //navigation.navigate('Home');
                      setIsSignedIn(() => true);
                    })
                    .catch(error => {
                      if (error.response.status == 401) {
                        Alert.alert('Veuillez vérifier vos identifiants');
                      }
                    });
                } else {
                  api
                    .userLogin(values)
                    .then(autoLogin => {
                      navigation.navigate('ConfirmUser', {
                        data: res.data,
                        user: {user: values.username, text: values.password},
                      });
                    })
                    .catch(err => {
                      Alert.alert('Veuillez vérifier vos identifiants');
                    });
                }
              });
            } else {
              // show modal here insted of alert
              Alert.alert("utilisateur n'existe pas");
            }
          });
        } else {
          Alert.alert("mauvais nom d'utilisateur ou mot de passe");
        }
      },
    });

  const password = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: WIDTH / 2.5, height: HEIGHT / 5}}
          source={require('../assets/design/login_catchy.png')}
          resizeMode="stretch"></Image>
          <View>
            <Text style={styles.logoName}>Catchy</Text>
          </View>
      </View>
      <View style={styles.logo}>
        <Text style={styles.connectez}>Se connecter </Text>
      </View>
        <TextInput
          mode='outlined'
          icon="lock"
          value={values.username}
          placeholder="foulen@foulen.tn"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          onChangeText={handleChange('username')}
          onBlur={handleBlur('username')}
          error={errors.username}
          touched={touched.username}
          onSubmitEditing={() => password.current?.focus()}
          left={<TextInput.Icon name="mail" color="gray"/>}
          activeOutlineColor="#5568FD"
          style={styles.input}
        />
        {(touched.username && errors.username) && 
          <ErrorMessage errorValue={touched.username && errors.username} />
        }
      
      <TextInput
        mode='outlined'
        ref={password}
        icon="key"
        value={values.password}
        placeholder="*****************"
        autoCompleteType="password"
        autoCapitalize="none"
        keyboardAppearance="dark"
        returnKeyType="done"
        returnKeyLabel="done"
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        error={errors.password}
        touched={touched.password}
        onSubmitEditing={() => handleSubmit()}
        secureTextEntry={passwordVisible}
        activeOutlineColor="#5568FD"
        right={
          <TextInput.Icon
            name={passwordVisible ? 'eye' : 'eye-off'}
            onPress={() => setPasswordVisible(!passwordVisible)}
            color="#AAAAAA"
          />
        }
        left={<TextInput.Icon name="lock" color="#AAAAAA" />}
        style={styles.input}
      />
      {(touched.password && errors.password) && 
        <ErrorMessage errorValue={touched.password && errors.password} />
      }

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: '3%',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color="#5568FD"
          />

          <Text style={{fontSize:12,fontWeight:'bold'}}>Se souvenir de moi </Text>
        </View>
        <View>
          <Text onPress={() => navigation.navigate('SMSHelper')} style={{fontSize:12,fontWeight:'bold'}}>
            Mot de passe oubliée ?{' '}
          </Text>
        </View>
      </View>


      <TouchableOpacity onPress={handleSubmit} style={styles.customButton}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              letterSpacing: 1.2,
              color: '#fff',
              paddingRight: '4%',
              fontSize: 18,
            }}>
            Se connecter
          </Text>
          <View style={{backgroundColor: '#495EED', borderRadius: 30,alignSelf:'center'}}>
            <AntDesign name="arrowright" color="white" size={22} />
          </View>
        </View>
      </TouchableOpacity>


      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          padding: '3%',
        }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 16,
          color:'gray',
          }}>
          OR
        </Text>
      </View>

      <TouchableOpacity  style={styles.googleButton}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}>
          <View>
            <Image
              style={{width: 25, height: 25}}
              source={require('../assets/design/google.png')}
              resizeMode="stretch">
            </Image>
          </View>
          <Text
            style={{
              color: '#000',
              paddingRight: '4%',
              fontSize: 12,
              fontWeight:'bold',
              marginLeft: 10,
            }}>
            Connexion avec Google
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity  style={styles.facebookButton}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}>
          <View>
            <Image
              style={{width: 25, height: 25}}
              source={require('../assets/design/facebook.png')}
              resizeMode="stretch">
            </Image>
          </View>
          <Text
            style={{
              color: '#000',
              paddingRight: '4%',
              fontSize: 12,
              fontWeight:'bold',
              marginLeft: 10,
            }}>
            Connexion avec facebook
          </Text>
        </View>
      </TouchableOpacity>


      <View
        style={{
          flexDirection: 'row',
          marginTop: '8%',
          marginBottom: '8%',
          justifyContent: 'center',
          padding: '3%',
        }}>
        <Text style={{fontWeight:'bold',}}>Pas de compte ? </Text>
        <Text
          onPress={() => navigation.navigate('SignupScreen')}
          style={styles.signup}>
          S’enregistrer
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
    backgroundColor:'white'
  },
  customButton: {
    borderRadius: 10,
    width: WIDTH / 1.5,
    backgroundColor: '#5568FD',
    alignSelf: 'center',
    height: HEIGHT / 14,
    justifyContent: 'center',
  },
  signup: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5669FF',
  },
  forgotPAssword: {
    marginTop: '5%',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: Font.primary,
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
  },

  connectez: {
    fontSize: 20,
    fontFamily: Font.primary,
    marginBottom: 5,
    letterSpacing: 1.4,
    paddingLeft: '5%',
    fontWeight: 'bold',
  },

  logoName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#37364A',
    fontFamily: Font.primary,
    marginBottom: 10,
  },

  input:{
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    border: 'none',
  },

  googleButton:{
    borderRadius: 10,
    width: WIDTH / 1.5,
    backgroundColor: '#EFEFFC',
    alignSelf: 'center',
    height: HEIGHT / 14,
    justifyContent: 'center',
  },

  facebookButton:{
    borderRadius: 10,
    width: WIDTH / 1.5,
    backgroundColor: '#EFEFFC',
    alignSelf: 'center',
    height: HEIGHT / 14,
    justifyContent: 'center',
    marginTop:5
  }

});
