import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {WIDTH} from '../../utils/Dimension';

export const PromotionBannerCarousel = ({item, navigation, user, promoId}) => {

  const {id, title, points, status, endDate, thumbnail} = item;

  return (
    <Card
      style={{
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        borderWidth:1
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.push('Video', {
            vedioName: item.nameVideo,
            occurrence: item.occurrence,
            points: item.points,
            user: user,
            promoId: promoId,
          })
        }
        
        >
        <Card.Cover source={{uri: `data:thumbnail/png;base64,${thumbnail}`}} />
        <View style={{padding:5, flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>
        <Text>
          {item.title}
        </Text>
        <Text>{item.points} points </Text>
       
        {/* <Text
          style={{fontFamily: 'Sans Serif Thin', fontSize: 14, color: '#000'}}>
          Vous pouvez regarder cette promo {item.occurrence} fois jusqu'à la fin et gagner des points de fidélité chaque fois.
          </Text> */}
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({});
