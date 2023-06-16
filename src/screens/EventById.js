import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Pressable,
  Image,
  Alert,
  Share,
  BackHandler,
  ActivityIndicator,
} from 'react-native';

import moment from 'moment/min/moment-with-locales';
import {GlobalButton} from '../components/Button/GlobalButton';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Color, Font} from '../constants/colors/color';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import {Card, Title, Button} from 'react-native-paper';
import {fetchUSerInforamtion} from '../services/homePageApi/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {useIsFocused} from '@react-navigation/native';
import {WheelGame} from '../components/WheelOfFortuneGame/WheelGame';
import {userInfomation, userToken} from '../atom/auth';
import {useRecoilState, useRecoilValue} from 'recoil';
import {baseUrl} from '../atom/responseSurveyState';
import NoData from '../components/NoData.js/NoData';

export const EventById = ({route, navigation}) => {
  const {
    params: {id},
  } = route;

  const isFocused = useIsFocused();
  const [seeOnMap, setSeeOnMap] = useState(true);
  const [seeListLocation, setSeeListLocation] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [config, setConfig] = useState([]);
  const [play, setPlay] = useState(true);
  const openBottonSheet = useRef(null);
  const openMapsSheet = useRef(null);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventExist, setEventExist] = useState(false);
  const url = useRecoilValue(baseUrl);
  const [event, setEvent] = useState({});
  const [user, setUser] = useRecoilState(userInfomation);

  const backAction = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Acceuil'}],
    });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const getEventById = async () => {
    try {
      setEventExist(() => true);

      let data = await fetchEventById();
      if (data) {
        setEvent(() => data);
        setLoading(false);
      }
    } catch (error) {
      setEventExist(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isFocused) {
      getUserInformation();
      getEventById();
    }
  }, []);

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** GET User Information   *************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************

  useEffect(() => {
    if (isFocused) {
      getUserInformation();
    }
  }, []);

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** EVENT BY ID   *************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  // const fetchEventById = async () => {
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //   };

  //   let response = await fetch(`${url}/events/${id}`, requestOptions);
  //   if (response.json()) {
  //     return response.json();
  //   } else {
  //     return {error: 'this event no longer exist', status: 0};
  //   }
  // };
  const fetchEventById = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    let response = await fetch(`${url}/events/${id}`, requestOptions);
    let responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      return false;
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
      setToken(() => token.id);
      const alluserInfo = await fetchUSerInforamtion(token.id);
      setUserInfo(() => alluserInfo);
      setUserInfo(() => alluserInfo);
      api.getPartners(parsedToken).then(result => {
        //console.log('result:', result.data.length);
        setPartners(result.data);
      });
    } catch (e) {}
  };

  const fetchUsersWheelInfo = async () => {
    let phone = userInfo.mobilePhone;
    let id = event.id;
    // console.log(' ============================== id: ======================================= ', id)

    // console.log(
    //   'phone: ========================================> ',
    //   phone,
    //   '===== = = = = = == ',
    //   id,
    // );
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      let result = await fetch(
        `http://145.239.166.14:8088/wheel/result/${id}/${phone}`,
        requestOptions,
      );
      return result.json();
    } catch (e) {
      console.log('error in try catch block', e);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const shareInFacebook = async () => {
    Share.share({
      message:
        ' installer l application catchy \n https://www.npmjs.com/package/@react-native-community/geolocation#requestauthorization',
      title: 'TEST',
    });
  };

  if (!eventExist) {
    return (
      <View style={styles.container}>
        <NoData message="Cet événement est terminé revenez plus tard" />
      </View>
    );
  }

  const checkWheelConfigAndPlayers = async () => {
    // const wheelEvent = await fetchWheelConfig();
    // console.log('wheelEvent:', wheelEvent);
    // setConfig(()=> wheelEvent.config )
    // setConfig(()=> wheelEvent.config )

    const heIsAvailebleToPlay = await fetchUsersWheelInfo();
    console.log('heIsAvailebleToPlay:', heIsAvailebleToPlay);

    // diable play botton on event detail scren to let the user play
    if (heIsAvailebleToPlay.valid) {
      // console.log('heIsAvailebleToPlay.valid:', heIsAvailebleToPlay.valid);

      setModalVisible(true);
    } else {
      setPlay(false);
      // console.log('heIsAvailebleToPlay.valid:', heIsAvailebleToPlay.valid);
      Alert.alert('', 'Vous avez déja jouer');
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={Color.primary} />
      ) : (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            {/* <View>
      <Text>helloooo</Text>
    </View> */}
            <WheelGame
              userInfo={userInfo}
              eventId={event.id}
              closeModal={closeModal}
              config={config}
            />
          </Modal>
          {/* <WheelGame /> */}

          <SafeAreaView style={styles.container}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  letterSpacing: 1.5,
                  margin: '3%',
                }}>
                {event.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginTop: '5%',
                marginHorizontal: '3%',
              }}>
              <View
                style={{
                  height: HEIGHT / 8,
                  marginVertical: '2%',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '30%',
                  }}>
                  <Image
                    source={require('../assets/design/calender.png')}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="center"
                  />
                </View>
                <View
                  style={{
                    width: '70%',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                  }}>
                  <Text style={styles.eventDateDisplayText}>
                    {moment(event.startDate)
                      .locale('fr')
                      .format('MMMM Do YYYY, h:mm ')}
                  </Text>
                  <Text style={styles.eventDateDisplayText}>
                    Disparaitre en{' '}
                    <Text style={styles.eventDateDisplayColorDate}>
                      {moment(event.endDate).locale('fr').fromNow(true)}
                    </Text>
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: HEIGHT / 4,
                  marginVertical: '2%',
                  flexDirection: 'row',
                }}>
                <Pressable
                  onPress={() => setSeeListLocation(!seeListLocation)}
                  style={{
                    width: '30%',
                  }}>
                  <Image
                    source={require('../assets/design/pin.png')}
                    style={{width: '80%', height: '80%'}}
                    resizeMode="center"
                  />
                </Pressable>
                {!seeListLocation ? (
                  <View
                    style={{
                      width: '70%',
                      flexDirection: 'column',
                      justifyContent: 'space-evenly',
                    }}>
                    {event.locations.map((elm, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'auto',
                          flex: 1,
                        }}>
                        <Text style={{fontSize: 14}}>{index + 1} - </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            letterSpacing: 1.2,
                            fontWeight: 'bold',
                          }}>
                          {elm.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Card
                    mode="elevated"
                    style={{width: WIDTH / 1.5, borderWidth: 1}}>
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      style={styles.map}
                      //specify our coordinates.
                      initialRegion={{
                        latitude: 34.98825,
                        longitude: 9.4324,
                        latitudeDelta: 6,
                        longitudeDelta: 0,
                      }}>
                      {event.locations.map((loc, index) => (
                        <Marker
                          key={index}
                          coordinate={{
                            latitude: +loc.latitude,
                            longitude: +loc.longitude,
                          }}
                          title={loc.name}
                          description={loc.address}
                          pinColor={Color.primary}
                        />
                      ))}
                    </MapView>
                  </Card>
                )}
              </View>
              <View
                style={{
                  height: HEIGHT / 8,
                  marginVertical: '2%',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '30%',
                  }}>
                  <Image
                    source={{
                      uri: `data:image/png;base64,${event.partner.logo.picByte}`,
                    }}
                    style={{
                      width: '80%',
                      height: '80%',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}
                    resizeMode="center"
                  />
                </View>
                <View
                  style={{
                    width: '70%',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                  }}>
                  <Text style={styles.eventDateDisplayText}>
                    {event.partner.name}
                  </Text>
                  <Text style={styles.eventDateDisplayText}>
                    {event.partner.address}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={{paddingLeft: 16, fontSize: 18, fontWeight: 'bold'}}>
                a propos
              </Text>
              <View>
                <Text
                  style={{textAlign: 'left', color: '#808e9b', padding: 10}}>
                  {event.product.description}
                </Text>
              </View>
              <Button onPress={() => shareInFacebook()}>
                share in facebook
              </Button>
            </View>
            <View
              style={{position: 'absolute', bottom: '3%', alignSelf: 'center'}}>
              <GlobalButton
                diableBtn={userInfo.mobilePhone == undefined}
                title="participer"
                onPress={() => {
                  checkWheelConfigAndPlayers();
                }}
              />
            </View>
          </SafeAreaView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,

  },
  CardContainer: {
    width: WIDTH - 30,
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    marginVertical: 20,
    height: HEIGHT / 5,
  },
  title: {
    color: '#57606f',
    fontFamily: Font.primary,
    fontWeight: 'bold',
    textTransform: 'lowercase',
    paddingLeft: 16,
    // textDecorationLine: 'underline',
  },
  imageContainer: {
    width: WIDTH - 20,
    height: HEIGHT / 4,
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#f1f2f6',
  },
  displayImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  eventTitle: {
    textShadowColor: '#eee',
    fontSize: 18,
    fontFamily: Font.primary,
  },
  mapsContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    width: WIDTH,
    borderWidth: 1,
    // borderWidth:2, backgroundColor:'red'
  },
  ListContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 300,
    width: WIDTH - 50,
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    // borderWidth:2, backgroundColor:'red'
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  seeOnMaps: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    fontFamily: Font.primary,
    letterSpacing: 1.3,
    color: Color.primary,
    backgroundColor: '#000',
    borderWidth: 0.03,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },

  touchableRender: {
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Color.primary,
    borderWidth: 0.01,
    // width: WIDTH / 3,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    borderRadius: 10,
  },
  alreadyPlayed: {
    alignSelf: 'center',
  },
  textAlreadyPlayed: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    // position:'absolute'
  },
  eventDateDisplayText: {
    color: '#000',
    fontFamily: Font.primary,
    fontSize: 16,
    padding: '2%',
  },
  eventDateDisplayColorDate: {
    color: 'green',
  },
});
