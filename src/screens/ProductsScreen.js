import React, { useState, useEffect } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
  Text,
  Image,
  ActivityIndicator,
  ImageBackground,
  BackHandler,
  Alert,
} from "react-native";
import Product from "../components/Product";
import * as api from "../services/api";
import * as theme from "../constants/theme";
import { Storage } from "../services/api";
import loyalty from "../constants/loyalty";
import { HEIGHT, WIDTH } from "../utils/Dimension";
import { Color, FontFamily, Padding, Border, FontSize } from "../assets/home9/GlobalStyles";
import { DarkModeProvider, DarkModeContext } from '../../DarkModeContext';

import { MenuHeaders } from "../components/menuComponent/MenuHeaders";
import { SwitchPage } from "../components/SwitchPage/SwitchPage";
import {Gifts} from '../components/Gifts';

import MockData from "../constants/mockData.json";
import { Searchbar } from "react-native-paper";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUSerInforamtion } from "../services/homePageApi/home";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { GiftDetail } from "./GiftsDetail.js/GiftDetail";

const currentTheme = theme.colors.light;

export default function ProductsScreen({ navigation }) {
  // handle press buttom
  const backAction = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const isFocused = useIsFocused();
  const [fetch, setFetch] = useState(true);
  const [userId, setUserId] = useState();
  const [userProducts, setUserProducts] = useState([]);
  const [loyaltyPoints, setloyaltyPoints] = useState();

  const [search, setSearch] = useState("");
  // const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const [masterDataSource, setMasterDataSource] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const { isDarkMode } = React.useContext(DarkModeContext);

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
      const value = await AsyncStorage.getItem("profile");
      const parsedToken = JSON.parse(value);
      const token = jwt_decode(parsedToken);

      const alluserInfo = await fetchUSerInforamtion(token.id);
      setUserInfo(() => alluserInfo);
    } catch (e) {}
  };
  useEffect(() => {
    if (isFocused) {
      fetchAll();
    }
  }, [loyaltyPoints]);

  useEffect(() => {
    if (isFocused) {
      getUserInformation();
    }
  }, []);
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
}, [navigation]);

  const fetchAll = async () => {
    setFetch(true);
    setUserProducts([]);
    api
      .getProducts()
      .then((products) => {
        //let productPrice = products.data.filter(e => e.price <= loyaltyPoints);
        setUserProducts(products.data);
        setFilteredDataSource(products.data);
      })
      .catch((error) => Alert.alert("veuillez contacter l'administrateur"))
      .finally(() => setFetch(false));
  };

  const whenRefresh = () => {
    setRefreshing(true);
    setUserProducts([]);
    api
      .getProducts()
      .then((products) => {
        //let productPrice = products.data.filter(e => e.price <= loyaltyPoints);
        setUserProducts(products.data);
        setFilteredDataSource(products.data);
      })
      .catch((error) => Alert.alert("veuillez contacter l'administrateur"))
      .finally(() => {
        setRefreshing(false);
      });
  };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter Data
      // Update FilteredData
      const newData = userProducts.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
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
  const ItemSeparator = () => {
    return (
        //You can modify the height and color as per your requirement
        <View style={{ height: 10, backgroundColor: 'transparent' }} />
    );
};


  return (
<SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#323232" : "#FAFAFA" }]}>
    {fetch ? (
      <SwitchPage />
    ) : (
      <>
        <MenuHeaders
          navigation={navigation}
          userInfo={userInfo}
          title="CATALOGUE"
        />
  
        <TouchableOpacity onPress={() => navigation.navigate("Cadeaux")}> 
          <View style={[styles.buttonsParent, styles.buttonsFlexBox]}>
            <View style={[styles.buttons, styles.buttonsFlexBox]}>
              <Image
                style={styles.icons}
                resizeMode="cover"
                source={require("../assets/home9/icons18.png")}
              />
            </View>
            <Text style={[styles.text, styles.textTypo,isDarkMode ? { color: '#FFFFFF' } : {}
]}>Retour</Text>
          </View>
        </TouchableOpacity>
        <View style={{ height: 50 }} />

        <FlatList
          style={styles.list}
          data={filteredDataSource}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={(post) => {
            const item = post.item;
            return (
              <Gifts
                item={item}
                user={userId}
                userPoint={userInfo.loyaltyPoints}
              />
            );
          }}
          ItemSeparatorComponent={ItemSeparator}
        />
      </>
    )}
  </SafeAreaView>
  
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },


  // listContainer: {
  //   alignItems: "center",
  // },
  list: {
    paddingHorizontal: 30,
  },

  icons6: {
    height: 24,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  iconsLayout1: {
    width: 32,
    height: 32,
  },
  navMenu: {
    height: 10,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: 0,
    justifyContent: "space-between",
    width: 360,
    flexDirection: "row",
  },
  textTypo: {
    textAlign: "left",
    color: Color.black,
    top: 5,
    left: 10,
    lineHeight: 18,
    fontWeight: "700",
    fontSize: FontSize.size_sm,
  },
  buttonsParent: {
    flexDirection: "row",
    justifyContent: "center",
    left: -100,
  },
  buttons: {
    borderRadius: 32,
    backgroundColor: Color.primary,
    paddingHorizontal: 13,
    paddingVertical: 10,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text4: {
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    marginLeft: 8,
    textAlign: "left",
    color: Color.darkGrey21,
    lineHeight: 18,
    fontSize: FontSize.size_sm,
    flex: 1,
  },
});
