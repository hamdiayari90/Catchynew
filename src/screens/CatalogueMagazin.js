import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, Linking, TouchableOpacity, BackHandler  } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../assets/catag/GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import { DarkModeProvider, DarkModeContext } from '../../DarkModeContext';

const CatalogueMagazin = () => {
  const navigation = useNavigation();
  const [catalogues, setCatalogues] = useState([]);
  const { isDarkMode } = React.useContext(DarkModeContext);
  const [promoCodes, setPromoCodes] = useState(['GEANT25501', 'CARREFOUR1', 'MGERBA7']);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Fetch the list of catalogues from the API
    fetchCatalogues();
  }, []);

  const fetchCatalogues = async () => {
    try {
      // Assuming the API endpoint to fetch the list of catalogues is as follows:
      const response = await fetch('http://94.237.82.88:8082/catalogue');
      const data = await response.json();
      setCatalogues(data);
    } catch (error) {
      console.error('Error fetching catalogues:', error);
    }
  };
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home'); // Replace 'Home' with the name of your Home screen route if it's different
      return true;  // This will prevent the default action (i.e., exiting the app) from taking place
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    // Cleanup the event listener
    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const handleBackPress = () => {
    navigation.navigate('Home'); // Navigate directly to the Home screen
  };

  const handleOpenLink = (link) => {
    setShowSuccessMessage(false);
    Linking.openURL(link)
      .then(() => setShowSuccessMessage(true))
      .catch((error) => console.error('Error opening link:', error));
  };
  const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };
  return (

    <>
        <View style={{flex: 1, backgroundColor: isDarkMode ? "#323232" : "#FAFAFA"}}>
      <MenuHeaders
        navigation={navigation}
      />

      <View style={{ height: 30}} />
       <TouchableOpacity onPress={() => navigation.navigate("Home")}> 
    <View style={[styles.buttonsParent, styles.buttonsFlexBox]}>
      <View style={[styles.buttons, styles.buttonsFlexBox]}>
        <Image
          style={styles.icons}
          resizeMode="cover"
          source={require("../assets/home9/icons18.png")}
        />
      </View>
      <Text style={[styles.text, styles.textTypo1, isDarkMode ? { color: '#FFFFFF' } : {}
]}>Retour</Text>
    </View>
</TouchableOpacity>

        <View style={styles.eCatalogueParent}>

          <Text style={styles.eCatalogue, isDarkMode ? { color: '#FFFFFF' } : {}
}>Shop</Text>
          <View style={styles.frameWrapper}>
            <View style={styles.textWrapper}>
              <Text style={[styles.text, , isDarkMode ? { color: '#FFFFFF' } : {}
]}>Supermarchés</Text>
            </View>
            {chunkArray(catalogues, 2).map((pair) => (
              <View style={styles.frameGroup}>
                {pair.map((catalogue) => (
                  <TouchableOpacity
                    style={[styles.frameContainer, styles.frameFlexBox]}
                    onPress={() => handleOpenLink(catalogue.link)}
                  >
                    <View style={styles.frameFlexBox}>
                      {catalogue.icon && catalogue.icon.name && (
                        <Image
                          style={styles.images1Icon}
                          resizeMode="cover"
                          source={{ uri: `https://www.catchy.tn/media/catalogue/${catalogue.icon.name}` }}
                        />
                      )}
                      <Text style={[styles.magazinGeneral, styles.textTypo]}>
                        {catalogue.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.promoSection}>
            <Text style={styles.promoTitle}>Vos codes promo</Text>
            {promoCodes.map(code => (
                <View style={styles.codeContainer} key={code}>
                    <Text style={styles.codeText}>{code}</Text>
                </View>
            ))}
        </View>
        </View>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  frameFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  eCatalogue: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "900",
    fontFamily: FontFamily.poppinsBold,
    textAlign: "left",
    color: Color.black,
  },
  text: {
    lineHeight: 26,
    fontWeight: "900",
    fontSize: 20,
    fontFamily: FontFamily.interSemiBold,
    color: Color.darkGrey2,
    
  },
  textWrapper: {
    flexDirection: "row",
    width: 320,
    justifyContent: "center",  // Vertically centers children
    alignItems: "center",      // Horizontally centers children
    width: 320, 
  },
  images1Icon: {
    borderRadius: Border.br_22xl,
    width: 48,
    height: 47,
  },
  promoSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.black,
    fontFamily: FontFamily.interSemiBold,

  },
  codeContainer: {
    backgroundColor: Color.black,
    marginTop: 10,
    width: 200,          // Adjust the width as needed
    height: 60,          // Adjust the height as needed
    justifyContent: 'center',   // To center the text vertically
    alignItems: 'center',       // To center the text horizontally
    borderRadius: 30,
  },
  codeText: {
    color: "#FFC700",
    fontWeight: 'bold',
  },
  magazinGeneral: {
    lineHeight: 14,
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: "700",
    marginTop: 15,
    color: Color.black,
    fontSize: FontSize.size_sm,
  },
  buttonsParent: {
    top: -40,
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
  textTypo1: {
    textAlign: "left",
    color: Color.black,
    top: 9,
    left: 5,
    lineHeight: 18,
    fontWeight: "700",
    fontSize: FontSize.size_sm,
  },
  frameContainer: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_5xs,
    height: 119,
    width: 135,
    shadowOpacity: 0.5,
    left: 15,
    shadowRadius: 4,
    marginRight: 20,  // Add some space to the right side of each item

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "#ddaf0b",  // Gold color
    backgroundColor: Color.pureWhite,
    borderRadius: Border.br_xl,
    justifyContent: "center",
    flexDirection: "row",
  },
  frameView: {
    marginLeft: 16,
    paddingVertical: 0,
    paddingHorizontal: Padding.p_5xs,
    height: 119,
    width: 152,
    shadowOpacity: 1,
    elevation: 0,
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "#ddaf0b",
    backgroundColor: Color.pureWhite,
    borderRadius: Border.br_xl,
    justifyContent: "center",
    flexDirection: "row",
  },
  frameGroup: {
    flexWrap: "wrap",
    marginTop: 18,
    flexDirection: "row",
    width: 320,
  },
  frameWrapper: {
    marginTop: 17,
  },
  eCatalogueParent: {
    position: "absolute",
    top: 140,
    left: 20,
  },
  eCatalogueHome: {
    backgroundColor: Color.background,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default CatalogueMagazin;
