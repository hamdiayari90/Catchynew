import { Color, FontFamily, Padding, Border, FontSize } from "../assets/home9/GlobalStyles";
import React, {useRef, useState, useEffect, useCallback} from 'react';
import { userToken, verifyIsSignedIn } from '../atom/auth';
import MapView, { Marker } from 'react-native-maps';
import mapStyle from '../../mapStyle.js';
import Geolocation from '@react-native-community/geolocation';
import LottieView from 'lottie-react-native';
import MenuHeaders from "../components/menuComponent/MenuHeaders";
import { DarkModeProvider, DarkModeContext } from '../../DarkModeContext';

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

export const ProfileHome = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [isSignedIn, setIsSignedIn] = useRecoilState(verifyIsSignedIn);
  const Logout = async () => {
    try {
      AsyncStorage.removeItem('profile');
      setShowAnimation(true);
      setTimeout(() => {
        setIsSignedIn(() => false);
      }, 2000);
    } catch (e) { }
  };
  

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
  const { isDarkMode } = React.useContext(DarkModeContext);

  const [token, setToken] = useRecoilState(userToken)
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
  <DarkModeContext.Consumer>
      {({ isDarkMode }) => (
          <SafeAreaView style={styles.container}>
              <View style={[styles.container, isDarkMode ? { backgroundColor: "#323232" } : { backgroundColor: "#FAFAFA" }]}>
                  <MenuHeaders />

                  <View style={[styles.profileHomeChild, styles.profilePosition]}>
      <View style={[styles.cardsParent, styles.frameViewPosition]}>
        <View style={[styles.cards, styles.buttonsParentFlexBox]}>
          <View style={[styles.frameParent, styles.frameParentFlexBox]}>
            <View style={[styles.iconsWrapper, styles.iconsWrapperLayout]}>
              <Image
                style={[styles.icons, styles.iconsLayout1]}
                resizeMode="cover"
                source={require("../assets/home9/icons15.png")}
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={[styles.text, styles.textTypo]}>
            Modifier mes informations
        </Text>
    </TouchableOpacity>
          </View>
          
        </View>
    
        <View style={styles.cardsShadowBox}>
          <View style={[styles.frameParent, styles.frameParentFlexBox]}>
            <View style={[styles.iconsWrapper, styles.iconsWrapperLayout]}>
              <Image
                style={[styles.icons, styles.iconsLayout1]}
                resizeMode="cover"
                source={require("../assets/home9/iconscom.png")}
              />
            </View>
            <Text 
                style={[styles.text, styles.textTypo]}
                onPress={() => navigation.navigate('Rewards')}
            >
Communauté
            </Text>
          </View>
        </View>
        <View style={{ height: 30 }} />

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            {showAnimation && (
                <LottieView
                source={require('../assets/animated/attente.json')}
                autoPlay
                loop
                style={{ width: 100, height: 100 }} // Adjust these values as per your needs
                />
            )}

            {!showAnimation && (
                <TouchableOpacity 
                onPress={() => {
                  Logout();}}
                  style={{
                    backgroundColor: "#C22A2A", 
                    paddingVertical: 20, // Adjust vertical padding for height
                    paddingHorizontal: 100, // Adjust horizontal padding for width
                    borderRadius: 30, // Smooth the corners a bit more
                    justifyContent: 'center', 
                    alignItems: 'center',
                }}
                >
                    <Text style={{ color: 'white' }}>Déconnexion</Text>
                </TouchableOpacity>
            )}

        </View>
        </View>
      <View style={[styles.profileHomeInner, styles.profilePosition]}>
        <View style={[styles.subtractParent, styles.maskGroupIconPosition]}>
        
          <View style={[styles.frameView, styles.frameViewPosition]}>
            <View style={[styles.frameParent1, styles.parentFlexBox]}>
              <Pressable
                style={[styles.component1Parent, styles.parentFlexBox]}
                onPress={() => navigation.navigate("ProfileHome")}
              >
                
              </Pressable>
              
            </View>
            <View style={[styles.frameParent2, styles.frameParentFlexBox]}>
              <View style={[styles.frameParent3, styles.frameParentFlexBox]}>
                
                
              </View>
        
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}> 
      <View style={[styles.buttonsParent, styles.buttonsParentFlexBox]}>
        <View style={[styles.buttons, styles.iconsLayout1]}>
          <Image
            style={styles.icons5}
            resizeMode="cover"
            source={require("../assets/home9/icons18.png")}
          />
        </View>
        <Text style={[styles.text4, styles.textTypo, isDarkMode ? { color: '#FFFFFF' } : {}
        ]}>Retour</Text>
      </View>
      </TouchableOpacity>
      <View style={[styles.navMenuParent, styles.profilePosition]}>
        <View style={[styles.navMenu, styles.frameParentFlexBox]}>
          <Pressable
            style={[styles.icons6, styles.iconsLayout]}
            onPress={() => navigation.navigate("Events")}
          >
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require("../assets/home9/icons5.png")}
            />
          </Pressable>
          <Image
            style={[styles.icons6, styles.iconsLayout]}
            resizeMode="cover"
            source={require("../assets/home9/icons10.png")}
          />
          <Image
            style={styles.icons8}
            resizeMode="cover"
            source={require("../assets/home9/icons19.png")}
          />
          <Image
            style={[styles.icons6, styles.iconsLayout]}
            resizeMode="cover"
            source={require("../assets/home9/icons12.png")}
          />
          <Image
            style={[styles.icons10, styles.iconsLayout]}
            resizeMode="cover"
            source={require("../assets/home9/icons20.png")}
          />
        </View>
        <View style={styles.frame9340variant6}>
          <View style={styles.line} />
          </View>
                </View>
                </View>
                </View>

            </SafeAreaView>
        )}
    </DarkModeContext.Consumer>
);
};
const styles = StyleSheet.create({
  profilePosition: {
    left: 0,
    position: "absolute",
  },
  frameViewPosition: {
    left: 20,
    position: "absolute",
  },
  buttonsParentFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  frameParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  iconsWrapperLayout: {
    borderRadius: Border.br_41xl,
    flexDirection: "row",
  },
  iconsLayout1: {
    width: 32,
    height: 32,
  },
  textTypo: {
    textAlign: "left",
    color: Color.darkGrey21,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
  },
  container: {flex: 1, 
    backgroundColor: "#FAFAFA",
    width: WIDTH,
  },
  maskGroupIconPosition: {
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
  },
  frameChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  parentFlexBox: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
  },
  frTypo: {
    marginLeft: 4,
    lineHeight: 27,
    textAlign: "left",
    color: Color.darkGrey21,
    fontWeight: "600",
  },
  iconsLayout: {
    width: 24,
    height: 24,
  },
  profileHomeChild: {
    top: 100,
  },
  icons: {
    height: 32,
  },
  iconsWrapper: {
    backgroundColor: Color.primaryVarient1,
    padding: Padding.p_8xs,
  },
  text: {
    width: 163,
    marginLeft: 16,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    textAlign: "left",
    color: Color.darkGrey21,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
  },
  frameParent: {
    alignSelf: "stretch",
    flexDirection: "row",
  },
  cards: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_5xl,
    height: 90,
    shadowOpacity: 1,
    elevation: 40,
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(38, 38, 38, 0.04)",
    borderRadius: Border.br_xl,
    justifyContent: "center",
    width: 320,
    backgroundColor: Color.pureWhite,
  },
  cardsShadowBox: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_5xl,
    height: 90,
    width: 320,
    shadowOpacity: 1,
    elevation: 40,
    shadowRadius: 40,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(38, 38, 38, 0.04)",
    backgroundColor: Color.pureWhite,
    borderRadius: Border.br_xl,
  },
  cardsParent: {
    top: 70,
  },
  subtractIcon: {
    height: 89,
    width: 360,
  },
  maskGroupIcon: {
    height: "79.33%",
    bottom: "20.67%",
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    maxWidth: "100%",
  },
  component1Icon: {
    width: 40,
    zIndex: 0,
    height: 40,
  },
  frameChild: {
    height: "78.42%",
    width: "66.93%",
    top: "11.61%",
    right: "16.13%",
    bottom: "9.97%",
    left: "16.94%",
    zIndex: 1,
  },
  component1Parent: {
    display: "none",
  },
  frameItem: {
    width: 30,
    height: 32,
  },
  text3: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.poppinsSemiBold,
  },
  groupParent: {
    marginLeft: 8,
    flexDirection: "row",
  },
  frameParent1: {
    width: 116,
  },
  translateFill0Wght400Grad0Icon: {
    width: 16,
    height: 16,
    overflow: "hidden",
  },
  fr: {
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.interSemiBold,
  },
  translateFill0Wght400Grad0Parent: {
    backgroundColor: Color.colorGoldenrod,
    width: 55,
    padding: Padding.p_5xs,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  frameParent3: {
    width: 131,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  iconsetStructure: {
    display: "none",
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    bottom: "0%",
    height: "100%",
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
    borderStyle: "solid",
    borderColor: Color.primary,
    borderWidth: 2,
    width: 12,
    height: 12,
    position: "absolute",
  },
  subtractParent: {
    bottom: "0%",
    left: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
  },
  iconsWrapper1: {
    height: 39,
    marginLeft: 14,
    width: 30,
    flexDirection: "row",
  },
  frameParent2: {
    marginLeft: 34,
    flexDirection: "row",
  },
  frameView: {
    top: 25,
    flexDirection: "row",
  },
  profileHomeInner: {
    top: 0,
    height: 105,
    width: 360,
  },
  icons5: {
    width: 19,
    height: 19,
  },
  buttons: {
    borderRadius: 32,
    backgroundColor: Color.primary,
    paddingHorizontal: 13,
    paddingVertical: 10,
    height: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text4: {
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    marginLeft: 8,
    textAlign: "left",
    color: Color.darkGrey21,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    flex: 1,
  },
  buttonsParent: {
    top: 1,
    flexDirection: "row",
    width: 320,
    justifyContent: "center",
    left: 20,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  icons6: {
    height: 24,
  },
  icons8: {
    width: 25,
    height: 24,
  },
  icons10: {
    height: 24,
    overflow: "hidden",
  },
  navMenu: {
    backgroundColor: Color.lightGrey4,
    height: 64,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: 0,
    justifyContent: "space-between",
    width: 360,
    flexDirection: "row",
  },
  line: {
    marginLeft: -68,
    bottom: 8,
    left: "50%",
    borderRadius: Border.br_81xl,
    backgroundColor: Color.darkGrey2,
    width: 135,
    height: 5,
    position: "absolute",
  },
  frame9340variant6: {
    height: 30,
    width: 360,
    backgroundColor: Color.pureWhite,
  },
  navMenuParent: {
    top: 711,
  },
  profileHome: {
    backgroundColor: Color.white,
    height: 805,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default ProfileHome;
