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
  BackHandler 
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {fetchUSerInforamtion} from '../../services/homePageApi/home';
import {Color, Font} from '../../constants/colors/color';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {globlalUSerInfo, userInfomation} from '../../atom/auth';
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
} from 'react-native-permissions';

export const MenuHeaders = ({hide = true, title = ''}) => {
  useEffect(() => {
    getUserInformation();
  }, [navigation]);

  const navigation = useNavigation();
  const [user, setUSer] = useRecoilState(userInfomation);
  const [userData, setUserData] = useRecoilState(globlalUSerInfo);
  const [contry, setContry] = useRecoilState(currentContry);
  const [position, setPosition] = useRecoilState(currentPosition);
  const [ContryCode, setContryCode] = useRecoilState(currentContryCode);
  const [locationMaps, setLocationMaps] = useRecoilState(locationState);
  const [notificationEnabled, setNotificationsEnabled] = useState(false);
  const [locationEnabled, setLicationEnabled] = useState(false);

  const showPromptNotification = async () => {
    try {
      const permissionStatus = await checkNotifications();

      if (permissionStatus.status === RESULTS.GRANTED) {
        setNotificationsEnabled(() => true);
      } else {
        setNotificationsEnabled(() => false);
      }
    } catch (error) {
      setNotificationsEnabled(() => false);
    }
  };
  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** GET User Information   *************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const getUserInformation = async () => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
    });
    Geolocation.getCurrentPosition(
      async position => {
        // Get the longitude and latitude of the device
        const longitude = position.coords.longitude;
        //console.log('longitude:', longitude)
        const latitude = position.coords.latitude;
        //.log('latitude:', latitude)
        setLocationMaps({latitude: latitude, longitude: longitude});

        const address = await Geocoder.geocodePosition({
          lat: latitude,
          lng: longitude,
        });
        //console.log('address:', address);
        if (address[0].locality != null) {
          setPosition(() => address[0].locality);
        } else {
          setPosition(() => address[0].subLocality);
        }
        // console.log('address[0].locality:', address[0]?.locality)
        setContry(() => address[0].country);
        // console.log('address[0].country:', address[0].country)
        setContryCode(() => address[0].countryCode);
        // console.log('address[0].countryCode:', address[0].countryCode)
        showPromptNotification();
        requestNotifications();
      },
      error => {
        // Handle the error

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

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** OPEN MENU   ************************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************

  const requestLocationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        // console.log('Location permission granted');
        setLicationEnabled(()=> true)
        // Proceed with accessing the location
      } else {
        setLicationEnabled(()=> false)

        Linking.openSettings();
        // Handle the case where permission is denied
      }
    } catch (error) {
      setLicationEnabled(()=> false)

    }
  };

  const requestNotificationPermission = async () => {
    try {
      const result = await check(PERMISSIONS.IOS.NOTIFICATIONS);
      console.log('Notification permission result:', result);
      if (result === RESULTS.GRANTED) {
        console.log('Notification permission granted');
        // Notification permissions are granted
      } else {
        console.log('Notification permission not granted');
        // Notification permissions are not granted
      }
    } catch (error) {
      console.log('Error checking notification permission:', error);
      // Handle any errors that occur during the permission check
    }
  }
  const openMenu = async () => {
    navigation.openDrawer();
  };
  const [text, setText] = useState('');

  const handleTextChange = (inputText) => {
    setText(inputText);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.menuIconeContainer}>
          {/* i add this one because when i navigation
         from custum drawer it will not send opendawer with navigation si i need to handle this undifined function 
         and replace open drawer with replace and menu icon with arrow left icone to avoid any bug
          */}
          <View>
            {navigation.openDrawer ? (
              <Ionicons
                name="menu-outline"
                color={Color.light}
                size={28}
                onPress={() => openMenu()}
              />
            ) : (
              <Ionicons
                name="arrow-back"
                color={Color.light}
                size={28}
                onPress={() => navigation.goBack()}
              />
            )}
          </View>
          <Pressable
            style={{alignSelf: 'center'}}
            onPress={requestLocationPermission}>
            <Text
              style={{
                textAlign: 'center',
                color: Color.light,
                fontSize: 14,
                fontFamily: Font.primary,
              }}>
              Localisation actuelle
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: Color.light,
                fontSize: 16,
                fontFamily: Font.primary,
              }}>
              {position}, {ContryCode}
            </Text>
          </Pressable>
          <View style={styles.notificationContainer}>
            {notificationEnabled ? (
              <Ionicons
                name="notifications-outline"
                color={Color.light}
                size={25}
                onPress={() => navigation.navigate('Setting')}
              />
            ) : (
              <Ionicons
                name="notifications-off-outline"
                color={Color.light}
                size={25}
                onPress={() => navigation.navigate('Setting')}
              />
            )}
          </View>
        </View>
        
        <View style={styles.headerSerchContainer}>
          <View style={styles.headerSearchIcon}>
            <Ionicons
              name="search"
              color={Color.light}
              size={24}
              onPress={() => openMenu()}
            />
            <TextInput style={styles.headerSearchInput}
              icon="search"
              placeholder="Recherche..."
              autoCapitalize="none"
              keyboardAppearance="dark"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons
              style={styles.filterIcon}
              name="filter"
              color={Color.light}
              size={20}
              onPress={() => openMenu()}
            />
            <Text style={styles.filterButtonText}>Filters</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.userProfilecontainer}>
        <View style={styles.userPointsContainer}>
          <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: '1%',
          }}>
          {user.sex == 'h' ? (
            <Pressable onPress={() => navigation.navigate('Profil')}>
              <Image
                source={require('../../assets/appIcones/userProfileImage.png')}
                style={{width: WIDTH / 9, height: WIDTH / 9, borderRadius: 100}}
              />
            </Pressable>
          ) : (
            <Pressable onPress={() => navigation.navigate('Profil')}>
              <Image
                source={require('../../assets/images/girl.png')}
                style={{width: WIDTH / 7, height: WIDTH / 7, borderRadius: 100}}
              />
            </Pressable>
          )}

          <Text style={{paddingLeft: '3%', textAlign:'center', fontFamily:Font.secondary}}>
            Vous avez{' '}
            <Text style={{fontSize: 14, color: '#000', fontWeight: 'bold'}}>
              {user ? (
                user.loyaltyPoints
              ) : (
                <ActivityIndicator size="small" color={Color.primary} />
              )}
            </Text>{' '}
            points
          </Text>
          </View>
          <TouchableOpacity style={styles.eventJoinButton}>
            <Text style={styles.eventJoinButtonText}>Redeem</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
    height: HEIGHT / 5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Color.primary,
    flex: 1,
    
  },
  menuIconeContainer: {
    marginTop: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '8%',
    paddingVertical: '2%',
    // height:HEIGHT/ 13
  },
  profileIconeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftIconeContianer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  userPointsContainer: {
    flexDirection: "row",
    alignContent: 'center',
    justifyContent: 'space-between',
  },

  userProfilecontainer: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: 30,
    bottom: '15%',
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: Color.light,
    paddingVertical:'1%',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(90, 90, 90, 0.1)',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 1,
        shadowRadius: 20,
      },
      android: {
        elevation: 11,
      },
    }),
  },
  notificationContainer: {
    width: 36,
    height: 36,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: '#fff',
    opacity: .7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventJoinButton: {
    backgroundColor: '#5669FF',
    borderRadius: 7,
    textTransform: 'capitalize',
    height: 28,
    width: 60,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 5,
  },
  eventJoinButtonText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  headerSearchPlaceholder: {
    color: '#FFF', // Add this line to set the placeholder text color to white
  },
  headerSerchContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    width: '82%',
    alignSelf: 'center',
    borderRadius: 30,
    marginBottom: 5,
    marginTop: 10,
  },
  headerSearchInput: {
    borderLeftWidth: 1,
    color: '#fff',
    borderColor: '#fff',
    lineHeight: 34,
    paddingLeft: 10,
    paddingVertical: 0,
    height: 34,
    fontSize: 16,
    opacity: .7,
  },
  headerSearchIcon: {
    flexDirection: 'row',
    columnGap: 5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    rowGap: 5,
    columnGap: 5,
    backgroundColor: Color.customBlue,
    width: 90,
    borderRadius: 50,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    color: Color.light,
  },
  filterIcon: {
    backgroundColor: '#A29EF0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 50,
  }
  
});
