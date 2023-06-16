import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  BackHandler,
  Alert,
} from 'react-native';
import * as api from '../services/api';
import * as theme from '../constants/theme';
import {HEIGHT, WIDTH} from '../utils/Dimension';

import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import {SwitchPage} from '../components/SwitchPage/SwitchPage';

import {Color} from '../constants/colors/color';
import {Searchbar} from 'react-native-paper';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchUSerInforamtion} from '../services/homePageApi/home';
import {useIsFocused} from '@react-navigation/native';
import {GiftDetail} from './GiftsDetail.js/GiftDetail';
import NoData from '../components/NoData.js/NoData';

const currentTheme = theme.colors.light;

export default function ProductsScreen({navigation}) {
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
  const [fetch, setFetch] = useState(true);
  const [userId, setUserId] = useState();
  const [userProducts, setUserProducts] = useState([]);
  const [loyaltyPoints, setloyaltyPoints] = useState();

  const [search, setSearch] = useState('');
  // const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const [masterDataSource, setMasterDataSource] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);
  const onRefresh = React.useCallback(() => {
    whenRefresh();
    getUserInformation();
  }, []);
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
  useEffect(() => {
    if (isFocused) {
      console.log('is Focused in Product screen in fetchAll Products !')

      fetchAll();
    }
  }, [loyaltyPoints, isFocused]);

  useEffect(() => {
    if (isFocused) {
      getUserInformation();
    }
  }, [isFocused]);

  const fetchAll = async () => {
    setFetch(true);
    setUserProducts([]);
    api
      .getProducts()
      .then(products => {
        //let productPrice = products.data.filter(e => e.price <= loyaltyPoints);
        setUserProducts(products.data);
        setFilteredDataSource(products.data);
      })
      .catch(error => Alert.alert("veuillez contacter l'administrateur"))
      .finally(() => setFetch(false));
  };

  const whenRefresh = () => {
    setRefreshing(true);
    setUserProducts([]);
    api
      .getProducts()
      .then(products => {
        //let productPrice = products.data.filter(e => e.price <= loyaltyPoints);
        setUserProducts(products.data);
        setFilteredDataSource(products.data);
      })
      .catch(error => Alert.alert("veuillez contacter l'administrateur"))
      .finally(() => {
        setRefreshing(false);
      });
  };

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter Data
      // Update FilteredData
      const newData = userProducts.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);

      setSearch(text);
    } else {
      // Inserted text is blank
      // Update DataSource
      setFilteredDataSource(userProducts);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ********************************************************************************************************* */}
      {/* ********************************************* NAV BAR *************************************************** */}
      {fetch ? (
        <SwitchPage />
      ) : (
        <>
          {/* ********************************************************************************************************* */}
          {/* ********************************************* NAV BAR *************************************************** */}
          {/* ********************************************************************************************************* */}

          <View style={{height: HEIGHT / 5}}>
            <MenuHeaders
              navigation={navigation}
              userInfo={userInfo}
              title="CATALOGUE"
            />
          </View>

          <View style={{flex: 1}}>
            <FlatList
              style={styles.list}
              data={filteredDataSource}
              refreshing={refreshing}
              onRefresh={onRefresh}
              ListHeaderComponent={
                <Searchbar
                  style={{marginHorizontal: 10, marginBottom: 5}}
                  placeholder="rechercher"
                  onChangeText={text => {
                    searchFilterFunction(text);
                  }}
                  value={search}
               
                />
              }
              renderItem={post => {
                const item = post.item;
                return (
                  <GiftDetail
                    item={item}
                    user={userId}
                    userPoint={userInfo.loyaltyPoints}
                  />
                );
              }}
              ListEmptyComponent={
                    <NoData message="il n'ya des cadeaux ..." />
                  }
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
  },
  backgroundImageContainer: {
    width: '100%',
    height: HEIGHT / 5.8,
  },
  backgroundImage: {
    width: WIDTH,
    height: HEIGHT,
    flex: 1,
  },
  // listContainer: {
  //   alignItems: "center",
  // },
  list: {
    paddingHorizontal: 5,
  },
});
