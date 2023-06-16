import React, {useState, useEffect} from 'react';
import * as api from '../services/api';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {Color, Font} from '../constants/colors/color';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import LottieView from 'lottie-react-native';
import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import {Card} from 'react-native-paper';
import {GlobalButton} from '../components/Button/GlobalButton';

export default function DetailsSondage(props) {
  // handle press buttom
  const backAction = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const {survey, userId} = props.route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: HEIGHT / 3.5}}>
        <MenuHeaders />
      </View>
      {survey && (
        <>
          <Card
            style={{
              flex: 1,
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.17,
              shadowRadius: 3.05,
              elevation: 4,
            }}>
            <View style={[styles.container]}>
              <Card.Cover
                source={{
                  uri:
                    'data:image/png;base64,' +
                    (survey.product
                      ? survey.product.photo.picByte
                      : survey.partner.logo.picByte),
                }}
                resizeMode="center"
                style={{
                  width: '100%',
                  height: '40%',
                  backgroundColor: Color.light,
                }}></Card.Cover>
              <View>
                <Text style={styles.description}>{survey.title}</Text>
                <Text style={[styles.description]}>points</Text>
                <Text
                  style={[
                    styles.description,
                    {letterSpacing: 1.2, marginTop: '3%', color: '#636e72'},
                  ]}>
                  {survey.description}
                </Text>
              </View>
              {/* Footer */}
              <View style={styles.footerContainer}>
                <GlobalButton
                  title="Participer"
                  onPress={() =>
                    props.navigation.navigate('RespondSurvey', {
                      surveyId: survey.id,
                      userId: userId,
                    })
                  }
                />
              </View>
            </View>
          </Card>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
    justifyContent: 'space-evenly',
  },
  description: {paddingLeft: '5%'},
  footerContainer: {
    padding: 20,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
