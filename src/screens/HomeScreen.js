import React, {useState, useEffect, useRef, useCallback, memo} from 'react';
import {SwitchPage} from '../components/SwitchPage/SwitchPage';
import BottomNavigation from '../components/BottomNavigation';
import LottieView from 'lottie-react-native';
import animationData from '../assets/animated/1.json';
import animationData1 from '../assets/animated/33.json';
import animationData2 from '../assets/animated/22.json';
import animationData3 from '../assets/animated/44.json';
import ImageCarousel from '../components/BannerPub'; // Import the ImageCarousel component here.
import Gagne from '../components/Gagne'; // Import the ImageCarousel component here.
import loyalty from "../constants/loyalty";
import SurveyBanner from '../components/SurveyBanner'; // Import the ImageCarousel component here.
import Jeu from '../components/Jeu'; // Import the ImageCarousel component here.
import Services from '../components/Services'; // Import the ImageCarousel component here.

import WatchWin from '../components/WatchWin'; // Import the ImageCarousel component here.

import { DarkModeProvider, DarkModeContext } from '../../DarkModeContext';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  RefreshControl,
  Alert,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  BackHandler,
  Image,
  LogBox,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../services/api';
import {Divers} from '../components/DiverComponents/Divers';
import {useFocusEffect,useIsFocused,} from '@react-navigation/native';
import jwt_decode from 'jwt-decode';
import {fetchUSerInforamtion} from '../services/homePageApi/home';

import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import {getAllProduct, getAllNotification} from '../services/homePageApi/home';
import {Font} from '../constants/colors/color';
import { Padding, FontFamily, Color, Border, FontSize } from "../assets/home2/GlobalStyles";

import {HEIGHT, WIDTH} from '../utils/Dimension';
import axios from 'axios';
import {CadeauxCarousel} from '../components/CadeauxCarousel/CadeauxCarousel';
import SliderCarousel from 'react-native-reanimated-carousel';
import {Gifts} from '../components/Gifts';
import Services1 from '../components/Services1'; // Import the ImageCarousel component here.

import Carousel from '../components/react-native-banner-carousel';
import {EventBannerCarousel} from '../components/EvenemmentCarousel/EventBannerCarousel';
import {PromotionBannerCarousel} from '../components/PromoCompoennts/PromotionBannerCarousel';
const BannerWidth = WIDTH;
const BannerHeight = HEIGHT / 2;
import {userInfomation, verifyIsSignedIn, globlalUSerInfo} from '../atom/auth';
import {useRecoilState, useRecoilValue} from 'recoil';
import {Button} from 'react-native-paper';
import {Linking} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {baseUrl} from '../atom/responseSurveyState';
import { FlatList } from 'react-native';
import MockData from "../constants/mockData.json";
// Hide PropTypes warning messages
LogBox.ignoreLogs([
  ' VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc. {"contentLength": 2970, "dt": 1806, "prevDt": 3843}',
]);
//useNativeDriver
LogBox.ignoreLogs([
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`'",
]);
LogBox.ignoreLogs(['Please update the following components: Carousel']);
// Please update the following components: Carousel
export const HomeScreen = ({navigation, route}) => {
  const [user, setUSer] = useRecoilState(userInfomation);
  const [userInfo, setUserInfo] = useState({});
  const [userProducts, setUserProducts] = useState([]);
  const [userid, setUserId] = useState([]);
  const [fetching, setFetch] = useState(true);
  const [filterPromo, setFilterPromo] = useState([]);
  const [divers, setDivers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [notifications, setNotifications] = useState(['helllo', 'i m here ']);
  const [indexDiver, setIndexDiver] = useState(0);
  const [randomDiver, setRandomDivers] = useState(undefined);
  const isFocused = useIsFocused();
  const [surveys, setSurveys] = useState([]);
  const [isSignedIn, setIsSignedIn] = useRecoilState(verifyIsSignedIn);
  const url = useRecoilValue(baseUrl);
  const [showDialog, setShowDialog] = useState(false);

  const backAction = () => {
    Alert.alert('Attention', "Êtes-vous sûr de vouloir quitter?", [
      {
        text: 'Annuler',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Continuer', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };
 
  console.log(isDarkMode);

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }
  }, []);
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const onRefresh = useCallback(() => {
    getCadeaux();
    getUserInformation();
    getnotifacation();
    getallPromotion();
    getSurveyForUser();
    getUserEventsAndPartners();
    getAllDiversity();
    return () => {
      // This cleanup function is called before the next render
      // or when the component is unmounted.
      // It's a good place to cancel the API request if it's still in progress.
      // ...
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      getCadeaux();
      getnotifacation();
      getSurveyForUser();
      getUserInformation();
      getallPromotion();
      getUserEventsAndPartners();
      getAllDiversity();
    }
    // return () => {
    //   // This cleanup function is called before the next render
    //   // or when the component is unmounted.
    //   // It's a good place to cancel the API request if it's still in progress.
    //   // ...
    // };
  }, [isFocused]);

  const randomDiverIndex = divers => {
    if (divers.length == 1) {
      setIndexDiver(() => 0);
      // setRandomDivers(() => 0);
    } else {
      let index1 = Math.floor(Math.random() * divers.length);
      setIndexDiver(() => index1);
      let index2 = Math.floor(Math.random() * divers.length);

      // Ensure the two indices are different
      while (index1 === index2) {
        index2 = Math.floor(Math.random() * divers.length);
      }
      setRandomDivers(() => index2);
    }
  };
  //  =============================================================================
  const { isDarkMode } = React.useContext(DarkModeContext);
  const getAllDiversity = async () => {
    let data = await fetchAllDiers();
    if (data.length > 0) {
      setDivers(() => data);
      randomDiverIndex(data);
      setFetch(false)

    } else {
      setFetch(false)

      return <></>;
    }
  };
  const Logout = async () => {
    try {
      AsyncStorage.removeItem('profile');
      setTimeout(() => {
        setIsSignedIn(() => false);
        //props.navigation.replace('Login');
      }, 1000);
    } catch (e) {
    }finally {
    }
  };

  const fetchAllDiers = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      let allDivers = await fetch(`${url}/diver`, requestOptions);

      return allDivers.json();
    } catch (e) {}
  };

  const getallPromotion = async () => {
    setFilterPromo(() => []);
    try {
      const value = await AsyncStorage.getItem('profile');
      const parsedToken = JSON.parse(value);
      const token = jwt_decode(parsedToken);
      await axios
        .get(`${url}/promotions/user/${token.id}`)
        .then(res => {
          setFilterData(() => res.data);

          if (res.data) {
            setFilterPromo(() => res.data);
          }
        })
        .catch(err => {
          // Alert.alert('vérifier votre connection internet!');
        });
    } catch (e) {}
  };
  const handleImagePress = () => {
    navigation.navigate('PolitiqueScreen');
  };
  const getCadeaux = async () => {
    setFetch(true);
    // here get user id and get all product from server
    try {
      const data = await getAllProduct();
      setUserProducts(() => data);
    } catch (e) {
      //Alert.alert('vérifier votre connection internet!');
    }
  };

  const getnotifacation = async () => {
    try {
      const value = await AsyncStorage.getItem('profile');
      const parsedValue = JSON.parse(value);
      const token = jwt_decode(parsedValue);
      const data = await getAllNotification(token.id);
      setNotifications(() => data);
    } catch (e) {
      // Alert.alert('vérifier votre connection internet!');
    }
  };
  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** GET User Information   *************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const getUserInformation = async () => {
    try {
      const value = await AsyncStorage.getItem('profile');
      const parsedToken = JSON.parse(value);
      const token = jwt_decode(parsedToken);
      const alluserInfo = await fetchUSerInforamtion(token.id);
      if (alluserInfo.status == 500) {
        Logout();
      } else {
        setUserInfo(() => alluserInfo);
        setUSer(() => alluserInfo);
      }
    } catch (e) {
      Alert.alert('vérifier votre connection internet!');
    }
  };

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** fetch USer Inforamtion   ************* ###  *
  // **   ##******************************************************##   **
  // ********************************************************************

  const getUserEventsAndPartners = () => {
    AsyncStorage.getItem('profile').then(result => {
      if (result !== null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);

        api
          .getUserEvents(token.id)
          .then(res => {
            setEvents(res.data);
          })
          .catch(e => {
            //Alert.alert('vérifier votre connection internet!');
          });
      }
    });
  };
  const getSurveyForUser = async () => {
    console.log("getSurveyForUser started");

    try {
        const result = await AsyncStorage.getItem('profile');
        if (result !== null) {
            const parsedToken = JSON.parse(result);
            const token = jwt_decode(parsedToken);
            setUserId(token.id);
            api
                .getUserSurvey(token.id)
                .then(res => {
                    setSurveys(res.data);
                    // Logging the successful fetch
                    console.log("Updated surveys state:", surveys);  // Note: This might not immediately reflect the updated state due to the asynchronous nature of setState.
                  });
        }
    } catch (e) {
        console.error("Error fetching survey:", e);
    }
};

useEffect(() => {
  console.log("Surveys updated:", surveys);
}, [surveys]);
  return (
    
    <SafeAreaView style={styles.container}>
    <View style={[styles.backgroundContainer, isDarkMode ? { backgroundColor: "#323232" } : { backgroundColor: "#FAFAFA" }]}>
        {fetching ? (
            <SwitchPage />
        ) : (
            <>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <MenuHeaders navigation={navigation} userInfo={userInfo} title="ACCEUIL" />
                    <View style={styles.frameParent}>
                    <Text style={[
    styles.salutImen, 
    styles.text30Typo,
    isDarkMode ? { color: "#FFFFFF" } : null
]}>
    3aslema, {user.firstname} {user.lastname} 👋
</Text>                    
                    <ImageCarousel />
                    <View style={{ height: 20 }} />

            <View style={styles.textWrapper}>
            <Text style={[
    styles.text14, 
    styles.textTypo6,
    isDarkMode ? { color: "#FFFFFF" } : null
]}>
    A découvrir..👀
</Text>
<TouchableOpacity onPress={() => navigation.navigate('EventScreen')}>
        <Text style={[
            styles.textTypo67, 
            isDarkMode ? { color: '#FFFFFF' } : {}
        ]}>Voir tout</Text>
    </TouchableOpacity>
            </View>
                <View style={styles.containerEvent}>
                    <SliderCarousel
                      loop
                      width={WIDTH}
                      height={HEIGHT / 4.8}
                      autoPlay={true}
                      data={events}

                      // onSnapToItem={(index) => console.log('current index:', index)}
                      pagingEnabled={false}
                      renderItem={({item, index}) => (
  <View key={index} style={{ marginHorizontal: 0}}>
                            <EventBannerCarousel
                            item={item}
                            navigation={navigation}
                          />
                        </View>
                      )}
                    />
                  </View>
<Text style={[
    styles.text14, 
    styles.textTypo6, 
    isDarkMode ? { color: '#FFFFFF' } : {}
]}>
    Je participe et je gagne 😼
</Text>
<View style={{ height: 20 }} />


                        <Gagne       
                        />
                 
            
  
            <View style={{ height: 10 }} />
            <View style={styles.frameParent10}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
    <Text style={[
        styles.textTypo6, 
        { marginRight: 90 },

        isDarkMode ? { color: '#FFFFFF' } : {}
    ]}>
        Badel Poinetek 📦
    </Text>

    <TouchableOpacity onPress={() => navigation.navigate('Catalogue')}>
        <Text style={[
            styles.textTypo66, 
            isDarkMode ? { color: '#FFFFFF' } : {}
        ]}>
            Voir tout
        </Text>
    </TouchableOpacity>
</View>
<FlatList
    data={userProducts.slice(0, 3)}
    renderItem={({ item, index }) => (
      <View key={index} style={{ marginHorizontal: 25, marginVertical: 7 }}>
      <Gifts
                item={item}
                userPoint={userInfo.loyaltyPoints}
                navigation={navigation}
            />
        </View>
    )}
    keyExtractor={(item, index) => index.toString()}
/>
<View style={{ marginHorizontal: 25, marginVertical: 7 }}>

<Services />
</View>
<View style={{ marginHorizontal: 25, marginVertical: 7 }}>

<Services1 />
</View>

                    </View>
            
  
            <Text style={[
    styles.text15, 
    styles.textTypo5, 
    isDarkMode ? { color: '#FFFFFF' } : {}
]}>Alors, Tu-joues?</Text>


            <Jeu
            />
            
             <View style={{ height: 20 }} />
             </View>
          </ScrollView>
        </>
      )}
        </View>
    </SafeAreaView>
    
  );
  
};
export default HomeScreen;
const styles = StyleSheet.create({
  row: {
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    columnGap: 5,
  },
  catalogTitle:{
    paddingHorizontal: 20,
  },
  container: {flex: 1, 
    backgroundColor: "#FAFAFA",
    width: WIDTH,
  },
  backgroundImageContainer: {
    width: WIDTH,
    height: HEIGHT / 7,
  },
  backgroundImage: {
    width: WIDTH,
    height: HEIGHT,
    flex: 1,
  },
  textField3: {
    top: 420,
    left: 197,
    width: 142,
    height: 36,
    justifyContent: "center",
    position: "absolute",
  },

  containernotif: {
    height: 40,
    marginHorizontal: 15,
    borderRadius: 8,
    borderWidth: 0.9,
  },
  frameParent29: {
    flex: 1,
  },

  navMenuFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  frameParent2: {
    width: WIDTH,
    padding: 0,
  },
  
  text53: {
    fontFamily: FontFamily.customBody1,
    alignSelf: "stretch",
  },
  instanceParent: {
    padding: 0,
    margin: 0,
    width: WIDTH,
    flexDirection: "row",
  
  },
  frameView: {
    // Ensure there's no padding or margin causing space
    padding: 0,
    margin: 0,
  },
  frameParent13: {
    width: WIDTH,
    height: 362,
    alignItems: "center",
    marginTop: 16,
  },
  textContainer: {
    marginLeft: 8,
    justifyContent: "center",
  },
  iconsParent: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
  },
  wrapperInner: {
    alignItems: "center",
    flexDirection: "row",
  },
  wrapper: {
    alignItems: "center",
    paddingVertical: Padding.p_5xs,
    flex: 1,
  },
  wrapperChild: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  wrapper3: {
    height: 37,
    alignItems: "center",
    paddingVertical: Padding.p_5xs,
  },
  textWrapper19: {
    justifyContent: "center",
    flex: 1,
  },
  textField1: {
    minHeight: 48,
    maxHeight: 48,
    justifyContent: "center",
  },
  textField: {
    justifyContent: "center",
    marginTop: 16,
  },
  wrapperBorder: {
    paddingHorizontal: Padding.p_5xl,
    borderWidth: 1,
    width: WIDTH,
    left: 30,
    borderColor: Color.lightGrey3,
    borderStyle: "solid",
    alignItems: "center",
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_41xl,
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: Color.background,
  },
  title: {
    fontSize: 18,
    fontFamily: Font.primary,
    letterSpacing: 1.2,
    textAlign: 'center',
    color: '#000',
  },
  carouselsurvey: {
    flexGrow: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  descriptionTextNotif: {
    fontSize: 16,
    fontFamily: Font.primary,
    textAlign: 'center',
    color: Color.primary,
    letterSpacing: 1.9,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },

  text: {
    width: 119,
    lineHeight: 24,
    textAlign: "left",
    color: Color.black,
    fontSize: FontSize.customBody1_size,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  iconContainer: {
    alignItems: 'center',
    marginHorizontal: 35, // Adjust the value to reduce or increase the space between icons
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 8,
  },
  iconLabel: {
    fontSize: 12,
    color: '#747688',
  },
  textField2: {
    top: 310,
    left: 197,
    width: 142,
    height: 36,
    justifyContent: "center",
    position: "absolute",
  },
  textFielda: {
    top: 310,
    left: 197,
    width: 142,
    height: 36,
    justifyContent: "center",
    position: "absolute",
  },
  text30Typo: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "900",
    left: 20,
    fontSize: 20,
  },
  cadeauxContainer: {
    alignSelf: 'center',
    height: HEIGHT / 3.5,
    marginTop: '5%',
  },
  textTypo7: {
    lineHeight: 24,
    textAlign: "left",
    color: Color.black,
    fontSize: FontSize.customBody1_size,
  },
  textWrapper: {
    flexDirection: "row",
    width: 320,
  },
  text1: {
    fontFamily: FontFamily.customBody1,
  },
  textContainer: {
    marginLeft: 8,
    justifyContent: "center",
  },
  containerEvent: {
    paddingTop: 6,
    alignSelf: 'center',

  },
  textTypo6: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "900",
    fontSize: 19,
    left: 20,
  },
  textTypo66: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "800",
    fontSize: 16,
    left: 20,
  },
  textTypo67: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "800",
    fontSize: 16,
    left: WIDTH * 0.4  // Set the left offset to be 10% of screen width
  },
  frameParentSpaceBlock: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: 0,
  },
  text: {
    width: 119,
    lineHeight: 24,
    textAlign: "left",
    color: Color.black,
    fontSize: FontSize.customBody1_size,
  },
  iconsParent: {
    flexWrap: "wrap",
    alignItems: "center",
    flexDirection: "row",
  },
  wrapperInner: {
    alignItems: "center",
    flexDirection: "row",
  },
  wrapper: {
    alignItems: "center",
    paddingVertical: Padding.p_5xs,
    flex: 1,
  },
  textField1: {
    minHeight: 48,
    maxHeight: 48,
    justifyContent: "center",
  },
  textField: {
    justifyContent: "center",
    marginTop: 16,
  },
  textTypo5: {
    top: -4,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "left",
    fontWeight: "700",
left: 30,
    color: Color.black,
  },
  maskGroupIcon1: {
    width: WIDTH,
    height: 126,
  },
  text2: {
    width: 139,
  },
  textFrame: {
    alignSelf: "stretch",
  },
  icons1: {
    height: 12,
  },
  text3: {
    marginLeft: 4,
  },
  iconsGroup: {
    width: WIDTH,
    alignItems: "center",
    flexDirection: "row",
  },
  icons2: {
    height: 12,
    overflow: "hidden",
  },
  text5: {
    left: 5,
    fontSize: FontSize.size_4xs_4,
    lineHeight: 11,
    width: 11,
    height: 10,
    zIndex: 0,
    color: Color.background,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  frameWrapper13: {
    paddingHorizontal: 14,
    paddingVertical: 0,
  },
  containerPromotion: {
    alignSelf: 'center',
    height: HEIGHT / 3.3,
  },
  diverContainer: {
    height: HEIGHT / 3.3,
    width: WIDTH,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 19,
  },
    salutImen: {
    lineHeight: 27,
    textAlign: "left",
    color: Color.black,
    fontSize: FontSize.customBody1_size,
    fontWeight: "600",
  },
  text15: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  child: {WIDTH, justifyContent: 'center'},
  text: {fontSize: WIDTH * 0.5, textAlign: 'center'},
  catalogueTitltle: {
    fontFamily: Font.primary,
    color: '#120D26',
    fontSize: 18,
    fontWeight: 700,
  },
  frameWrapper1: {
    marginTop: 8,
    alignSelf: "stretch",
  },
  frameParent1: {
    marginLeft: 16,
    paddingHorizontal: 0,
    width: WIDTH,
    paddingVertical: Padding.p_5xs,
  },
  maskGroupParent: {
    justifyContent: "center",
    flexDirection: "row",
  },

  frameWrapperLayout: {
    width: WIDTH,
    maxHeight: 146,
    minHeight: 146,
    padding: Padding.p_3xs,
    height: 146,
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
    marginLeft: 8,
    overflow: "hidden",
  },
  instanceParent: {
    width: WIDTH,
    flexDirection: "row",
    marginTop: 16,
  },
  voirTitltle: {
    color: '#747688',
    fontSize: 16,
    fontWeight: 700,
  }
  
});
