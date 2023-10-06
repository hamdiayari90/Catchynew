import React, {useState, useEffect} from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginStack from './LoginStack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PromotionScreen from '../screens/PromotionScreen';

import {navigationRef, navigate} from '../services/RootNavigation';
import AnswerSurveyScreen from '../screens/AnswerSurveyScreen';
import RespondSurveyScreen from '../screens/RespondSurveyScreen';
import {SurveyById} from '../screens/SurveyResponse/SurveyById';
import SurveyList from '../screens/SurveyScreen';
import DetailsSondage from '../screens/DetailsSondage';
import Video from '../screens/Video';
import MediaForm from '../screens/MediaForm';
import Event from '../components/Event';
import BuyModal from '../components/BuyModal';
import EventScreen from '../screens/EventScreen';
import EventerScreen from '../screens/EventerScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import OnboardingECatalogue from '../screens/OnboardingECatalogue';

import CatalogueMagazin from '../screens/CatalogueMagazin';
import {Product} from '../components/Card/Product';
import {MediaVideo} from '../components/MediaVideo/MediaVideo';
import {MediaStack} from '../navigation/MediaStack';
import {Color} from '../constants/colors/color';
import {Left} from '../components/backBtn/Left';
const Stack = createNativeStackNavigator();
import {SliderEntry} from '../components/CadeauxCarousel/components/SliderEntry';
import {OneProduct} from '../screens/OneProduct';
import {UpdateCin} from '../screens/UpdateCin';
import {userToken, verifyIsSignedIn} from '../atom/auth';
import {useRecoilState} from 'recoil';
import {Setting} from '../screens/Setting';
import linking from '../navigation/Linking';
import {EventById} from '../screens/EventById';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Splash from '../screens/Splash';
import GameScreen from '../screens/GameScreen';
import FilterScreen from '../screens/FilterScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainNavigator from './MainNavigator';
import BottomNavigation from '../components/BottomNavigation';
import { createStackNavigator } from '@react-navigation/stack';

export default function AppStack({}) {
  const [backNotif, setBackNotif] = useState({});
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useRecoilState(userToken);
  const [isSignedIn, setIsSignedIn] = useRecoilState(verifyIsSignedIn);
  const Tab = createBottomTabNavigator();
  useEffect(() => {
    AsyncStorage.getItem('profile').then(result => {
      if (result !== null) {
        setToken(JSON.parse(result));
        setIsSignedIn(() => true);
      }
      setLoading(false);
    });
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

const handleDrawerToggle = () => {
  setIsDrawerOpen(!isDrawerOpen);
};
const openFilterMenu = () => {
  navigation.navigate('MainStackNavigator', { screen: 'FilterScreen' });
};
const openOnBoarding1 = () => {
  navigation.navigate('MainStackNavigator', { screen: 'OnboardingECatalogue' });
};
const getActiveRouteName = (state) => {
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }
  console.log("Current route name:", route.name);  // Add this
  return route.name;
};

return (
  <>
    {isSignedIn ? (
      <NavigationContainer


        ref={navigationRef}
        linking={linking}
        fallback={
          
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>

              <ActivityIndicator size="large" color={Color.secondary} />
            </View>
          }>
            
            <Tab.Navigator
  tabBar={(props) => (
    <BottomNavigation 
      key={getActiveRouteName(props.state)}
      {...props} 
      currentRouteName={getActiveRouteName(props.state)} 
    />
  )}
>

          <Tab.Screen
            name="Home"
            options={{
              headerShown: false,
            }}
            component={MainNavigator}
          />  
                
        </Tab.Navigator>
      </NavigationContainer>
    ) : (
      <LoginStack />
    )}
  </>
);}