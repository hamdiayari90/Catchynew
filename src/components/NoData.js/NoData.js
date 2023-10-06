import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Font } from '../../constants/colors/color';
import { DarkModeProvider, DarkModeContext } from '../../../DarkModeContext';

const NoData = ({ message = '' }) => {
  const { isDarkMode } = React.useContext(DarkModeContext);

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView
          style={styles.lottie}
          source={require('../../assets/animated/sali.json')}
          autoPlay
          loop
        />
      </View>

      <Text style={styles.message}>{message}</Text>
      <Text style={styles.subMessage, isDarkMode ? { color: '#FFFFFF' } : {}
}>Vide!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  lottieContainer: {
    marginTop: '33%', // relative to the screen width
    alignSelf: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  message: {
    fontFamily: Font.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  subMessage: {
    fontFamily: Font.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default NoData;
