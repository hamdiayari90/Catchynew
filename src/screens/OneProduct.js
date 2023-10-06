import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, View, Text, Modal, TouchableOpacity, Pressable} from "react-native";
import { Color, FontFamily, Padding, Border, FontSize } from "../assets/product/GlobalStyles";
import { DarkModeProvider, DarkModeContext } from '../../DarkModeContext';

import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
export const OneProduct = ({ navigation, ...props }) => {


  const buyGifts = (price, id) => {
    AsyncStorage.getItem('profile').then((result) => {
      if (result !== null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);

        const data = {
          userID: token.id,
          points: price,
          productId: id,
          contactTel: null,
        };
        navigation.navigate('contact', { data: { data } });
      }
    });
  };
  const [modalVisible, setModalVisible] = useState(false);

  const openModalConfirm = async (price, id) => {
    if (price < loyaltyPoints) {
      setModalVisible(() => true);
      console.log('Modal is set to open');

    }
  };
  const { isDarkMode } = React.useContext(DarkModeContext);

  const { loyaltyPoints } = props.route.params.userInfo;

  const {
    id,
    name,
    price,
    quantity,
    description,
    image,
  } = props.route.params.data;

  return (
    <>
   <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
        setModalVisible(() => false);
        console.log('Modal is set to close');

    }}
>
    <View style={styles.bottomModalContainer}>
        <View style={styles.modalView}>
            <Text style={styles.modalText1}>Veuillez confirmer votre achat</Text>
            <Text style={styles.modalText}>
                Le prix du produit sera déduit de votre solde de points de fidélité
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '100%',
                }}
            >
                <Pressable
                    style={[styles.button, styles.buttonClose, styles.goldButton]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>Annuler</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.buttonClose, styles.goldButton]}
                    onPress={() => buyGifts(price, id)}
                >
                    <Text style={styles.textStyle}>Confirmer</Text>
                </Pressable>
            </View>
        </View>
    </View>
</Modal>
    <View style={[styles.oneprod, { backgroundColor: isDarkMode ? "#323232" : "#FAFAFA" }]}>
     <MenuHeaders />
      <View style={[styles.buttonsParent, styles.frameParentPosition]}>
        <View style={[styles.buttons, styles.icons3Layout]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.icons}
            resizeMode="cover"
            source={require("../assets/product/icons46.png")}
          />
              </TouchableOpacity>
        </View>
        
       
      <Text style={[styles.text, styles.textTypo, isDarkMode ? { color: '#FFFFFF' } : {}
]}>Retour</Text>
          </View>

      <View style={[styles.frameParent, styles.frameParentPosition]}>
        <View style={styles.textParent}>
        {loyaltyPoints < price ? <Text style={styles.text1}>Vous n’avez pas assez de points !</Text> : null}
          <Text style={[styles.text2, styles.textTypo, isDarkMode ? { color: '#FFFFFF' } : {}
]}>{name}</Text>
          <View style={styles.frameGroup}>
            <View style={styles.iconsParent}>
              <Image
                style={styles.icons1}
                resizeMode="cover"
                source={require("../assets/product/icons51.png")}
              />
              <Text style={styles.text3}>{price} Points</Text>
            </View>
            <View style={styles.iconsGroup}>
              <Image
                style={styles.icons2}
                resizeMode="cover"
                source={require("../assets/product/icons52.png")}
              />
              <View style={[styles.textWrapper, styles.textWrapperFlexBox]}>
              <Text style={[styles.text4, quantity < 5 ? {color: 'red'} : {color: 'green'}]}>{quantity} Articles Restants</Text>
              </View>
            </View>
          </View>
          <View style={styles.frameWrapper}>
            <View style={styles.frameContainer}>
              <View>
                <View>
                  <Text style={styles.text5}>
                  {description}
                  </Text>
                </View>
                
              </View>
              </View>

          </View>
        </View>
        <TouchableOpacity 
    style={[styles.buttons2, (price > loyaltyPoints) ? styles.disabledButton : {}]} 
    onPress={() => {
      console.log("Button pressed");
      openModalConfirm(price, id);
  }}
>
    <Text style={styles.text8}>Acheter</Text>
</TouchableOpacity>


      </View>
      
      <Image
        style={styles.screenshot20230913At209}
        resizeMode="cover"
        source={{ uri: `https://www.catchy.tn/media/product/${image.name}` }}
        />
            </View>
            </>
  );
};

const styles = StyleSheet.create({
  frameParentPosition: {
    left: 20,
    position: "absolute",
  },
  
  icons3Layout: {
    width: 32,
    height: 32,
  },
  textTypo: {
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  textWrapperFlexBox: {
    width: 55,
    alignItems: "center",
    flexDirection: "row",
  },
  parentFlexBox: {
    height: 42,
    alignItems: "center",
    flexDirection: "row",
  },
  goldButton: {
    backgroundColor: '#FFD700', // Gold color
    borderRadius: 10,           // Rounded edges for a more modern look
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,               // Gives a slight shadow for depth
},
bottomModalContainer: {
  flex: 1,                  // Take up the full screen space
  justifyContent: 'flex-end',  // Align child content to the bottom
  marginBottom: 7,           // Optional: Add some margin at the bottom if needed
  backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
},
modalView: {
  padding: 20,
  borderRadius: 15,
  backgroundColor: '#FFF',    // Background color for the modal
  width: '100%',               // Take full width of the screen
},
buttonClose: {
    margin: 5,
},

  text7Typo: {
    fontFamily: FontFamily.buttonText,
    fontSize: 20,
    fontWeight: "500",
    textAlign: "left",
  },
  buttonsFlexBox: {
    paddingVertical: Padding.p_2xs,
    paddingHorizontal: Padding.p_17xl,
    zIndex: 1,
    width: 42,
    borderRadius: Border.br_241xl,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  labelSpaceBlock: {
    marginLeft: 9,
    display: "none",
  },
  oneprodInnerPosition: {
    top: 0,
    position: "absolute",
    flex: 1,

  },
  maskGroupIconPosition: {
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
  },
  frameChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  frTypo: {
    lineHeight: 27,
    marginLeft: 4,
    fontWeight: "600",
    textAlign: "left",
    color: Color.black,
  },
  icons: {
    width: 19,
    height: 19,
  },
  buttons: {
    borderRadius: Border.br_13xl,
    paddingHorizontal: 13,
    paddingVertical: 10,
    height: 32,
    backgroundColor: Color.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    lineHeight: 18,
    marginLeft: 8,
    fontSize: FontSize.buttonText_size,
    flex: 1,
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
  },
  buttonsParent: {
    top: 98,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: 320,
  },
  text1: {
    width: 278,
    color: Color.error,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "left",
    fontSize: FontSize.buttonText_size,
    
  },
  modalText1: {
    width: 278,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "900",
    lineHeight: 24,
    textAlign: "center",
    fontSize: FontSize.buttonText_size,
    
  },
  modalText: {
    width: 278,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "700",
    lineHeight: 24,
    textAlign: "left",
    fontSize: FontSize.buttonText_size,
    
  },
  text2: {
    fontSize: FontSize.size_xl,
    lineHeight: 32,
    marginTop: 12,
  },
  icons1: {
    width: 25,
    height: 24,
  },
  text3: {
    marginLeft: 4,
    color: Color.lightGrey2,
    fontFamily: FontFamily.interSemiBold,
    lineHeight: 16,
    fontWeight: "600",
    textAlign: "left",
    fontSize: FontSize.buttonText_size,
    flex: 1,
  },
  iconsParent: {
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
  },
  icons2: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
  text4: {
    fontFamily: FontFamily.interSemiBold,
    lineHeight: 16,
    color: Color.error,
    fontWeight: "600",
    textAlign: "left",
    fontSize: FontSize.buttonText_size,
    flexDirection: 'column',
    width: 400,
  },
  textWrapper: {
    marginLeft: 4,
  },
  iconsGroup: {
    marginTop: 8,
    alignSelf: "stretch",
    alignItems: "center",
    flexDirection: "row",
  },
  frameGroup: {
    alignSelf: "stretch",
    marginTop: 12,
  },
  text5: {
    fontSize: FontSize.size_xs,
    lineHeight: 17,
    fontFamily: FontFamily.interMedium,
    width: 307,
    height: 36,
    fontWeight: "500",
    color: Color.lightGrey2,
    textAlign: "left",
  },
  text6: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "left",
    color: Color.black,
    fontSize: FontSize.buttonText_size,
  },
  text7: {
    fontSize: FontSize.header3_size,
    letterSpacing: 0.2,
    color: Color.black2,
    zIndex: 0,
  },
  iconsregularplusLayout: {
    height: 20,
    width: 20,
  },
  label: {
    letterSpacing: 0.4,
    lineHeight: 20,
    color: Color.pureWhite,
    fontFamily: FontFamily.buttonText,
    fontWeight: "500",
    textAlign: "left",
    fontSize: FontSize.buttonText_size,
  },
  iconsregularplus: {
    height: 20,
    width: 20,
  },
  buttons1: {
    top: -4,
    left: -39,
    backgroundColor: Color.lightGrey3,
    zIndex: 1,
    position: "absolute",
  },
  parent: {
    zIndex: 0,
    width: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  roundedButtons2: {
    left: 77,
    zIndex: 1,
    paddingVertical: Padding.p_2xs,
    paddingHorizontal: Padding.p_17xl,
    width: 42,
    borderRadius: Border.br_241xl,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Color.primary,
  },
  counterHorizontal: {
    backgroundColor: Color.pureWhite,
    width: 119,
    marginLeft: 26,
    borderRadius: Border.br_241xl,
    height: 42,
    justifyContent: "center",
  },
  textGroup: {
    marginTop: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  frameContainer: {
    flexDirection: "row",
  },
  frameWrapper: {
    marginTop: 12,
  },
  textParent: {
    width: 400,
  },
  text8: {
    fontFamily: FontFamily.customButton1,
    color: Color.primaryVarient1,
    fontSize: FontSize.customButton1_size,
    lineHeight: 24,
    textAlign: "left",
    fontWeight: "700",
  },
  buttons2: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.black1,
    height: 48,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_xs,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: 320,
  },
  frameParent: {
    top: 300,
  },
  screenshot20230913At209: {
    marginLeft: -47,
    top: 130,
    left: "40%",
    width: 150,
    height: 150,
    position: "absolute",
  },
  subtractIcon: {
    height: 89,
    width: 360,
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
    width: 40,
    height: 40,
    zIndex: 0,
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
  frameItem: {
    width: 30,
    height: 32,
  },
  text9: {
    fontSize: FontSize.customButton1_size,
    fontFamily: FontFamily.poppinsSemiBold,
    lineHeight: 27,
  },
  groupParent: {
    marginLeft: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  frameParent2: {
    width: 116,
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
    backgroundColor: Color.colorGoldenrod_100,
    padding: Padding.p_5xs,
    height: 40,
    justifyContent: "center",
  },
  component3Icon: {
    width: 75,
    height: 51,
    marginLeft: 8,
  },
  frameParent4: {
    width: 131,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  iconsetStructure: {
    left: "0%",
    right: "0%",
    top: "0%",
    width: "100%",
    bottom: "0%",
    height: "100%",
    display: "none",
    maxWidth: "100%",
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
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  subtractParent: {
    bottom: "0%",
    height: "100%",
    left: "0%",
    right: "0%",
    top: "0%",
    position: "absolute",
  },
  icons3: {
    height: 32,
  },
  iconsWrapper: {
    height: 39,
    marginLeft: 14,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  frameParent3: {
    marginLeft: 34,
    alignItems: "center",
    flexDirection: "row",
  },
  frameParent1: {
    top: 25,
    flexDirection: "row",
  },
  oneprodInner: {
    left: 0,
    height: 105,
    width: 360,
  },
  disabledButton: {
    backgroundColor: 'gray',  // or any other color indicating disabled state
    // ... other styling for the disabled button
},
  oneprod: {
    backgroundColor: Color.background,
    height: 800,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default OneProduct;
