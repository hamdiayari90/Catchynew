import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
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
        <View style={styles.thumbnailContainer}>
          <Image
            source={{ uri: `data:thumbnail/png;base64,${thumbnail}` }}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
          <View style={styles.thumbnailOverlay}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.points}>{item.points} points</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  thumbnailContainer: {
    position: 'relative',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
  },
  thumbnailImage: {
    flex: 1,
    width: '100%',
    height: undefined,
  },
  thumbnailOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  title: {
    fontSize: 16,
    color: '#fff',
  },
  points: {
    fontSize: 14,
    color: '#fff',
  },
});
