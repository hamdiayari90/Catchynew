import { Color, FontFamily, Padding, Border, FontSize } from "../assets/home8/GlobalStyles";
import React, {useRef, useState, useEffect, useCallback} from 'react';
import MapView, { Marker } from 'react-native-maps';
import mapStyle from '../../mapStyle.js';
import Geolocation from '@react-native-community/geolocation';
import LottieView from 'lottie-react-native';


import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  Pressable,
  Platform,
  Image,
  BackHandler,
  Alert,
  Button,
  Switch,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
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
import {PaperSelect} from 'react-native-paper-select';
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
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

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
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Get the current position of the user
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);
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
  const [passwordVisible, setPasswordVisible] = useState(false);

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
  const [showAnimation, setShowAnimation] = useState(false);
    const [animationSource, setAnimationSource] = useState(null);

  const [choseInterrest, setChoseInterrest] = useRecoilState(
    selectedIntereestAtom,
  );
  const [pickerMode, setPickerMode] = useState(null);
  const [inline, setInline] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
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
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetchUserData(); // Call the function to fetch user data
  }, []);

  const fetchUserData = async () => {
    try {
      const result = await AsyncStorage.getItem('profile');
      if (result !== null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);
        const userId = token.id;
        await fetchProfileImage(userId);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchProfileImage = async (userId) => {
    try {
      console.log('Fetching profile image...');
      const response = await fetch(`http://94.237.82.88:8082/user/${userId}/`);
      const data = await response.json();

      if (data && data.image && data.image.name) {
        const baseUrl = 'https://www.catchy.tn/media/user/';
        const imageName = data.image.name;
        const imageUrl = baseUrl + imageName;
        console.log('Profile image fetched successfully:', imageUrl);
        setProfileImage(imageUrl); // Update the state here

      } else {
        console.error('Error fetching profile image: Invalid response data');
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

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

// ... (Other imports and code)

const showPicker = () => {
  setIsPickerShow(true);
};

const selectValidator = value => {
  return value && value.length > 0; // Simplified the function to return a boolean value.
};

const uploadProfilePicture = async (userId, imageData) => {
  try {
    const response = await fetch(`http://94.237.82.88:8082/addImageToUser/${userId}`, {
      method: 'POST',
      body: imageData,
    });

    if (!response.ok) {
      console.error('Error response from server:', response);
      throw new Error('Failed to upload profile picture');
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json();
      console.log('Upload response:', responseData);
      fetchProfileImage(userId);
      return responseData;
    } else {
      // Handle non-JSON response (if needed)
      const responseText = await response.text();
      console.log('Non-JSON response:', responseText);
      return responseText;
    }
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

// Function to choose and upload profile picture
const choosePhotoFromLibrary = async () => {
  try {
    // Step 1: Fetch the user information from AsyncStorage (local storage)
    const result = await AsyncStorage.getItem('profile');
    if (!result) {
      console.error('User profile data not found in local storage.');
      return;
    }

    const parsedToken = JSON.parse(result);
    const token = jwt_decode(parsedToken);
    const userId = token.id;

    // Step 2: Show the image picker to select a profile picture
    const image = await ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
    });

    if (image && image.path) {
      setSelectedImage(image.path);

      // Step 3: Upload the profile picture with the user ID
      const imageData = new FormData();
      imageData.append('image', {
        uri: image.path,
        type: 'image/jpeg', // Modify the image type according to your server's requirements
        name: 'profile.jpg', // You can change the file name as needed
      });

      await uploadProfilePicture(userId, imageData);
      console.log('Profile picture uploaded successfully!');
    } else {
      console.log('No image selected or image selection canceled.');
    }
  } catch (error) {
    if (error.code !== 'E_PICKER_CANCELLED') {
      console.error('Error selecting image:', error);
    }
  }
};

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    setShowAnimation(false);
  });

  return unsubscribe;
}, [navigation]);

return (
  <ScrollView
    keyboardShouldPersistTaps="always"
    style={styles.container}
    contentContainerStyle={{ marginBottom: 50 }}
  >
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
      onSubmit={values => setJustSubmit(false)}
    >
      {({ handleChange, handleBlur, values, errors, touched }) => {
        const _updateUSer = () => {
          setShowAnimation(true);

          let arrayOfInterrest = [];
          choseInterrest.selectedList.map(el => {
            arrayOfInterrest.push(el._id);
          });

          // check if the user by accident just forget to select an address
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
              error: "Sélectionner une catégorie*",
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
                  routes: [{ name: 'Acceuil' }],
                });
                setUpdated(!updated);
              }
            });
          }
        };
  return (
    <View style={styles.changeInfos}>
      <View style={[styles.changeInfosChild, styles.subtractParentPosition]} />
      <View style={[styles.subtractParent, styles.subtractParentPosition]}>
        <Image
          style={styles.subtractIcon}
          resizeMode="cover"
          source={require("../assets/home8/subtract.png")}
        />
        <Image
          style={[styles.instanceChild, styles.instanceChildLayout]}
          resizeMode="cover"
          source={require("../assets/home8/group-63563581.png")}
        />
        
        <View style={[styles.buttonsParent, styles.parentFlexBox]}>
          <View style={styles.buttons}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
    <Image
        style={styles.iconsLayout}
        resizeMode="cover"
        source={require("../assets/home8/icons8.png")}
    />
</TouchableOpacity>

          </View>
          <View style={[styles.frameParent, styles.frameParentFlexBox]}>
            <View style={styles.frameWrapper}>
              <View style={styles.groupParent}>
                <Image
                  style={styles.frameChild}
                  resizeMode="cover"
                  source={require("../assets/home8/group-63564321.png")}
                />
                <Text style={styles.text}>{userPoints.loyaltyPoints}</Text>
              </View>
            </View>
            <View style={[styles.iconsWrapper, styles.frameParentFlexBox]}>
              <View style={styles.icons1}>
                <View style={styles.icons2Position}>
                  <Image
                    style={[styles.iconsetStructure, styles.icons2Position]}
                    resizeMode="cover"
                    source={require("../assets/home8/-iconset-structure3.png")}
                  />
                  <TouchableOpacity onPress={() => navigation.navigate('NotificationsScreen')}>
    <Image
        style={styles.vectorIcon}
        resizeMode="cover"
        source={require("../assets/home8/vector3.png")}
    />
</TouchableOpacity>

                  <View style={[styles.iconsChild, styles.childLayout]} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.textFieldParent, styles.textParentPosition]}>
        <View style={[styles.textField, styles.textLayout]}>
          <View style={[styles.wrapper, styles.wrapperBorder]}>
            <View style={styles.groupParent}>
              <Image
                style={styles.iconsLayout}
                resizeMode="cover"
                source={require("../assets/home8/icons9.png")}
              />
              <View style={[styles.frameContainer, styles.iconsGroupFlexBox]}>
                <View style={styles.textWrapper}>
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
                     
                      <View style={styles.input}>
                        <Text style={styles.dateText}>
                          {date.toLocaleDateString()}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.textField2, styles.frameViewSpaceBlock]}>
            <View style={[styles.wrapper, styles.wrapperBorder]}>
              <View style={styles.groupParent}>
                <View style={styles.iconsGroupFlexBox}>
                  <Image
                    style={[styles.icons5, styles.iconsLayout]}
                    resizeMode="cover"
                    source={require("../assets/home8/icons10.png")}
                  />
                                <View style={[styles.frameContainer, styles.iconsGroupFlexBox]}>

                  <View style={styles.textWrapper}>
                  <TextInput
                        ref={userNameRef}
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        // onSubmitEditing={() => handleSubmit()}
                       
                        error={touched.username && errors.username}

                        style={[styles.text1, { backgroundColor: 'transparent' }]}
                        />
                  </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
      </View>
      
      <View style={[styles.textParent, styles.textParentPosition]}>
        <Text style={[styles.text2, styles.textTypo]}>
          Changer Informations
        </Text>
        <View style={styles.textFieldGroup}>
          <View style={[styles.textField, styles.textLayout]}>
            <View style={[styles.wrapper, styles.wrapperBorder]}>
              <View style={styles.groupParent}>
                <View style={styles.iconsGroupFlexBox}>
                  <Image
                    style={styles.iconsLayout}
                    resizeMode="cover"
                    source={require("../assets/home8/icons10.png")}
                  />
                  <View style={styles.textContainer}>
                  <TextInput
                        ref={emailRef}
                        style={[styles.text1, { backgroundColor: 'transparent' }]}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={touched.email && errors.email}
                        outlineWidth={2} // Set the width of the outline

                      />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.textField2, styles.frameViewSpaceBlock]}>
            <View style={[styles.wrapper, styles.wrapperBorder]}>
              <View style={styles.groupParent}>
                <View style={styles.iconsGroupFlexBox}>
                  <Image
                    style={[styles.icons5, styles.iconsLayout]}
                    resizeMode="cover"
                    source={require("../assets/home8/icons5.png")}
                  />
                                <View style={[styles.frameContainer, styles.iconsGroupFlexBox]}>

                  <View style={styles.textWrapper}>
                  <TextInput
                        ref={mobilePhoneRef}
                        value={values.mobilePhone}
                        maxLength={8}
                        onChangeText={handleChange('mobilePhone')}
                        onBlur={handleBlur('mobilePhone')}
                        // onSubmitEditing={() => handleSubmit()}
                        keyboardType="numeric"
                        error={touched.mobilePhone && errors.mobilePhone}

                        style={[styles.text1, { backgroundColor: 'transparent' }]}
                        />
                  </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.textField2, styles.frameViewSpaceBlock]}>
            <View style={[styles.wrapper, styles.wrapperBorder]}>
              <View style={[styles.frameParent1, styles.parentFlexBox]}>
                <View style={styles.iconsGroupFlexBox}>
                  <Image
                    style={styles.iconsLayout}
                    resizeMode="cover"
                    source={require("../assets/home8/icons11.png")}
                  />
                  <View style={styles.textContainer}>
                  <TextInput
                        value={values.password}
                        type="password"
                        placeholder="**********"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}

                        secureTextEntry={!passwordVisible}  // If passwordVisible is true, it will show the password
    style={[styles.text1, { backgroundColor: 'transparent' }]}
                      />
                  </View>
                </View>
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
    <Image
        style={styles.iconsLayout}
        resizeMode="cover"
        source={require("../assets/home8/icons4.png")}
    />
</TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity 
      style={[styles.maskGroup, styles.frameViewSpaceBlock]}
      onPress={() => navigation.navigate("ChangeAddress")}>
        <MapView
          style={styles.icon}
          customMapStyle={mapStyle}
          initialRegion={location}  // use location as the initialRegion
        >
          {location && (
            <Marker 
              coordinate={location}
              image={require("../assets/home8/icons1.png")}
            />
          )}
        </MapView>
    </TouchableOpacity>
        </View>
      </View>
      <View style={styles.component7Parent}>
      <TouchableOpacity onPress={choosePhotoFromLibrary}>
                    <Image
                        style={styles.component7Icon}
                        resizeMode="cover"
                        source={profileImage ? { uri: profileImage } : require("../assets/home2/group-6356531.png")}
                        />
                </TouchableOpacity>
        <View style={styles.iconsGroupFlexBox}>
          <View style={styles.textWrapper}>
            <Text style={[styles.text6, styles.textTypo]}>{userData.firstname} {userData.lastname}</Text>
          </View>
        </View>
      </View>
      {showAnimation ? (
  <LottieView
    source={require('../assets/animated/mahie.json')}
    autoPlay
    loop={false}
    onAnimationFinish={() => navigation.navigate('Home')} // Change to your Home screen's name
    style={{ flex: 1, alignSelf: 'center' }}
  />
) : (
  <TouchableOpacity onPress={_updateUSer}>
    <View style={styles.buttons1}>
      <Text style={styles.text7}>Valider</Text>
    </View>
  </TouchableOpacity>
)}

          </View>
        );
      }}
    </Formik>
  </ScrollView>
);
};

const styles = StyleSheet.create({
  subtractParentPosition: {
    left: 0,
    position: "absolute",
  },
  instanceChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  parentFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  frameParentFlexBox: {
    height: 39,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  icons2Position: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    height: "100%",
    top: "0%",
    position: "absolute",
    width: "100%",
  },
  childLayout: {
    height: 12,
    width: 12,
  },
  textParentPosition: {
    left: 20,
    position: "absolute",
  },
  textLayout: {
    maxHeight: 48,
    minHeight: 48,
    height: 48,
    justifyContent: "center",
  },
  wrapperBorder: {
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.background,
  },
  iconsGroupFlexBox: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
  },
  text1Typo: {
    color: Color.lightGrey2,
    fontFamily: FontFamily.customBody1,
    lineHeight: 24,
    textAlign: "left",
  },
  frameViewSpaceBlock: {
    marginTop: 16,
    width: 320,
    
  },
  radiobuttonsLayout: {
    width: 80,
    flexDirection: "row",
  },
  textTypo: {
    fontFamily: FontFamily.interSemiBold,
    lineHeight: 24,
    textAlign: "left",
    color: Color.darkGrey2,
    fontWeight: "600",
  },
  iconsLayout: {
    height: 24,
    width: 24,
  },
  changeInfosChild: {
    top: 200,
  },
  subtractIcon: {
    height: 107,
    width: WIDTH,
  },
  instanceChild: {
    height: "358.2%",
    width: "90.79%",
    right: "-22.45%",
    bottom: "-258.2%",
    left: "31.66%",
    top: "0%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
  },
  subtractIcon1: {
    height: 75,
    width: 360,
  },
  buttons: {
    backgroundColor: Color.primary,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 20,
    elevation: 20,
    shadowOpacity: 1,
    width: 40,
    height: 40,
    justifyContent: "center",
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    alignItems: "center",
    flexDirection: "row",
  },
  frameChild: {
    width: 36,
    height: 38,
  },
  text: {
    fontSize: 16,
    lineHeight: 27,
    fontFamily: FontFamily.poppinsSemiBold,
    marginLeft: 7,
    textAlign: "left",
    color: Color.darkGrey2,
    fontWeight: "900",
  },
  groupParent: {
    alignItems: "center",
    flexDirection: "row",
  },
  frameWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iconsetStructure: {
    display: "none",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  vectorIcon: {
    width: 21,
    height: 25,
  },
  iconsChild: {
    top: -2,
    left: 17,
    borderRadius: Border.br_8xs,
    backgroundColor: Color.error,
    borderColor: Color.primary,
    borderWidth: 2,
    borderStyle: "solid",
    height: 12,
    width: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  icons1: {
    width: 32,
    height: 32,
  },
  iconsWrapper: {
    marginLeft: 12,
  },
  frameParent: {
    width: 110,
  },
  buttonsParent: {
    height: "55.25%",
    width: "88.89%",
    top: "13.98%",
    right: "5.56%",
    bottom: "30.77%",
    left: "5.56%",
    position: "absolute",
  },
  subtractParent: {
    top: 0,
    height: 93,
    width: WIDTH,
    overflow: "hidden",
  },
  text1: {
    fontSize: FontSize.customBody1_size,
  },
  textWrapper: {
    justifyContent: "center",
  },
  frameContainer: {
    marginLeft: 8,
  },
  wrapper: {
    alignSelf: "stretch",
    borderRadius: Border.br_41xl,
    borderColor: Color.colorGainsboro,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_5xs,
    flex: 1,
    borderWidth: 1,
  },
  textField: {
    width: 320,
  },
  radiobuttonsChild: {
    display: "none",
  },
  radiobuttons: {
    borderRadius: Border.br_5xl,
    borderColor: Color.colorLightgray,
    padding: Padding.p_7xs,
    justifyContent: "center",
  },
  homme: {
    marginLeft: 5,
    fontSize: FontSize.size_sm,
  },
  radiobuttonsGroup: {
    marginLeft: 33,
  },
  frameGroup: {
    width: 320,
    flexDirection: "row",
  },
  frameView: {
    paddingHorizontal: Padding.p_xs,
    paddingVertical: 0,
  },
  textFieldParent: {
    top: 182,
  },
  text2: {
    fontSize: FontSize.size_sm,
  },
  text3: {
    fontFamily: FontFamily.customBody1,
    lineHeight: 24,
    fontSize: FontSize.customBody1_size,
    textAlign: "left",
    color: Color.darkGrey2,
  },
  textContainer: {
    marginLeft: 8,
    justifyContent: "center",
  },
  icons5: {
    overflow: "hidden",
  },
  textField2: {
    maxHeight: 48,
    minHeight: 48,
    height: 48,
    justifyContent: "center",
  },
  frameParent1: {
    width: 278,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  maskGroup: {
    height: 158,

  },
  textFieldGroup: {
    marginTop: 18,
  },
  textParent: {
    top: 294,
  },
  component7Icon: {
    width: 91,
    height: 91,
    borderRadius: 50, // Half of width and height to make it fully rounded

  },
  text6: {
    fontSize: 18,
    fontWeight: "900",
  },
  component7Parent: {
    top: 50,
    left: 134,
    alignItems: "center",
    position: "absolute",
    
  },
  text7: {
    fontWeight: "700",
    fontFamily: FontFamily.customButton1,
    color: Color.primary,
    lineHeight: 24,
    fontSize: FontSize.customBody1_size,
    textAlign: "left",
  },
  buttons1: {
    top: 712,
    left: 54,
    backgroundColor: Color.darkGrey2,
    width: 252,
    height: 48,
    justifyContent: "center",
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  changeInfos: {
    height: 805,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.background,
    flex: 1,
  },
});

export default ProfileScreen;
