import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {MediaGallery} from '../screens/MediaGallery';
import {MediaVideo} from '../components/MediaVideo/MediaVideo'

const Stack = createNativeStackNavigator();

export  const  MediaStack = () =>{
  return (
    <Stack.Navigator initialRouteName="gallery">
      <Stack.Screen
        options={{headerMode: 'none', headerShown: false}}
        name="gallery"
        component={MediaGallery}
      />

      <Stack.Screen
        options={{headerMode: 'none', headerShown: true}}
        name="MediaVideo"
        component={MediaVideo}
      />
 
 
    </Stack.Navigator>
  );
}
