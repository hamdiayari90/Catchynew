import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {WIDTH} from '../../utils/Dimension';
import FastImage from 'react-native-fast-image';

export const SwitchPage = () => {
  return (
    <View>
      <View
        style={{
          marginTop: WIDTH / 3,
          alignSelf: 'center',
        }}>
        <LottieView
          source={require('../../assets/animated/animation60hz.json')}
          autoPlay
          loop
          style={{
            width: '90%',
            height: 500,
          }}
        />
        {/* <View>
          <FastImage
            style={{width: 200, height: 200}}
            source={require('../../assets/design/gif/1.gif')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View> */}
        <View style={{justifyContent: 'center', alignItems: 'center'}}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
