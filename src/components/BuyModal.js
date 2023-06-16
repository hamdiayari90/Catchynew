import React, {useState, useEffect} from 'react';
import {
  View,
  Text,

  StyleSheet,

  SafeAreaView,
  Alert,
} from 'react-native';
import * as api from '../services/api';
import ErrorMessage from '../components/ErrorMessage';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {Color, Font} from '../constants/colors/color';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import TextInput from './TextInput';
import {useRecoilState} from 'recoil';
import {globlalUSerInfo} from '../atom/auth';
import {sizes} from '../constants/theme';
import {MenuHeaders} from './menuComponent/MenuHeaders';
import {GlobalButton} from './Button/GlobalButton';

export default function BuyModal({route, navigation}) {
  const data = route.params.data.data;
  const [fetch, setFetch] = useState(false);
  const [mobilePhoneValue, setmobilePhoneValue] = useState();
  const [phoneValue, setPhoneValue] = useState(null);
  const navigationN = useNavigation();
  const [userid, setUserId] = useState([]);
  const [user, setUSer] = useRecoilState(globlalUSerInfo);
  const onPhone = v => {
    setmobilePhoneValue(v);
  };
  const {handleBlur, errors, touched} = useFormik({
    //validationSchema: LoginSchema,
  });

  useEffect(() => {
    AsyncStorage.getItem('profile')
      .then(result => {
        if (result !== null) {
          const parsedToken = JSON.parse(result);
          const token = jwt_decode(parsedToken);
          api
            .getUserById(token.id)
            .then(res => {
              if (res.data) {
                setPhoneValue(res.data.mobilePhone);
                setUserId(res.data.id);
              }
            })
            .catch(function (error) {
              Alert.alert("veuillez contacter l'administrateur");
            });
        }
      })

      .catch(error => Alert.alert("veuillez contacter l'administrateur"));
  }, []);

  const Submit = () => {
    if (mobilePhoneValue != null) {
      if (mobilePhoneValue.length === 8) {
        if (mobilePhoneValue.includes('.') === false) {
          if (mobilePhoneValue.includes('-') === false) {
            if (mobilePhoneValue.includes(' ') === false) {
              if (mobilePhoneValue.includes(',') === false) {
                data.contactTel = mobilePhoneValue;

                api
                  .buyProduct({
                    userID: userid,
                    productId: data.productId,
                    points: data.points,
                    contactTel: mobilePhoneValue,
                  })
                  .then(res => {
                    // Linking.openURL('tde://catchy/home');
                    // //  Linking.openURL('tde://catchy/home')
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "Home" }],
                    });
                  });
              } else {
                Alert.alert('numéro de téléphone invalide');
              }
            } else {
              Alert.alert('numéro de téléphone invalide');
            }
          } else {
            Alert.alert('numéro de téléphone invalide');
          }
        } else {
          Alert.alert('numéro de téléphone invalide');
        }
      } else {
        Alert.alert('numéro de téléphone invalide');
      }
    } else {
      if (phoneValue != null) {
        data.contactTel = phoneValue;
        api
          .buyProduct({
            userID: userid,
            productId: data.productId,
            points: data.points,
            contactTel: phoneValue,
          })
          .then(res => {
            navigationN.navigate('Acceuil');
            setFetch(true);
          })
          .finally(() => setFetch(false));
      } else 'numéro de téléphone requis';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: HEIGHT / 5}}>
        <MenuHeaders />
      </View>
      {/* ********************************************************************************************************* */}
      {/* ********************************************* NAV BAR *************************************************** */}
      {/* ********************************************************************************************************* */}
      <Text style={styles.title}>Félicitations</Text>
      <View style={{marginHorizontal: '5%', flexDirection: 'column'}}>
        <Text style={styles.description}>
          Vous serez contacté par un de nos conseillers
        </Text>
        <Text style={styles.description}>
          pour planifier la livraison de votre cadeau.
        </Text>
        <Text style={styles.description}>
          Merci de saisir le numéro de téléphone sur lequel vous désirez être
          contacté
        </Text>
      </View>

      <TextInput
        icon="phone"
        value={mobilePhoneValue}
        defaultValue={phoneValue}
        multiline={true}
        dataDetectorTypes="phoneNumber"
        placeholder="Entrez votre telephone"
        keyboardType="number-pad"
        keyboardAppearance="dark"
        returnKeyType="next"
        returnKeyLabel="next"
        onChangeText={onPhone}
        maxLength={8}
        minLength={8}
        onBlur={handleBlur('mobilePhone')}
      />
      <ErrorMessage errorValue={touched.mobilePhone && errors.mobilePhone} />

      <GlobalButton title="Confirmer" onPress={Submit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
  },
  title: {
    textAlign: 'center',
    letterSpacing: 1.2,
    fontFamily: Font.primary,
    fontWeight: 'bold',
    fontSize: sizes.h6,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Font.primary,
    letterSpacing: 1.5,
    color: Color.primary,
  },
  description: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: '1%',
  },
  btnContainer: {
    width: WIDTH / 2,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
});
