import { Color, FontSize, FontFamily, Border, Padding } from "../../assets/home2/GlobalStyles";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  TextInput,
  FlatList ,
  BackHandler 
} from 'react-native';
import React, {useState, useEffect} from 'react';
import { DarkModeProvider, DarkModeContext } from '../../../DarkModeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {fetchUSerInforamtion} from '../../services/homePageApi/home';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {globlalUSerInfo, userInfomation} from '../../atom/auth';
import axios from 'axios';
import FilterScreen from '../../screens/FilterScreen'; // Import your FilterScreen component
import {
  currentContry,
  currentContryCode,
  currentPosition,
  locationAtom,
  locationState,
} from '../../atom/localisation';
import {HEIGHT, WIDTH} from '../../utils/Dimension';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder-reborn';
import {
  RESULTS,
  requestNotifications,
  checkNotifications,
  requestLocationAccuracy,
  request,
  PERMISSIONS,
} 
from 'react-native-permissions';
export const MenuHeaders = ({ hide = true, title = '' }) => {
  const { isDarkMode, toggleDarkMode } = React.useContext(DarkModeContext);
  const navigation = useNavigation();
  const [user, setUSer] = useRecoilState(userInfomation);
  const [userData, setUserData] = useRecoilState(globlalUSerInfo);
  const [contry, setContry] = useRecoilState(currentContry);
  const [position, setPosition] = useRecoilState(currentPosition);
  const [ContryCode, setContryCode] = useRecoilState(currentContryCode);
  const [locationMaps, setLocationMaps] = useRecoilState(locationState);
  const [notificationEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLicationEnabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Renamed to 'searchTerm'
  const [searchResults, setSearchResults] = useState([]);
  const [hasNotification, setHasNotification] = useState(false);
  useEffect(() => {
    const checkNotification = async () => {
      const value = await AsyncStorage.getItem('hasNotification');
      if (value === 'true') {
        setHasNotification(true);
        // Optionally reset the value in AsyncStorage
        await AsyncStorage.setItem('hasNotification', 'false');
      }
    };

    checkNotification();
  }, []);
  // Simulating a notification coming in after 5 seconds for demonstration purposes
  setTimeout(() => {
    setHasNotification(true);
  }, 50000);
  useEffect(() => {
    getUserInformation();
  }, []);


   
  const UserProfile = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  

  };
  const PartnerProductSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (searchTerm.length > 0) {
        const delay = setTimeout(() => {
          handleSearch();
        }, 500); // Add a delay of 500ms to avoid frequent API calls while typing
        return () => clearTimeout(delay);
      }
    }, [searchTerm]);
  
    const handleSearch = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.get(
          `http://94.237.82.88:8082/partner-products/${searchTerm}`
        );
        const products = response.data;
  
        console.log('Fetched products:', products);
        setSearchResults(products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again later.');
        setLoading(false);
      }
    };
  
    const handleSearchTermChange = (query) => {
      setSearchTerm(query);
    };
};
const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetchUserData(); // Call the function to fetch user data
  }, []);

  const fetchUserData = async () => {
    try {
      const result = await AsyncStorage.getItem('profile');
      if (result !== null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);
        const userId = token.id;
        await fetchProfileImage(userId);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchProfileImage = async (userId) => {
    try {
      console.log('Fetching profile image...');
      const response = await fetch(`http://94.237.82.88:8082/user/${userId}/`);
      const data = await response.json();

      if (data && data.image && data.image.name) {
        const baseUrl = 'https://www.catchy.tn/media/user/';
        const imageName = data.image.name;
        const imageUrl = baseUrl + imageName;
        console.log('Profile image fetched successfully:', imageUrl);
        setImageUrl(imageUrl);

      } else {
        console.error('Error fetching profile image: Invalid response data');
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };
  
  const showPromptNotification = async () => {
    try {
      const permissionStatus = await checkNotifications();

      if (permissionStatus.status === RESULTS.GRANTED) {
        setNotificationsEnabled(true);
      } else {
        setNotificationsEnabled(false);
      }
    } catch (error) {
      setNotificationsEnabled(false);
    }
  };
  const handleSearchTermChange = query => {
    setSearchTerm(query);
  };
  const getUserInformation = async () => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
    });
    Geolocation.getCurrentPosition(
      async position => {
        // Get the longitude and latitude of the device
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        setLocationMaps({ latitude: latitude, longitude: longitude });

        const address = await Geocoder.geocodePosition({
          lat: latitude,
          lng: longitude,
        });

        if (address[0].locality != null) {
          setPosition(() => address[0].locality);
        } else {
          setPosition(() => address[0].subLocality);
        }

        setContry(() => address[0].country);
        setContryCode(() => address[0].countryCode);
        showPromptNotification();
        requestNotifications();
      },
      error => {
        showPromptNotification();
        requestNotifications();
      },
    );

    try {
      const value = await AsyncStorage.getItem('profile');
      const parsedToken = JSON.parse(value);
      const token = jwt_decode(parsedToken);
      const alluserInfo = await fetchUSerInforamtion(token.id);
      setUSer(() => alluserInfo);
    } catch (e) {}
  };

  const openFilterMenu = () => {
    navigation.navigate('FilterScreen');
  };

  const requestLocationPermission = async () => {
    // ... requestLocationPermission function logic ...
  };

  const requestNotificationPermission = async () => {
    // ... requestNotificationPermission function logic ...
  };

  const openMenu = async () => {
    navigation.openDrawer();
  };

  const [text, setText] = useState('');

  const handleTextChange = inputText => {
    setText(inputText);
  };


  return (
    <View style={styles.frameParent}>
      <View style={[styles.subtractParent, styles.maskGroupIconPosition]}>
        <Image
          style={styles.subtractIcon}
          resizeMode="cover"
          source={require("../../assets/home2/subtract.png")}
        />
        <Image
          style={[styles.maskGroupIcon, styles.frameChildLayout]}
          resizeMode="cover"
          source={require("../../assets/home2/mask-group9.png")}
        />
        <View style={styles.frameGroup}>
          <View style={[styles.frameContainer, styles.frameParentFlexBox]}>
          <TouchableOpacity         onPress={() => navigation.navigate("ProfileHome")}

    style={[styles.component1Parent, styles.frameParentFlexBox]}
>
<Image
  style={[styles.component1Icon, { borderRadius: 50 }]} // Adjust the borderRadius value as needed
  resizeMode="cover"
  source={imageUrl ? { uri: imageUrl } : require("../../assets/home2/group-6356531.png")}
/>

</TouchableOpacity>

            <View style={[styles.groupParent, styles.frameParentFlexBox]}>
            <View>
  <View>
    <Image
      style={styles.frameItem}
      resizeMode="cover"
      source={require("../../assets/home2/group-6356432.png")}
    />
    {user ? (
      <Text style={[styles.text, styles.frTypo]}>
        {user.loyaltyPoints}
      </Text>
    ) : (
      <Text style={[styles.text, styles.frTypo]}>{' '}</Text>

    )}
    <Text style={[styles.text, styles.frTypo]}>{' '}</Text>
  </View>
</View>

          <View style={[styles.frameView, styles.frameParentFlexBox]}>
            <View style={[styles.frameParent1, styles.frameParentFlexBox]}>
              <View
                style={[
                  styles.translateFill0Wght400Grad0Parent,
                  styles.iconsFlexBox,
                ]}
              >
                <Image
                  style={styles.translateFill0Wght400Grad0Icon}
                  resizeMode="cover"
                  source={require("../../assets/home2/translate-fill0-wght400-grad0-opsz24-1.png")}
                />
                <Text style={[styles.fr, styles.frTypo]}>Fr</Text>
              </View>
              <TouchableOpacity onPress={toggleDarkMode}>
            <Image
                style={styles.component3Icon}
                resizeMode="cover"
                source={isDarkMode ? require("../../assets/home3/Component30.png") : require("../../assets/home2/component-3.png")}
            />
        </TouchableOpacity>
            </View>
            <View style={[styles.iconsWrapper, styles.iconsFlexBox]}>
              <View style={styles.icons}>
                <View
                  style={[styles.subtractParent, styles.maskGroupIconPosition]}
                >
                  <Image
                    style={[styles.iconsetStructure, styles.frameChildLayout]}
                    resizeMode="cover"
                    source={require("../../assets/home2/-iconset-structure1.png")}
                  />
                 <TouchableOpacity onPress={() => {
  navigation.navigate('NotificationsScreen');
  setHasNotification(false);
}}>
  <Image
    style={styles.vectorIcon}
    resizeMode="cover"
    source={require("../../assets/home2/vector.png")}
  />
</TouchableOpacity>

<View style={[
  styles.iconsChild, 
  styles.iconsFlexBox, 
  hasNotification ? styles.notificationColor : styles.defaultColor
]}>
</View>               
    </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maskGroupIconPosition: {
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
  },
  frameChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  frameParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  frTypo: {
    marginLeft: 4,
    textAlign: "left",
    color: Color.darkGrey21,
    fontWeight: "800",
    lineHeight: 27,
  },
  iconsFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  subtractIcon: {
    height: 89,
    width: WIDTH,
  },
  maskGroupIcon: {
    height: "79.33%",
    bottom: "20.67%",
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    maxWidth: "100%",
  },
  component1Icon: {
    width: 45,
    zIndex: 0,
    height: 45,
  },
  frameChild: {
    width: 40,
    zIndex: 0,
    height: 40,
    left: "1%",
    borderRadius: 25,

    right: "16.13%",
  },
  component1Parent: {
    height: 42,
    alignItems: "center",
  },
  frameItem: {
    top: 30,
    height: 32,
    width: 30,
  },
  text: {
    fontSize: 15,
    left: 25,
    fontFamily: FontFamily.poppinsSemiBold,
  },
  groupParent: {
    marginLeft: 8,
  },
  frameContainer: {
    width: 116,
    height: 42,
    alignItems: "center",
  },
  defaultColor: {
    backgroundColor: 'gray'
  },
  notificationColor: {
    backgroundColor: 'red'
  },
  translateFill0Wght400Grad0Icon: {
    width: 16,
    height: 16,
    
    overflow: "hidden",
  },
  fr: {
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.interSemiBold,
  },
  translateFill0Wght400Grad0Parent: {
    borderRadius: Border.br_41xl,
    backgroundColor: Color.colorGoldenrod,
    width: 55,
    padding: Padding.p_5xs,
    height: 40,
    flexDirection: "row",
  },
  component3Icon: {
    width: 75,
    height: 51,
    marginLeft: 8,
  },
  frameParent1: {
    
    width: WIDTH * 0.5,
    justifyContent: "flex-end",
  },
  iconsetStructure: {
    display: "none",
    left: "0%",
    right: "0%",
    top: "0%",
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
    width: 12,
    height: 12,
    position: "absolute",
  },
  subtractParent: {
    bottom: "0%",
    height: "100%",
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
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
  frameView: {
    marginLeft: 34,
  },
  frameGroup: {
    top: 25,
    left: 20,
    flexDirection: "row",
    position: "absolute",
  },
  frameParent: {
    height: 105,
    width: 360,
  },
});

export default MenuHeaders;
