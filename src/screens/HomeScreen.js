import React, {useState, useEffect, useRef, useCallback, memo} from 'react';
import {SwitchPage} from '../components/SwitchPage/SwitchPage';
import BottomNavigation from '../components/BottomNavigation';

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
import {useIsFocused} from '@react-navigation/native';
import jwt_decode from 'jwt-decode';
import {fetchUSerInforamtion} from '../services/homePageApi/home';

import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import {getAllProduct, getAllNotification} from '../services/homePageApi/home';
import {Color, Font} from '../constants/colors/color';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import axios from 'axios';
import {CadeauxCarousel} from '../components/CadeauxCarousel/CadeauxCarousel';
import SliderCarousel from 'react-native-reanimated-carousel';

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
  const [isSignedIn, setIsSignedIn] = useRecoilState(verifyIsSignedIn);
  const url = useRecoilValue(baseUrl);
  const backAction = () => {
    Alert.alert('Catchy', "voulez vous quitter l'application", [
      {
        text: 'Annuler',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'confirmer', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

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

  return (
    <SafeAreaView style={styles.container}>
      {fetching ? (
        <SwitchPage />
      ) : (
        <>
          <ScrollView
            style={{ flex: 1, marginBottom: 60 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View>
              <MenuHeaders
                navigation={navigation}
                userInfo={userInfo}
                title="ACCEUIL"
              />
            </View>           
            <View style={[styles.catalogTitle, styles.row]}>
  <Text style={styles.catalogueTitltle}>Bonjour, {user.username} {user.lastname}</Text>
</View>

      <View style={styles.iconRow}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('EventScreen')}
        >
          <Image
            source={require('./assets/images/2.png')}
            style={[styles.icon, { width: 100, height: 100 }]}
          />
          <Text style={styles.iconLabel}>Évennements</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('PromotionScreen')}
        >
          <Image
            source={require('./assets/images/1.png')}
            style={[styles.icon, { width: 100, height: 100 }]}
          />
          <Text style={styles.iconLabel}>Wtach & Win</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.iconRow}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('GameScreen')}
        >
          <Image
            source={require('./assets/images/3.png')}
            style={[styles.icon, { width: 100, height: 100 }]}
          />
          <Text style={styles.iconLabel}>Jeux</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('SurveyScreen')}
        >
          <Image
            source={require('./assets/images/4.png')}
            style={[styles.icon, { width: 100, height: 100 }]}
          />
          <Text style={styles.iconLabel}>Sondages</Text>
        </TouchableOpacity>
      </View>


            {/* Your Catalogue Title and Voir Tout Button */}
            <View style={[styles.catalogTitle, styles.row]}>
              <Text style={styles.catalogueTitltle}>Catalogue</Text>
              <View style={[styles.row, styles.voir]}>
                <Text style={styles.voirTitltle}>Voir tout</Text>
                <Ionicons
                  style={styles.filterIcon}
                  name="play"
                  color="#747688"
                  size={18}
                />
              </View>
            </View>
            <CadeauxCarousel data={userProducts} />

            {events.length > 0 ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    marginRight: 20,
                  }}>
                  <View
                    style={{
                      flexGrow: 1,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        paddingLeft: 10,
                        fontFamily: Font.tertiary,
                      }}>
                  <Text style={styles.catalogueTitltle}>Évennements</Text>
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        fontFamily: Font.primary,
                      }}>
                      {/* voir plus */}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.containerEvent}>
                  <SliderCarousel
                    loop
                    width={WIDTH}
                    height={HEIGHT / 2.5}
                    autoPlay={true}
                    data={events}
                    scrollAnimationDuration={6000}
                    // onSnapToItem={(index) => console.log('current index:', index)}
                    pagingEnabled={false}
                    renderItem={({item, index}) => (
                      <View key={index} style={{marginHorizontal: 5}}>
                        <EventBannerCarousel
                          item={item}
                          navigation={navigation}
                        />
                      </View>
                    )}
                  />
                </View>
              </View>
            ) : (
              <Divers
                item={
                  divers.length > 0
                    ? divers[indexDiver]
                    : {
                        type: 'LOADING',
                      }
                }
              />
            )}

            {filterData.length > 0 ? (
              <>
                <View style={{marginTop: 0}}>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingLeft: 16,
                      fontFamily: Font.tertiary,
                      letterSpacing: 1.3,
                      color: Color.tertiary,
                      fontStyle: 'italic',
                    }}>
                    PROMOTIONS
                  </Text>
                </View>
                <View style={styles.containerPromotion}>
                  <SliderCarousel
                    loop
                    width={WIDTH}
                    height={HEIGHT / 2.5}
                    autoPlay={true}
                    data={filterData}
                    scrollAnimationDuration={6000}
                    pagingEnabled={false}
                    renderItem={({item, index}) => (
                      <View key={index} style={{marginHorizontal: 5}}>
                        <View key={index}>
                          <PromotionBannerCarousel
                            item={item}
                            navigation={navigation}
                            user={userInfo}
                            promoId={item.id}
                            // getUserInformation={getUserInformation}
                          />
                        </View>
                      </View>
                    )}
                  />
                </View>
              </>
            ) : (
              <View style={{marginTop: '2%', marginBottom: '5%'}}>
                <Divers
                  item={
                    divers.length > 0 && divers[randomDiver]
                      ? divers[randomDiver]
                      : {
                          type: 'LOADING',
                        }
                  }
                />
              </View>
            )}
          </ScrollView>
          <>
            <BottomNavigation />
          </>
        </>
      )}
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
  container: {flex: 1, backgroundColor: Color.light},
  backgroundImageContainer: {
    width: '100%',
    height: HEIGHT / 7,
  },
  backgroundImage: {
    width: WIDTH,
    height: HEIGHT,
    flex: 1,
  },
  containernotif: {
    height: 40,
    marginHorizontal: 15,
    borderRadius: 8,
    borderWidth: 0.9,
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
  containerEvent: {
    paddingTop: 6,
    alignSelf: 'center',
    height: HEIGHT / 3.1,
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
  cadeauxContainer: {
    alignSelf: 'center',
    height: HEIGHT / 3.5,
    marginTop: '5%',
  },
  containerPromotion: {
    alignSelf: 'center',
    height: HEIGHT / 3.3,
  },
  diverContainer: {
    height: HEIGHT / 3.3,
    width: '95%',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 19,
  },

  child: {WIDTH, justifyContent: 'center'},
  text: {fontSize: WIDTH * 0.5, textAlign: 'center'},
  catalogueTitltle: {
    fontFamily: Font.primary,
    color: '#120D26',
    fontSize: 18,
    fontWeight: 700,
  },
  voirTitltle: {
    color: '#747688',
    fontSize: 16,
    fontWeight: 700,
  }
  
});
