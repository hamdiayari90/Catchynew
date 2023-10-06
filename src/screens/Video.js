import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import VideoPlayer from 'react-native-media-console';
import { ProgressBar, Button } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { baseUrl } from '../atom/responseSurveyState';
import QuizModal from './QuizModal'; // Import the QuizModal component

const { width, height } = Dimensions.get('screen');

const Video = (props) => {

  return (
    <>
     
    </>
  );
};

export default Video;
const styles = StyleSheet.create({
  modal: {
    position: 'relative',
    width: 250,
    height: 100,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: '60%',
    zIndex: -1,
  },
  modalView: {
    height: 'auto',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontVariant: ['small-caps'],
    color: '#000',
  },
});
