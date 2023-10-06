import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  BackHandler,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import {Color, Font} from '../constants/colors/color';
import ActionButton from '../components/ActionButton/react-native-action-button';
import * as api from '../services/api';
import {Storage} from '../services/api';
import loyalty from '../constants/loyalty';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import {WIDTH, HEIGHT} from '../utils/Dimension';
import {SwitchPage} from '../components/SwitchPage/SwitchPage';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useIsFocused} from '@react-navigation/native';

import {fetchUSerInforamtion} from '../services/homePageApi/home';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MediaVideo} from '../components/MediaVideo/MediaVideo';
const SPACING = 10;
const THUMB_SIZE = 80;
export const MediaGallery = ({navigation}) => {
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

  const [mediaList, setMediaList] = useState([]);
  const [fetch, setFetch] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const carouselRef = useRef();
  const flatListRef = useRef();
  const [indexSelected, setIndexSelected] = useState(0);
  const [readVideo, setReadVideo] = useState(false);
  const [userInfo, setUserInfo] = useState({});

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
  const onRefresh = useCallback(() => {
    refreshScreen();
  }, []);

  const refreshScreen = () => {
    setRefreshing(true);

    Storage.getLoyaltyPoints().then(result => {
      api
        .getUserMedia(result.id)
        .then(res => {
          setMediaList(res.data);
          setTimeout(() => {
            setRefreshing(false);
          }, 100);
        })
        .catch(error => {
          throw error;
        })
        .finally(() =>
          setTimeout(() => {
            setFetch(false);
          }, 1000),
        );
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

  useEffect(() => {
    if (isFocused) {
      getUserInformation();
      unsubscribeScreen();
    }
  }, [isFocused]);

  const unsubscribeScreen = () => {
    setFetch(true);
    Storage.getLoyaltyPoints().then(result => {
      api
        .getUserMedia(result.id)
        .then(res => {
          setMediaList(res.data);
        })
        .catch(error => {
          throw error;
        })
        .finally(() =>
          setTimeout(() => {
            setFetch(false);
          }, 1000),
        );
    });
  };

  // *****************************************************************************************
  // *************************** Action buttton **********************************************
  // *****************************************************************************************

  const showActionButton = () => (
    <ActionButton
      buttonColor={Color.primary}
      onPress={() => navigation.navigate('MediaForm')}
    />
  );
  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);

    /**
     * if you want to position the thumbnail in * the middle of the screen on selection
     * do the following
     * Calculation done by awesome Catalin Miron
     * Source: https://www.youtube.com/watch?v=gjC2oUJhePE&t=1097s
     */
    if (indexSelected * (THUMB_SIZE + 10) - THUMB_SIZE / 2 > WIDTH / 2) {
      flatListRef?.current?.scrollToOffset({
        offset: indexSelected * (THUMB_SIZE + 10) - WIDTH / 2 + THUMB_SIZE / 2,
        animated: true,
      });
    } else {
      flatListRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }

    //  my initial solution
    // flatListRef?.current?.scrollToOffset({
    //   offset: indexSelected * THUMB_SIZE,
    //   animated: true,
    // });
  };

  const onTouchThumbnail = touched => {
    if (touched === indexSelected) return;

    carouselRef?.current?.snapToItem(touched);
  };

  return (
    <SafeAreaView style={styles.safeAriaContainer}>
      {/* ****************************** image backgroud ******************************* */}

      {fetch ? (
        <SwitchPage />
      ) : (
        <ScrollView
          contentContainerStyle={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          >
          <View style={{height: HEIGHT / 3.4}}>
            <MenuHeaders
              navigation={navigation}
              userInfo={userInfo}
              title="GALERIE"
            />
          </View>
          {mediaList.length > 0 ? (
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 32,
                  marginTop: 50,
                  marginBottom: 25,
                }}>
                Mes Photos
              </Text>
              {/* Carousel View */}
              <View style={{flex: 0.8, marginTop: 20}}>
                <Carousel
                  ref={carouselRef}
                  layout="default"
                  data={mediaList}
                  sliderWidth={WIDTH}
                  itemWidth={WIDTH}
                  onSnapToItem={index => onSelect(index)}
                  renderItem={({item, index}) => (
                    <>
                      {item.type === 'image/jpeg' ? (
                        <Image
                          key={index}
                          style={{width: '100%', height: '100%'}}
                          resizeMode="contain"
                          source={{uri: `data:image/png;base64,${item.image}`}}
                        />
                      ) : (
                        <Pressable
                          onPress={() => setReadVideo(true)}
                          style={{flex: 1, height: HEIGHT}}>
                          {!readVideo ? (
                            <View
                              style={{
                                width: '100%',

                                justifyContent: 'center',
                                alignSelf: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                key={index}
                                style={{
                                  width: '90%',
                                  height: '100%',
                                }}
                                resizeMode="contain"
                                source={{
                                  uri: 'https://d33v4339jhl8k0.cloudfront.net/docs/assets/591c8a010428634b4a33375c/images/5ab4866b2c7d3a56d8873f4c/file-MrylO8jADD.png',
                                }}
                              />
                            </View>
                          ) : (
                            <View style={{height: HEIGHT + 50}}>
                              <MediaVideo
                                vedioName={item.name}
                                setReadVideo={setReadVideo}
                              />
                            </View>
                          )}
                        </Pressable>
                      )}
                    </>
                  )}
                />
                <Pagination
                  inactiveDotColor="gray"
                  dotColor={Color.primary}
                  activeDotIndex={indexSelected}
                  dotsLength={mediaList.length}
                  animatedDuration={150}
                  inactiveDotScale={1}
                />
              </View>
              <View
                style={{
                  marginTop: 20,
                  paddingHorizontal: 32,
                  alignSelf: 'flex-end',
                }}>
                <Text style={{color: 'white', fontSize: 22}}>
                  {indexSelected + 1}/{mediaList.length}
                </Text>
              </View>
              {/* Thumbnail component using FlatList */}
              <FlatList
                ref={flatListRef}
                horizontal={true}
                data={mediaList}
                style={{position: 'absolute', bottom: 100}}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: SPACING,
                }}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                  <>
                    {item.type === 'image/jpeg' ? (
                      <TouchableOpacity
                        onPress={() => onTouchThumbnail(index)}
                        activeOpacity={0.9}>
                        <Image
                          style={{
                            width: THUMB_SIZE,
                            height: THUMB_SIZE,
                            marginRight: SPACING,
                            borderRadius: 16,
                            borderWidth: index === indexSelected ? 4 : 0.75,
                            borderColor:
                              index === indexSelected ? Color.primary : 'white',
                          }}
                          source={{uri: `data:image/png;base64,${item.image}`}}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => onTouchThumbnail(index)}
                        activeOpacity={0.9}>
                        <Image
                          style={{
                            width: THUMB_SIZE,
                            height: THUMB_SIZE,
                            marginRight: SPACING,
                            borderRadius: 16,
                            borderWidth: index === indexSelected ? 4 : 0.75,
                            borderColor:
                              index === indexSelected ? Color.primary : 'white',
                          }}
                          source={{
                            uri: 'https://d33v4339jhl8k0.cloudfront.net/docs/assets/591c8a010428634b4a33375c/images/5ab4866b2c7d3a56d8873f4c/file-MrylO8jADD.png',
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </>
                )}
              />
            </View>
          ) : (
            <View style={styles.noData}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: Font.primary,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  letterSpacing: 1.2,
                }}>
                Prendre un photo ou Vidéo
              </Text>
              <AntDesign name="picture" color={Color.primary} size={HEIGHT / 4} />
            </View>
          )}
        </ScrollView>
      )}
      {/* ***************************************** action buttton ************************** */}
      {!fetch && <>{showActionButton()}</>}
    </SafeAreaView>
  );
};

export default MediaGallery;
const styles = StyleSheet.create({
  safeAriaContainer: {
    flex: 1,
    backgroundColor: '#fff',
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
  photoContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  noData: {
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection:'column',
    alignItems : 'center'
  },
  noDataTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1.1,
    color: Color.secondary,
    fontFamily: Font.primary,
    textAlign: 'center',
  },
  renderImgContainer: {
    backgroundColor: 'green',
    marginTop: 20,
  },
});
