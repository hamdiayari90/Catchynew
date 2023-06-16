import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {HEIGHT} from '../../utils/Dimension';
import {useRecoilState} from 'recoil';
import {isConnected} from '../../atom/auth';
import {Color, Font} from '../../constants/colors/color';
import {Button} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

export const ErrorScreen = () => {
  const [intenet, setInternet] = useRecoilState(isConnected);


  const getNetInfo = () => {
    // To get the network state once
    NetInfo.fetch().then((state) => {
      // alert(
      //   `Connection type: ${state.type}
      //   Is connected?: ${state.isConnected}
      //   IP Address: ${state.details.ipAddress}`
      // );
      if(state.isConnected) {
        setInternet(()=> true)
      }

    });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
        }}>
        <LottieView
          source={require('../../assets/animated/internet.json')}
          autoPlay
          loop
          style={{
            width: '90%',
            height: HEIGHT / 4,
          }}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 20,
        }}>
        <Text style={styles.text}>
          Veuillez vérifier votre connexion internet !
        </Text>
      </View>
      <Button
        mode="contained"
        onPress={() => getNetInfo()}
        color={Color.tertiary}>
        réessayer
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontFamily: Font.secondary,
    fontSize: 14,
  },
});
