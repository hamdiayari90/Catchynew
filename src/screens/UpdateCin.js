import React, {useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import * as api from '../services/api';
import * as Yup from 'yup';
import {WIDTH, HEIGHT} from '../utils/Dimension';

import {useFormik} from 'formik';
import ErrorMessage from '../components/ErrorMessage';
import {TextInput} from 'react-native-paper';
import sanitize from 'sanitize-html';
import {CostumButton} from '../components/Button/CostumButton';
import {Color} from '../constants/colors/color';
import { navigate } from '../navigation/RootNavigation';

const CinSchema = Yup.object().shape({
  cin: Yup.string()
    .required('Le cin est requis*')
    .min(8, 'le cin doit etre 8 numéro')
    .max(8, 'le cin doit etre 8 numéro')
    .matches(/^[0-9]+$/, 'veuillez saisir que des chiffres*'),
});

export const UpdateCin = ({navigation, route}) => {
  const {id} = route.params.user;
  const {item} = route.params



  const {handleBlur, handleSubmit, handleChange, values, errors, touched} =
    useFormik({
      validationSchema: CinSchema,
      initialValues: {cin: ''},
      onSubmit: values => {
        updateCinByID(id, values.cin);
  
      },
    });
  const cin = useRef(null);

  const updateCinByID = async (id, cin) => {
    //************************************ */
    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: cin,
      };
      let response = await fetch(
        `http://145.239.166.14:8082/user/updateCin/${id}`,
        requestOptions,
      );

      let result = response.ok;
      if (result == true) {
         
         navigate('Event', {
          item: item,
          long: item.locations[0].longitude,
          lat: item.locations[0].latitude,
        })
      } else {
        alret('something went wrong!');
      }


      return result;
    } catch (e) {}
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/screenBackground/sighupscreen.png')}
        resizeMode="stretch"
        imageStyle={{opacity: 0.8}}
        style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.subTitle}>
            Pour jouer à l'événement, vous devez mettre à jour votre numéro cin
          </Text>

          <View
            style={{paddingHorizontal: 32, marginBottom: 16, width: '100%'}}>
            <TextInput
              ref={cin}
              icon="lock"
              value={values.cin}
              placeholder="Entrez votre cin"
              maxLength={8}
              keyboardType="numeric"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              onChangeText={handleChange('cin')}
              onBlur={handleBlur('cin')}
              error={errors.cin}
              touched={touched.cin}
              left={<TextInput.Icon name="id-card" />}
              onSubmitEditing={() => handleSubmit()}
              activeUnderlineColor="green" //when this TextInput is active, change its accent color to green
              style={{
                borderTopEndRadius: 15,
                borderTopStartRadius: 15,
              }}
            />
            <ErrorMessage errorValue={touched.cin && errors.cin} />
          </View>

          <View style={styles.nextButton}>
            <CostumButton title="envoyer" onPress={handleSubmit} />
          </View>

          <View style={styles.goBackContainer}>
            <Text>
              retourner à la page d'{' '}
              <Text
                style={styles.connectionTExt}
                onPress={() => navigation.goBack(null)}>
                evennemnt
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    width: WIDTH,
    height: HEIGHT,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    marginTop: '62%',
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
});
