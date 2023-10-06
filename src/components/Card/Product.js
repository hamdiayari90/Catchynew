import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Card } from 'react-native-paper';
import moment from 'moment';
import 'moment/locale/fr';
import LottieView from 'lottie-react-native';

import { HEIGHT, WIDTH } from '../../utils/Dimension';
import { Font, Color } from '../../constants/colors/color';

export function Product({ item, navigation, getUserInformation, user, promoId }) {
  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <View style={styles.lottieContainer}>
          <LottieView
            source={require('../../assets/animated/33.json')}
            autoPlay
            loop
            style={styles.lottieIcon}
            onPress={() =>
              navigation.push('Video', {
                vedioName: item.nameVideo,
                occurrence: item.occurrence,
                points: item.points,
                getUserInformation: getUserInformation,
                user: user,
                promoId: promoId,
              })
            }
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.points}>{item.points} points</Text>
          <View style={styles.disappearContainer}>
            <Text>Disparu dans </Text>
            <Text style={{ color: 'green' }}>
              {moment(item.endDate).locale('fr').fromNow(true)}
            </Text>
          </View>
          <Text style={styles.description}>
            Vous pouvez regarder cette promo {item.occurrence} fois jusqu'à la fin et gagner des points de fidélité chaque fois.
          </Text>
          <Pressable
            onPress={() =>
              navigation.push('Video', {
                vedioName: item.nameVideo,
                occurrence: item.occurrence,
                points: item.points,
                getUserInformation: getUserInformation,
                user: user,
                promoId: promoId,
              })
            }
            style={styles.buttonContainer}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Jouer</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    width: WIDTH - 70,
    borderRadius: 30,
    marginBottom: 16,
    borderWidth: 1,
  },
  container: {
    flexDirection: 'row',
    padding: 16,
  },
  lottieContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieIcon: {
    width: 100,
    height: 100,
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 16,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Font.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  points: {
    color: '#FFD300',
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  disappearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  description: {
    fontFamily: Font.primary,
    fontSize: 12,
    color: '#000',
    marginBottom: 8,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: Color.primary,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    letterSpacing: 1.0,
    color: Color.light,
    fontSize: 15,
  },
});
