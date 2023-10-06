import React, {useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

import * as api from '../services/api';
import * as Yup from 'yup';
import {WIDTH, HEIGHT} from '../utils/Dimension';

import {useFormik} from 'formik';
import ErrorMessage from '../components/ErrorMessage';
import {TextInput} from 'react-native-paper';
import sanitize from 'sanitize-html';
import {CostumButton} from '../components/Button/CostumButton';
import {Color} from '../constants/colors/color';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('email non valide').required('Required'),
});

export default function SMSHelper({navigation}) {
  const {handleBlur, handleSubmit, handleChange, values, errors, touched} =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: {email: ''},
      onSubmit: values => {
        api
          .forgotPassword(values.email)
          .then(res => {
            if (res.status == 200) {
              if (res.data) {
                navigation.navigate('VerifyCode', {email: values.email});
              } else {
                Alert.alert('adresse email inÃ©xistante');
              }
            }
          })
          .catch(function (error) {
            throw error;
          });
      },
    });
  const email = useRef(null);
  return (
    <SafeAreaView style={{flex: 1}}>
       <TouchableOpacity onPress={()=> navigation.navigate('Login')} style={{marginTop:'4%', marginLeft:'4%'}}>
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subTitle}>
          entrez le code de vÃ©rification S'il vous plait {'\n'}
          nous envoyons Ã  votre adresse e-mail
        </Text>

        <View style={{paddingHorizontal: 32, marginBottom: 16, width: '100%'}}>
          <TextInput
            ref={email}
            icon="lock"
            value={values.username}
            placeholder="Entrez votre email "
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            left={<TextInput.Icon name="email" />}
            onSubmitEditing={() => handleSubmit()}
            activeUnderlineColor="green" //when this TextInput is active, change its accent color to green
          />
          <ErrorMessage errorValue={touched.email && errors.email} />
        </View>

        <TouchableOpacity style={styles.customButton} onPress={handleSubmit}>
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
              Envoyer
            </Text>
            <View style={{backgroundColor: 'blue', borderRadius: 30}}>
              <AntDesign name="arrowright" color="white" size={22} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.goBackContainer}>
          <Text>
            retourner Ã  la page de{' '}
            <Text
              style={styles.connectionTExt}
              onPress={() => navigation.goBack(null)}>
              connexion
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    width: WIDTH,
    height: HEIGHT,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    marginTop: '15%',
  },
  title: {
    paddingTop: 20,
    color: '#000',
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 20,
  },

  subTitle: {
    paddingTop: 30,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  nextButton: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 300,
    marginBottom: 30,
    width: '70%',
    alignSelf: 'center',
  },
  goBackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  goBackText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  connectionTExt: {
    fontWeight: 'bold',
    color: Color.tertiary,
  },
  customButton: {
    borderRadius: 8,
    width: WIDTH / 2,
    backgroundColor: '#0984e3',
    alignSelf: 'center',
    height: HEIGHT / 14,
    justifyContent: 'center',
  },
});
