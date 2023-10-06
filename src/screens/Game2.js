import React, { useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Image, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Orientation from 'react-native-orientation-locker';
import { BackHandler } from 'react-native';

const GameScreen = ({ navigation }) => {
  useEffect(() => {
    // Lock to landscape on mount
    Orientation.lockToLandscape();

    // Revert back to the original orientation on unmount
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);
  const webViewRef = useRef(null);

  const handleBackButton = () => {
    navigation.goBack();
  };
  useEffect(() => {
    // Disable the Android back button
    const backAction = () => {
        return true; // This will prevent the default back button action
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    // Clean up the listener when the component unmounts
    return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
}, []);
useEffect(() => {
  navigation.setOptions({
      tabBarVisible: false
  });
}, []);
GameScreen.navigationOptions = ({ navigation }) => {
  return {
      tabBarVisible: false
  };
};

  const injectGameCode = `
    $(document).ready(function() {
      var oMain = new CMain({
        area_goal: [
          { id: 0, probability: 100 },
          { id: 1, probability: 80 },
          { id: 2, probability: 60 },
          { id: 3, probability: 80 },
          { id: 4, probability: 100 },
          { id: 5, probability: 75 },
          { id: 6, probability: 60 },
          { id: 7, probability: 50 },
          { id: 8, probability: 60 },
          { id: 9, probability: 75 },
          { id: 10, probability: 80 },
          { id: 11, probability: 65 },
          { id: 12, probability: 70 },
          { id: 13, probability: 65 },
          { id: 14, probability: 80 }
        ],
        score_goal: 10,
        score_goal_missed: -5,
        score_ball_saved: 5,
        score_goal_opponent: -5,
        audio_enable_on_startup: true,
        check_orientation: false, // Set to false to disable orientation check
        fullscreen: true
      });

      // Set the game container to vertical mode
      $("#game-container").addClass("vertical");

      $("#game-container").append(oMain.getCanvas());
    });
  `;

  useEffect(() => {
    const runGameCode = `
      function runGame() {
        ${injectGameCode}
      }
      runGame();
    `;

    webViewRef.current.injectJavaScript(runGameCode);
  }, [injectGameCode]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
        <Image source={require('../assets/logo/backbtn.png')} style={styles.backButtonImage} />
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      <WebView
        ref={webViewRef}
        source={{ uri: 'http://102.219.178.16:7777/carrefour.tn/index.html' }}
        style={styles.webView}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 5,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  webView: {
    flex: 1,
  },
});

export default GameScreen;
