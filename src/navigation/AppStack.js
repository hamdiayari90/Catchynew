import React, {useState, useEffect} from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginStack from './LoginStack';
import DrawerNavigator from './DrawerNavigator';
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

export default function AppStack({}) {
  const [backNotif, setBackNotif] = useState({});
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useRecoilState(userToken);
  const [isSignedIn, setIsSignedIn] = useRecoilState(verifyIsSignedIn);

  useEffect(() => {
    AsyncStorage.getItem('profile').then(result => {
      if (result !== null) {
        setToken(JSON.parse(result));
        setIsSignedIn(() => true);
      }
      setLoading(false);
    });
  });

  return (
    !loading && (
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
            <Stack.Navigator
              initialRouteName="Acceuil"
              screenOptions={{headerMode: 'none', headerShown: false}}>
              
              {/* <Stack.Screen 
                name="SplashScreen"
                options={{
                  headerShown: false,
                }}
                component={Splash}
              /> */}
              
              <Stack.Screen
                name="Acceuil"
                options={{}}
                component={DrawerNavigator}
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
                name="RespondSurvey"
                options={{
                  headerTitleStyle: {color: 'white'},
                }}
                component={SurveyById}
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
                name="Video"
                options={{
                  headerTitleStyle: {color: 'white'},
                }}
                component={Video}
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
                name="Profil"
                component={ProfileScreen}
              />
              <Stack.Screen
                name="Event"
                options={{
                  headerShown: true,

                  headerTitleStyle: {color: 'white'},
                }}
                component={Event}
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
                options={{
                  headerTitleStyle: {color: 'white'},
                }}
                component={EventScreen}
              />
              <Stack.Screen
                name="ProductCompoent"
                component={Product}
                options={{headerShown: false}}
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
                options={{
                  headerShown: true,
                  headerStyle: {},
                  headerTitleStyle: {color: 'white'},
                  presentation: 'modal',
                }}
                name="OneProduct"
                component={OneProduct}
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
          </NavigationContainer>
        ) : (
          <LoginStack />
        )}
      </>
    )
  );
}
