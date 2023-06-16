import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {Font, Color} from '../../constants/colors/color';
import {Card, Button} from 'react-native-paper';
import {HEIGHT, WIDTH} from '../../utils/Dimension';
export const GiftItem = ({item}) => {
  const textStyle = item.name.length > 17 ? styles.itemText : styles.itemText;
  return (
    <>
      <Card style={styles.card}>
        <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center',}}>
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
              <Text style={textStyle}>
                {item.name.length > 17 ? item.name.substring(-3) : item.name}
              </Text>
              <View style={styles.nameContainer}>
                <Text
                  style={
                    item.status == 'OutForDelivery' ||
                    item.status == 'Delivered'
                      ? styles.status2
                      : item.status == 'InProgress'
                      ? styles.status1
                      : styles.status3
                  }>
                  <Text
                    style={{
                      fontSize: 15,
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
    </>
  );
};

export default GiftItem;

const styles = StyleSheet.create({
  priceContainer: {
    alignSelf: 'center',
    backgroundColor: Color.primary,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
    lineHeight: 25,
    color: Color.headingBlue,
    fontWeight: 'bold'
  },
  status1: {
    fontSize: 14,
    marginTop: 5,
    color: 'orange',
  },
  status3: {
    fontSize: 14,
    marginTop: 5,
    color: 'red',
  },
  status2: {
    fontSize: 14,
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
    color: Color.primary,
    fontWeight: 'bold',
  },
});
