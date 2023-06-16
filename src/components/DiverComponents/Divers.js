import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HEIGHT} from '../../utils/Dimension';
import {Font, Color} from '../../constants/colors/color';
import VideoPlayer from 'react-native-media-console';
import {Card} from 'react-native-paper';
const RenderImage = ({item}) => {
  return (
    <Card
      style={[
        {
          overflow: 'hidden',
          borderWidth: 1,
          borderRadius: 15,
          height: HEIGHT / 3,
          width: '95%',
          alignSelf: 'center',
          backgroundColor: '#212121'
        },
      ]}>
      <Card.Cover
        source={{uri: `data:image/png;base64,${item.contents.picByte}`}}
      />
      <Card.Title title={item.name} />
    </Card>
  );
};
const RenderVideo = ({item}) => {
  let videoUrl = `http://145.239.166.14:8085/catchyVideos/divers/${item.contents.name}.mp4`;
  return (
    <Card
      style={[
        {
          overflow: 'hidden',
          borderWidth: 1,
          borderRadius: 15,
          height: HEIGHT / 3,
          width: '95%',
          alignSelf: 'center',
        },
      ]}>
      <Card.Title title={item.name} />

      <VideoPlayer
        source={{uri: videoUrl}}
        showOnStart={true}
        disableBack={true}
        autoPlay={false}
        paused={true}
        style={{borderRadius: 20}}
      />
    </Card>
  );
};
const RenderArticle = ({item}) => {
  let text = item.article.replace(/\./g, '.\n');
  text = text.replace(/(^|\.)\s*\S/g, match => match.toUpperCase());
  const lines = text.split('\n');
  return (
    <View style={[styles.diverContainer, {overflow: 'hidden'}]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <View>
        {lines.map((line, index) =>
          line === '' ? (
            <View key={index} />
          ) : (
            <Text
              key={index}
              style={[
                styles.articleText,
                {paddingLeft: 10, marginVertical: 3},
              ]}>
              {line}
            </Text>
          ),
        )}
      </View>
    </View>
  );
};

export const Divers = ({item}) => {
  if (item.type) {
    switch (item.type) {
      case 'VIDEO':
        return <RenderVideo item={item} />;
        break;
      case 'ARTICLE':
        return <RenderArticle item={item} />;
        break;
      case 'PHOTO':
        return <RenderImage item={item} />;
        break;
      case 'LOADING':
        return <></>;
        break;
      default:
        return null;
    }
  }
};

const styles = StyleSheet.create({
  diverContainer: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 19,
  },
  titleContainer: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: Font.primary,
  },
  articleText: {
    fontSize: 14,
    fontFamily: Font.primary,
  },
});
