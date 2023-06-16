import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Image, Text, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnBoarding ({navigation}) {

  useEffect(() => {
    async function isAlreadyLaunched(){
      let alReadyLanched = await AsyncStorage.getItem('alReadyLanched');
      alReadyLanched = alReadyLanched != null ? JSON.parse(alReadyLanched) : null
      if(alReadyLanched == 'alReadyLanched'){
        navigation.navigate('Login');
      }
    }
    isAlreadyLaunched();
  }, []);

  const [currentStep, setCurrentStep,] = useState(0);
  const steps = [
    { title: 'Découvrez les événements à venir et à proximité', description: 'découvrez et gagnez des points de récompenses convertibles' },
    { title: 'Suivez vos évènementsur la calendrier ', description: 'Ne jamais rater vos évènements à venir' },
    { title: "Rechercher plus d'événements à proximité par carte", description: "rechercher plus d'événements ou d'activités à proximité par carte" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    else{
      AsyncStorage.setItem('alReadyLanched', JSON.stringify('alReadyLanched'));
      navigation.navigate('Login');
    }
  };

  const handlePrevious = () => {
    // if (currentStep > 0) {
    //   setCurrentStep(currentStep - 1);
    // }
    AsyncStorage.setItem('alReadyLanched', JSON.stringify('alReadyLanched'));
    navigation.navigate('Login');
  };
  const isStep2Active = currentStep === 1;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {currentStep === 0 && (
        <View style={styles.stepsCount}>
          <View style={styles.onBoardingBanner}>
            <Image source={require('../assets/design/onboarding1.jpg')} style={styles.bannerImageStyle} />
          </View>
        </View>
      )}
      {currentStep === 1 && (
        <View style={styles.stepsCount}>
        <View style={styles.onBoardingBanner}>
          <Image source={require('../assets/design/onboarding2.jpg')} style={styles.bannerImageStyle} />
        </View>
      </View>
      )}
      {currentStep === 2 && (
        <View style={styles.stepsCount}>
        <View style={styles.onBoardingBanner}>
          <Image source={require('../assets/design/onboarding3.jpg')} style={styles.bannerImageStyle} />
        </View>
      </View>
      )}
      <View style={[styles.boardingStepChange, isStep2Active && styles.activeStepTwo]}>
        <View style={styles.boardingStepChangeContainer}>
          <Text style={styles.boardingSlidesHeading}>{steps[currentStep].title}</Text>
          <Text style={styles.boardingSlidesDesc}>{steps[currentStep].description}</Text>
          <View style={styles.stepsButtons}>
            <TouchableOpacity
              style={styles.stepsControlButton}
              onPress={handlePrevious}
            >
              <Text style={styles.stepsControlButtonText}>Ignorer</Text>
            </TouchableOpacity>
            <View style={styles.dotsContainer}>
              <View style={[styles.dots, { opacity: currentStep=== 0 ? 1 : 0.2 }]}></View>
              <View style={[styles.dots, { opacity: currentStep=== 1 ? 1 : 0.2 }]}></View>
              <View style={[styles.dots, { opacity: currentStep=== 2 ? 1 : 0.2 }]}></View>
            </View>
            <TouchableOpacity
              style={styles.stepsControlButton}
              onPress={handleNext}
            >
              <Text style={styles.stepsControlButtonText}>Suivant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  onBoardingBanner: {
    width: "100%",
    flex: 1,
  },
  bannerImageStyle:{
    width: "100%",
    aspectRatio: 1,
    height: "100%",
    maxHeight: 480,
    aspectRatio: 'auto',
    resizeMode: 'cover'
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  activeStepTwo: {
    backgroundColor: '#F2583E',
  },
  boardingStepChangeContainer: {
    width: "100%",
    flex: 1,
    position: "relative",
  },
  stepsButtons: {
    flexDirection: 'row',
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingTop: 20
  },
  stepsControlButtonText: {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 34,
    color: '#FFFFFF',
  },
  stepsCount: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: "row",
    columnGap: 10
  },
  dots: {
    height: 5,
    width: 5,
    borderRadius: 50,
    backgroundColor: "#fff",
    opacity: ".2",
  },
  boardingStepChange: {
    width: "100%",
    height: 288,
    backgroundColor: '#5669FF',
    borderTopRightRadius: 48,
    borderTopLeftRadius: 48,
    position: 'absolute',
    padding: 35,
    left: 0,
    right: 0,
    bottom: 0,
  },
  boardingSlidesHeading: {
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 34,
    color: '#FFFFFF',
  },
  boardingSlidesDesc: {
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 25,
    color: '#FFFFFF',
  },
});