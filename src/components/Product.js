import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {Card} from 'react-native-paper';
import {Color, Font} from '../constants/colors/color';

const Product = ({item, userPoint}) => {




  return (
  
        <Card
          style={styles.card}
       
          >
   
          <Card.Cover
            style={styles.cardImage}
            source={{ uri: `https://www.catchy.tn/media/product/${item.image.name}` }}
            />
          <View style={styles.descriptionContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{item.price} Points</Text>
            </View>
            <View style={styles.voirDetailContainer}>
              <Text style={styles.detail}>voir detail</Text>
            </View>
          </View>
        </Card>
   
  );
};
export default Product;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginVertical: 8,
    backgroundColor: '#eeeee4',
    marginHorizontal: 5,
    shadowColor: '#353b48',
    shadowOffset: {
      width: 0,
      height: 3.5,
    },
    shadowOpacity: 0.50,
    shadowRadius: 3.05,
    elevation: 4,
    flexBasis: '47%',

  },

  cardImage: {
    borderRadius: 3.5,
    flex: 1,
    height: 150,
    resizeMode: 'contain',
  },
  descriptionContainer: {flexDirection: 'column'},
  nameContainer: {justifyContent: 'center', alignSelf: 'center'},
  name: {
    color: '#000',
    fontFamily: Font.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  priceContainer: {
    alignSelf: 'center',
    backgroundColor: Color.primary,
    paddingRight: 5,
    paddingLeft: 5,
  },
  price: {
    // backgroundColor: Color.primary,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: Font.primary,
    textAlign: 'center',
  },
  voirDetailContainer: {
    alignSelf: 'center',
    marginBottom: 5,
    
  },
  detail: {
    fontFamily: Font.primary,
    textDecorationLine: 'underline',
    textTransform: 'capitalize'
  },
});
