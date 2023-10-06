import React, {useRef, useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Platform,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {PaperSelect} from 'react-native-paper-select';
// import messaging from '@react-native-firebase/messaging';

import {useFormik} from 'formik';
import * as Yup from 'yup';
// import TextInput from '../components/TextInput';
import {TextInput} from 'react-native-paper';
import * as api from '../services/api';
import moment from 'moment/min/moment-with-locales';
import {CostumButton} from '../components/Button/CostumButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {windowHeight, windowWidth} from '../utils/Dimension';

import {Color, Font} from '../constants/colors/color';
import {useRecoilState} from 'recoil';
import {
  // multiSelectItems,
  selectedAddressAtom,
  selectedIntereestAtom,
} from '../atom/responseSurveyState';
import ErrorMessage from '../components/ErrorMessage';
import {GlobalButton} from '../components/Button/GlobalButton';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

// ***************************************************************
// *******************check inpurt with FORMIK *******************
//****************************************************************

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Le nom est requis*')
    .min(3, "le nom d'utilisateur doit comporter au moins 3 caractères ")
    .max(15, "le nom d'utilisateur doit comporter moins de 15 caractères")
    .matches(/^(?!\s*$).+/, 'Le nom est requis*'),
  email: Yup.string().email('Invalid email*').required('Required*').trim(),
  password: Yup.string()
    .min(6, 'mot de passe doit etre 6 caractères au minimum*')
    .required('mot de passe est requis*'),
  confPassword: Yup.string()
    .min(6, 'mot de passe doit etre 6 caractères au minimum*')
    .required('confirmation de mot de passe est requis*')
    .oneOf(
      [Yup.ref('password'), null],
      'confirmation de mot de passe est incorrecte*',
    ),
  firstname: Yup.string()
    .required('Le prénom obligatoire*')
    .matches(
      /^[A-Za-z ]+$/,
      'le prénom est obligatoire et accepte  que des lettres*',
    )
    .trim(),
  lastname: Yup.string()
    .required('nom obligatoire*')
    .matches(
      /^[A-Za-z ]+$/,
      'le nom est obligatoire et accepte  que des lettres*',
    )
    .trim(),
  mobilePhone: Yup.string()
    .required('numero du telephone obligatoir*')
    .max(8, 'numéro doit etre  8 chiffres*')
    .min(8, 'numéro doit etre  8 chiffres*')

    .required('Numéro de téléphone obligatoire*'),
  cin: Yup.string()
    .matches(/^[0-9]+$/, 'veuillez saisir que des chiffres*')
    .min(8, 'numéro minimum  8 chiffres*')
    .max(8, 'numéro maximum  8 chiffres*'),
  // sex: Yup.string().required('Sex obligatoire'),
  //address: Yup.string().required('Adresse obligatoire'),
  zipCode: Yup.string()
    .min(4, 'code postal minimum  4 chiffres*')
    .max(4, 'code postal maximum  4 chiffres*')
    .required('Code postale obligatoire*'),
});

// ***************************************************************
// ******************* SignupScreen ******************************
//****************************************************************
export const SignupScreen = ({navigation}) => {
  const [openAdr, setOpenAdr] = useState(false);

  const [comp, setcompaniesValue] = useState([]);
  const [items, setItems] = useState([{_id: '', value: ''}]);
  // const [multi, setMulti] = useRecoilState(multiSelectItems);
  const [selectedAdress, setSelectedAdress] = useState('');

  const [sexValue, setsexValue] = useState();
  const [addressValue, setaddressValue] = useState([{_id: '', value: ''}]);

  // check if inout in data base state
  const [loadUSerName, setLoadUSerName] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [userValid, setUserValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const [loadEmail, setLoadEmail] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  //  this for api when i veridy user by phone
  const [loadPhone, setLoadPhone] = useState(false);
  const [phoneExist, setPhoneExist] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [allAdress, setAllAdress] = useState([]);
  const [emptyLoad, setEmptyLoad] = useState(false);

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(1980, 1, 1));
  const [expanded, setExpanded] = useState(true);
  const [interestColor, setInterestColor] = useState(false);
  const [gendertColor, setGenderColor] = useState(false);
  const [adrtColor, setAdrColor] = useState(false);
  const [dateColor, setDatecolor] = useState(false);
  const [checked, setChecked] = useState('h');
  const [choseAddress, setChoseAddress] = useRecoilState(selectedAddressAtom);
  const [choseInterrest, setChoseInterrest] = useRecoilState(
    selectedIntereestAtom,
  );
  const confPassword = useRef(null);
  const password = useRef(null);
  const userNameRef = useRef(null);
  const mobilePhoneRef = useRef(null);
  const emailRef = useRef(null);

  const scroll = useRef();

  // ***************************************************************
  // ******************* get All Adress   ***************************
  //****************************************************************

  const getAllAdress = async () => {
    try {
      let arr = [];
      const adr = await fetchAdress();
      adr?.map(el => {
        arr.push({_id: el.id, value: el.name});
      });
      setAllAdress(() => arr);
    } catch (e) {}
  };

  const fetchAdress = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      let getadr = await fetch(
        `http://94.237.82.88:8082/city`,
        requestOptions,
      );
      let response = getadr.json();
      return response;
    } catch (e) {}
  };

  // ***************************************************************
  // ******************* handlePress calender  *********************
  //****************************************************************

  const handlePress = () => setExpanded(!expanded);
  const showPicker = () => {
    setIsPickerShow(true);
  };

  // ***************************************************************
  // ******************* on change the date ************************
  //****************************************************************

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  // ***************************************************************
  // ******************* _getALlIntreset  **************************
  //****************************************************************
  useEffect(() => {
    _getALlIntreset();
    getAllAdress();
    // LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  // ***************************************************************
  // ******************* _mapAllIntresetWhenCampChange  ************
  //****************************************************************
  useEffect(() => {
    _mapAllIntresetWhenCampChange();
  }, [comp]);

  useEffect(() => {
    _renderAllAdressinObj();
  }, [allAdress]);

  // ***************************************************************
  // ******************* save device id   **************************
  //****************************************************************

  // ***************************************************************
  // ******************* _getALlIntreset  **************************
  //****************************************************************
  const _renderAllAdressinObj = () => {
    setChoseAddress({
      ...choseAddress,
      list: allAdress,
    });
  };

  const _getALlIntreset = () => {
    let arrayOfInterrest = [];
    api.getInterests().then(resp => {
      resp?.map(el => {
        arrayOfInterrest.push({_id: el.id, value: el.name});
      });
      setcompaniesValue(() => arrayOfInterrest);
    });
  };

  // ***************************************************************
  // ******************* _mapAllIntresetWhenCampChange  ************
  //****************************************************************
  const _mapAllIntresetWhenCampChange = () => {
    setChoseInterrest({
      ...choseInterrest,
      list: comp,
    });
  };

  // ***************************************************************
  // ******************* chenge the gender of user   ****************
  //****************************************************************

  // **********************************************************************
  // ****** check if use select address or interesst validator   **********
  //************************************************************************
  const selectValidator = value => {
    if (!value || value.length <= 0) {
      return false;
    }

    return true;
  };

  // ***************************************************************
  // ******************* FORLIK SETUP  *****************************
  //****************************************************************

  const {handleChange, handleBlur, values, errors, touched} = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      confPassword: '',
      mobilePhone: '',
      cin: '',
      email: '',
      sex: '',
      address: '',
      zipCode: '',
    },
  });
  // *******************************************************************************************
  // *************** Focus input when submit with not filling input  ***************************
  // *******************************************************************************************
  const focususerNameInput = () => {
    if (values.username === '') {
      userNameRef.current.focus();
      return false;
    }
    return true;
  };
  const focuspasswordInput = () => {
    if (values.password === '') {
      password.current.focus();

      return false;
    }
    if (values.confPassword === '') {
      confPassword.current.focus();
      return false;
    }

    return true;
  };
  const focusEmailInput = () => {
    if (values.email === '') {
      emailRef.current.focus();

      return false;
    }
    return true;
  };

  const focusMobilePhoneInput = () => {
    if (values.mobilePhone === '') {
      mobilePhoneRef.current.focus();
      return false;
    }
    return true;
  };

  focusDate = () => {
    let checkselectedDate =
      new Date(1980, 1, 1).toLocaleDateString() == date.toLocaleDateString();
    if (checkselectedDate) {
      setDatecolor(true);

      return false;
    }

    return true;
  };

  // ***********************************************************
  // *************** CREAT USER ********************************
  // ***********************************************************

  const _createUser = () => {
    if (!selectValidator(choseAddress.value)) {
      setChoseAddress({
        ...choseAddress,
        error: 'Vous devez sélectionner Votre address*',
      });
    }

    if (!selectValidator(choseInterrest.value)) {
      setChoseInterrest({
        ...choseInterrest,
        error: "Vous devez sélectionner au moins un centre d'intérêt*",
      });
    }
    let arrayOfInterrest = [];
    choseInterrest.selectedList?.map(el => {
      arrayOfInterrest.push(el._id);
    });

    focususerNameInput();
    focusEmailInput();
    focuspasswordInput();
    focusMobilePhoneInput();
    const checkall =
      focususerNameInput() &&
      focusEmailInput() &&
      focuspasswordInput() &&
      focusMobilePhoneInput() &&
      selectValidator(choseAddress.value) &&
      selectValidator(choseInterrest.value);

    if (checkall) {
      const modifiedData = {
        username: values.username,
        firstname: values.firstname,
        lastname: values.lastname,
        password: values.password,
        confPassword: values.confPassword,
        birthDay: moment(date).format('DD/MM/YYYY'),
        mobilePhone: values.mobilePhone,
        cin: values.mobilePhone,
        email: values.email,
        sex: checked,
        address: choseAddress.selectedList[0]['_id'],
        status: 'false',
        zipCode: values.zipCode,
        interestIds: arrayOfInterrest,
      };
      setUserExist(false);
      setEmailExist(false);
      setUserValid(false);
      setEmailValid(false);

      setLoadUSerName(true);
      setLoadEmail(true);

      setEmailValid(false);
      // scroll.current?.scrollToOffset({ offset: 0, animated: true }),
      // // scroll.current.scrollToOffset({ offset: 0, animated: true });
      scroll.current.scrollTo({x: 0, y: 0, animated: false});
      // userNameRef.current.focus()
      // Keyboard.dismiss()
      setTimeout(async () => {
        Promise.all([
          await api.verifusername(values.username),
          await api.verifMail(values.email),
        ])
          .then(response => {
            if (response[0].data) {
              setLoadUSerName(false);
              setUserExist(false);
              setUserValid(true);
            } else {
              setLoadUSerName(false);
              setUserExist(true);
              setUserValid(false);
            }

            if (response[1].data) {
              setLoadEmail(false);
              setEmailExist(false);
              setEmailValid(true);
            } else {
              setLoadEmail(false);
              setEmailExist(true);
              setEmailValid(false);
            }
          })
          .catch(err => {
            throw err;
          });

        api
          .createUser(modifiedData)
          .then(res => {
            if (res.status == 200) {
              api.getUserByUserName(modifiedData.username).then(resp => {
                setTimeout(() => {
                  navigation.navigate('ConfirmUser', {
                    data: resp.data,
                    autoLogin: {
                      user: values.username,
                      email: values.email,
                      text: values.password,
                    },
                  });
                }, 300);
              });
            }
          })
          .catch(err => {
            Alert.alert(
              "vérifiez que votre adresse e-mail ou votre nom d'utilisateur existe déjà",
            );
          });
      }, 1000);
    }
  };

  // *********************************************************************************************************
  // ******************************************** verify Exist from server ***********************************
  // *********************************************************************************************************

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        ref={scroll}
        // onContentSizeChange={() => scroll.current.scrollToEnd({ animated: true })}
      >
      <View style={{padding:'3%'}}>

        <Icon
          name="arrow-back"
          color="#000"
          size={28}
          onPress={() => navigation.goBack()}
        />
      </View>
        <View style={styles.aLLInputContainer}>
          <Text style={styles.title}>S’enregistrer</Text>
          {/* ***************************************************************************************************************** */}
          {/* **************************************************** user name *************************************************** */}

          <View style={styles.inputContainer}>
            <View style={styles.OneInputContainer}>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={userNameRef}
                  value={values.username}
                  placeholder="Nom & prénom"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  // onSubmitEditing={() => handleSubmit()}
                  onChange={() => {
                    setUserExist(false);
                    setUserValid(false);
                  }}
                  error={touched.email && errors.email}
                  left={<TextInput.Icon name="account" color="gray"/>}
                  activeOutlineColor="#5568FD"
                  style={styles.input}
                />
                <ErrorMessage
                  errorValue={touched.username && errors.username}
                />
              </View>

              {/* ***************** check if user exist in database ***************** */}
              <View style={styles.loaderContainer}>
                {loadUSerName && (
                  <ActivityIndicator size="small" color="#0000ff" />
                )}

                {userExist && (
                  <AntDesign name="check" size={25} color="green" />
                )}
                {userValid && (
                  <AntDesign name="closecircleo" size={25} color="red" />
                )}
              </View>
            </View>
          </View>
          {/* ************************************************************************************************************** */}
          {/* **************************************************** EMAIL *************************************************** */}

          <View style={styles.inputContainer}>
            <View style={styles.OneInputContainer}>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={emailRef}
                  value={values.email}
                  placeholder="foulen@foulen.com"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  // onSubmitEditing={() => handleSubmit()}
                  onChange={() => {
                    setEmailExist(false);
                    setEmailValid(false);
                  }}
                  error={touched.email && errors.email}
                  left={<TextInput.Icon name="mail" color="gray"/>}
                  activeOutlineColor="#5568FD"
                  style={styles.input}
                />
                <ErrorMessage errorValue={touched.email && errors.email} />
              </View>

              {/* ***************** check if user exist in database ***************** */}
              <View style={styles.loaderContainer}>
                {loadEmail && (
                  <ActivityIndicator size="small" color="#0000ff" />
                )}

                {emailExist && (
                  <AntDesign name="check" size={25} color="green" />
                )}
                {emailValid && (
                  <AntDesign name="closecircleo" size={25} color="red" />
                )}
              </View>
            </View>
          </View>
          {/* ***************************************************************************************************************** */}
          {/* **************************************************** PASSWORD *************************************************** */}
          <View style={styles.inputContainer}>
            <View style={styles.OneInputContainer}>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={password}
                  icon="lock"
                  value={values.password}
                  placeholder="***********************"
                  secureTextEntry
                  // autoCapitalize="none"
                  // keyboardAppearance="dark"
                  // returnKeyType="next"
                  // returnKeyLabel="next"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  // onSubmitEditing={() => handleSubmit()}
                  keyboardType="default"
                  renderRightAccessory={() => (
                    <Icon
                      name={passwordVisible ? 'eye' : 'eye-off'}
                      size={24}
                      color="#000"
                      style={styles.icon}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                  )}
                  error={touched.password && errors.password}
                  left={<TextInput.Icon name="lock" color="gray"/>}
                  activeOutlineColor="#5568FD"
                  style={styles.input}
                />
                <ErrorMessage
                  errorValue={touched.password && errors.password}
                />
              </View>
            </View>
          </View>
          {/* ***************************************************************************************************************** */}
          {/* **************************************************** CONFIRM PASWORD ******************************************** */}

          <View style={styles.inputContainer}>
            <View style={styles.OneInputContainer}>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={confPassword}
                  icon="lock"
                  value={values.confPassword}
                  placeholder="*******************"
                  secureTextEntry
                  // autoCapitalize="none"
                  // keyboardAppearance="dark"
                  // returnKeyType="next"
                  // returnKeyLabel="next"
                  onChangeText={handleChange('confPassword')}
                  onBlur={handleBlur('confPassword')}
                  // onSubmitEditing={() => handleSubmit()}
                  keyboardType="default"
                  error={touched.confPassword && errors.confPassword}
                  left={<TextInput.Icon name="lock" color="gray"/>}
                  activeOutlineColor="#5568FD"
                  style={styles.input}
                />
                <ErrorMessage
                  errorValue={touched.confPassword && errors.confPassword}
                />
              </View>
            </View>
          </View>
            <View style={styles.inputContainer}>
            <View style={styles.OneInputContainer}>
              <View style={styles.textInputContainer}>
                <TextInput
                  icon="user"
                  value={values.firstname}
                  placeholder="Entrez votre prénom*"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onChangeText={handleChange('firstname')}
                  onBlur={handleBlur('firstname')}
                  // onSubmitEditing={() => handleSubmit()}
                  error={touched.firstname && errors.firstname}
                  style={styles.input}
                />
                <ErrorMessage
                  errorValue={touched.firstname && errors.firstname}
                />
              </View>
            </View>
          </View>
          {/* ****************************************************************************************************************** */}
          {/* **************************************************** LAST NAME *************************************************** */}

          <View style={styles.inputContainer}>
            <View style={styles.OneInputContainer}>
              <View style={styles.textInputContainer}>
                <TextInput
                  icon="user"
                  value={values.lastname}
                  placeholder="Entrez votre nom*"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onChangeText={handleChange('lastname')}
                  onBlur={handleBlur('lastname')}
                  // onSubmitEditing={() => handleSubmit()}
                  error={touched.lastname && errors.lastname}
                  style={styles.input}
                />
                <ErrorMessage
                  errorValue={touched.lastname && errors.lastname}
                />
              </View>
            </View>
          </View>
          {/* ****************************************************************************************************************** */}
          {/* **************************************************** TELEPHONE *************************************************** */}

          <View style={styles.inputContainer}>
            <View style={styles.OneInputContainer}>
              <View style={styles.textInputContainer}>
                <TextInput
                  ref={mobilePhoneRef}
                  icon="phone"
                  value={values.mobilePhone}
                  placeholder="Entrez numéro du téléphone*"
                  maxLength={8}
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onChangeText={handleChange('mobilePhone')}
                  onBlur={handleBlur('mobilePhone')}
                  // onSubmitEditing={() => handleSubmit()}
                  keyboardType="numeric"
                  error={touched.mobilePhone && errors.mobilePhone}
                  style={styles.input}
                />
                <ErrorMessage
                  errorValue={touched.mobilePhone && errors.mobilePhone}
                />
              </View>
              <View style={styles.loaderContainer}>
                {emptyLoad && (
                  <ActivityIndicator size="small" color="#0000ff" />
                )}

                {emptyLoad && (
                  <AntDesign name="check" size={25} color="green" />
                )}
                {emptyLoad && (
                  <AntDesign name="closecircleo" size={25} color="red" />
                )}
              </View>
            </View>
          </View>
          {/* ************************************************************************************************************* */}
          {/* ****************************************************  ZIP CODE   ******************************************** */}
          <View style={styles.inputContainer}>
            <View style={styles.OneInputContainer}>
              <View style={styles.textInputContainer}>
                <TextInput
                  icon="enviromento"
                  value={values.zipCode}
                  placeholder="code postal*"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onChangeText={handleChange('zipCode')}
                  onBlur={handleBlur('zipCode')}
                  // onSubmitEditing={() => handleSubmit()}
                  maxLength={4}
                  error={touched.zipCode && errors.zipCode}
                  style={styles.input}
                />
                <ErrorMessage errorValue={touched.zipCode && errors.zipCode} />
              </View>
              <View style={styles.loaderContainer}>
                {emptyLoad && (
                  <ActivityIndicator size="small" color="#0000ff" />
                )}

                {emptyLoad && (
                  <AntDesign name="check" size={25} color="green" />
                )}
                {emptyLoad && (
                  <AntDesign name="closecircleo" size={25} color="red" />
                )}
              </View>
            </View>
          </View>
          {/* ********************************************************************************************************************* */}
          {/* ****************************************************  DATE DE NAISSANCE  ******************************************** */}

          <TouchableOpacity
            onPress={() => showPicker()}
            style={styles.datePickerContainer}>
            <View style={styles.iconStyle}>
              <AntDesign name="calendar" size={25} color="#000" />
            </View>
            <View style={styles.input}>
              <Text
                style={[
                  styles.dateText,
                  {color: dateColor ? 'red' : Color.secondary},
                ]}>
                {date.toLocaleDateString()}
              </Text>
              {/* <Text style={{textAlign: 'left'}}>
                Selectionner votre date de naissance
              </Text> */}

              {isPickerShow && (
                <DateTimePicker
                  value={date}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  onChange={onChange}
                  style={styles.datePicker}
                />
              )}
            </View>
          </TouchableOpacity>
          <View style={{justifyContent: 'center', alignSelf: 'center'}}>
            <Text style={{fontFamily: Font.primary}}>
              Selectionner votre sex
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <RadioButton
                  status={checked === 'h' ? 'checked' : 'unchecked'}
                  value="h"
                  onPress={() => setChecked('h')}
                  color={Color.secondary}
                />
                <Text>homme</Text>
              </View>
              <View>
                <RadioButton
                  value="f"
                  status={checked === 'f' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('f')}
                  color={Color.secondary}
                />
                <Text>femme</Text>
              </View>
            </View>
          </View>

          {/* ************************************************************************************************************ */}

          {/* ************************************************************************************************************ */}
          {/* ****************************************************  ADDRESS   ******************************************** */}
          {/* ****************************************************  ADDRESS   ******************************************** */}
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: '80%',
              alignSelf: 'center',
              marginTop: '5%',
            }}>
            <PaperSelect
              label="Selectionnez votre address"
              value={choseAddress.value}
              onSelection={value => {
                setChoseAddress({
                  ...choseAddress,
                  value: value.text,
                  selectedList: value.selectedList,
                  error: '',
                });
              }}
              arrayList={[...choseAddress.list]}
              selectedArrayList={[...choseAddress.selectedList]}
              errorText={choseAddress.error}
              multiEnable={false}
              dialogTitleStyle={{color: '#000'}}
              checkboxColor="blue"
              checkboxLabelStyle={{color: 'black', fontWeight: '700'}}
              textInputBackgroundColor="#fff"
              textInputColor="red"
              outlineColor="black"
              searchPlaceholder="rechercher"
              modalCloseButtonText="Annuler"
              modalDoneButtonText="confirmer"
              theme={{
                colors: {
                  placeholder: 'black',
                },
              }}
              dialogStyle={{backgroundColor: 'white', borderRadius: 10}}
            />
          </View>
          {/* ************************************************************************************************************** */}
          {/* ****************************************************  INTERESST   ******************************************** */}
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: '80%',
              alignSelf: 'center',
            }}>
            <PaperSelect
              label="Selectionnez votre centre d'interret"
              value={choseInterrest.value}
              onSelection={value => {
                setChoseInterrest({
                  ...choseInterrest,
                  value: value.text,
                  selectedList: value.selectedList,
                  error: '',
                });
              }}
              arrayList={[...choseInterrest.list]}
              selectedArrayList={choseInterrest.selectedList}
              errorText={choseInterrest.error}
              multiEnable={true}
              searchStyle={{iconColor: '#000'}}
              searchPlaceholder="rechercher"
              modalCloseButtonText="Annuler"
              modalDoneButtonText="confirmer"
              theme={{
                colors: {
                  placeholder: 'black',
                },
              }}
              dialogStyle={{backgroundColor: 'white', borderRadius: 10}}
            />
          </View>

          {/* ************************************************************************************************ */}
          {/* *****************************  Submit    ******************************************************* */}
          {/* <View style={{marginTop: '3%'}}>
            <GlobalButton
              title="confirmer"
              onPress={() => {
                _createUser();
              }}
            />
          </View> */}
          <TouchableOpacity onPress={() => {_createUser()}} style={styles.customButton}>
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
                S’enregistrer
              </Text>
              <View style={{backgroundColor: '#495EED', borderRadius: 30,alignSelf:'center'}}>
                <AntDesign name="arrowright" color="white" size={22} />
              </View>
            </View>
      </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              marginTop: '3%',
              marginBottom: '8%',
              alignSelf: 'center',
            }}>
            <Text style={{fontWeight:'bold'}}>Vous avez un compte? </Text>
            <Text
              onPress={() => {
                setChoseInterrest({
                  ...choseInterrest,
                  error: '',
                });
                setChoseAddress({
                  ...choseAddress,
                  error: '',
                });
                navigation.navigate('Login');
              }}
              style={styles.signup}>
              Login
            </Text>
          </View>

          {/* ******************************************************************************************************************** */}
          {/* ******************************************************************************************************************** */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  
  customButton: {
    borderRadius: 10,
    width: WIDTH / 1.7,
    backgroundColor: '#F2583E',
    alignSelf: 'center',
    height: HEIGHT / 14,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Color.light,
    paddingBottom: 10,
  },
  backgroundImageContainer: {
    width: '100%',
    height: 120,
  },
  backgroundImage: {
    width: WIDTH,
    height: HEIGHT,
    flex: 1,
  },
  aLLInputContainer: {},
  title: {
    fontSize: 22,
    fontFamily: Font.primary,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    paddingLeft: '15%',
  },
  inputContainer: {
    justifyContent: 'center',
  },
  inputError: {
    textAlign: 'center',
    color: 'red',
  },
  firstBtnContainer: {
    width: WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  OneInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textInputContainer: {
    flexGrow: 1,
    marginLeft:30,
    marginRight:30
  },
  loaderContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  datePickerContainer: {
    marginLeft:-10,
    // marginRight:30,
    marginTop: 5,
    marginBottom: 10,
    width:'80%',
    height: windowHeight / 15,
    borderColor: 'gray',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconStyle: {
    padding: 10,
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: Font.primary,
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    // color: Color.secondary ,
    fontSize: 18,
  },
  signup: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5669FF',
  },
  input:{
    backgroundColor: 'white',
  },
});

export default SignupScreen;
