import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {SwitchPage} from '../components/SwitchPage/SwitchPage';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchUSerInforamtion} from '../services/homePageApi/home';
import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import {Product} from '../components/Card/Product';
import jwt_decode from 'jwt-decode';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import {userInfomation} from '../atom/auth';
import {useRecoilState, useRecoilValue} from 'recoil';
import {baseUrl} from '../atom/responseSurveyState';
import NoData from '../components/NoData.js/NoData';
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

  return (
    <>
      {loading ? (
        <SwitchPage />
      ) : (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{height: HEIGHT / 5}}>
            <MenuHeaders />
          </View>

          {/* ********************************************************************************************************* */}
          {/* ********************************************* NAV BAR *************************************************** */}
          {/* ********************************************************************************************************* */}

          <>
            <View style={{flex: 1}}>
              <FlatList
                style={{flex: 1}}
                data={promotions}
                renderItem={({item}) => (
                  <Product
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
  profileIconeContainer: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftIconeContianer: {justifyContent: 'center', alignItems: 'center'},
});
