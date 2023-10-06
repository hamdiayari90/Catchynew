import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, Dimensions } from "react-native";
import { Card } from "react-native-paper";
import { Color, Font } from "../../../constants/colors/color";
import { fetchUSerInforamtion } from "../../../services/homePageApi/home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import LottieView from 'lottie-react-native';

export const SliderEntry = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const navigation = useNavigation();
  const { even } = props;
  const { name, description, price } = props.data;
  const {
    image: { picByte },
  } = props.data;

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const value = await AsyncStorage.getItem("profile");
      const parsedToken = JSON.parse(value);
      const token = jwt_decode(parsedToken);
      const alluserInfo = await fetchUSerInforamtion(token.id);
      setUserInfo(() => alluserInfo);
    } catch (e) {}
  };

  const windowWidth = Dimensions.get('window').width;
  const imageHeight = (windowWidth - 20) / 2; // Adjust the image height based on your desired layout

  const canBuy = price <= userInfo.loyaltyPoints;

  return (
    <Card
      style={{
        overflow: "hidden",
        shadowColor: "#000",
        borderRadius: 10,
        ...Platform.select({
          ios: {
            shadowColor: '#505588',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.06,
            shadowRadius: 30,
          },
          android: {
            elevation: 8,
          },
        }),
      }}
    >
      <View style={[styles.imageContainer, { height: imageHeight }]}>
        <Image
          source={{ uri: `data:image/png;base64,${picByte}` }}
          style={styles.image}
        />
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{price} points</Text>
        </View>
        <View style={styles.lottieContainer}>
          <LottieView
            source={require('../../../assets/animated/cat.json')}
            autoPlay
            loop
            style={styles.lottieIcon}
          />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity
          style={[styles.buyButton, !canBuy && styles.buyButtonDisabled]}
          disabled={!canBuy}
          onPress={() => {
            navigation.navigate("OneProduct", {
              data: props.data,
              userInfo: userInfo,
            });
          }}
        >
          <Text style={[styles.buyButtonText, !canBuy && styles.buyButtonTextDisabled]}>Acheter</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pointsContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 6,
    borderRadius: 6,
  },
  pointsText: {
    fontSize: 12,
    color: 'yellow',
    fontWeight: 'bold',
  },
  lottieContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
  },
  lottieIcon: {
    width: 200,
    height: 200,
  },
  content: {
    padding: 10,
    backgroundColor: Color.light,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  name: {
    fontFamily: Font.inter,
    fontSize: 18,
    color: '#000000',
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#ffdd00',
    borderRadius: 7,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  buyButtonText: {
    color: 'black',
    fontSize: 12,
    fontFamily: Font.primary,
    textAlign: 'center',
  },
  buyButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  buyButtonTextDisabled: {
    color: '#999999',
  },
});

export default SliderEntry;
