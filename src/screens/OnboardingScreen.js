import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Next</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16}}>Done</Text>
  </TouchableOpacity>
);

export const OnboardingScreen = ({setIsFirstLanch}) => {
  const handleDonePress = () => {
    setIsFirstLanch(false);
    AsyncStorage.setItem('alReadyLanched', JSON.stringify('alReadyLanched')); // no need to await for this setItem
  };
  const handleSkipPress = () => {
    setIsFirstLanch(false);
    AsyncStorage.setItem('alReadyLanched', JSON.stringify('alReadyLanched')); // no need to await for this setItem
  };
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => handleSkipPress()}
      onDone={() => handleDonePress()}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: (
            <Image
              source={require('../assets/onbordingWelcome/BIENVENUE.png')}
            />
          ),
          title: 'CATCHY',
          subtitle: 'C\'est vous le gagnant ',
        },
        {
          backgroundColor: '#fdeb93',
          image: (
            <Image
              source={require('../assets/onbordingWelcome/consulter.png')}
            />
          ),
          title: 'DES EVENNEMENTS',
          subtitle: 'Participer, jouer et gagner',
        },

        {
          backgroundColor: '#e9acce',
          image: (
            <Image source={require('../assets/onbordingWelcome/photo.png')} />
          ),
          title: 'PHOTOS ET VIDEOS',
          subtitle: 'Envoyer des photos et des videos et gagner des points de fidélité',
        },
      
        {
          backgroundColor: '#e68541',
          image: (
            <Image source={require('../assets/onbordingWelcome/answer.png')} />
          ),
          title: 'SONDAGES',
          subtitle: 'Repondre a des sondage et gagner des points de fidélité',
        },
        {
          backgroundColor: '#2d98da',
          image: (
            <Image source={require('../assets/onbordingWelcome/photo.png')} />
          ),
          title: 'VIDEOS PUBLICITAIRE',
          subtitle: 'Regarder les  videos et gagner des points de fidélité',
        },
        {
          backgroundColor: '#81ecec',
          image: (
            <Image source={require('../assets/onbordingWelcome/cadeaux.png')} />
          ),
          title: 'CADEAUX',
          subtitle: 'Achter des cadeaux avec vos points de fidélité',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
