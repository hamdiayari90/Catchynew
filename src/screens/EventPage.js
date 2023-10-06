import { Color, Border, Padding, FontFamily, FontSize } from "../assets/home12/GlobalStyles";
import React, { useRef, useState, useCallback, useEffect, } from 'react';
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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment/min/moment-with-locales';
import { Picker } from '@react-native-picker/picker';
import * as api from '../services/api';
import { Avatar } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
const { height, width } = Dimensions.get('window');
import { HEIGHT, WIDTH } from '../utils/Dimension';
import { Button, Card, Searchbar, Title } from 'react-native-paper';
import { fetchUSerInforamtion } from '../services/homePageApi/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { WheelGame } from './WheelOfFortuneGame/WheelGame';
import { GlobalButton } from './Button/GlobalButton';
import Video from 'react-native-video';
import Geolocation from "@react-native-community/geolocation";

export default function Event({ route, navigation }) {
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasWatchedVideo, setHasWatchedVideo] = useState(false);
  const [isWheelGamePlaying, setIsWheelGamePlaying] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [canPlayWheelGame, setCanPlayWheelGame] = useState(false);


  const handleVideoLoad = (metaData) => {
    console.log("Video loaded!", metaData);
};
  useEffect(() => {
    if (isFocused) {
      getUserInformation();
    }
  }, []);

  const handleSeeOnMap = () => {
    setSeeOnMap(() => true);
    setSeeListLocation(() => false);
  };

  const handleSeeOnlist = () => {
    setSeeOnMap(() => false);
    setSeeListLocation(() => true);
  };
  const [selectedLocation, setSelectedLocation] = useState(null);
  const {
    item: {
      message,
      video: { name: videoName }, // rename 'name' to 'videoName'
      partner: { address, email, id, phone, name, logo }, // rename 'name' to 'partnerName'
      locations,
    },
    long,
    lat,
} = route.params;
  const item = route.params.item;

  const LATITUDE_DELTA = 10;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

  const getUserInformation = async () => {
    try {
      const value = await AsyncStorage.getItem('profile');
      const parsedToken = JSON.parse(value);
      const token = jwt_decode(parsedToken);
      setToken(() => token.id);
      const alluserInfo = await fetchUSerInforamtion(token.id);
      api.getPartners(parsedToken).then((result) => {
        setPartners(result.data);
      });
      setUserInfo(() => alluserInfo);
      setUserInfo(() => alluserInfo);
    } catch (e) {}
  };


  const fetchUsersWheelInfo = async () => {
    let phone = userInfo.mobilePhone;
    let id = item.id;
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
        requestOptions
      );
      return result.json();
    } catch (e) {}
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const shareInFacebook = async () => {
    Share.share({
      message:
        ' Installez l application catchy \n https://play.google.com/store/apps/details?id=com.catchycatchous',
      title: 'Catchy',
    });
  };

  const handleParticiper = () => {
    setIsVideoPlaying(true); // Show the modal with video
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false); // Hide the modal when the video finishes
    setHasWatchedVideo(true); // Set hasWatchedVideo to true indicating the user has watched the video
    setIsWheelGamePlaying(true); // Show the wheel game modal after watching the video
  };
  useEffect(() => {
    if (isVideoPlaying) {
      setHasWatchedVideo(false); // Reset the hasWatchedVideo state when the video modal opens
    }
  }, [isVideoPlaying]);

  const checkWheelConfigAndPlayers = async () => {
    const heIsAvailableToPlay = await fetchUsersWheelInfo();
    if (heIsAvailableToPlay.valid) {
      if (hasWatchedVideo) {
        setIsWheelGamePlaying(true); // Show the wheel game directly since the user has watched the video
      } else {
        setModalVisible(true);
        setPlay(true);
      }
    } else {
      Alert.alert('', 'Vous avez déjà joué');
    }
  };
  const handleOpenModal = () => {
    setModalVisible(true);
    Orientation.lockToLandscape();
};

const handleCloseModal = () => {
    setModalVisible(false);
    setIsVideoPlaying(false);
    Orientation.lockToPortrait();
};

  return (
    <ScrollView>

    <View style={styles.eventExemple}>
      <View style={styles.frameParent}>
        <View>
          <View>
            <View style={styles.textParent}>
              <Text style={[styles.text, styles.textFlexBox1]}>
                A propos de l’évènement
              </Text>
              <Text style={[styles.text1, styles.text1SpaceBlock]}>
              {message}
              </Text>
            </View>
            <View style={[styles.frameView, styles.text1SpaceBlock]}>
              <View style={styles.frameWrapper}>
                <View style={styles.iconsParentFlexBox1}>
                  <Image
                    style={[styles.icons, styles.iconsLayout1]}
                    resizeMode="cover"
                    source={require("../assets/home12/icons49.png")}
                  />
                  <Text style={styles.roueDeLa}>Roue de la fortune</Text>
                </View>
              </View>
              <View style={styles.frameWrapper1}>
                <View style={styles.iconsParentFlexBox1}>
                  <Image
                    style={[styles.icons, styles.iconsLayout1]}
                    resizeMode="cover"
                    source={require("../assets/home12/icons50.png")}
                  />
                  <Text style={styles.photoBooth}>Photo Booth</Text>
                </View>
              </View>
              <View style={{ height: 40 }} />

              <View style={styles.frameWrapper2}>
                <View style={styles.iconsParentFlexBox1}>
                  <Image
                    style={styles.iconsLayout1}
                    resizeMode="cover"
                    source={require("../assets/home12/icons51.png")}
                  />
                  <Text style={styles.roueDeLa}>Dégustation</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.frameParent1}>
            <View style={[styles.textWrapper, styles.iconsParentFlexBox1]}>
              <Text style={[styles.text, styles.textFlexBox1]}>
                Les emplacements
              </Text>
            </View>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.lgrg1Icon}
                //specify our coordinates.
                initialRegion={{
                  latitude: 36.8251184,
                  longitude: 10.082105,
                  latitudeDelta: 6,
                  longitudeDelta: 0,
                }}
              >
                {item.locations.map((loc, index) => (
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
         
          </View>
        </View>
        <View style={[styles.frameParent2, styles.frameParentShadowBox]}>
          <View style={[styles.textGroup, styles.textFlexBox]}>
            <Text style={[styles.text, styles.textFlexBox1]}>
              Jouer en ligne
            </Text>
            <View style={styles.frameWrapper}>
              <View style={styles.iconsParentFlexBox1}>
              <TouchableOpacity onPress={() => navigation.navigate('Fortune')}>
                <Image
                    style={[styles.icons, styles.iconsLayout1]}
                    resizeMode="cover"
                    source={require("../assets/home12/icons49.png")}
                />
            </TouchableOpacity>
                <Text style={styles.roueDeLa}>Roue de la fortune</Text>
              </View>
            </View>
          </View>
          <Text
            style={[styles.text5, styles.textTypo2]}
          >{`Avant de jouer, vous devez regarder cette vidéo ! `}</Text>
          
          <Modal
                visible={isModalVisible}
                onRequestClose={handleCloseModal}
                animationType="slide"
                transparent={true}
            >
                <Video
                    source={{ uri: `https://www.catchy.tn/media/event/${videoName}` }}
                    style={styles.icon}
                    resizeMode="cover"
                    controls={false}
                    muted={false}
                    repeat={true}
                    autoplay={true}
                    paused={!isVideoPlaying}
                    onLoad={handleVideoLoad}
                />
                {/* Optionally, add a close button for the Modal */}
                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </Modal>

            {!isVideoPlaying && (
                <TouchableOpacity style={styles.playButtonContainer} onPress={handleOpenModal}>
                    <Image
                        source={require("../assets/home12/group-63564341.png")}
                        style={styles.playButton}
                    />
                </TouchableOpacity>
            )}
          <View style={[styles.container, styles.containerPosition]}>
            <Text style={[styles.text6, styles.textTypo]}>40:00</Text>
          </View>
        </View>
      </View>
      <Image
    style={[styles.eventExempleChild, styles.parentPosition]}
    resizeMode="cover"
    source={{ uri: `data:image/png;base64,${logo.picByte}` }}
/>

      <View style={[styles.frameParent3, styles.linePosition]}>
        <View style={[styles.textContainer, styles.textFlexBox]}>
          <Text style={[styles.text7, styles.textTypo1]}>
          {name}        </Text>
          <View style={styles.buttonsLayout}>
            <Image
              style={[styles.icons4, styles.iconsLayout]}
              resizeMode="cover"
              source={require("../assets/home12/icons52.png")}
            />
          </View>
        </View>
        <View style={[styles.iconsParent2, styles.iconsParentFlexBox]}>
          <Image
            style={styles.icons5}
            resizeMode="cover"
            source={require("../assets/home12/icons3.png")}
          />
          <Text style={[styles.text8, styles.text8Typo]}>{moment(item.startDate)
                  .locale('fr')
                  .format('MMMM Do YYYY, h:mm ')}</Text>
        </View>
      </View>
      <View style={[styles.buttons1, styles.buttonsLayout]}>
        <Image
          style={[styles.icons6, styles.iconsLayout]}
          resizeMode="cover"
          source={require("../assets/home12/icons53.png")}
        />
      </View>
         
      </View>
     
     
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  textFlexBox1: {
    textAlign: "left",
    color: Color.black,
  },
  text1SpaceBlock: {
    marginTop: 8,
    width: 307,
  },
  playButtonContainer: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
},
playButton: {
    width: 50,  // Or whatever size you want
    height: 50,
    resizeMode: 'contain'
},
  iconsLayout1: {
    height: 23,
    width: 23,
    borderRadius: Border.br_11xl,
  },
  iconsParentFlexBox1: {
    alignItems: "center",
    flexDirection: "row",
  },
  containerPosition: {
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  textTypo: {
    fontSize: 9,
    color: Color.white,
    textAlign: "left",
  },
  frameParentShadowBox: {
    paddingHorizontal: Padding.p_mini,
    elevation: 0,
    shadowRadius: 0,
    shadowColor: "#fed544",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    width: 320,
    borderRadius: Border.br_xl,
  },
  textFlexBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textTypo2: {
    color: Color.grey,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    lineHeight: 17,
    fontSize: FontSize.size_xs,
    textAlign: "left",
  },
  parentPosition: {
    left: 0,
    position: "absolute",
  },
  linePosition: {
    left: "50%",
    position: "absolute",
  },
  textTypo1: {
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
  },
  iconsLayout: {
    width: 24,
    height: 24,
  },
  iconsParentFlexBox: {
    borderRadius: Border.br_41xl,
    backgroundColor: Color.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text8Typo: {
    lineHeight: 16,
    fontWeight: "600",
    textAlign: "left",
    color: Color.black,
  },
  buttonsLayout: {
    paddingVertical: Padding.p_xs,
    height: 40,
    width: 40,
    borderRadius: Border.br_21xl,
    paddingHorizontal: Padding.p_base,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  navMenuBg: {
    backgroundColor: Color.lightGrey,
    width: 360,
  },
  iconLayout: {
    height: 46,
    width: 46,
  },
  parentFlexBox: {
    width: 74,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 17 ,
    lineHeight: 18,
    textTransform: "capitalize",
    fontWeight: "900",
    fontFamily: FontFamily.poppinsBold,
  },
  text1: {
    height: 49,
    color: Color.grey,
    fontFamily: FontFamily.interMedium,
    fontWeight: "600",
    lineHeight: 17,
    fontSize: 16,
    textAlign: "left",
  },
  textParent: {
    height: 59,
  },
  icons: {
    overflow: "hidden",
  },
  roueDeLa: {
    marginLeft: 4.5,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    lineHeight: 12,
    fontSize: FontSize.size_3xs,
    textAlign: "left",
    color: Color.black,
  },
  frameWrapper: {
    backgroundColor: Color.primaryVarient2,
    width: 138,
    justifyContent: "center",
    paddingVertical: Padding.p_2xs_5,
    paddingHorizontal: 11,
    height: 32,
    borderRadius: Border.br_mini,
  },
  photoBooth: {
    color: Color.white,
    marginLeft: 4.5,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    lineHeight: 12,
    fontSize: FontSize.size_3xs,
    textAlign: "left",
  },
  frameWrapper1: {
    backgroundColor: Color.accent,
    marginLeft: 4,
    justifyContent: "center",
    paddingVertical: Padding.p_2xs_5,
    paddingHorizontal: 11,
    height: 32,
    borderRadius: Border.br_mini,
  },
  frameWrapper2: {
    width: 111,
    backgroundColor: Color.primary,
    marginLeft: 4,
    justifyContent: "center",
    paddingVertical: Padding.p_2xs_5,
    paddingHorizontal: 11,
    height: 32,
    borderRadius: Border.br_mini,
  },
  frameView: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  textWrapper: {
    zIndex: 0,
  },
  lgrg1Icon: {
    zIndex: 1,
    height: 150,
    width: 320,
    borderRadius: Border.br_xl,
    marginTop: 8,
  },
  unionIcon: {
    width: 31,
    zIndex: 2,
    height: 30,
  },
  text3: {
    lineHeight: 12,
    fontSize: 9,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  notificationBadges: {
    top: 50,
    left: 151,
    borderRadius: 7,
    backgroundColor: Color.error,
    borderColor: Color.black1,
    borderWidth: 1.4,
    height: 16,
    width: 16,
    borderStyle: "solid",
  },
  frameParent1: {
    marginTop: 16,
  },
  textGroup: {
    width: 283,
    zIndex: 0,
  },
  text5: {
    marginTop: 10,
    zIndex: 1,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    width: 290,
    marginTop: 10,
    zIndex: 2,
    height: 103,
  },
  text6: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: 9,
    lineHeight: 17,
  },
  container: {
    top: 152,
    left: 23,
    borderRadius: 13,
    backgroundColor: Color.colorGray_100,
    width: 44,
    padding: 3,
    flexDirection: "row",
  },
  frameParent2: {
    height: 196,
    paddingVertical: Padding.p_5xs,
    backgroundColor: Color.pureWhite,
    marginTop: 16,
  },
  frameParent: {
    top: 195,
    height: 495,
    left: 20,
    position: "absolute",
    backgroundColor: Color.white,
  },
  eventExempleChild: {
    top: 0,
    height: 195,
    width: 500,
  },
  text7: {
    alignSelf: "stretch",
    fontSize: FontSize.customButton1_size,
    lineHeight: 30,
    width: 159,
    textShadowColor: "rgba(255, 255, 255, 0.47)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
    fontFamily: FontFamily.poppinsSemiBold,
    textAlign: "left",
    color: Color.black,
  },
  icons4: {
    height: 24,
    overflow: "hidden",
  },
  textContainer: {
    width: 291,
    height: 30,
  },
  icons5: {
    width: 20,
    height: 20,
  },
  text8: {
    marginLeft: 8,
    fontFamily: FontFamily.interSemiBold,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  iconsParent2: {
    width: 144,
    marginTop: 10,
    height: 30,
  },
  frameParent3: {
    marginLeft: -160,
    top: 79,
    paddingVertical: Padding.p_sm,
    paddingHorizontal: Padding.p_mini,
    elevation: 0,
    shadowRadius: 0,
    shadowColor: "#fed544",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    width: 320,
    borderRadius: Border.br_xl,
    backgroundColor: Color.white,
  },
  icons6: {
    height: 24,
  },
  buttons1: {
    top: 24,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 20,
    elevation: 20,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    paddingVertical: Padding.p_xs,
    height: 40,
    width: 40,
    borderRadius: Border.br_21xl,
    backgroundColor: Color.primary,
    left: 20,
    position: "absolute",
  },
  icons8Layout: {
    height: 16,
    width: 16,
  },
  vnements: {
    marginLeft: 2,
    fontFamily: FontFamily.poppinsSemiBold,
    lineHeight: 16,
    fontSize: FontSize.size_3xs,
  },
  iconsParent3: {
    height: 48,
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_41xl,
  },
  icons9: {
    width: 25,
    height: 24,
  },
  navMenu: {
    height: 64,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: 0,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  line: {
    marginLeft: -68,
    bottom: 8,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.lightGrey5,
    width: 135,
    height: 5,
  },
  frame9340variant6: {
    width: 360,
    backgroundColor: Color.pureWhite,
    height: 30,
  },
  navMenuParent: {
    top: 706,
  },
  instagramLogo20161Icon: {
    overflow: "hidden",
  },
  copierLien: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xs,
    lineHeight: 17,
    textAlign: "left",
    color: Color.black,
  },
  facebookMessengerLogo20201Child: {
    top: 9,
    left: 9,
    width: 28,
    height: 28,
    zIndex: 0,
    position: "absolute",
  },
  facebookMessengerLogo20201: {
    borderRadius: 116,
    width: 47,
    height: 47,
    alignItems: "flex-end",
    backgroundColor: Color.pureWhite,
    justifyContent: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  facebookMessengerLogo20201Parent: {
    marginLeft: 10,
  },
  frameParent4: {
    width: 326,
    marginTop: 10,
    flexDirection: "row",
  },
  vecteezyTiktokLogoOnTranspIcon: {
    borderRadius: 673,
  },
  textParent1: {
    top: 775,
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    borderColor: Color.primary,
    borderTopWidth: 3,
    height: 205,
    padding: Padding.p_base,
    opacity: 0,
    left: 0,
    position: "absolute",
    borderStyle: "solid",
    overflow: "hidden",
  },
  eventExemple: {
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.white,
  },
});

