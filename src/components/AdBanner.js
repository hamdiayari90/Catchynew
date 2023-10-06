import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const AdBanner = ({ bannerUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: bannerUrl }} style={styles.banner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  banner: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
});

export default AdBanner;
