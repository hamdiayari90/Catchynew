import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, Font} from '../constants/colors/color';
import {Card} from 'react-native-paper';
import {HEIGHT} from '../utils/Dimension';
export const WheelGift = ({item}) => {
  const {
    score: {imgUrl, name},
    status,
  } = item;

  return (
    <Card style={styles.card}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: '50%'}}>
          <Card.Cover
            source={require('../assets/design/giftsCatchy.png')}
            resizeMode="center"
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#fff',
            }}></Card.Cover>
        </View>
        <View style={styles.detailGiftContainer}>
          <View style={styles.priceContainer}>
            <Text style={{fontSize:14, color:Color.primary, fontFamily:Font.primary}}>vous avez gagnés </Text>
            <Text style={styles.price}>{name}</Text>

            <View style={styles.statusContainer}>
              <Text
                style={
                  item.status == 'OutForDelivery' || item.status == 'Delivered'
                    ? styles.status2
                    : item.status == 'InProgress'
                    ? styles.status1
                    : styles.status3
                }>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'normal',
                    color: 'black',
                  }}>
                  Statut:{'  '}
                </Text>
                {item.status == 'InProgress'
                  ? 'En Cours'
                  : item.status == 'OutForDelivery'
                  ? 'En livraison'
                  : item.status == 'Delivered'
                  ? 'Livré'
                  : item.description}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>

  );
};

const styles = StyleSheet.create({
  priceContainer: {
    alignSelf: 'center',
    backgroundColor: Color.primary,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 5,
  },
  status1: {
    fontSize: 15,
    marginTop: 5,
    color: 'orange',
  },
  status3: {
    fontSize: 15,
    marginTop: 5,
    color: 'red',
  },
  status2: {
    fontSize: 15,
    color: 'green',
    marginTop: 5,
  },
  card: {
    marginVertical: 8,
    backgroundColor: '#ffff',
    marginHorizontal: 5,
    padding: 10,
    shadowColor: '#353b48',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 8,
    height: HEIGHT / 5,
    overflow: 'hidden',
    borderRadius: 16,
  },
  detailGiftContainer: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  priceContainer: {
    marginTop: '3%',
  },
  price: {
    fontSize: 18,
    lineHeight: 25,
    color: Color.headingBlue,
    fontWeight: 'bold'
  },
});
