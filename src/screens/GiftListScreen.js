import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  BackHandler,
  Alert,
} from 'react-native';
import * as api from '../services/api';
import {Storage} from '../services/api';
import loyalty from '../constants/loyalty';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import {Searchbar} from 'react-native-paper';
import {GiftItem} from '../components/gift/GiftItem';
import {fetchUSerInforamtion} from '../services/homePageApi/home';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SwitchPage} from '../components/SwitchPage/SwitchPage';
import SegmentedControl from '../components/segementControl/Segment';
import {Font} from '../constants/colors/color';
import {WheelGift} from '../components/WheelGift';
import axios from 'axios';
import {useRecoilState, useRecoilValue} from 'recoil';
import {userInfomation} from '../atom/auth';
import {baseUrl} from '../atom/responseSurveyState';
import NoData from '../components/NoData.js/NoData';

export default function GiftListScreen({navigation}) {
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

  const isFocused = useIsFocused();
  const [tabIndex, setTabIndex] = React.useState(0);
  const url = useRecoilValue(baseUrl);
  const [fetching, setFetch] = useState(true);
  const [gifts, setGifts] = useState([]);
  const [winGifts, setWinGifts] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [filterDataGifts, setFilterDataGifts] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [giftSetup, setGiftSetup] = useState([]);
  const [user, setUser] = useRecoilState(userInfomation);
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

  const getGiftsSetup = async () => {
    axios
      .get(`${url}/wongifts`)
      .then(response => {
        setGiftSetup(() => response.data);
      })
      .catch(err => {
        Alert.alert("veuillez contacter l'administrateur");
      });
  };

  const onRefresh = React.useCallback(() => {
    setGifts(() => []);

    setRefreshing(true);
    getAllGiftsByMobilePhone();

    Storage.getLoyaltyPoints().then(user => {
      api
        .getUser(user.id)
        .then(user => {
          loyalty.points = user.data.loyaltyPoints;
        })
        .catch(error => Alert.alert("veuillez contacter l'administrateur"));
    });
    Storage.userData().then(result => {
      if (result != null) {
        api
          .getGifts(result.id)
          .then(product => {
            setGifts(product.data);
            setFilteredDataSource(product.data);
            setRefreshing(false);
          })
          .catch(error => Alert.alert("veuillez contacter l'administrateur"))
          .finally(() => setFetch(false));
      }
    });
    // winGift();
  }, []);

  useEffect(() => {
    if (isFocused) {
      getUserInformation();
      getAllGifts();
      // winGift();
      // getGiftsSetup();
      getAllGiftsByMobilePhone();
    }
  }, []);

  const getAllGifts = async () => {
    setGifts([]);
    Storage.userData()
      .then(result => {
        if (result != null) {
          api
            .getGifts(result.id)
            .then(product => {
              setGifts(product.data);
              setFilteredDataSource(product.data);
            })
            .catch(error => Alert.alert("veuillez contacter l'administrateur"))
            .finally(() => setFetch(false));
        }
      })
      .catch(err => Alert.alert("veuillez contacter l'administrateur"));
    Storage.getLoyaltyPoints()
      .then(user => {
        api
          .getUser(user.id)
          .then(user => {
            loyalty.points = user.data.loyaltyPoints;
          })
          .catch(error => Alert.alert("veuillez contacter l'administrateur"));
      })
      .catch(err => {
        Alert.alert("veuillez contacter l'administrateur");
      });
  };
  const searchFilterFunction = text => {
    //   // Check if searched text is not blank
    if (text) {
      //     // Inserted text is not blank
      //     // Filter Data
      //     // Update FilteredData
      const newData = gifts.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      //     // Inserted text is blank
      //     // Update DataSource
      setFilteredDataSource(gifts);
      setSearch(text);
    }
  };

  const searchFilterWonGifts = text => {
    if (text) {
      const newData = winGifts.filter(function (item) {
        const itemData = item.name
          ? item.score.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setFilterDataGifts(newData);
      setSearch(text);
    } else {
      setFilterDataGifts(gifts);
      setSearch(text);
    }
  };

  const fetchAllGifts = async () => {
    let phone = user.mobilePhone ? user.mobilePhone : userInfo.mobilePhone;
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      let data = await fetch(
        `http://145.239.166.14:8088/wheel/usergifts/${phone}`,
        requestOptions,
      );
      return data.json();
    } catch (e) {}
  };

  const getAllGiftsByMobilePhone = async () => {
    let data = await fetchAllGifts();
    if (data) {
      setWinGifts(() => data.result);
      setFilterDataGifts(() => data.result);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {fetching ? (
        <SwitchPage />
      ) : (
        <>
          <View style={{height: HEIGHT / 4}}>
            <MenuHeaders
              navigation={navigation}
              userInfo={userInfo}
              title="CADEAUX"
            />
          </View>
          <View>
            <View style={styles.box}>
              <SegmentedControl
                style={styles.tabItem}
                containerMargin={16}
                segments={['Cadeaux achetés', 'Cadeaux gagnés']}
                onChange={index => setTabIndex(index)}
                currentIndex={tabIndex}
              />
            </View>
          </View>

          {tabIndex == 0 ? (
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              refreshing={refreshing}
              onRefresh={onRefresh}
              data={filteredDataSource}
              ListHeaderComponent={
                filteredDataSource.length > 0 && (
                  <Searchbar
                    style={{width: '90%', marginTop: '2%',height: 56, borderColor: '#E4DFDF', borderRadius: 12, color: '#747688'}}
                    placeholder="rechercher"
                    onChangeText={text => searchFilterFunction(text)}
                    value={search}
                  />
                )
              }
              keyExtractor={(item, index) => index}
              renderItem={post => {
                const item = post.item;
                return <GiftItem item={item} />;
              }}
              ListEmptyComponent={<NoData message="il n'ya des cadeaux ..." />}
            />
          ) : (
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              refreshing={refreshing}
              onRefresh={onRefresh}
              data={filterDataGifts}
              // ListHeaderComponent={
              //   filterDataGifts.length > 0 && (
              //     <Searchbar
              //       style={{width: '90%', marginTop: '2%'}}
              //       placeholder="rechercher"
              //       onChangeText={text => searchFilterWonGifts(text)}
              //       value={search}
              //     />
              //   )
              // }
              renderItem={post => {
                let data = post.item;
                return <WheelGift item={data} giftSetup={giftSetup} />;
              }}
              ListEmptyComponent={<NoData message="il n'ya des cadeaux ..." />}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  list: {
    paddingHorizontal: 5,
    flex: 1,
  },
  listContainer: {
    alignItems: 'center',
  },
  separator: {
    marginTop: 0,
  },
  box: {
    marginHorizontal: 16,
    borderRadius: 100,
    padding: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.0287096)'
  },
  noGifts: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: Font.primary,
    fontWeight: 'bold',
  },
});
