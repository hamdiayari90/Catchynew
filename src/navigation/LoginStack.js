import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import SMSHelper from '../screens/SMSHelper';
import VerifyPassword from '../screens/VerifyPassword';
import NewPassword from '../screens/NewPassword';
import ConfirmUser from '../screens/ConfirmUser';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
// import Splash from '../screens/Splash';
import OnBoarding from '../screens/OnBoarding';
import OnboardingECatalogue from '../screens/OnboardingECatalogue';
import OnboardingEvents from '../screens/OnboardingEvents';
import Inscription from '../screens/Inscription';
import Step1Profile from '../screens/Step1Profile';
import Step2Adresse from '../screens/Step2Adresse';
import Step3Preferences from '../screens/Step3Preferences';
import Forgot1 from '../screens/Forgot1';
import Forgot2 from '../screens/Forgot2';
import Forgot3 from '../screens/Forgot3';
import Policy from '../screens/Policy';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();


export default function LoginStack() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track if AsyncStorage is being checked


  useEffect(() => {
    // Fetch the flag from AsyncStorage
    AsyncStorage.getItem('hasAppBeenOpenedBefore')
      .then(value => {
        if (value === null) {
          // App hasn't been opened before, so set the initial route to Policy
          setInitialRoute('Policy');
        } else {
          setInitialRoute('Login');
        }
      })
      .finally(() => {
        setIsLoading(false); // Mark as done checking AsyncStorage
      });
  }, []);

  if (isLoading) {
    // While the app is checking AsyncStorage, return a loading state or null
    return null;
  }
  return (
    <NavigationContainer ref={navigationRef} onReady={() => {
      if (initialRoute === 'Policy') {
        // Mark that the app has been opened before after it's rendered
        AsyncStorage.setItem('hasAppBeenOpenedBefore', 'true');
      }
    }}>
      <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
          options={{headerMode: 'none', headerShown: false}}
          name="Policy"
          component={Policy}
        />
      <Stack.Screen 
          name="OnboardingEvents"
          options={{
            headerShown: false
          }}
          component={OnboardingEvents}
        />
        <Stack.Screen 
          name="OnboardingECatalogue"
          options={{
            headerShown: false
          }}
          component={OnboardingECatalogue}
        />
<Stack.Screen 
          name="OnBoarding"
          options={{
            headerShown: false
          }}
          component={OnBoarding}
        />
        <Stack.Screen
          options={{headerMode: 'none', headerShown: false}}
          name="Login"
          component={Login}
        />

        <Stack.Screen
          options={{headerMode: 'none', headerShown: false, title: ''}}
          name="SignupScreen"
          component={SignupScreen}
        />
        <Stack.Screen
          options={{headerMode: 'none', headerShown: false, title: ''}}
          name="Inscription"
          component={Inscription}
        />
        <Stack.Screen
          options={{headerMode: 'none', headerShown: false, title: ''}}
          name="Step1"
          component={Step1Profile}
        />
         <Stack.Screen
          options={{headerMode: 'none', headerShown: false, title: ''}}
          name="Step2"
          component={Step2Adresse}
        />
         <Stack.Screen
          options={{headerMode: 'none', headerShown: false, title: ''}}
          name="Step3"
          component={Step3Preferences}
        />
        <Stack.Screen
          options={{headerMode: 'none', headerShown: false}}
          name="SMSHelper"
          component={SMSHelper}
        />
     
        <Stack.Screen
          options={{headerMode: 'none', headerShown: false}}
          
          name="VerifyCode"
          component={VerifyPassword}
        />
          <Stack.Screen
          options={{headerMode: 'none', headerShown: false, title: ''}}
          name="Forgot1"
          component={Forgot1}
        />
         <Stack.Screen
          options={{headerMode: 'none', headerShown: false, title: ''}}
          name="Forgot2"
          component={Forgot2}
        />
         <Stack.Screen
          options={{headerMode: 'none', headerShown: false, title: ''}}
          name="Forgot3"
          component={Forgot3}
        />
        <Stack.Screen
          options={{headerMode: 'none', headerShown: false}}
          name="NewPassword"
          component={NewPassword}
        />
        <Stack.Screen
          options={{headerMode: 'none', headerShown: false}}
          name="ConfirmUser"
          component={ConfirmUser}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
