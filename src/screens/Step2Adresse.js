
import React, { useState, useEffect } from 'react';
import { Platform, Text, StyleSheet, View, Image, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize, Padding } from "../../GlobalStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import { PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { HEIGHT, WIDTH } from '../utils/Dimension';

import mapStyle from '../../mapStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Step2({ route, navigation }) {
  const { data } = route.params;
  const [formData, setFormData] = useState({
    ...data,
    address: '',   // We'll store the selected city ID here as "address"
    zipCode: ''
  });

  
  const [cities, setCities] = useState([]);
  const [userLocation, setUserLocation] = useState(null); // Defined the state for userLocation
  
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(position => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    fetch('http://94.237.82.88:8082/city')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCities(data);
        } else {
          console.warn("Expected an array but received a different type for cities.");
        }
      })
      .catch(error => console.error('Error fetching cities:', error));
  }, []);

  const validateForm = () => {
    const { address, zipCode } = formData;

    // Ensure the zip code has exactly 4 digits
    const zipCodeRegex = /^\d{4}$/;

    if (!address) {
        alert('Veuillez sélectionner votre adresse.');
        return false;
    }

    if (!zipCode || !zipCode.match(zipCodeRegex)) {
        alert('Veuillez saisir un code postal valide (4 chiffres seulement).');
        return false;
    }

    return true;
};
  

  return (
    <View style={[styles.step2Adresse, styles.wrapperFlexBox1]}>
    <View style={styles.frameParent}>
      <View>
        <Text style={styles.indiqueMoiTon}>{`Indique moi ton
adresse`}</Text>
        <View style={styles.stepperSpaceBlock}>
          <View style={[styles.stepperChild, styles.childLayout]} />
          <View style={styles.stepperInner}>
            <View style={[styles.frameChild, styles.wrapperFlexBox]} />
          </View>
          <View style={[styles.stepperItem, styles.childLayout]} />
        </View>
      </View>
      <View style={styles.frameGroup}>
        <View>
          <Text style={[styles.text, styles.textTypo]}>
            Sinon, déplace ton Catchous sur la carte pour m’indiquer ton
            emplacement
          </Text>
            {userLocation ? (
                <>
                    <MapView 
    style={styles.lgrg1Icon}
    initialRegion={userLocation}
    customMapStyle={mapStyle} // This applies the custom style
>
    <Marker coordinate={userLocation}>
        <Image
            source={require("../assets/union1.png")}
            style={{ width: 40, height: 40 }}
        />
    </Marker>
</MapView>

                    <View style={[styles.textField, styles.lgrg1IconSpaceBlock]}>
                        <View style={[styles.wrapper, styles.wrapperFlexBox]}>
                            <View style={styles.textWrapper}>
                                <ModalDropdown 
                                    options={cities.map(city => city.name)} 
                                    defaultValue="Selectionner votre région"
                                    onSelect={(index, value) => {
                                        const selectedCity = cities[index];
                                        setFormData(prevState => ({
                                            ...prevState,
                                            address: selectedCity.id 
                                        }))
                                    }}
                                    style={styles.dropdown}
                                    textStyle={styles.dropdownText}
                                    dropdownStyle={styles.dropdownStyle}
                                />
                            </View>
                        </View>
                        <View style={{ height: 10 }} />
              <View style={styles.wrapperInner}>
                        <View style={[styles.wrapper, styles.wrapperFlexBox]}>

                   <View style={styles.textWrapper}>

                        <TextInput  style={{ height: 40 }}  placeholder="Code Postale"      color='gray'
   placeholderTextColor="gray"
onChangeText={text => setFormData({...formData, zipCode: text})} />
                        </View>
                        </View>
                        </View>
                        <TouchableOpacity
                          style={[styles.buttons, styles.stepperSpaceBlock]}
                          onPress={() => {
                              if (validateForm()) {
                                  navigation.navigate('Step3', { data: formData });
                              }
                          }}
                      >
                            <Text style={styles.text2}>Suivant</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : null}
            <Image
                style={[styles.step2AdresseChild, styles.step2Layout]}
                resizeMode="cover"
                source={require("../assets/assetsnew/group-63563604.png")}
            />
        </View>
        </View>
        </View>
    </View>
);
};
// Styles remain the same.
const styles = StyleSheet.create({
  wrapperFlexBox1: {
    flexDirection: "row",
    backgroundColor: Color.white,
  },
  childLayout: {
    height: 8,
    overflow: "hidden",
  },
  wrapperFlexBox2: {
  flexDirection: "row",
    backgroundColor: Color.white,
  },
  wrapperFlexBox: {
    alignSelf: "stretch",
    borderRadius: Border.br_41xl,
  },
  textTypo: {
    fontFamily: FontFamily.customBody1,
    lineHeight: 24,
    fontSize: FontSize.nums_size,
    textAlign: "left",
    color: Color.black,
  },
  lgrg1IconSpaceBlock: {
    marginTop: 16,
    width: 320,
  },

  dropdownText: {
    fontSize: 16,
  },
  dropdownStyle: {
    width: 250,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
  },
  stepperSpaceBlock: {
    marginTop: 32,
    width: 320,
    flexDirection: "row",
  },
 
  indiqueMoiTon: {
    fontSize: FontSize.size_13xl,
    lineHeight: 39,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    height: 76,
    width: 320,
    textAlign: "left",
    color: Color.black,
  },
  stepperChild: {
    backgroundColor: Color.gainsboro,
    borderRadius: Border.br_41xl,
    height: 8,
    flex: 1,
  },
  frameChild: {
    backgroundColor: Color.accent,
    height: 8,
    overflow: "hidden",
  },
  stepperInner: {
    width: 99,
    marginLeft: 16,
    alignItems: "center",
  },
  stepperItem: {
    marginLeft: 16,
    backgroundColor: Color.gainsboro,
    borderRadius: Border.br_41xl,
    height: 8,
    flex: 1,
  },
  text: {
    width: 320,
  },
  lgrg1Icon: {
    borderRadius: Border.br_xl,
    height: 152,
    width : 320,
  },
  textWrapper: {
    justifyContent: "center",
  },
  wrapper: {
    borderStyle: "solid",
    borderColor: "#dfdfdf",
    borderWidth: 1,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_5xs,
    minHeight: 48,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.white,
    alignSelf: "stretch",
  },
  textField: {
    justifyContent: "center",
  },
  unionIcon: {
    width: 26,
    height: 25,
  },
  text2: {
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.primary,
    lineHeight: 24,
    fontSize: FontSize.nums_size,
    textAlign: "left",
  },
  buttons: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.black,
    height: 48,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    justifyContent: "center",
    alignItems: "center",
  },
  frameGroup: {
    marginTop: 28,
  },
  step2AdresseChild: {
    width: WIDTH * 1.99,     // nearly twice the screen width
    height: HEIGHT * 0.99,   // nearly the screen height
    marginTop: -0.02 * HEIGHT, 
    marginLeft: -WIDTH * 0.5, // 5% of screen width as left margin
},

  step2Adresse: {
    height: 800,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_45xl,
    overflow: "hidden",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    backgroundColor: Color.white,
  },
});
