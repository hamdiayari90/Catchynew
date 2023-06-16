import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image,} from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { HEIGHT, WIDTH } from "../../../utils/Dimension";
import { Color, Font } from "../../../constants/colors/color";
import { fetchUSerInforamtion } from "../../../services/homePageApi/home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import { alignItemsMap } from "../../ActionButton/react-native-action-button/shared";

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
      <Card.Cover
        source={{ uri: `data:image/png;base64,${picByte}` }}
        style={{ width: "100%", backgroundColor:Color.light}}
        resizeMode="center"
      />
      <View
        style={{
          backgroundColor: Color.light,
          padding: 10,
        }}
      >
        <View styles={{}}>
          <Text
            style={{
              paddingLeft: 0,
              textTransform: "capitalize",
              fontFamily: Font.inter,
              color: '#000000',
              fontSize: 18,
            }}
          >
            {name}
          </Text>
        </View>
        <View style={styles.usersDetailContainer}>
            <Text style={styles.joiningNumber}>{price} points</Text>
            <View>
              <TouchableOpacity
               style={styles.eventJoinButton}
                disabled={price > userInfo.loyaltyPoints}
                onPress={() => {
                  navigation.navigate("OneProduct", {
                    data: props.data,
                    userInfo: userInfo,
                  });
                }}
              >
                <Text
                  style={{
                    color: userInfo.loyaltyPoints < price ? Color.secondary : '#fff',
                    fontSize: 12,
                    textAlign: 'center',
                    fontFamily: Font.primary,
                    height: 28,
                    lineHeight: 25,
                    borderRadius: 8,
                  }}
                >
                  Acheter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  usersDetailContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    columnGap: 5,
    width: '100%',
    alignItems: 'center',
  },
  joiningNumber: {
    fontWeight: '700',
    fontSize: 15,
    display: 'flex',
    alignItems: 'center',
    color: '#3F38DD',
  },
  eventTitle: {
    fontWeight: '700',
    fontSize: 35,
    lineHeight: 59,
    color: '#120D26',
  },
  eventJoinButton: {
    backgroundColor: '#5669FF',
    borderRadius: 7,
    textTransform: 'capitalize',
    height: 28,
    width: 67,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
});

export default SliderEntry;
