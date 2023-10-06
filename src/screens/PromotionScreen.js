import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  ScrollView,
  SafeAreaView,
  Image,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SwitchPage} from '../components/SwitchPage/SwitchPage';
import {ProductWin} from '../components/ProductWin';
import Jeu from '../components/Jeu'; // Import the ImageCarousel component here.
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchUSerInforamtion} from '../services/homePageApi/home';
import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import {Product} from '../components/Card/Product';
import jwt_decode from 'jwt-decode';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import {userInfomation} from '../atom/auth';
import {useRecoilState, useRecoilValue} from 'recoil';
import {baseUrl} from '../atom/responseSurveyState';
import { Padding, FontFamily, Color, Border, FontSize } from "../assets/home2/GlobalStyles";

import NoData from '../components/NoData.js/NoData';
import { DarkModeProvider, DarkModeContext } from '../../DarkModeContext';
const PromotionScreen = ({navigation}) => {
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
  const { isDarkMode } = React.useContext(DarkModeContext);
  const [user, setUSer] = useRecoilState(userInfomation);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const url = useRecoilValue(baseUrl);
  const [userInfo, setUserInfo] = useState({});
  const [toggleNoPromotion, setToggleNoPromotion] = useState(false);
  const [promotions, setPromostions] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isFocused) {
      loodScreen();
      getUserInformation();
      getallPromotion();
    }
  }, [isFocused]);

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** FETCH FROM SERVER    ***************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const fetchApi = async () => {
    try {
      const value = await AsyncStorage.getItem('profile');
      let token = JSON.parse(value);
      let authenticate = `Bearer ${token}`;

      const requestOptions = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: authenticate,
        }),
      };

      const allPromostion = await fetch(
        `${url}/promotions/user/${user.id}`,
        requestOptions,
      );
      let data = allPromostion.json();

      return data;
    } catch (e) {}
  };
  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** REFRESH API *****    ***************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  _onRefresh = async () => {
    await getUserInformation();
    const getData = await fetchApi();
    setPromostions(() => getData);
    setToggleNoPromotion(true);
  };

  openMenu = async () => {
    getUserInformation();
    navigation.openDrawer();
  };

  const getallPromotion = async () => {
    let getData = await fetchApi();

    setPromostions(() => getData);
    setToggleNoPromotion(true);
    setLoading(false);
  };

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** LOAD SCREEN    *********************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  loodScreen = async () => {
    const getData = await fetchApi();
    setPromostions(() => getData);
    setToggleNoPromotion(true);
    setLoading(false);
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
      setUserInfo(() => alluserInfo);
    } catch (e) {}
  };
  const markPromotionAsViewed = async (promoId) => {
    const viewedPromotions = await AsyncStorage.getItem('viewedPromotions');
    const promotionsArray = viewedPromotions ? JSON.parse(viewedPromotions) : [];
    if (!promotionsArray.includes(promoId)) {
      promotionsArray.push(promoId);
      await AsyncStorage.setItem('viewedPromotions', JSON.stringify(promotionsArray));
    }
  };
  const hasViewedPromotion = async (promoId) => {
    const viewedPromotions = await AsyncStorage.getItem('viewedPromotions');
    const promotionsArray = viewedPromotions ? JSON.parse(viewedPromotions) : [];
    if (promotionsArray.includes(promoId)) {
        // If promotion was viewed, show an error message
        Alert.alert("Error", "You've already viewed this video.");
        return true;
    }
    return false;
};
  
  return (
    <>
      {loading ? (
        <SwitchPage />
      ) : (
<SafeAreaView style={{flex: 1, backgroundColor: isDarkMode ? "#323232" : "#FAFAFA"}}>
          <View style={{height: HEIGHT / 5.5}}>
          <MenuHeaders />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Home")}> 
    <View style={[styles.buttonsParent, styles.buttonsFlexBox]}>
      <View style={[styles.buttons, styles.buttonsFlexBox]}>
        <Image
          style={styles.icons}
          resizeMode="cover"
          source={require("../assets/home9/icons18.png")}
        />
      </View>
      <Text style={[styles.text, styles.textTypo1, isDarkMode ? { color: '#FFFFFF' } : {}
]}>Retour</Text>
    </View>
</TouchableOpacity>
<View style={{ height: 30 }} />

          <>
            
            <Text style={[
    styles.text15, 
    styles.textTypo5, 
    isDarkMode ? { color: '#FFFFFF' } : {}
]}>Alors, Tu-joues?</Text>
  <Jeu
            />
                          <View style={{ height: 10 }} />
            <Text style={[
    styles.text15, 
    styles.textTypo5, 
    isDarkMode ? { color: '#FFFFFF' } : {}
]}>Tfarej bech terba7</Text>
          <ScrollView style={{ flex: 1 }}>
          <View style={{flex: 1}}>
              <FlatList
                style={{flex: 1}}
                data={promotions}
                renderItem={({item}) => (
                  <ProductWin
                    item={item}
                    navigation={navigation}
                    // getUserInformation={getUserInformation}
                    user={userInfo}
                    promoId={item.id}
                    
                  />
                  
                )}
                keyExtractor={item => item.id}
                refreshing={refreshing}
                onRefresh={_onRefresh}
                ListEmptyComponent={
                  <NoData message={"il n'y a pas de promotion..."} />
                }
              />
            </View>
            <View style={{ height: -30 }} />
            </ScrollView>
          </>
          

        </SafeAreaView>
      )}
    </>
  );
};

export default PromotionScreen;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    width: '100%',
    height: 120,
  },
  backgroundImage: {
    width: WIDTH,
    height: HEIGHT,
    flex: 1,
  },
  card: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  thumb: {
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  userPointsText: {
    marginRight: 5,
    fontSize: 5,
    backgroundColor: '#EF4136',
  },
  menuIconeContainer: {
    flexGrow: 1,
    marginTop: 10,
  },
  textTypo5: {
    top: -4,
    fontSize: 18,
    lineHeight: 24,
    textAlign: "left",
    fontWeight: "700",
left: 30,
    color: Color.black,
  },
  profileIconeContainer: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftIconeContianer: {justifyContent: 'center', alignItems: 'center'},
  buttonsParent: {
    top: -20,
    flexDirection: "row",
    justifyContent: "center",
    left: 20,
    position: "absolute",
  },
  buttons: {
    borderRadius: 32,
    backgroundColor: "#ffc700",
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textTypo1: {
    textAlign: "left",
    color: Color.black,
    top: 9,
    left: 5,
    lineHeight: 18,
    fontWeight: "700",
    fontSize: FontSize.size_sm,
  },
});
