import React, {useState, useCallback, useEffect, useRef} from 'react';
import { Text, StyleSheet, Image, View, ScrollView, TouchableOpacity, TextInput, FlatList, TouchableHighlight } from "react-native";
import { Padding, Color, Border, FontFamily, FontSize } from "../assets/filter/GlobalStyles";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { Circle } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const Filters = ({ eventsData, onApplyFilters, toggleModal }) => { 
  const navigation = useNavigation();

  const [isLocationVisible, setLocationVisibility] = useState(false);
  const [isMarquesVisible, setMarquesVisibility] = useState(false);
  const [isEnseignesVisible, setEnseignesVisibility] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isRayonDropdownVisible, setRayonDropdownVisible] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState(10); // default to 10KM
  
  const defaultLocation = 
  eventsData && 
  eventsData.length > 0 && 
  eventsData[0].locations && 
  eventsData[0].locations.length > 0 
  ? eventsData[0].locations[0] 
  : null;

const [selectedLocation, setSelectedLocation] = useState(
  defaultLocation
  ? {
      latitude: parseFloat(defaultLocation.latitude),
      longitude: parseFloat(defaultLocation.longitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
  }
  : null
);

const [selectedLocationName, setSelectedLocationName] = useState(
  defaultLocation ? defaultLocation.name : "Selectionner locatisation"
);
const handleLocationSelect = (locationName) => {
  setSelectedLocationName(locationName);
  setDropdownVisible(false); 
};

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
};
  const handleProductSearch = (text) => {
    setSearchQuery(text);
    if (text.length >= 3) {
        const matchedProducts = eventsData
            .flatMap(event => event.product.name)  // Use flatMap to flatten arrays
            .filter(name => name.toLowerCase().includes(text.toLowerCase()));
        setFilteredProducts(matchedProducts);
    } else {
        setFilteredProducts([]);
    }
};
const handlePartnerSelect = (partnerId) => {
  console.log("Selected Partner ID:", partnerId);

  // If the partnerId is the same as the currently selected partner, then unselect
  if (selectedPartner === partnerId) {
      setSelectedPartner(null);
  } else {
      setSelectedPartner(partnerId);
  }
};
const toggleRayonDropdown = () => {
  setRayonDropdownVisible(!isRayonDropdownVisible);
};
const handleRayonSelect = (radius) => {
  setSelectedRadius(radius);
  setRayonDropdownVisible(false);
};
const handleShowResults = () => {
  // Check if at least one filter is set
  if (selectedLocation || selectedPartner || selectedProduct) {
    const selectedFilters = {
        location: selectedLocationName,
      marque: selectedPartner,
      product: selectedProduct,
      // ... add any other filters here
    };
    console.log("Selected Filters:", selectedFilters);

    // Apply the filters:
    onApplyFilters(selectedFilters);

    // Close the modal:
    if (typeof toggleModal === "function") {
        toggleModal();
    }
  } else {
    // You can show a message to the user if you wish
    console.log("Please select at least one filter to proceed.");
  }
}

console.log("eventsData:", eventsData);

  return (
    <ScrollView style={styles.frameParent}>
      <View>
        <TouchableOpacity style={[styles.textParent, styles.wrapperParentFlexBox]} onPress={() => setLocationVisibility(!isLocationVisible)}>
          <Text style={[styles.text, styles.textFlexBox]}>Location</Text>
          <Image
            style={styles.toggleNormalIcon}
            resizeMode="cover"
            source={isLocationVisible ? require("../assets/filter/toggle-normal2.png") : require("../assets/filter/toggle-normal3.png")}
            />
        </TouchableOpacity>
  
        {isLocationVisible && (
          <View style={styles.frameContainer}>
            <View style={[styles.textFieldParent, styles.wrapperParentFlexBox]}>
              <View style={styles.textField}>
                  <View style={[styles.wrapper, styles.wrapperBorder]}>
                    <View style={styles.wrapperFrameFlexBox}>
                      <View
                        style={[styles.frameView, styles.wrapperFrameFlexBox]}
                      >
                        <View style={styles.textWrapper}>
                        <TouchableOpacity onPress={toggleRayonDropdown}>
    <Text style={[styles.text1, styles.textTypo]}>Rayon(km)</Text>
</TouchableOpacity>

{isRayonDropdownVisible && (
  <View style={styles.dropdownContainer}>
  <ScrollView style={styles.dropdownList}>
    {[10, 20, 50, 100].map(radius => (
      <TouchableOpacity 
        key={radius} 
        onPress={() => handleRayonSelect(radius)}
        style={radius === selectedRadius ? styles.selectedItem : styles.dropdownItem}
      >
        <Text style={styles.dropdownItemText}>{radius}KM</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
</View>

)}

                        </View>
                        <Image
                          style={styles.iconsLayout}
                          resizeMode="cover"
                          source={require("../assets/filter/icons3.png")}
                        />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.textField2}>
                <View style={[styles.textField3, styles.textLayout1]}>
                  <View style={[styles.wrapper, styles.wrapperBorder]}>
                    <View style={styles.wrapperFrameFlexBox}>
                      <View
                        style={[styles.frameParent1, styles.wrapperFrameFlexBox]}
                      >
                        <View
                          style={[
                            styles.frameWrapper,
                            styles.wrapperParentFlexBox,
                          ]}
                        >
                          <View style={styles.wrapperParentFlexBox}>
                            <Image
                              style={[
                                styles.gpsSvgrepoCom1Icon,
                                styles.icons1Layout,
                              ]}
                              resizeMode="cover"
                              source={require("../assets/filter/gpssvgrepocom-11.png")}
                            />
                           <View style={styles.locationContainer}>
                        
                        <TouchableOpacity 
                            style={styles.locationButton} 
                            onPress={toggleDropdown}>
                            <Text style={[styles.text2, styles.textTypo]}>
                                {selectedLocationName}
                            </Text>
                        </TouchableOpacity>

                        {dropdownVisible && (
                            <View style={styles.locationContainer}>
                                {eventsData.flatMap(event => event.locations).map(location => (
                                    <TouchableOpacity 
                                        key={location.id}
                                        onPress={() => {
                                          handleLocationSelect(location.name);
                                            setSelectedLocation({
                                                latitude: parseFloat(location.latitude),
                                                longitude: parseFloat(location.longitude),
                                                latitudeDelta: 0.0922,
                                                longitudeDelta: 0.0421,
                                            });
                                            setDropdownVisible(false);
                                        }}
                                    >
                                        <Text style={[styles.text2, styles.textTypo]}>
                                            {location.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                            </View>
                          </View>
                        </View>
                        
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <MapView 
style={{ top: 10, height: 130, width: '100%', zIndex: 1 }}
    region={selectedLocation}
>
    {eventsData.map(event => 
        event.locations.map(location => (
            <Marker
                key={location.id}
                coordinate={{
                    latitude: parseFloat(location.latitude),
                    longitude: parseFloat(location.longitude)
                }}
                title={location.name}
                description={location.address}
            >
                <Image 
                    source={require('../assets/home8/union.png')} 
                    style={{width: 30, height: 30}}  // You can adjust the size as needed
                />
            </Marker>
        ))
    )}

    <Circle
        center={selectedLocation}
        radius={selectedRadius * 1000}  // Convert KM to Meters
        strokeColor={'#FF5733'}  // Border color
        fillColor={'rgba(255, 235, 163, 0.40)'}  // Fill color
    />
</MapView>


          </View>
        )}
  
        <TouchableOpacity style={[styles.textGroup, styles.wrapperParentFlexBox]} onPress={() => setMarquesVisibility(!isMarquesVisible)}>
          <Text style={[styles.text, styles.textFlexBox]}>Marque(s)</Text>
          <Image
            style={styles.toggleNormalIcon}
            resizeMode="cover"
            source={isMarquesVisible ? require("../assets/filter/toggle-normal2.png") : require("../assets/filter/toggle-normal3.png")}
            />
        </TouchableOpacity>
  
          {isMarquesVisible && (
      <View style={[styles.textField4, styles.textLayout]}>
          <View style={[styles.textField5, styles.textLayout]}>
              <View style={[styles.wrapper2, styles.wrapperFrameFlexBox]}>
                  <View style={styles.wrapperParentFlexBox}>
                      <View style={[styles.iconsParent, styles.wrapperParentFlexBox]}>
                          <Image
                              style={styles.iconsLayout}
                              resizeMode="cover"
                              source={require("../assets/filter/icons5.png")}
                          />
                          <View style={styles.textFrame}>
                              <View style={{ margin: 10 }}>
                                  <TextInput
                                      style={{ height: 40, paddingHorizontal: 10, }}
                                      onChangeText={handleProductSearch}
                                      value={searchQuery}
                                      placeholder="Chercher une marque"
                                  />
                                  {searchQuery.length < 3 ? null : filteredProducts.map((item, index) => (
                                      <TouchableOpacity 
                                          key={index} 
                                          onPress={() => { 
                                            setSelectedProduct(item);  // Set the selected product
                                            setSearchQuery(item);      // Update the input with the selected item
                                            setFilteredProducts([]); 
                                          }}
                                          style={{ padding: 10 }}
                                      >
                                          <Text>{item}</Text>
                                      </TouchableOpacity>
                                  ))}
                              </View>
                          </View>
                      </View>
                  </View>
              </View>
          </View>
      </View>
  )}


        <TouchableOpacity style={[styles.textGroup, styles.wrapperParentFlexBox]} onPress={() => setEnseignesVisibility(!isEnseignesVisible)}>
          <Text style={[styles.text, styles.textFlexBox]}>Partenaire(s)</Text>
          <Image
            style={styles.toggleNormalIcon}
            resizeMode="cover"
            source={isEnseignesVisible ? require("../assets/filter/toggle-normal2.png") : require("../assets/filter/toggle-normal3.png")}
            />
        </TouchableOpacity>
  
        {isEnseignesVisible && (
    <View style={styles.pillsButtonsParent}>
{eventsData.map((event, index) => (
            <TouchableHighlight 
            key={`${event.partner.id}-${index}`}
            underlayColor='lightgray'
                onPress={() => handlePartnerSelect(event.partner.id)}
                style={{
                    marginVertical: 5, 
                    backgroundColor: selectedPartner === event.partner.id ? 'lightgray' : 'transparent' 
                }}
            >
                <View style={[styles.pillsButtons1, styles.buttonsFlexBox]}>
                    <Text>{event.partner.name}</Text>
                    <Image
                        style={[styles.icons3, styles.iconsLayout]}
                        resizeMode="cover"
                        source={require("../assets/filter/icons6.png")}
                    />
                </View>
            </TouchableHighlight>
        ))}
    </View>
)}


        
      </View>
      <View style={[styles.buttons, styles.buttonsFlexBox]}>
    <Text style={[styles.text11, styles.textFlexBox]} onPress={handleShowResults}>
        Montrer les résultats
    </Text>

      </View>
      <View style={{ height: 30 }} />

    </ScrollView>
  );
  
};

const styles = StyleSheet.create({
  wrapperParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  textFlexBox: {
    textAlign: "left",
    lineHeight: 24,
  },
  textLayout1: {
    height: 36,
    justifyContent: "center",
  },

  dropdownContainer: {
    position: 'absolute',
    top: -100, // this ensures it starts right after the button
    width: '150%',

    right: 0, // Making it span the entire width
    zIndex: 1000, // Making sure it's above all other elements
    backgroundColor: 'white', // Background color for visibility
    maxHeight: 200, // Restricting height
    overflow: 'scroll', // Allowing scrolling
  },
dropdownItem: {
  padding: 10,
  backgroundColor: 'white',
},
dropdown: {
  zIndex: 1000, // Making sure it's above all other elements
  backgroundColor: 'white', // Background color for visibility
  maxHeight: 300, // Restricting height
},
locationContainer: {
  zIndex: 1,  // Ensures the container is stacked on top
},
text2: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
},
  wrapperBorder: {
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    borderColor: Color.lightGrey3,
    borderRadius: Border.br_41xl,
    alignSelf: "stretch",
    borderStyle: "solid",
    backgroundColor: Color.background,
  },
  selectedItem: {
    padding: 10,
    backgroundColor: 'lightgray', // or any color to highlight the selected item
  },
  dropdownItemText: {
    fontSize: 12,
    textAlign: 'center',

    color: 'black',
  },
  wrapperFrameFlexBox: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  textTypo: {
    color: Color.black1,
    fontFamily: FontFamily.customBody1,
    textAlign: "left",
    lineHeight: 24,
  },
  icons1Layout: {
    height: 16,
    width: 16,
  },
  textLayout: {
    height: 48,
    width: 320,
    justifyContent: "center",
  },
  buttonsFlexBox: {
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_21xl,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iconsLayout: {
    height: 24,
    width: 24,
  },
  text: {
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.black,
    textAlign: "left",
    lineHeight: 24,
    fontSize: FontSize.customButton1_size,
  },
  toggleNormalIcon: {
    width: 68,
    height: 34,
  },
  textParent: {
    justifyContent: "space-between",
    width: 328,
  },
  text1: {
    fontSize: FontSize.size_xs,
    color: Color.black1,
    fontFamily: FontFamily.customBody1,
    alignSelf: "stretch",
  },
  textWrapper: {
    justifyContent: "center",
  },
  frameView: {
    justifyContent: "space-between",
  },
  wrapper: {
    height: 37,
    paddingHorizontal: Padding.p_3xs,
    alignItems: "center",
    flexDirection: "row",
  },
  textField1: {
    alignSelf: "stretch",
  },
  textField: {
    width: 122,
  },
  gpsSvgrepoCom1Icon: {
    overflow: "hidden",
  },
  text2: {
    fontSize: FontSize.size_xs,
    color: Color.black1,
    fontFamily: FontFamily.customBody1,
  },
  textContainer: {
    width: 63,
    marginLeft: 4,
    justifyContent: "center",
  },
  frameWrapper: {
    width: 137,
    overflow: "hidden",
  },
  frameParent1: {
    justifyContent: "space-between",
    overflow: "hidden",
  },
  textField3: {
    width: 176,
  },
  textField2: {
    marginLeft: 30,
  },
  textFieldParent: {
    height: 46,
    justifyContent: "center",
    width: 328,
  },
  maskGroupIcon: {
    height: 158,
    marginTop: 8,
    width: 328,
  },
  frameContainer: {
    marginTop: 20,
  },
  textGroup: {
    marginTop: 20,
    justifyContent: "space-between",
    width: 328,
  },
  text4: {
    fontSize: FontSize.customButton1_size,
  },
  textFrame: {
    marginLeft: 8,
    justifyContent: "center",
  },
  iconsParent: {
    flexWrap: "wrap",
  },
  wrapper2: {
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    borderColor: Color.lightGrey3,
    borderRadius: Border.br_41xl,
    alignSelf: "stretch",
    borderStyle: "solid",
    backgroundColor: Color.background,
  },
  textField5: {
    minHeight: 48,
    maxHeight: 48,
  },
  textField4: {
    marginTop: 20,
    backgroundColor: Color.background,
    height: 48,
    width: 320,
  },
  text6: {
    fontSize: 19,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.black,
    textAlign: "left",
    lineHeight: 24,
  },
  icons3: {
    display: "none",
    marginLeft: 8,
  },
  pillsButtons: {
    paddingHorizontal: 13,
    backgroundColor: Color.colorWhitesmoke,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_21xl,
  },
  pillsButtons1: {
    paddingHorizontal: 13,
    backgroundColor: Color.colorWhitesmoke,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_21xl,
    marginLeft: 8,
  },
  pillsButtonsParent: {
    marginTop: 20,
    flexDirection: "row",
  },
  text11: {
    fontWeight: "700",
    fontFamily: FontFamily.customButton1,
    color: Color.colorGold,
    textAlign: "left",
    lineHeight: 24,
    fontSize: FontSize.customButton1_size,
  },
  buttons: {
    backgroundColor: Color.black,
    marginTop: 40,
    paddingVertical: Padding.p_xs,
    borderRadius: Border.br_21xl,
    width: 320,
    paddingHorizontal: Padding.p_base,
  },
  frameParent: {
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    borderColor: Color.goldVariant,
    borderTopWidth: 4,
    width: 360,
    height: 794,
    paddingVertical: Padding.p_5xl,
    paddingHorizontal: Padding.p_base,
    borderStyle: "solid",
    overflow: "hidden",
    backgroundColor: Color.background,
  },
});

export default Filters;
