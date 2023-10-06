import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity, Linking } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ImageCarousel = () => {
  const navigation = useNavigation();

  const [imageList, setImageList] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImagesFromAPI();
  }, []);

  const fetchImagesFromAPI = async () => {
    try {
      console.log('Fetching list of images...');
      const response = await axios.get('http://94.237.82.88:8082/pub');
      const imageList = response.data;
      console.log('Fetched list of images:', imageList);
      setImageList(imageList);
      setFetching(false);
    } catch (error) {
      console.error('Error fetching list of images:', error);
      setError('Error fetching images. Please try again later.');
      setFetching(false);
    }
  };

  const openLink = (link) => {
    if (link === 'tde://catchy/promotion') {
      navigation.navigate('RechargeArgent');
    } else {
      Linking.openURL(link).catch((err) => console.error('Error opening link:', err));
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openLink(item.link)}>
      <View style={styles.carouselItem}>
        <Image
          source={{ uri: `https://www.catchy.tn/media/pub/${item.image.name}` }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );

  if (fetching) {
    return <View style={styles.fetchingContainer}><Text>Attendez SVP...</Text></View>;
  }

  if (error) {
    return <View style={styles.errorContainer}><Text>{error}</Text></View>;
  }

  return (
    <Carousel
      data={imageList}
      renderItem={renderItem}
      sliderWidth={Dimensions.get('window').width}
      itemWidth={Dimensions.get('window').width - 100} // Adjust the item width as needed
      layout={'default'} // Or 'stack' or 'tinder'
      layoutCardOffset={10} // Only for 'stack' layout
      autoplay={true} // Enable automatic sliding
      autoplayInterval={2000} // Set the interval for automatic sliding (in milliseconds)
      loop={true} // Make the carousel loop after it finishes

    />
  );
};

const styles = StyleSheet.create({
  fetchingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
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
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 150, // Set the desired height of the images
    resizeMode: 'cover',
  },
});

export default ImageCarousel;
