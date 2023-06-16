import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  Platform,
  Image,
  BackHandler,
  Alert,
  Button,
  Switch,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {useIsFocused} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import {userInfomation} from '../atom/auth';
import {TextInput} from 'react-native-paper';
import {CostumButton} from '../components/Button/CostumButton';
import {Formik} from 'formik';
import * as Yup from 'yup';

import * as api from '../services/api';
import moment from 'moment/min/moment-with-locales';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {HEIGHT, WIDTH, windowHeight} from '../utils/Dimension';
import {SwitchPage} from '../components/SwitchPage/SwitchPage';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Color, Font} from '../constants/colors/color';
import {PaperSelect} from 'react-native-paper-select';
import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  baseUrl,
  multiSelectItems,
  selectedAddressAtom,
  selectedIntereestAtom,
  selectedInterrest,
} from '../atom/responseSurveyState';
import {MultiSelectAddress} from '../components/MultiSelectConfirm/MultiSelectAddress';
import {PickAdress} from '../components/selectAdress/PickAdress';
import {GlobalButton} from '../components/Button/GlobalButton';

export const selectValidator = value => {
  if (!value || value.length <= 0) {
    return 'Please select a value.';
  }

  return '';
};
const LoginSchema = Yup.object().shape({
  firstname: Yup.string()
    .required('Le prénom obligatoire')
    .matches(
      /^[A-Za-z ]+$/,
      'le prénom est obligatoire et accepte  que des lettres',
    )
    .trim(),

  username: Yup.string()
    .required('Le nom est requis')
    .matches(/^(?!\s*$).+/, 'Le nom est requis'),
  confPassword: Yup.string()
    .min(6, 'mot de passe doit etre 6 caractères au minimum')
    .oneOf(
      [Yup.ref('password'), null],
      'confirmation de mot de passe est incorrecte',
    ),
  lastname: Yup.string()
    .required('nom obligatoire')
    .matches(
      /^[A-Za-z ]+$/,
      'le nom est obligatoire et accepte  que des lettres',
    )
    .trim(),
  email: Yup.string().email('Invalid email').required('Email obligatoire'),
  mobilePhone: Yup.string()
    .matches(/^[0-9]+$/, 'veuillez saisir que des chiffres')
    .min(8, 'numéro minimum  8 chiffres')
    .max(8, 'numéro maximum  8 chiffres')
    .required('Numéro de téléphone obligatoire'),
  cin: Yup.string()
    .matches(/^[0-9]+$/, 'veuillez saisir que des chiffres')
    .min(8, 'numéro minimum  8 chiffres')
    .max(8, 'numéro maximum  8 chiffres')
    .required('CIN obligatoire'),

  sex: Yup.string().required('Sex obligatoire'),
  address: Yup.string().required('Adresse obligatoire'),
  zipCode: Yup.string()
    .min(4, 'code postal minimum  4 chiffres')
    .max(4, 'code postal maximum  4 chiffres')
    .required('Code postale obligatoire'),
});

export const ProfileScreen = ({navigation}) => {
  // handle press buttom
  const backAction = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const [items, setItems] = useState([{_id: '', value: ''}]);
  const [date, setDate] = useState(new Date(1598051730000));
  const [value, setValue] = useState([]);
  const [userData, setUSerData] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  const [usernameErr, setUsernameErr] = useState('');
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sexValue, setsexValue] = useState('');
  const [intresstValue, setIntresstValue] = useState('');
  const [open, setOpen] = useState(false);
  const [openSexPicker, setOpenSexPicker] = useState(false);
  const [openAdr, setOpenAdr] = useState(false);
  const [comp, setcompaniesValue] = useState([]);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [selectedAdress, setSelectedAdress] = useState({_id: '', value: ''});
  const [addressValue, setaddressValue] = useState([{_id: '', value: ''}]);
  const [justSubmit, setJustSubmit] = useState(false);
  const [allAdress, setAllAdress] = useState([]);
  const [userPoints, setUSerPoints] = useState({});
  const userNameRef = useRef(null);
  const mobilePhoneRef = useRef(null);
  const emailRef = useRef(null);
  const [selected, setSelected] = useRecoilState(selectedInterrest);
  const [multi, setMulti] = useRecoilState(multiSelectItems);
  const [checked, setChecked] = useState('');
  const [userDetail, setUserdetail] = useRecoilState(userInfomation);
  const [choseAddress, setChoseAddress] = useRecoilState(selectedAddressAtom);
  const [choseInterrest, setChoseInterrest] = useRecoilState(
    selectedIntereestAtom,
  );
  const [pickerMode, setPickerMode] = useState(null);
  const [inline, setInline] = useState(false);
  const url = useRecoilValue(baseUrl);
  const showDatePicker = () => {
    setPickerMode('date');
  };

  const hidePicker = () => {
    setPickerMode(null);
  };

  const handleConfirm = date => {
    // In order to prevent the double-shown popup bug on Android, picker has to be hidden first (https://github.com/react-native-datetimepicker/datetimepicker/issues/54#issuecomment-618776550)
    hidePicker();
    setDate(date);

    console.log('A date has been picked: ', date);
  };
  const _renderAllAdressinObj = async () => {
    const arr = [];

    setaddressValue([{_id: '', value: ''}]);
    allAdress.map((e, i) => {
      setaddressValue(items => [...items, {value: e.name, _id: e.id}]);
    });
    setaddressValue(prev => prev.filter(el => el.value !== ''));
    const userInfo = await fetchUSerInformation(userDetail.id);

    setUSerData(userInfo);
    userInfo.interests.map(el => {
      arr.push({_id: el.id, value: el.name});
      setIntresstValue(prev => prev + el.name + ', ');
    });
    setSelected(() => arr);

    setDate(() => new Date(userInfo.birthDay));
    // here w shoud udate the adress from
    // setsexValue(() => userInfo.sex);
    setChecked(() => userInfo.sex);

    setSelectedAdress(() => userInfo.address.id);

    setUSerPoints(() => userInfo);
    setChoseAddress({
      ...choseAddress,
      list: addressValue,
      selectedList: [{_id: userInfo.address.id, value: userInfo.address.value}],
      value: userInfo.address.name,
    });

    setChoseInterrest({
      ...choseInterrest,
      list: items,
      selectedList: selected,
      value: intresstValue.slice(0, -2), // this is to delete the last  2 caracter from this stgng (' ,') from this string
    });
    setLoading(() => true);
  };

  const isFocused = useIsFocused();

  // ***************************************************************
  // ******************* get All Adress   ***************************
  //****************************************************************

  const getAllAdress = async () => {
    try {
      const adr = await fetchAdress();
      setAllAdress(adr);
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
      let getadr = await fetch(`${url}/city`, requestOptions);
      let response = getadr.json();
      return response;
    } catch (e) {}
  };

  useEffect(() => {
    if (isFocused) {
      _renderAllAdressinObj();
    }
  }, [allAdress, isFocused]);

  useEffect(() => {
    if (isFocused) {
      // handleLoading();
      getAllInterreset();
      getAllAdress();
    }
  }, [updated, isFocused]);
  useEffect(() => {
    if (isFocused) {
      // handleLoading();
      getAllInterreset();
      getAllAdress();
    }
  }, [isFocused]);
  useEffect(() => {
    getAllData();
  }, [comp]);

  const getAllInterreset = () => {
    setLoading(false);
    api.getInterests().then(resp => {
      setcompaniesValue(resp);
      setFlag(true);
    });
  };
  const getAllData = () => {
    setItems([{_id: '', value: ''}]);

    comp.forEach(e => {
      setItems(items => [...items, {value: e.name, _id: e.id}]);
    });
    // add this line to remove any empty intresst
    setItems(prev => prev.filter(el => el.value !== ''));

    AsyncStorage.getItem('profile')
      .then(result => {
        if (result !== null) {
          const parsedToken = JSON.parse(result);
          const token = jwt_decode(parsedToken);
          api
            .getUserById(token.id)
            .then(res => {
              if (res.data) {
                setRefreshing(true);
                setValue(res.data.interestIds);
              }
            })
            .catch(function (error) {});
        }
      })

      .catch(error => Alert.alert("veuillez contacter l'administrateur"));
  };

  const Submit = values => {
    setFlag(false);
    setUsernameErr('');

    const modifiedData = {
      id: userData.id,
      firstname: values.firstname,
      lastname: values.lastname,
      username: values.username,
      password: values.password ? values.password : 'notEdited',
      birthDay: moment(date).format('DD/MM/YYYY'),
      mobilePhone: values.mobilePhone,
      cin: '',
      email: values.email,
      sex: sexValue,
      address: selectedAdress,
      status: 'true',
      zipCode: values.zipCode,
      interestIds: value,
    };
    api.modifyUserProfile(modifiedData).then(res => {
      values.password = '';
      values.confPassword = '';
      navigation.navigate('Home');
      // setUpdated(!updated);
    });
  };

  const fetchUSerInformation = async token => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      let loyaltyPoints = await fetch(`${url}/user/${token}`, requestOptions);
      let data = loyaltyPoints.json();
      return data;
    } catch (e) {}
  };

  // ***************************************************************
  // ******************* Loading screen ****************************
  //****************************************************************
  handleLoading = () => {
    setTimeout(() => {
      setLoading(true);
    }, 100);
  };

  // ***************************************************************
  // ******************* on change the date ************************
  //****************************************************************
  const onChange = (event, value) => {
    console.log('value:', value);
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };
  // ***************************************************************
  // ******************* handlePress calender  *********************
  //****************************************************************

  const showPicker = () => {
    setIsPickerShow(true);
  };
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
  // ******************* RENDER    *********************************
  //****************************************************************
  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={styles.container}
      contentContainerStyle={{marginBottom: 50}}>
      <Formik
        validationSchema={LoginSchema}
        enableReinitialize={true}
        initialValues={{
          firstname: userData.firstname,
          lastname: userData.lastname,
          username: userData.username,
          mobilePhone: userData.mobilePhone,
          cin: userData.cin,
          email: userData.email,
          birthDay: userData.birthDay,
          sex: sexValue,
          address: addressValue,
          zipCode: userData.zipCode,
        }}
        onSubmit={values => setJustSubmit(false)}>
        {({handleChange, handleBlur, values, errors, touched}) => {
          const _updateUSer = () => {
            let arrayOfInterrest = [];
            choseInterrest.selectedList.map(el => {
              arrayOfInterrest.push(el._id);
            });

            {
              /*  here check if the user by accedient just forget to select and address 
            so he need to selec one and to avoit eagly error commoing from undefined   */
            }

            if (selectValidator(choseAddress.value)) {
              choseAddress.selectedList[0]['_id']
                ? setSelectedAdress(() => choseAddress.selectedList[0]['_id'])
                : setSelectedAdress(userData.address.id);
            } else {
              setChoseAddress({
                ...choseAddress,
                error: 'Vous devez sélectionner Votre address*',
              });
            }

            if (!selectValidator(choseInterrest.value)) {
              setChoseInterrest({
                ...choseInterrest,
                error: "Sélectionner vos centres d'intérêtt*",
              });
            }
            if (
              selectValidator(choseInterrest.value) &&
              selectValidator(choseAddress.value)
            ) {
              let userInformation = {
                id: userData.id,
                firstname: values.firstname,
                lastname: values.lastname,
                username: values.username,
                password: values.password ? values.password : 'notEdited',
                birthDay: moment(date).format('DD/MM/YYYY'),
                mobilePhone: values.mobilePhone,
                cin: values.mobilePhone,
                email: values.email,
                sex: checked,
                address: choseAddress.selectedList[0]['_id'],
                status: 'true',
                zipCode: values.zipCode,
                interestIds: arrayOfInterrest,
              };
              api.modifyUserProfile(userInformation).then(res => {
                if (res.status == 200) {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Acceuil'}],
                  });
                  setUpdated(!updated);
                }
              });
            }
          };
          return (
            <SafeAreaView>
              {loading ? (
                <View style={{backgroundColor: '#fff'}}>
                  <TouchableOpacity onPress={()=> console.log('profile back')} style={{marginLeft:10,marginTop:10}}>
                    <View style={{flexDirection:'row'}}>
                      <AntDesign name="back" color="black" size={22} />
                      <Text style={{marginLeft:10,fontWeight:700,fontSize:24}}>Profile</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.allInputContainer}>

                    <View style={styles.oneInputContainer}>
                      <View style={styles.textContainer}>
                        <TouchableOpacity
                          style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            alignSelf:'center'
                          }}>
                            <Image
                              source={require('../assets/appIcones/userProfileImage.png')}
                              style={{height: 100, width: 100, borderRadius: 100}}
                            />
                            <Text style={{fontWeight:700,fontSize:24}}>{values.username}</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{flexDirection:'row',alignSelf:'center'}}>
                        <View style={{alignItems:'center'}}>
                          <Text style={{fontWeight:700,fontSize:16}}>{userPoints.loyaltyPoints}</Text>
                          <Text style={{fontWeight:700,fontSize:14,color:'gray'}}>Points</Text>
                        </View>
                      </View>

                      
                    {/* ************************************ USER NAME   ************************************  */}
                      <TextInput
                        mode='outlined'
                        ref={userNameRef}
                        icon="user"
                        value={values.username}
                        placeholder="Entrez votre nom d'utilisateur*"
                        autoCapitalize="none"
                        keyboardAppearance="dark"
                        returnKeyType="next"
                        returnKeyLabel="next"
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        // onSubmitEditing={() => handleSubmit()}
                        // onChange={() => {
                        //   setUserExist(false);
                        //   setUserValid(false);
                        // }}
                        error={touched.username && errors.username}
                        left={<TextInput.Icon name="account" color="gray"/>}
                        activeOutlineColor="#5568FD"
                        style={styles.input}
                      />
                    </View>

                    {/* ************************************ EMAIL  ************************************  */}
                    <View style={styles.oneInputContainer}>
                      <TextInput
                        ref={emailRef}
                        icon="mail"
                        value={values.email}
                        placeholder="Entrez votre email*"
                        autoCapitalize="none"
                        keyboardAppearance="dark"
                        returnKeyType="next"
                        returnKeyLabel="next"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        // onSubmitEditing={() => handleSubmit()}
                        // onChange={() => {
                        //   setEmailExist(false);
                        //   setEmailValid(false);
                        // }}
                        error={touched.email && errors.email}
                        mode='outlined'
                        left={<TextInput.Icon name="email" color="gray"/>}
                        activeOutlineColor="#5568FD"
                        style={styles.input}
                      />
                    </View>
                    {/* **************************************************** FIRST NAME  *************************************************** */}

                    <View style={styles.oneInputContainer}>
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
                        mode='outlined'
                        left={<TextInput.Icon name="account" color="gray"/>}
                        activeOutlineColor="#5568FD"
                        style={styles.input}
                      />
                    </View>
                    {/* **************************************************** LAST NAME *************************************************** */}

                    <View style={styles.oneInputContainer}>
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
                        mode='outlined'
                        left={<TextInput.Icon name="account" color="gray"/>}
                        activeOutlineColor="#5568FD"
                        style={styles.input}
                      />
                    </View>

                    <View style={styles.oneInputContainer}>
                      <TextInput
                        ref={mobilePhoneRef}
                        icon="phone"
                        value={values.mobilePhone}
                        placeholder="Entrez votre numéro du téléphone*"
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
                        mode='outlined'
                        left={<TextInput.Icon name="phone" color="gray"/>}
                        activeOutlineColor="#5568FD"
                        style={styles.input}
                      />
                    </View>

                    {/* ************************************************ DATE BIRTHDAY ******************************* */}
                    <View style={styles.root}>
                      <DateTimePickerModal
                        isVisible={pickerMode !== null}
                        mode={pickerMode}
                        onConfirm={handleConfirm}
                        onCancel={hidePicker}
                        display={inline}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => showDatePicker()}
                      style={styles.datePickerContainer}>
                      <View style={styles.iconStyle}>
                        <AntDesign name="calendar" size={25} color="#000" />
                      </View>
                      <View style={styles.input}>
                        <Text style={styles.dateText}>
                          {date.toLocaleDateString()}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {/* ****************************************************  ZID CODE    ******************************************** */}

                    <View style={styles.oneInputContainer}>
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
                        mode='outlined'
                        left={<TextInput.Icon name="phone" color="gray"/>}
                        activeOutlineColor="#5568FD"
                        style={styles.input}
                      />
                    </View>

                    {/* **************************************************************************************************************** */}
                    {/* **************************************************** GENDER  *************************************************** */}

                    <View
                      style={{justifyContent: 'center', alignSelf: 'center'}}>
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

                    {/* ****************************************************  ADDRESS   ******************************************** */}
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5',
                        width: '90%',
                        alignSelf: 'center',
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
                        checkboxLabelStyle={{
                          color: 'black',
                          fontWeight: '700',
                        }}
                        textInputBackgroundColor="#fff"
                        textInputColor="red"
                        outlineColor="black"
                        searchPlaceholder="rechercher"
                        modalCloseButtonText="Annuler"
                        modalDoneButtonText="confirmer"
                        textInputMode="outlined"
                        theme={{
                          colors: {
                            placeholder: 'black',
                          },
                        }}
                        dialogStyle={{
                          backgroundColor: 'white',
                          borderRadius: 10,
                        }}
                      />
                    </View>

                    {/* ************************************************************************************************************** */}
                    {/* ****************************************************  INTERESST   ******************************************** */}
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5',
                        width: '90%',
                        alignSelf: 'center',
                      }}>
                      <PaperSelect
                        label="Sélectionner vos centres d'intérêt"
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
                        textInputMode="outlined"
                        searchStyle={{iconColor: '#000'}}
                        searchPlaceholder="rechercher"
                        modalCloseButtonText="Annuler"
                        modalDoneButtonText="confirmer"
                        theme={{
                          colors: {
                            placeholder: 'black',
                          },
                        }}
                        dialogStyle={{
                          backgroundColor: 'white',
                          borderRadius: 10,
                        }}
                      />
                    </View>

                    {/* ************************************************************************************************ */}

                    {/* ****************************************** SUBMIT ************************************************** */}
                    <TouchableOpacity onPress={() => _updateUSer()} style={styles.customButton}>
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
                          Confirmer
                        </Text>
                        <View style={{backgroundColor: '#495EED', borderRadius: 30,alignSelf:'center'}}>
                          <AntDesign name="arrowright" color="white" size={22} />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <SwitchPage />
              )}
            </SafeAreaView>
          );
        }}
      </Formik>
    </ScrollView>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    width: '100%',
    height: HEIGHT / 5.8,
  },
  backgroundImage: {
    width: WIDTH,
    height: HEIGHT,
    flex: 1,
  },
  container: {
    flex: 1,

    //  paddingTop: StatusBar.currentHeight
  },
  allInputContainer: {
    // flex: 1,
    // marginTop: '40%',
    marginBottom:5,
  },
  textContainer: {marginBottom: 15},
  updateProfile: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Font.primary,
  },
  oneInputContainer: {},
  inputInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  textInfo: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: Color.secondary,
  },
  datePickerContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '90%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    // borderRadius: 3,
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
    color: '#000',
    fontSize: 18,
  },
  firstBtnContainer: {
    width: WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineSwitchContainer: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineSwitchText: {
    fontSize: 18,
    marginRight: 8,
  },
  input:{
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    border: 'none',
  },
  customButton: {
    borderRadius: 10,
    width: WIDTH / 1.5,
    backgroundColor: '#5568FD',
    alignSelf: 'center',
    height: HEIGHT / 14,
    justifyContent: 'center',
  },
});
