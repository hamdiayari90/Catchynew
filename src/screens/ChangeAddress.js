
import { Color, Border, FontFamily, FontSize, Padding } from '../assets/home8/GlobalStyles';
import * as React from "react";
import { Image, StyleSheet, View, Text, Platform, PermissionsAndroid, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const ChangeAddress = () => {
  const navigation = useNavigation();
  const [location, setLocation] = React.useState(null);
  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          fetchLocation();
        } else {
          console.error("Location permission denied");
        }
      } else {
        fetchLocation();
      }
    };

    requestLocationPermission();
  }, []);

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        // Placeholder: Fetch the address for this location
        fetchAddressFromLocation(latitude, longitude);
      },
      error => {
        console.error(error);
      }
    );
  };
  const fetchAddressFromLocation = async (latitude, longitude) => {
    const GOOGLE_MAPS_API_KEY = 'AIzaSyAsVazkvYZxMXDlZbuXT0SXwUK3KRNczkc'; // Replace with your API key
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
  
    try {
      const response = await axios.get(endpoint);
      if (response.data.status === 'OK') {
        const address = response.data.results[0].formatted_address;
        setAddress(address);
      } else {
        console.error('Geocoding API Error:', response.data.status);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };
  const handleDragEnd = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    fetchAddressFromLocation(latitude, longitude);
};

  return (
    <View style={[styles.changeAddress, styles.wrapperFlexBox]}>
      <MapView
        style={styles.maskGroupIcon}
        initialRegion={location || {
          latitude: 36.8588, // default to Ariana, Tunisia
          longitude: 10.1658,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker  coordinate={location}
          draggable={true}
          onDragEnd={(e) => handleDragEnd(e)}
      >
            <Image
              style={styles.unionIcon}
              resizeMode="cover"
              source={require("../assets/home8/union.png")}
            />
          </Marker>
        )}
      </MapView>
      
      <View style={[styles.buttons, styles.buttonsFlexBox]}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>

        <Image
          style={styles.icons}
          resizeMode="cover"
          source={require("../assets/home8/icons.png")}
        />
          </TouchableOpacity>
      </View>
  
      <View style={[styles.changeAddressInner, styles.wrapperBorder]}>
        {/* ... */}
        <Text style={styles.text}>Adresse Actuelle</Text>
        <View style={[styles.frameGroup, styles.buttonsFlexBox]}>
          <View style={[styles.iconsWrapper, styles.wrapperLayout]}>
            <Image
              style={styles.icons1}
              resizeMode="cover"
              source={require("../assets/home8/icons1.png")}
            />
          </View>
          <Text style={[styles.text1, styles.textTypo]}>
          <Text>{address}</Text>
          </Text>
          
        </View>
        {/* ... */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperFlexBox: {
    flex: 1,
    backgroundColor: Color.background,
  },
  maskGroupIconLayout: {
    width: 360,
    position: "absolute",
  },
  buttonsFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  wrapperBorder: {
    borderStyle: "solid",
    alignItems: "center",
  },
  wrapperLayout: {
    borderRadius: Border.br_41xl,
    flexDirection: "row",
  },
  textTypo: {
    color: Color.darkGrey2,
    fontFamily: FontFamily.customBody1,
    fontSize: FontSize.customBody1_size,
    textAlign: "left",
    lineHeight: 24,
  },
  maskGroupIcon: {
    top: 0,
    left: 0,
    height: 600,
  },
  icons: {
    width: 24,
    height: 24,
  },
  buttons: {
    top: 26,
    left: 22,
    borderRadius: Border.br_21xl,
    backgroundColor: Color.primary,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 20,
    elevation: 20,
    shadowOpacity: 1,
    width: 40,
    height: 40,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    position: "absolute",
    flexDirection: "row",
  },
  unionIcon: {
    width: 53,
    height: 51,
  },
  text: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.lightGrey2,
    textAlign: "left",
    lineHeight: 24,
  },
  icons1: {
    width: 32,
    height: 32,
    overflow: "hidden",
  },
  iconsWrapper: {
    backgroundColor: Color.primaryVarient1,
    padding: 5,
  },
  text1: {
    width: 232,
    marginLeft: 10,
  },
  frameGroup: {
    marginTop: 8,
    justifyContent: "center",
  },
  textWrapper: {
    marginLeft: 8,
    justifyContent: "center",
  },
  iconsParent: {
    flexWrap: "wrap",
  },
  wrapper: {
    alignSelf: "stretch",
    borderColor: Color.colorGainsboro,
    borderWidth: 1,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_5xs,
    borderStyle: "solid",
    alignItems: "center",
    flex: 1,
    backgroundColor: Color.background,
  },
  textField: {
    width: 320,
    height: 48,
    minHeight: 48,
    maxHeight: 48,
    marginTop: 10,
    justifyContent: "center",
  },
  textGroup: {
    marginTop: 20,
  },
  changeAddressInner: {
    marginLeft: -180,
    top: 542,
    left: "50%",
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: Color.lightGrey4,
    borderColor: Color.goldVariant,
    borderTopWidth: 4,
    height: 263,
    paddingHorizontal: 36,
    paddingVertical: Padding.p_base,
    width: 360,
    position: "absolute",
    overflow: "hidden",
  },
  changeAddress: {
    width: "100%",
    overflow: "hidden",
    height: 805,
  },
});

export default ChangeAddress;
