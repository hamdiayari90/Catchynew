import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import { StyleSheet } from "react-native";
import FontIcon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import SurveyList from "../screens/SurveyScreen";
import ProductsScreen from "../screens/ProductsScreen";
import GiftListScreen from "../screens/GiftListScreen";
import PromotionScreen from "../screens/PromotionScreen";
import MediaGallery from "../screens/MediaGallery";
import ProfileScreen from "../screens/ProfileScreen";
import EventScreen from "../screens/EventScreen";
import { CustomDrawer as NewCustomDrawer } from "../components/CustomDrawer";
import HomeScreen from "../screens/HomeScreen";

export default function DrawerNavigator({ navigation }) {


  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={(props) => <NewCustomDrawer {...props} />}>
      <Drawer.Screen
        options={{
          title : "Acceuil",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FFF",
          },
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={22} />
          ),
        }}
        name="Home"
        
        component={HomeScreen}
        
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FFF",
          },

          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" color={color} size={22} />
          ),
        }}
        name="Profil"
        component={ProfileScreen}
      />

      <Drawer.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FFF",
          },
          title:"Événements",
          drawerIcon: ({ color }) => (
            <Ionicons size={22} name="calendar-outline" color={color} />
          ),
        }}
        name="event"
        component={EventScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FFF",
          },
          drawerIcon: ({ color }) => (
            <Ionicons name="bar-chart-outline" color={color} size={22} />
          ),
        }}
        name="Sondages"
        component={SurveyList}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FFF",
          },
          title:"Promotions",
          drawerIcon: ({ color }) => (
            <Icon name="movie" color={color} size={22} />
          ),
        }}
        name="Promotions"
        component={PromotionScreen}
      />

      <Drawer.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FFF",
          },
          title:"Catalogue",
          drawerIcon: ({ color }) => (
            <Icon name="local-grocery-store" color={color} size={22} />
          ),
        }}
        name="Products"
        component={ProductsScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FFF",
          },
          title:"Cadeaux",
          drawerIcon: ({ color }) => (
            <Ionicons size={22} name="gift-outline" color={color} />
          ),
        }}
        name="Gifts"
        component={GiftListScreen}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FFF",
          },
          title:"Galerie",
          drawerIcon: ({ color }) => (
            <FontIcon size={22} name="photo-video" color={color} />
          ),
        }}
        name="gallery"
        component={MediaGallery}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  userPointsText: {
    marginRight: 0,
    fontSize: 5,
    backgroundColor: "#EF4136",
  },
});
