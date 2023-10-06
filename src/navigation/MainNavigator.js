import React, {useState, useEffect} from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginStack from './LoginStack';
import DrawerNavigator from './DrawerNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PromotionScreen from '../screens/PromotionScreen';
import SurveyScreen from '../screens/SurveyScreen';
import EventerScreen from '../screens/EventerScreen';
import PolitiqueScreen from '../screens/PolitiqueScreen';
import ResultScreen from '../screens/ResultScreen';
import CodePromoScreen from '../screens/CodePromoScreen';
import {navigationRef, navigate} from '../services/RootNavigation';
import AnswerSurveyScreen from '../screens/AnswerSurveyScreen';
import RespondSurveyScreen from '../screens/RespondSurveyScreen';
import {SurveyById} from '../screens/SurveyResponse/SurveyById';
import SurveyList from '../screens/SurveyScreen';
import VideoReel from '../screens/VideoReel';
import Rewards from '../screens/Rewards';
import GiftListScreen from '../screens/GiftListScreen';
import CadeauxScreen from '../screens/CadeauxScreen';
import Game2 from '../screens/Game2';
import RechargeMobile from '../screens/RechargeMobile';
import RechargeArgent from '../screens/RechargeArgent';

import DetailsSondage from '../screens/DetailsSondage';
import Video from '../screens/Video';
import MediaForm from '../screens/MediaForm';
import Event from '../components/Event';
import BuyModal from '../components/BuyModal';
import EventScreen from '../screens/EventScreen';
import Survey from '../screens/Survey';
import OnboardingECatalogue from '../screens/OnboardingECatalogue';
import OnboardingEvents from '../screens/OnboardingEvents';
import Faq from '../screens/Faq';

import ProductsScreen from '../screens/ProductsScreen';
import ProfileScreen from '../screens/ProfileScreen';
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
import NotificationsScreen from '../screens/NotificationsScreen';
import OnBoarding from '../screens/OnBoarding';
import ChangeAddress from '../screens/ChangeAddress';
import ProfileHome from '../screens/ProfileHome';
import Contact from '../screens/Contact';
import Fortune from '../screens/Fortune';
import EcatalogueMagazin from '../screens/CatalogueMagazin';
import Home from '../screens/HomeScreen';
import FilterScreen from '../screens/FilterScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



export default function MainNavigator({navigation}) {
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
    const getActiveRouteName = (state) => {
      const route = state.routes[state.index];
      if (route.state) {
        // Dive into nested navigators
        return getActiveRouteName(route.state);
      }
      return route.name;
    };
  
    return (
<Stack.Navigator
              initialRouteName="Home"
              screenOptions={{headerMode: 'none', headerShown: false}}>
              

              <Stack.Screen
                name="Home"
                options={{}}
                component={Home}
              />
              
              <Stack.Screen
                name="Survey"
                options={{
                  headerTitleStyle: {color: 'white'},
                }}
                component={SurveyList}
              />
              <Stack.Screen
                name="AnswerSurvey"
                options={{
                  headerTitleStyle: {color: 'white'},
                }}
                component={AnswerSurveyScreen}
              />
                <Stack.Screen
                name="NotificationsScreen"
                options={{
                  headerTitleStyle: {color: 'white'},
                }}
                component={NotificationsScreen}
              />
               <Stack.Screen
                name="Faq"
                component={Faq}
              />
              <Stack.Screen
                name="RechargeMobile"
                component={RechargeMobile}
              />
              <Stack.Screen
                name="RespondSurvey"
                options={{
                  headerTitleStyle: {color: 'white'},
                }}
                component={SurveyById}
              />
               <Stack.Screen
                name="OnboardingEvents"
                options={{
                  headerTitleStyle: {color: 'white'},
                }}
                component={OnboardingEvents}
              />
               <Stack.Screen
                name="ChangeAddress"
                component={ChangeAddress}
              />
                <Stack.Screen
                name="Gifta"
                component={GiftListScreen}
              />
               <Stack.Screen
                name="RechargeArgent"
                component={RechargeArgent}
              />
                <Stack.Screen
                name="Contact"
                component={Contact}
              />
               <Stack.Screen
                name="Game2"
                component={Game2}
              />
              <Stack.Screen
                name="VideoReel"
                component={VideoReel}
              />
             
              <Stack.Screen
                name="DetailsSondage"
                options={{
                  // headerShown: true,
                  // headerStyle: {
                  //   backgroundColor: Color.light,
                  // },
                  headerTitle: 'Détails Sondage',
                  headerTitleStyle: {color: 'white'},
                }}
                component={DetailsSondage}
              />
              <Stack.Screen
                name="Promotion"
                options={{
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: Color.light,
                  },
                  headerTitle: 'Détails Sondage',
                  headerTitleStyle: {color: 'white'},
                }}
                component={PromotionScreen}
              />
              
              <Stack.Screen
                name="Game"
                options={{
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: Color.light,
                  },
                  headerTitle: 'Détails Sondage',
                  headerTitleStyle: {color: 'white'},
                }}
                component={GameScreen}
              />    
               <Stack.Screen
                name="Sondager"
                options={{
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: Color.light,
                  },
                  headerTitle: 'Détails Sondage',
                  headerTitleStyle: {color: 'white'},
                }}
                component={SurveyScreen}
              />
                <Stack.Screen
                name="EventerScreen"
                options={{
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: Color.light,
                  },
                  headerTitle: 'Liste des évennement',
                  headerTitleStyle: {color: 'white'},
                }}
                component={EventerScreen}
              />
               <Stack.Screen
                name="Filter"
                options={{
                  headerShown: false,
                  headerStyle: {
                    backgroundColor: Color.light,
                  },
                  headerTitle: 'Filtre',
                  headerTitleStyle: {color: 'white'},
                }}
                component={FilterScreen}
              />
              <Stack.Screen
                name="Video"
                options={{
                  headerTitleStyle: {color: 'white'},
                }}
                component={Video}
              />
              <Stack.Screen
                name="PolitiqueScreen"
                options={{
                  headerTitleStyle: {color: 'white'},
                }}
                component={PolitiqueScreen}
              />
              <Stack.Screen
                options={{
                  // headerShown: true,
                  // headerStyle: {
                  //   backgroundColor: Color.light,
                  // },
                  headerTitleStyle: {color: Color.light, textAlign: 'center'},
                }}
                name="MediaForm"
                component={MediaForm}
              />
              <Stack.Screen
                options={{
                  headerShown: false,

                  headerTitleStyle: {color: 'white'},
                }}
                name="Profile"
                component={ProfileScreen}
              />
              <Stack.Screen
                name="Event"
                component={Event}
                options={{
                  headerLeft: null
              }}
              />
              <Stack.Screen
                name="Rewards"
                component={Rewards}
              />
               <Stack.Screen
                name="Fortune"
                component={Fortune}
              />
                <Stack.Screen
                name="Ecata"
                component={EcatalogueMagazin}
              />
              <Stack.Screen
                name="Cadeaux"
                component={CadeauxScreen}
              />
              <Stack.Screen
                options={{
                  // headerShown: true,
                  // headerStyle: {
                  // },
                  headerTitleStyle: {color: 'white'},
                }}
                name="Catalogue"
                component={ProductsScreen}
              />

              <Stack.Screen
                name="contact"
                options={{
                  headerTitleStyle: {color: 'white'},
                  // headerShown: true,
                  presentation: 'modal',
                }}
                component={BuyModal}
              />
              <Stack.Screen
                name="EventScreen"
                component={EventScreen}
              />
              <Stack.Screen
                name="ProductCompoent"
                component={Product}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ResultScreen"
                component={ResultScreen}
                options={{headerShown: false}}
              />
                <Stack.Screen
                name="ProfileHome"
                component={ProfileHome}
              />
              <Stack.Screen
                name="gallery"
                component={MediaStack}
                options={{headerShown: true}}
              />
              <Stack.Screen
                options={{
                  headerShown: true,

                  headerTitleStyle: {color: 'white'},
                }}
                name="SliderEntryCadeaux"
                component={SliderEntry}
              />
              <Stack.Screen
                name="OneProduct"
                component={OneProduct}
              />
               <Stack.Screen
                options={{
                  headerShown: true,
                  headerStyle: {},
                  headerTitleStyle: {color: 'white'},
                  presentation: 'modal',
                }}
                name="CodePromoScreen"
                component={CodePromoScreen}
              />
              
              
              <Stack.Screen
                name="EventId"
                component={EventById}
                options={{
                  headerTitle: 'Event',
                  headerTitleStyle: {color: 'white'},
                  // headerStyle: {backgroundColor: 'blue'},
                  headerShown: true,
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigate('Acceuil')}>
                      {/* <Icon */}
                      <Ionicons name="arrow-back" color="#000" size={22} />
                    </TouchableOpacity>
                  ),
                }}
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                  headerStyle: {},
                  // headerTitleStyle: {color: 'white'},
                  title: 'Notifications',
                }}
                name="Setting"
                component={Setting}
              />
            </Stack.Navigator>
            
  );
}