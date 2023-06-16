import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  BackHandler,
  Pressable,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, {
  Callout,
  Heatmap,
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
} from 'react-native-maps';
import moment from 'moment';

// import moment from 'moment/min/moment-with-locales';
import 'moment/locale/fr';

import * as api from '../services/api';
import {Storage} from '../services/api';
import loyalty from '../constants/loyalty';
import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import {Color, Font} from '../constants/colors/color';
import {useIsFocused} from '@react-navigation/native';
import {Card, Searchbar, ActivityIndicator} from 'react-native-paper';
import {fetchUSerInforamtion} from '../services/homePageApi/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {
  currentContry,
  currentPosition,
  currentContryCode,
  locationState,
  coordinatesPolyline,
} from '../atom/localisation';
import {useRecoilState} from 'recoil';
export const EventScreen = ({navigation, route}) => {
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
  const [allLocation, setAllLocation] = useState([]);
  const [events, setEvents] = useState([]);
  const [partners, setPartners] = useState([]);
  const [visible, setVisible] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [contry, setContry] = useRecoilState(currentContry);

  const [position, setPosition] = useRecoilState(currentPosition);
  const [userLocation, setUserLocation] = useRecoilState(locationState);
  const [coordinates, setCoordinates] = useState([]);
  const [ContryCode, setContryCode] = useRecoilState(currentContryCode);
  const [refreshing, setRefreshing] = useState(false);
  const BannerWidth = Dimensions.get('window').width;
  const carouselRef = useRef();
  const flatListRef = useRef();
  const [indexSelected, setIndexSelected] = useState(0);
  const THUMB_SIZE = 80;
  const SPACING = 10;
  const isFocused = useIsFocused();
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
      setUserInfo(() => alluserInfo);
    } catch (e) {}
  };
  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### ***  GET ALL EVENT AND PARTNERS WITH USE EFEECT    *** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const nearLocationCalcul = (allLocations, userLocation) => {
    if (userLocation.latitude != null) {
   

      let nearestLocation = null;
      let minDistance = Infinity;

      allLocations.forEach(location => {
        const lat1 = parseFloat(userLocation.latitude);
        const lon1 = parseFloat(userLocation.longitude);
        const lat2 = parseFloat(location.latitude);
        const lon2 = parseFloat(location.longitude);

        const R = 6371e3; // metres
        const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c;

        if (distance < minDistance) {
          minDistance = distance;
          nearestLocation = location;
        }
      });

      return nearestLocation;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isFocused) {
      getUserEventsAndPartners();
      getUserInformation();
    }
  }, []);

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### ***************  REFRECH CALL BACK    **************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const onRefresh = useCallback(() => {
    setFetch(false);
    setRefreshing(true);
    getUserEventsAndPartners();
  }, []);

  fetchEVent = async () => {};
  const getUserEventsAndPartners = () => {
    AsyncStorage.getItem('profile').then(result => {
      if (result !== null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);

        api
          .getUserEvents(token.id)
          .then(res => {
            if (res.data.length > 0) {
              setEvents(res.data);
              let arrayOdLocation = [];
              res.data?.map(arr => {
                arr.locations.map(el => {
                  arrayOdLocation.push(el);
                });
              });
              setAllLocation(() => arrayOdLocation);
              if (userLocation.latitude != null) {
                let calculateNearLocation = nearLocationCalcul(
                  arrayOdLocation,
                  userLocation,
                );

                const newCoordinates = [
                  {
                    latitude: +userLocation.latitude,
                    longitude: +userLocation.longitude,
                  },
                  {
                    latitude: +calculateNearLocation.latitude,
                    longitude: +calculateNearLocation.longitude,
                  },
                ];
                setCoordinates(() => newCoordinates);
              }

              setRefreshing(true);
            }
            setRefreshing(true);

            api
              .getPartners(parsedToken)
              .then(res => {
                // setRefreshing(false);
                setPartners(res.data);
              })
              .catch(e => {
                setFetch(true);
                throw e;
              });
            setFetch(true);
          })
          .catch(e => {
            setFetch(true);
            throw e;
          });
      }
    });
    Storage.getLoyaltyPoints().then(user => {
      api
        .getUser(user.id)
        .then(user => {
          loyalty.points = user.data.loyaltyPoints;
        })
        .catch(error => {
          throw error;
        });
    });
  };

  const topScrollItems = [
    { title: 'Nike', image: require('../assets/design/nike.png') },
    { title: 'Randa', image: require('../assets/design/randa.png') },
    { title: 'Coca Cola', image: require('../assets/design/coca.png') },
  ];
  const mapCustomStlye = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {!refreshing ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color={Color.primary} />
        </View>
      ) : (
        <>
          {events && events.length > 0 ? (
            <View style={styles.container}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                  latitude:
                    userLocation.latitude != null
                      ? userLocation.latitude
                      : 36.809424320953624,
                  longitude:
                    userLocation.longitude != null
                      ? userLocation.longitude
                      : 10.181040137759528,
                  latitudeDelta: 6,
                  longitudeDelta: 0,
                }}
                customMapStyle={mapCustomStlye}>
                {userLocation.latitude != null && (
                  <Marker
                    coordinate={{
                      latitude: userLocation.latitude,
                      longitude: userLocation.longitude,
                    }}
                    title={'Ma position '}
                    description={'Je suis la'}
                  />
                )}
                {allLocation.map((loc, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: +loc.latitude,
                      longitude: +loc.longitude,
                    }}
                    title={loc.name}
                    description={loc.address}
                    pinColor={Color.primary}
                  >
                    <View style={styles.customMarker}>
                      <Image style={{width: 15, height: 15,alignSelf:'center',marginTop:5}} source={require('../assets/design/marker.png')}/>
                    </View>
                  </Marker>
                ))}
              </MapView>
              <View
                style={{
                  width: WIDTH,
                  paddingLeft: '3%',
                  marginTop: '2%',
                  marginEnd: '2%',
                }}>
                <Ionicons
                  name="arrow-back"
                  color="#fff"
                  size={30}
                  onPress={backAction}
                />
              </View>
              <View style={styles.searchBox}>
                <View>
                  <View style={{flexDirection:'row'}}>
                    <Searchbar placeholder='Rechercher un évènement' style={{width: '80%',borderRadius:15}} inputStyle={{fontSize:14}} />
                    <View style={{backgroundColor: '#fff',marginLeft:5,borderRadius:15,padding:13}}>
                      <Pressable>
                        <Image
                          source={require('../assets/design/location.png')}
                          style={{alignSelf:'center',}}
                        />
                      </Pressable>
                    </View>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentInset={{
                      // iOS only
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 20,
                    }}
                    contentContainerStyle={{
                      paddingRight: Platform.OS === 'android' ? 20 : 0,
                    }}
                    style={{alignSelf: 'center',marginTop:5}}>
                  {topScrollItems &&
                    topScrollItems.map((item, index) => {
                      return (
                        <View key={index} style={{marginHorizontal: 5}}>
                          <Card
                            style={{alignSelf: 'center', 
                              width: WIDTH / 2.5,
                              padding:7,
                              borderRadius:20,}}>
                            <View
                              style={{
                                flexDirection: 'row'
                              }}>
                              <View style={{width: '35%'}}>
                                <Pressable>
                                  <Image
                                    source={item.image}
                                    style={{alignSelf:'center'}}
                                  />
                                </Pressable>
                              </View>
                              <View>
                                <Text style={styles.topScrollTitle}>
                                  {item.title}
                                </Text>
                              </View>
                            </View>
                          </Card>
                        </View>
                      );
                    })}
                </ScrollView>
                </View>
              </View>
              <View style={styles.bottomContainer}>
                <ScrollView
                  horizontal
                  // scrollEventThrottle={1}
                  showsHorizontalScrollIndicator={false}
                  height={HEIGHT / 5}
                  contentInset={{
                    // iOS only
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 20,
                  }}
                  contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0,
                  }}
                  style={{alignSelf: 'center'}}>
                  {events &&
                    events.map((item, index) => {
                      return (
                        <View key={index} style={{marginHorizontal: 5}}>
                          <Card
                            style={{alignSelf: 'center', width: WIDTH / 1.2,padding:7,borderRadius:20}}>
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                height: HEIGHT / 6,
                              }}>
                              <View style={{width: '35%'}}>
                                <Pressable
                                  onPress={() => {
                                    navigation.navigate('Event', {
                                      item: item,
                                      long: item.locations[0].longitude,
                                      lat: item.locations[0].latitude,
                                      userInfo: userInfo,
                                    });
                                  }}>
                                  <Image
                                    source={{
                                      uri: `data:image/png;base64,${item.image.picByte}`,
                                    }}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      backgroundColor: '#fff',
                                    }}
                                    resizeMode="center"
                                  />
                                </Pressable>
                              </View>
                              <View
                                style={{
                                  width: '40%',
                                  flexDirection: 'column',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginVertical: 5,
                                  marginLeft:15,
                                }}>
                                <Text style={{fontFamily: Font.inter}}>
                                  <Text
                                    style={[styles.eventDateDisplayColorDate]}>
                                    {moment(item.startDate)
                                      .locale('fr')
                                      .format('MMMM Do YYYY, h')}
                                    h
                                  </Text>
                                </Text>

                                <Text style={styles.eventName}>
                                  {item.name}
                                </Text>

                                {/* <View style={styles.eventDateDisplayContainer}>
                                  <Text style={styles.eventDateDisplayText}>
                                    Disparaitre en :{'\n '}
                                    <Text
                                      style={styles.eventDateDisplayColorDate}>
                                      {moment(item.endDate)
                                        .locale('fr')
                                        .format('MMMM Do YYYY, h')}
                                      h
                                    </Text>
                                  </Text>
                                </View> */}
                                <View
                                  style={{
                                    alignItems: 'flex-start',
                                    flexDirection: 'row',
                                  }}>
                                  <Ionicons
                                    name="location-outline"
                                    color="#A5A7B5"
                                    size={28}
                                    onPress={() => {
                                      navigation.navigate('Event', {
                                        item: item,
                                        long: item.locations[0].longitude,
                                        lat: item.locations[0].latitude,
                                        userInfo: userInfo,
                                      });
                                    }}
                                  />
                                  <Text style={{textAlign: 'center',fontSize:12,color:'gray',fontWeight:'bold'}}>
                                    Voir tout les emplacement
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{width: '20%', alignItems: 'flex-end'}}>
                                <Ionicons
                                  name="ios-bookmark"
                                  color="#ff7675"
                                  size={28}
                                  onPress={() => {
                                    navigation.navigate('Event', {
                                      item: item,
                                      long: item.locations[0].longitude,
                                      lat: item.locations[0].latitude,
                                      userInfo: userInfo,
                                    });
                                  }}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                      );
                    })}
                </ScrollView>
              </View>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}
              refreshControl={
                <RefreshControl
                  refreshing={!refreshing}
                  onRefresh={onRefresh}
                />
              }>
              <View style={{height: HEIGHT / 5}}>
                <MenuHeaders
                  navigation={navigation}
                  userInfo={userInfo}
                  title="EVENNEMENT"
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <View
                  style={{
                    marginTop: WIDTH / 3,
                    alignSelf: 'center',
                  }}>
                  {/* <LottieView
                      source={require('../assets/design/gif/2.gif')}
                      autoPlay
                      loop
                      style={{
                        width: '70%',
                        height: 200,
                      }}
                    /> */}

                  <FastImage
                    style={{width: 200, height: 200}}
                    source={require('../assets/design/gif/1.gif')}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></View>
                </View>

                <Text
                  style={{
                    fontFamily: Font.primary,
                    fontWeight: 'bold',
                    fontSize: 18,
                    fontStyle: 'italic',
                  }}>
                  il n'y a pas des evennements...{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: Font.primary,
                    fontWeight: 'bold',
                    fontSize: 16,
                    fontStyle: 'italic',
                  }}>
                  revenez plus tard
                </Text>
              </View>
            </ScrollView>
          )}
        </>
      )}
    </SafeAreaView>
  );
};
export default EventScreen;

// ********************************************************************
// **   ##******************************************************##   **
// *  ### *************** StyleSheet   ************************* ###  *
// **   ##******************************************************##   **
// ********************************************************************
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : '8%',
    flexDirection: 'column',
    // backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: '5%',
    left: 0,
    right: 0,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  eventName: {
    color: '#000',
    fontFamily: Font.primary,
    fontWeight:'bold',
  },
  topScrollTitle: {
    color: 'gray',
    fontFamily: Font.primary,
    fontWeight:'bold',
  },
  eventDiscripton: {
    color: '#000',
    fontFamily: Font.primary,
    fontSize: 12,
  },
  eventDateDisplayContainer: {},
  eventDateDisplayText: {
    color: '#000',
    fontFamily: Font.tertiary,
    fontSize: 12,
    marginHorizontal: '10%',
    textAlign: 'center',
  },
  eventDateDisplayColorDate: {
    color:'#5669FF',
    fontFamily: Font.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  participateBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    borderWidth: 0.01,
    width: WIDTH / 3,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 10,
  },
  btnText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  eventNameContainer: {
    alignSelf: 'flex-start',
    padding: '2%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth:1,
  },
  customMarker:{
    height:25,
    width:25,
    borderRadius:10,
    backgroundColor:'#fff'
  }
});
