import React, { useState, useEffect } from "react";
import {
  RefreshControl,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  FlatList
} from "react-native";
import { List, ListItem } from "react-native-elements";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { MenuHeaders } from '../components/menuComponent/MenuHeaders';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import linking from '../navigation/Linking';
import { DarkModeProvider, DarkModeContext } from '../../DarkModeContext';

const NotificationsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { isDarkMode } = React.useContext(DarkModeContext);

  useEffect(() => {
    fetchUserData();
  }, [isFocused]);
  const fetchUserData = async () => {
    try {
      const result = await AsyncStorage.getItem('profile');
      if (result !== null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);
        const userId = token.id;
        await fetchNotifications(userId);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert("Error", "Failed to fetch user data.");
    }
  };

  const fetchNotifications = async (userId) => {
    try {
      const response = await fetch(`http://94.237.82.88:8082/notifications/user/${userId}`);
      const data = await response.json();
      const lastFiveNotifications = data.slice(-5);

      setRefreshing(false);
      setNotifications(lastFiveNotifications);
    } catch (error) {
      setRefreshing(false);
      Alert.alert("Error", "Failed to fetch notifications.");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserData();
  };

  const redirectNotif = (data) => {
    switch (data.type) {
      case 'EVENT':
        navigation.navigate('EventScreen');
        break;
      case 'SURVEY':
        navigation.navigate('Sondager');
        break;
      case 'PROMOTION':
        navigation.navigate('Promotion');
        break;
      default:
        navigation.navigate('Home');
        break;
    }
};

  

  const deleteNotification = (notificationId) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== notificationId
    );
    setNotifications(updatedNotifications);
  };
  const deleteNotificationHandler = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
};

const renderNotificationItem = ({ item }) => {
  return (
      <ListItem
          key={item.id}
          containerStyle={styles.listItemContainer}
          onPress={() => redirectNotif(item)}
      >
          <ListItem.Content style={styles.listItemContent}>
              <ListItem.Title style={[styles.listItemTitle, styles.listItemTitleBlack, isDarkMode ? { color: '#FFFFFF' } : {}
]}>
                  {item.title}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.listItemSubtitle}>
                  {item.body}
              </ListItem.Subtitle>
          </ListItem.Content>
          <TouchableOpacity
              style={[styles.deleteButton, styles.deleteButtonBlack]} // Consider renaming these styles to be more general
              onPress={() => redirectNotif(item)} // Using redirectNotif when button is pressed
          >
              <Text style={[styles.deleteButtonText, styles.deleteButtonTextGold]}>
                  Consulter
              </Text>
          </TouchableOpacity>
      </ListItem>
  );
};



  return (
    
<SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? "#323232" : "#FFFFFF" }]}>
       <View style={{ height: HEIGHT / 5.8 }}>
          <MenuHeaders navigation={navigation} title="Notification" />
        </View>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}> 
    <View style={[styles.buttonsParent, styles.buttonsFlexBox]}>
      <View style={[styles.buttons, styles.buttonsFlexBox]}>
        <Image
          style={styles.icons}
          resizeMode="cover"
          source={require("../assets/home9/icons18.png")}
        />
      </View>
      <Text style={[styles.text, styles.textTypo1,isDarkMode ? { color: '#FFFFFF' } : {}
]}>Retour</Text>
    </View>
</TouchableOpacity>
<View style={{ height: 30 }} />

        <TouchableOpacity onPress={() => navigation.goBack()}>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#662D91",
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: "#000000",
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 1,
  
  },
  listItemContainer: {
    backgroundColor: "transparent",
    marginVertical: 1,
},
textTypo1: {
  textAlign: "left",
  top: 9,
  left: 5,
  lineHeight: 18,
  fontWeight: "700",
  fontSize: 12,
},
  buttonsParent: {
    top: -20,
    flexDirection: "row",
    justifyContent: "center",
    left: -9,
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
  listItemContent: {
  },
  listItemTitle: {
    fontSize: 15, // Decreasing from 16 to 15
    fontWeight: "bold",
    color: "#662D91",
},
listItemSubtitle: {
  color: "darkgray",  // Changing the color to darkgray
  marginTop: 5,
  fontSize: 13,  // Decreasing font size
},
  deleteButton: {
    backgroundColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  listItemTitleBlack: {
    color: 'black',
},
deleteButtonBlack: {
    backgroundColor: 'black',
},
deleteButtonTextGold: {
    color: 'gold',
},

});

export default NotificationsScreen;
