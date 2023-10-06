import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import { StyleSheet, View, ScrollView } from "react-native";
import FontIcon from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import SurveyList from "../screens/SurveyScreen";
import ProductsScreen from "../screens/ProductsScreen";
import GiftListScreen from "../screens/GiftListScreen";
import PromotionScreen from "../screens/PromotionScreen";
import CatalogueMagazin from "../screens/CatalogueMagazin";
import ProfileScreen from "../screens/ProfileScreen";
import CodePromoScreen from "../screens/CodePromoScreen";
import EventScreen from "../screens/EventScreen";
import { CustomDrawer as NewCustomDrawer } from "../components/CustomDrawer";
import HomeScreen from "../screens/HomeScreen";
import LottieView from 'lottie-react-native';
import animat from '../assets/animated/badel.json';
import animata from '../assets/animated/gifts.json';
import animatas from '../assets/animated/magazin.json';
import animatasa from '../assets/animated/prom.json';
export default function DrawerNavigator({ navigation }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const Drawer = createDrawerNavigator();

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <NewCustomDrawer
          {...props}
          onDrawerOpen={handleDrawerOpen}
          onDrawerClose={handleDrawerClose}
        />
      )}
    >
      <Drawer.Screen
        options={{
          title: "Acceuil",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FFF",
          },
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
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
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
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
          title: "Événements",
          drawerIcon: ({ color, size }) => (
            <Ionicons size={size} name="calendar-outline" color={color} />
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
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" color={color} size={size} />
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
          title: "Watch & win",
          drawerIcon: ({ color, size }) => (
            <Icon name="movie" color={color} size={size} />
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
          title: "Mes Codes Promo",
          drawerIcon: ({ color, size }) => (
            <LottieView
            source={animatasa}
            autoPlay
            loop
            style={{ width: 25, height: 25 }}
          />
          ),
        }}
        name="CodePromoScreen"
        component={CodePromoScreen}
      />

      <Drawer.Screen
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FFF",
          },
          title: "Badel poinetek",
          drawerIcon: ({ color, size }) => (
            <LottieView
        source={animat}
        autoPlay
        loop
        style={{ width: 25, height: 25 }}
      />
      
          ),
        }}
        name="Products"
        component={ProductsScreen}
      />
     
   
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  userPointsText: {
    marginRight: 0,
    fontSize: 12, // Adjust the fontSize value as needed
    backgroundColor: "#EF4136",
  },
});
