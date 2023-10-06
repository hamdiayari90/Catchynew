import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';

import {Card, Button} from 'react-native-paper';
import {HEIGHT} from '../../utils/Dimension';
import {Color, Font} from '../../constants/colors/color';
import { useNavigation } from '@react-navigation/native';
export const GiftDetail = ({item, userPoint}) => {
  const navigation = useNavigation()


  return (
    <Card
      style={styles.card}
      // onPress={() => {
      // }}
    >
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '50%'}}>
          <Card.Cover
            source={{uri: `data:image/png;base64,${item.image.picByte}`}}
            resizeMode="center"
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#fff',
            }}></Card.Cover>
        </View>
        <View style={styles.detailGiftContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price} Points</Text>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </View>

          <Pressable
            style={styles.voirDetailContainer}
            onPress={() => navigation.navigate('OneProduct', {data: item, userInfo : {
              loyaltyPoints : userPoint
            }})}>
            <Button
              mode="contained"
              color={Color.primary}>
              voir detail
            </Button>
          </Pressable>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    backgroundColor: '#ffff',
    marginHorizontal: 5,
    shadowColor: '#353b48',
    shadowOffset: {
      width: 0,
      height: 3.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.05,
    elevation: 4,
    height: HEIGHT / 5,
    overflow: 'hidden',
    borderRadius: 10,
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
    color: Color.primary,
    fontWeight: 'bold',
  },
  nameContainer: {
    marginTop: '1%',
  },
  name: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  voirDetailContainer: {
    alignItems: 'flex-end',
    padding: '5%',
  },
});
