import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { WIDTH } from '../../utils/Dimension';
import { Card } from 'react-native-paper';

export const PromotionBannerCarousel = ({ item, navigation, user, promoId }) => {
  const { id, title, points, status, endDate, thumbnail } = item;

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
        borderWidth: 0,
      }}
    >
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
        <Card.Cover source={{ uri: `data:thumbnail/png;base64,${thumbnail}` }} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.points}>{item.points} points</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export const EventBannerCarousel = ({ item, navigation }) => {
  const {
    id,
    image: { picByte },
    name,
  } = item;

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
        borderWidth: 0,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Card.Cover
          source={{ uri: `data:image/png;base64,${picByte}` }}
          style={{ width: 200, height: 128 }}
          resizeMethod='scale'
          resizeMode='contain'
        />

        <View style={{ flexGrow: 1, paddingLeft: 16 }}>
          <View>
            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 16 }}>{name}</Text>
            <Text style={{ fontFamily: 'Roboto', marginTop: 5 }}>Participez et gagnez</Text>
            <Text style={{ fontFamily: 'Roboto', marginTop: 5 }}>pleins de cadeaux !</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Event', {
                item: item,
                long: item.locations[0].longitude,
                lat: item.locations[0].latitude,
              })
            }
            style={styles.participateButton}
          >
            <Text style={styles.participateButtonText}>Participer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 16,
  },
  points: {
    fontSize: 14,
  },
  participateButton: {
    borderRadius: 3,
    width: WIDTH / 3,
    alignSelf: 'flex-start',
    backgroundColor: '#5669FF',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  participateButtonText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 5,
    fontFamily: 'Roboto',
    textAlign: 'center',
    letterSpacing: 1.3,
  },
});
