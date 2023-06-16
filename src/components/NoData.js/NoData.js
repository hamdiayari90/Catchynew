import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {WIDTH, HEIGHT} from '../../utils/Dimension';
import {Font, Color} from '../../constants/colors/color';
import FastImage from 'react-native-fast-image';

const NoData = ({message = ''}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <View
        style={{
          marginTop: WIDTH / 3,
          alignSelf: 'center',
        }}>
        <FastImage
          style={{width: 200, height: 200}}
          source={require('../../assets/design/gif/8.gif')}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </View>
      {/* <View
        style={{
          marginTop: WIDTH / 3,
          alignSelf: 'center',
        }}>
        <LottieView
          source={require('../../assets/animated/noPromotion.json')}
          autoPlay
          loop
          style={{
            width: '70%',
            height: 200,
          }}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </View> */}

      <Text
        style={{
          fontFamily: Font.primary,
          fontWeight: 'bold',
          fontSize: 18,
          fontStyle: 'italic',
        }}>
        {message}
      </Text>
      <Text
        style={{
          fontFamily: Font.primary,
          fontWeight: 'bold',
          fontSize: 16,
          fontStyle: 'italic',
        }}>
        revenez plus tard
      </Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({});
