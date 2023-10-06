
import { Color, FontFamily, FontSize, Border, Padding } from "../assets/home7/GlobalStyles";
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native';
import { WIDTH } from '../../utils/Dimension';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const Gifts = ({ item, userPoint}) => {
  const { id, name, quantity, price, } = item;
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation()
  const isAccessible = userPoint >= item.points;
 const handlePress = () => {
    if (isAccessible) {
      navigation.navigate('OneProduct', { data: item, userInfo: { loyaltyPoints: userPoint } });
    }
  };

  return (
    <TouchableOpacity
    onPress={() => navigation.navigate('OneProduct', {data: item, userInfo : {
      loyaltyPoints : userPoint
    }})}      style={styles.gifts}
    >
      <View style={[styles.cemrekArtworksFanta1Parent, styles.iconsParentFlexBox]}>
        <Image
          style={styles.cemrekArtworksFanta1Icon}
          resizeMode="cover"
          source={{ uri: `https://www.catchy.tn/media/product/${item.image.name}` }}
          />
        <View style={styles.frameParent}>
          <View style={styles.textWrapper}>
            <Text style={styles.text} numberOfLines={1}>
              {item.name}
            </Text>
          </View>
          <View style={styles.frameGroup}>
            <View style={[styles.iconsParent, styles.iconsParentFlexBox]}>
              <Image
                style={styles.icons}
                resizeMode="cover"
                source={require("../assets/home7/icons2.png")}
              />
              <Text style={[styles.text1, styles.textTypo]}>{item.price}</Text>
            </View>
            <View style={[styles.iconsGroup, styles.iconsParentFlexBox]}>
              <Image
                style={styles.icons1}
                resizeMode="cover"
                source={require("../assets/home7/icons1.png")}
              />
              <View style={[styles.textContainer, styles.iconsParentFlexBox]}>
              <Text style={[styles.textTypo, quantity < 5 ? {color: 'red'} : {color: 'green'}]} numberOfLines={3}>
                  {item.quantity} Articles Restants
                </Text>
              </View>
            </View>
          </View>
        </View>
        
      </View> 
    </TouchableOpacity>
  );
  
};

const styles = StyleSheet.create({
  iconsParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  textTypo: {
    color: Color.lightGrey2,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "900",
    lineHeight: 16,
    fontSize: 12,
    textAlign: "left",
  },
  cemrekArtworksFanta1Icon: {
    borderRadius: Border.br_3xs,
    width: 91,
    height: 97,
  },
  text: {
    fontSize: FontSize.size_sm,
    lineHeight: 18,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.black1,
    textAlign: "left",
    alignSelf: "stretch",
  },
  textWrapper: {
    alignSelf: "stretch",
  },
  icons: {
    width: 13,
    height: 12,
  },
  text1: {
    marginLeft: 4,
    flexDirection: "row",
  },
  iconsParent: {
    alignSelf: "stretch",
  },
  icons1: {
    width: 12,
    overflow: "hidden",
    height: 12,
  },
  textContainer: {
    width: 155,
    marginLeft: 4,
  },
  iconsGroup: {
    marginTop: 4,
    alignSelf: "stretch",
  },
  frameGroup: {
    marginTop: 8,
    alignSelf: "stretch",
  },
  frameParent: {
    width: 169,
    height: 95,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_5xs,
    marginLeft: 24,
  },
  cemrekArtworksFanta1Parent: {
    width: 284,
    height: 97,
  },
  gifts: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.pureWhite,
    shadowColor: "rgba(38, 38, 38, 0.04)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 40,
    elevation: 40,
    shadowOpacity: 1,
    width: 300,
    height: 117,
    padding: Padding.p_3xs,
    justifyContent: "center",
  },
});

export default Gifts;
