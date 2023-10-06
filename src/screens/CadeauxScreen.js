import { MenuHeaders } from "../components/menuComponent/MenuHeaders";
import { SwitchPage } from "../components/SwitchPage/SwitchPage";
import {Gifts} from '../components/Gifts';
import { DarkModeProvider, DarkModeContext } from '../../DarkModeContext';
import MockData from "../constants/mockData.json";
import { Searchbar } from "react-native-paper";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUSerInforamtion } from "../services/homePageApi/home";
import Services from '../components/Services'; // Import the ImageCarousel component here.
import Services1 from '../components/Services1'; // Import the ImageCarousel component here.

import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { GiftDetail } from "./GiftsDetail.js/GiftDetail";
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
import { Color, FontFamily, Padding, Border, FontSize } from "../assets/catag2/GlobalStyles";
const currentTheme = theme.colors.light;

export default function CadeauxScreen({ navigation }) {
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
  const ListFooter = () => {
    return (
        <View style={{ height: 150 }} />  // Adjust the height as per your needs
    );
};
const { isDarkMode } = React.useContext(DarkModeContext);

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
<SafeAreaView style={[styles.cadeaux, { backgroundColor: isDarkMode ? "#323232" : "#FAFAFA" }]}>
      <View style={[styles.cadeauxInner, styles.groupChildPosition]}>
      <MenuHeaders
              navigation={navigation}
              userInfo={userInfo}
              title="CATALOGUE"
            />
            </View>
            
      <View style={styles.frameParent1}>
        <View style={styles.instanceParent}>
          <View style={styles.frameWrapperShadowBox}>
            <View style={styles.groupContainer}>
              <Image
                style={styles.frameInner}
                resizeMode="cover"
                source={require("../assets/catag2/group-63565041.png")}
              />
              <View style={styles.iconsChildFlexBox}>
              <TouchableOpacity onPress={() => navigation.navigate('Catalogue')}>
                        <Text style={styles.statusCadeauTypo}>Catalogue Cadeaux</Text>
                    </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[styles.frameWrapper1, styles.frameWrapperShadowBox]}>
            <View style={styles.iconsChildFlexBox}>
              <View style={styles.clipPathGroupParent}>
                <Image
                  style={[styles.clipPathGroup, styles.groupIconLayout]}
                  resizeMode="cover"
                  source={require("../assets/catag2/clip-path-group1.png")}
                />
                <Image
                  style={[
                    styles.freepikBoxInject19Icon,
                    styles.groupIconLayout,
                  ]}
                  resizeMode="cover"
                  source={require("../assets/catag2/freepikboxinject191.png")}
                />
                <View style={[styles.groupChild, styles.iconsChildFlexBox]} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Gifta')}>
              <Text
                style={[styles.statusCadeau, styles.statusCadeauTypo]}
              >{`Suivi
des Cadeaux`}</Text>
                    </TouchableOpacity>

            </View>
          </View>
        </View>
        <View style={styles.textParent}>
          
          <Text style={[styles.text1, styles.textTypo1, isDarkMode ? { color: '#FFFFFF' } : {}
]}>Top Cadeaux</Text>
      <Services />
      <View style={{ height: 20 }} /> 

      <Services1 />
          <View style={styles.giftsWrapper}>
            <FlatList
              style={styles.list}
              data={filteredDataSource.slice(0, 4)}
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
              
                  ItemSeparatorComponent={ItemSeparator} // Add this line
                  ItemSeparatorComponent={ItemSeparator}
                  ListFooterComponent={ListFooter}
                  
            />
    
                  </View>
                  
                </View>

              </View>
              
              </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  groupChildPosition: {
    left: 0,
    position: "absolute",
  },
  maskGroupIconPosition: {
    left: "0%",
    top: "0%",
    right: "0%",
    width: "100%",
  },
  
  groupIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  frameGroupFlexBox: {
    height: 42,
    alignItems: "center",
    flexDirection: "row",
  },
  frFlexBox: {
    textAlign: "left",
    color: Color.darkGrey21,
    lineHeight: 27,
    marginLeft: 4,
  },
  iconsChildFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  frTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  iconsLayout: {
    width: 12,
    height: 12,
  },
  frameWrapperShadowBox: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_5xs,
    height: 170,
    width: 150,
    elevation: 0,
    shadowRadius: 0,
    shadowColor: "#ddaf0b",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    backgroundColor: Color.pureWhite,
    borderRadius: Border.br_xl,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  statusCadeauTypo: {
    width: 110,
    fontWeight: "900",
    textAlign: "center",
    color: Color.black,
    fontFamily: FontFamily.poppinsRegular,
    lineHeight: 20,
    fontSize: FontSize.size_sm,
  },
  textTypo1: {
    fontSize: FontSize.size_sm,
    fontWeight: "900",
    textAlign: "left",
    color: Color.darkGrey21,
  },
  textTypo: {
    color: Color.grey,
    lineHeight: 16,
    fontSize: FontSize.size_2xs,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "left",
    fontWeight: "600",
  },
  textContainerLayout: {
    width: 55,
    flexDirection: "row",
  },
  subtractIcon: {
    height: 89,
    width: 360,
  },
  maskGroupIcon: {
    height: "79.33%",
    bottom: "20.67%",
    left: "0%",
    top: "0%",
    right: "0%",
    width: "100%",
    maxWidth: "100%",
  },
  component1Icon: {
    width: 40,
    zIndex: 0,
    height: 40,
  },
  frameChild: {
    height: "78.42%",
    width: "66.93%",
    top: "11.61%",
    right: "16.13%",
    bottom: "9.97%",
    left: "16.94%",
    zIndex: 1,
  },
  component1Parent: {
    alignItems: "center",
  },
  frameItem: {
    height: 32,
    width: 30,
  },
  text: {
    fontSize: FontSize.customButton1_size,
    fontFamily: FontFamily.poppinsSemiBold,
    marginLeft: 4,
    fontWeight: "600",
    color: Color.darkGrey21,
    lineHeight: 27,
  },
  groupParent: {
    marginLeft: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  frameGroup: {
    width: 116,
    alignItems: "center",
  },
  translateFill0Wght400Grad0Icon: {
    width: 16,
    height: 16,
    overflow: "hidden",
  },
  fr: {
    fontSize: FontSize.size_mini,
    marginLeft: 4,
    textAlign: "left",
    color: Color.darkGrey21,
    lineHeight: 27,
    fontFamily: FontFamily.interSemiBold,
  },
  translateFill0Wght400Grad0Parent: {
    borderRadius: Border.br_41xl,
    backgroundColor: Color.colorGoldenrod_100,
    padding: Padding.p_5xs,
    width: 55,
    flexDirection: "row",
    height: 40,
  },
  component3Icon: {
    width: 75,
    height: 51,
    marginLeft: 8,
  },
  frameView: {
    width: 131,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  iconsetStructure: {
    display: "none",
    left: "0%",
    top: "0%",
    right: "0%",
    width: "100%",
    bottom: "0%",
    height: "100%",
  },
  vectorIcon: {
    width: 21,
    height: 25,
  },
  iconsChild: {
    top: -2,
    left: 17,
    borderRadius: Border.br_8xs,
    backgroundColor: Color.error,
    borderStyle: "solid",
    borderColor: Color.primary,
    borderWidth: 2,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  subtractParent: {
    bottom: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  icons: {
    width: 32,
    height: 32,
  },
  iconsWrapper: {
    height: 39,
    marginLeft: 14,
    width: 30,
    flexDirection: "row",
  },
  frameContainer: {
    marginLeft: 34,
    alignItems: "center",
    flexDirection: "row",
  },
  frameParent: {
    top: 25,
    left: 20,
    flexDirection: "row",
    position: "absolute",
  },
  cadeauxInner: {
    top: 0,
    height: 105,
    width: 360,
  },
  frameInner: {
    width: 93,
    height: 83,
  },
  groupContainer: {
    height: 139,
    justifyContent: "space-between",
    alignItems: "center",
  },
  clipPathGroup: {
    height: "87.23%",
    width: "61.69%",
    top: "-0.16%",
    bottom: "12.92%",
    left: "38.31%",
    right: "0%",
    maxWidth: "100%",
  },
  freepikBoxInject19Icon: {
    height: "58.71%",
    width: "71.7%",
    top: "39.17%",
    right: "28.26%",
    bottom: "2.12%",
    left: "0.04%",
  },
  groupChild: {
    top: 50,
    left: 0,
    position: "absolute",
  },
  clipPathGroupParent: {
    width: 118,
    height: 89,
  },
  statusCadeau: {
    marginTop: 10,
  },
  frameWrapper1: {
    marginLeft: 20,
  },
  instanceParent: {
    flexDirection: "row",
  },
  text1: {
    lineHeight: 24,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  cemrekArtworksFanta1Icon: {
    borderRadius: Border.br_3xs,
    width: 91,
    height: 97,
  },
  text2: {
    lineHeight: 18,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    alignSelf: "stretch",
  },
  textWrapper: {
    alignSelf: "stretch",
  },
  icons2: {
    width: 13,
    height: 12,
  },
  text3: {
    marginLeft: 4,
  },
  iconsParent: {
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
  },
  icons3: {
    height: 12,
    overflow: "hidden",
  },
  textContainer: {
    marginLeft: 4,
    alignItems: "center",
  },
  iconsGroup: {
    marginTop: 4,
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
  },
  frameParent3: {
    alignSelf: "stretch",
    marginTop: 8,
  },
  frameParent2: {
    width: 169,
    height: 95,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_5xs,
    marginLeft: 24,
  },
  cemrekArtworksFanta1Parent: {
    width: 284,
    height: 97,
    alignItems: "center",
    flexDirection: "row",
  },
  gifts: {
    shadowColor: "rgba(38, 38, 38, 0.04)",
    shadowRadius: 40,
    elevation: 40,
    width: 320,
    height: 117,
    padding: Padding.p_3xs,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    backgroundColor: Color.pureWhite,
    borderRadius: Border.br_xl,
    justifyContent: "center",
  },
  giftsWrapper: {
    height: 420,
    marginTop: 8,
  },
  textParent: {
    marginTop: 16,
  },
  frameParent1: {
    top: 105,
    left: 21,
    position: "absolute",
  },
  cadeaux: {
    backgroundColor: Color.white,
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
  },
});

