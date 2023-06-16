import {StyleSheet, Text, View, Dimensions, Modal, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
const {width, height} = Dimensions.get('screen');
import {ProgressBar, Button} from 'react-native-paper';
import VideoPlayer from 'react-native-media-console';
import { Font } from '../../constants/colors/color';

export const MediaVideo = props => {
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [vedioEnd, setVideoEnd] = useState(false);
  const [pauseVideo, setPausevideo] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);



  const onGoBack = () => {
    props.setReadVideo(false);
  };

  const onVedioError = () => {
    setOpenModalError(true);
  };

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### ******* WHEN HE WANT TO CANCEL VIDEO    ************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const backToPromotion = () => {
    props.navigation.navigate('gallery');
  };

  const onVideoEnd = async () => {
    setTimeout(() => {
      props.setReadVideo(false);
    }, 1000);
  };
  return (
    <>
      {/* *********************** Modal ********************************** */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModalError}
        onRequestClose={() => {
          setOpenModal(!openModalError);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginBottom: 16, flexDirection: 'column'}}>
              <Text style={{fontSize: 24, color: 'red'}}> Oooops ! </Text>
            </View>
            <View style={{marginBottom: 16, flexDirection: 'column'}}>
              <Text style={{fontSize: 18, textAlign: 'center'}}>
                {' '}
                cette vidéo ne peut pas être chargée !{' '}
              </Text>
            </View>

            <View style={{marginTop: 16, flexDirection: 'row'}}>
              <Button
                color="blue"
                onPress={() => {
                  setOpenModalError(false);
                  backToPromotion();
                }}>
                ok
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <View>
   
        <View
          style={{
            width: '100%',
            height: height /2.5,
          }}>
          <VideoPlayer
            source={{
              uri: `http://145.239.166.14:8085/catchyVideos/${props.vedioName}.mp4`,
            }}
            navigator={props.navigation}
            // rewindTime ={5}
            showOnStart={false}
            tapAnywhereToPause={false}
            onHideControls={true}
            onBack={() => onGoBack()}
            onEnd={() => onVideoEnd()}
            disablePlayPause={true}
            disableSeekbar={true}
            disableFullscreen={true}
            showTimeRemaining={true}
            onError={() => onVedioError()}
            // onPlay={}
            paused={pauseVideo}
          />
        </View>
        <ProgressBar progress={0.1} color="white" />
      </View>
    </>
  );
};

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
    fontFamily: Font.primary,
    fontVariant: ['small-caps'],
    color: '#000',
  },
});
