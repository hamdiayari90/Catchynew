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

const Stack = createNativeStackNavigator();


export default function LoginStack() {

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="OnBoarding">

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
