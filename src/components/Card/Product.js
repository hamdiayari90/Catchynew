import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Card} from 'react-native-paper';
import moment from 'moment';
import 'moment/locale/fr';

import {HEIGHT, WIDTH} from '../../utils/Dimension';
import {Font, Color} from '../../constants/colors/color';

export function Product({item, navigation, getUserInformation, user, promoId}) {
  return (
    <Card style={styles.card}>
      <View
        style={{
          height: HEIGHT / 4.5,
          width: '100%',
          alignSelf: 'center',
          borderRadius: 10,
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '30%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign
            name="playcircleo"
            size={90}
            color="red"
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
        <View
          style={{
            width: '40%',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <Text
            style={{
              fontFamily: Font.primary,
              fontSize: 14,
              fontWeight: 'bold',
              textAlign:'center'
            }}>
            {item.title} 
            
          </Text>
          <Text
            style={{
              color: Color.primary,
              fontSize: 14,
              fontWeight: 'bold',
              padding: '3%',
            }}>
            {item.points} points
          </Text>
          <View
            style={{
              padding: '3%',
              flexDirection: 'column',
            }}>
            <Text>
              Disparu dans{' '}
              <Text style={{color: 'green'}}>
                {moment(item.endDate).locale('fr').fromNow(true)}
              </Text>
            </Text>
          </View>
          <Text
            style={{
              fontFamily: Font.primary,
              fontSize: 14,
              color: '#000',
              paddingLeft: '2%',
            }}>
            Vous pouvez regarder cette promo {item.occurrence} fois jusqu'à la
            fin et gagner des points de fidélité chaque fois.
          </Text>
        </View>
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
          style={{
            width: '30%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            padding: '3%',
          }}>
          <View
            style={{
              backgroundColor: Color.primary,
              borderRadius: 15,
              padding: '5%',
            }}>
            <Text
              style={{
                letterSpacing: 1.2,
                color: Color.light,
                fontSize: 14,
              }}>
              Regarder
            </Text>
          </View>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    // marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: WIDTH - 20,
    alignSelf: 'center',
    // marginBottom: 20,
    borderWidth: 1,
    marginVertical:'1%'
  },
  thumb: {
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
