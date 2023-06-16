import React, { useState, useEffect } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Alert
} from "react-native";
import { List, ListItem } from "react-native-elements";
import * as api from "../services/api";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeHeader from "../components/HomeHeader";
import { useIsFocused } from "@react-navigation/native";

export default function NotificationsScreen({ navigation }) {
  //const notification = props.navigation.getParam('notif')

  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  const getNotification = () => {
    setRefreshing(true);
    AsyncStorage.getItem("profile").then((result) => {
      if (result !== null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);

        api

          .getNotifications({ id: token.id, token: parsedToken })
          .then((response) => {
            setNotifications(response.data);
            setRefreshing(false);
          })
          .catch((error) => Alert.alert("veuillez contacter l'administrateur"));
      }
    });
  };
  useEffect(() => {
    if (isFocused) {
      getNotification();
    }
  }, [isFocused]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNotification();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!refreshing &&
          notifications.map((item, i) => (
            <ListItem
              key={i}
              bottomDivider
              containerStyle={{ backgroundColor: "#662D91" }}
            >
              <ListItem.Content style={{ backgroundColor: "#662D91" }}>
                <ListItem.Title
                  style={{ backgroundColor: "#662D91", color: "white" }}
                >
                  {item.title}
                </ListItem.Title>
                <ListItem.Subtitle
                  style={{ backgroundColor: "#662D91", color: "white" }}
                >
                  {" "}
                  {item.body}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron style={{ backgroundColor: "#662D91" }} />
            </ListItem>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#662D91",
  },
});
