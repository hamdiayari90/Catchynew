import React, {useEffect, useState} from 'react';
import * as api from '../services/api';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import Icon from 'react-native-vector-icons/Ionicons';
import {requestNotifications} from 'react-native-permissions';
import {WIDTH, HEIGHT} from '../utils/Dimension';
import {CodeInput} from '../components/CodeInput/CodeInput';
import {verifyIsSignedIn, userToken} from '../atom/auth';
import { Font } from '../constants/colors/color';
const VerifyCode = props => {
  useEffect(() => {
    requestNotifications();
  }, []);
  //  save token
  saveToken = async username => {
    const token = await messaging().getToken();
    if (token) {
      api.sendToken({username, token}).then(resp => {});
      AsyncStorage.setItem('deviceToken', token);
    }
  };

  const [code, setCode] = useState('');
  const [codeErr, setCodeErr] = useState('');
  const [isSignedIn, setIsSignedIn] = useRecoilState(verifyIsSignedIn);
  const [tokenid, setTokenid] = useRecoilState(userToken);
  const navigation = props.navigation;
  const resend_code = () => {
    if (props.route.params.data.email) {
      api.confirmUser(props.route.params.data.email);
    } else {
      Alert.alert('entrez votre email');
    }
  };
  const sendCode = textcode => {
    api.verifyCode(textcode).then(code => {
      //  check if code = true so we need to from any screen we are comming signup screen or login screen
      if (code.data) {
        if (props.route.params.autoLogin !== undefined) {
          api
            .userLogin({
              username: props.route.params.autoLogin.user,
              password: props.route.params.autoLogin.text,
            })
            .then(login => {
              // console.log(
              //   "login ====> in auto login ConfirmUser screen =====> \n:",
              //   login.data
              // );
              AsyncStorage.setItem('profile', JSON.stringify(login.data.token));
              api.setStatus(props.route.params.data.id).then(resp => {});
              setTokenid(() => login.data.token);
              saveToken(props.route.params.autoLogin.user);

              setIsSignedIn(() => true);
            })
            .catch(error => {
              if (error.response.status == 401) {
                Alert.alert('mot de passe invalide \n ');
              }
            });
        } else {
          // comming from login screen
          api
            .userLogin({
              username: props.route.params.user.user,
              password: props.route.params.user.text,
            })
            .then(login => {
              AsyncStorage.setItem('profile', JSON.stringify(login.data.token));
              setTokenid(() => login.data.token);
              api.setStatus(props.route.params.data.id).then(resp => {});

              saveToken(props.route.params.user.user);
              setIsSignedIn(() => true);
            })
            .catch(error => {
              if (error.response.status == 401) {
                Alert.alert('mot de passe invalide \n ');
              }
            });
        }
      } else {
        //  if the code is invalid show designed modal to describe that the code is not valid
        Alert.alert('veuillez vérifier votre code');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{marginTop: '4%', marginLeft: '4%'}}>
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <CodeInput sendCode={sendCode} resend_code={resend_code} />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default VerifyCode;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: WIDTH,
    height: HEIGHT,
    resizeMode: 'cover',
  },
  textContainer: {
    marginTop: '2%',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Font.primary,
  },
});
