import React, {useState, useEffect, useRef, useCallback, memo} from 'react';
import {SwitchPage} from '../components/SwitchPage/SwitchPage';
import BottomNavigation from '../components/BottomNavigation';
import Filters from '../components/Filters';


import LottieView from 'lottie-react-native';
import animationData from '../assets/animated/1.json';
import animationData1 from '../assets/animated/33.json';
import animationData2 from '../assets/animated/22.json';
import animationData3 from '../assets/animated/44.json';
import { DarkModeProvider, DarkModeContext } from '../../DarkModeContext';

import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
  RefreshControl,
  Alert,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  BackHandler,
  Image,
  LogBox,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../services/api';
import {Divers} from '../components/DiverComponents/Divers';
import {useIsFocused} from '@react-navigation/native';
import jwt_decode from 'jwt-decode';
import {fetchUSerInforamtion} from '../services/homePageApi/home';
import debounce from 'lodash/debounce';

import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import {getAllProduct, getAllNotification} from '../services/homePageApi/home';
import { Padding, FontFamily, Color, Border, FontSize } from "../assets/home2/GlobalStyles";
import {HEIGHT, WIDTH} from '../utils/Dimension';
import axios from 'axios';
import {CadeauxCarousel} from '../components/CadeauxCarousel/CadeauxCarousel';
import SliderCarousel from 'react-native-reanimated-carousel';

import Carousel from '../components/react-native-banner-carousel';
import {EventBannerCarousel} from '../components/EvenemmentCarousel/EventBannerCarousel';
import {PromotionBannerCarousel} from '../components/PromoCompoennts/PromotionBannerCarousel';
const BannerWidth = WIDTH;
const BannerHeight = HEIGHT / 2;
import {userInfomation, verifyIsSignedIn, globlalUSerInfo} from '../atom/auth';
import {useRecoilState, useRecoilValue} from 'recoil';
import {Button} from 'react-native-paper';
import {Linking} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {baseUrl} from '../atom/responseSurveyState';

// Hide PropTypes warning messages
LogBox.ignoreLogs([
  ' VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc. {"contentLength": 2970, "dt": 1806, "prevDt": 3843}',
]);
//useNativeDriver
LogBox.ignoreLogs([
  "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`'",
]);
LogBox.ignoreLogs(['Please update the following components: Carousel']);
// Please update the following components: Carousel
export const EventScreen = ({navigation, route}) => {
  const [user, setUSer] = useRecoilState(userInfomation);
  const [userInfo, setUserInfo] = useState({});
  const [userProducts, setUserProducts] = useState([]);
  const [userid, setUserId] = useState([]);
  const [fetching, setFetch] = useState(true);
  const [filterPromo, setFilterPromo] = useState([]);
  const [divers, setDivers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [notifications, setNotifications] = useState(['helllo', 'i m here ']);
  const [indexDiver, setIndexDiver] = useState(0);
  const [randomDiver, setRandomDivers] = useState(undefined);
  const isFocused = useIsFocused();
  const [isSignedIn, setIsSignedIn] = useRecoilState(verifyIsSignedIn);
  const url = useRecoilValue(baseUrl);
  const [isModalVisible, setModalVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [toggleCount, setToggleCount] = useState(0);

  const filterEvents = (events, filters) => {
    let filteredEvents = [...events];
    
    if (filters.product) {
        filteredEvents = filteredEvents.filter(event => event.product && event.product.name === filters.product);
    }

    if (filters.location) {
      filteredEvents = filteredEvents.filter(event =>
          event.locations && event.locations.some(location => 
              location.name === filters.location
          )
      );
  }

    if (filters.marque) {
        filteredEvents = filteredEvents.filter(event => event.marque && event.marque.id === filters.marque);
    }

    // ... add more conditions based on other filter criteria as well

    return filteredEvents;
}
const onApplyFilters = (selectedFilters) => {
  // Do something with the selectedFilters. E.g., save them in a state:
  setAppliedFilters(selectedFilters);
};
const handleFiltersApplied = (filters) => {
  setAppliedFilters(filters);
  setModalVisible(false); // Close the modal when filters are applied
}
useEffect(() => {
  const filtered = filterEvents(events, appliedFilters);
  setEvents(filtered); // Set the filtered events
}, [appliedFilters]);
const closeFiltersModal = () => {
  setTimeout(() => setModalVisible(false), 100);
};
const toggleModal = () => {
  console.log("toggleModal called");
  setToggleCount(prev => prev + 1);
  setModalVisible(prev => !prev);
};
useEffect(() => {
  console.log('EventScreen rendered');
}, []);
useEffect(() => {
  // Add event listener on mount
  BackHandler.addEventListener('hardwareBackPress', backAction);

  // Clean up the event listener on unmount
  return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }
}, [isModalVisible]); // Add any dependencies that your function depends on.
const backAction = () => {
  console.log('Back button pressed. Modal status:', isModalVisible);

  if (isModalVisible) {
      console.log("Closing the modal");
      setModalVisible(false);
      return true;  // Return `true` to prevent the default back action. 
  }

  // If modal is not open, navigate to the Home screen
  navigation.navigate('Home'); // Replace 'Home' with the name of your home screen route
  return true; // Return `true` to prevent the default back action. 
};

  const { isDarkMode } = React.useContext(DarkModeContext);

  const onRefresh = useCallback(() => {
    getUserInformation();
    getnotifacation();
    getUserEventsAndPartners();
    return () => {
      // This cleanup function is called before the next render
      // or when the component is unmounted.
      // It's a good place to cancel the API request if it's still in progress.
      // ...
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      getnotifacation();
      getUserInformation();
      getUserEventsAndPartners();
      getAllDiversity();
    }
    // return () => {
    //   // This cleanup function is called before the next render
    //   // or when the component is unmounted.
    //   // It's a good place to cancel the API request if it's still in progress.
    //   // ...
    // };
  }, [isFocused]);

  const randomDiverIndex = divers => {
    if (divers.length == 1) {
      setIndexDiver(() => 0);
      // setRandomDivers(() => 0);
    } else {
      let index1 = Math.floor(Math.random() * divers.length);
      setIndexDiver(() => index1);
      let index2 = Math.floor(Math.random() * divers.length);

      // Ensure the two indices are different
      while (index1 === index2) {
        index2 = Math.floor(Math.random() * divers.length);
      }
      setRandomDivers(() => index2);
    }
  };
  //  =============================================================================

  const getAllDiversity = async () => {
    let data = await fetchAllDiers();
    if (data.length > 0) {
      setDivers(() => data);
      randomDiverIndex(data);
      setFetch(false)

    } else {
      setFetch(false)

      return <></>;
    }
  };


const debouncedToggleModal = debounce(toggleModal, 300);


  const getnotifacation = async () => {
    try {
      const value = await AsyncStorage.getItem('profile');
      const parsedValue = JSON.parse(value);
      const token = jwt_decode(parsedValue);
      const data = await getAllNotification(token.id);
      setNotifications(() => data);
    } catch (e) {
      // Alert.alert('vérifier votre connection internet!');
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
      const alluserInfo = await fetchUSerInforamtion(token.id);
      if (alluserInfo.status == 500) {
        Logout();
      } else {
        setUserInfo(() => alluserInfo);
        setUSer(() => alluserInfo);
      }
    } catch (e) {
      Alert.alert('vérifier votre connection internet!');
    }
  };

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** fetch USer Inforamtion   ************* ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const displayedEvents = filterEvents(events, appliedFilters);
  console.log("Displayed Events:", displayedEvents);
  console.log("Applied Filters:", appliedFilters);
  console.log("Initial Events:", events);

  const getUserEventsAndPartners = () => {
    AsyncStorage.getItem('profile').then(result => {
      if (result !== null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);

        api
          .getUserEvents(token.id)
          .then(res => {
            setEvents(res.data);
          })
          .catch(e => {
            //Alert.alert('vérifier votre connection internet!');
          });
      }
    });
  };
  
  const FooterModal = () => {
    const closeModal = () => {
        setModalVisible(false);
    }
    function filterEvents(events, filters) {
      return events.filter(event => {
          // Check for location
          if (filters.location) {
              const latDiff = Math.abs(event.locations[0].latitude - filters.location.latitude);
              const longDiff = Math.abs(event.locations[0].longitude - filters.location.longitude);
  
              if (latDiff > filters.location.latitudeDelta || longDiff > filters.location.longitudeDelta) {
                  return false; // if outside the delta range, filter out
              }
          }
  
          // Check for marque
          if (filters.marque && event.partner.id !== filters.marque) {
              return false; // if not matching, filter out
          }
  
          // Check for product
          if (filters.product && event.product.name !== filters.product) {
              return false; // if not matching, filter out
          }
  
          return true; // if passed all filters
      });
  }
  
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            useNativeDriver={true} 
            onRequestClose={closeModal}
        >
            <TouchableOpacity 
                style={styles.centeredView} 
                activeOpacity={1}
                onPress={closeModal}
            >
                <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                <Filters 
  eventsData={events} 
  onApplyFilters={onApplyFilters}
  toggleModal={toggleModal}  // Pass it here
/>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? { backgroundColor: "#323232" } : { backgroundColor: "#FAFAFA" }]}>
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.backgroundContainer}>
                <MenuHeaders />
                <View style={{ height: 10 }} />

                <TouchableOpacity onPress={() => navigation.navigate("Home")}> 
    <View style={[styles.buttonsParent, styles.buttonsFlexBox]}>
      <View style={[styles.buttons, styles.buttonsFlexBox]}>
        <Image
          style={styles.icons}
          resizeMode="cover"
          source={require("../assets/home9/icons18.png")}
        />
      </View>
      <Text style={[styles.text, styles.textTypo1,isDarkMode ? { color: '#FFFFFF' } : {}
]}>Retour</Text>
    </View>
</TouchableOpacity>
<View style={styles.buttons1}>
<TouchableOpacity onPress={toggleModal}>
<Text style={[isDarkMode ? { color: '#FFFFFF' } : {}
]}>Filtrer</Text>
</TouchableOpacity>
      <Image
        style={styles.icons1}
        resizeMode="cover"
        source={require("../assets/filter/icons7.png")}
      />
    </View>
<View style={{ height: 30 }} />
{displayedEvents.map((item) => (
    <View key={item.id || item.name} style={{ marginHorizontal: 35, marginBottom: 10 }}>
        <EventBannerCarousel
            key={item.id || item.name} // Make sure to set a unique key here
            item={item}
            navigation={navigation}
        />
    </View>
))}


                    <FooterModal />
            </View>
        </ScrollView>
    </SafeAreaView>
);
};

export default EventScreen;

const styles = StyleSheet.create({
container: { flex: 1 }
,
backgroundContainer: {
    flex: 1,
  
},
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
icons1: {
  width: 24,
  height: 24,
  overflow: "hidden",
  marginLeft: 4,
},
buttons1: {
  borderRadius: Border.br_21xl,
  borderStyle: "solid",
  borderColor: Color.black1,
  borderWidth: 1,
  width: 121,
  top: -20,
  height: 37,
  left: 210,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: Padding.p_base,
  paddingVertical: Padding.p_xs,
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
centeredView: {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "center",
},
modalView: {
  width: "100%",
  height: 500,  // Adjust based on your needs
  backgroundColor: "white",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 10
},
modalOverlay: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)', // This is the dark overlay behind the modal
},
modalContent: {
  width: '100%',
  height: 500,  // Adjust based on your needs
  backgroundColor: "white",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 10
},
});