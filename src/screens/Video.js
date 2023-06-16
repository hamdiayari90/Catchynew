import {StyleSheet, Text, View, Dimensions, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

import React, {useState, useEffect} from 'react';
import VideoPlayer from 'react-native-media-console';
const {width, height} = Dimensions.get('screen');
import {ProgressBar, Button} from 'react-native-paper';
import moment from 'moment';
import {navigate} from '../navigation/RootNavigation';
import {Font} from '../constants/colors/color';
import {useRecoilValue} from 'recoil';
import {baseUrl} from '../atom/responseSurveyState';
// closecircleo
export const Video = props => {
  const {vedioName, occurrence, points, user, promoId} = props.route.params;

  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [vedioEnd, setVideoEnd] = useState(false);
  const [pauseVideo, setPausevideo] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);
  const [userPromotion, setUserPromotion] = useState({});
  const url = useRecoilValue(baseUrl);
  useEffect(() => {
    checkIfNoProps();
  }, []);

  const checkIfNoProps = () => {
    if (promoId == undefined || promoId == undefined) {
      props.navigation.navigate('Promotions');
    }
  };

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### **** Effect when go back with guesture handler   ***** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  useEffect(
    () =>
      props.navigation.addListener('beforeRemove', e => {
        if (vedioEnd) {
          return;
        }

        e.preventDefault();
        setOpenModal(true);
      }),
    [vedioEnd, props.navigation],
  );

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** GET User Information   *************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### ******* WHEN HE WANT TO CANCEL VIDEO    ************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const backToPromotion = () => {
    setOpenModal(false);
    props.navigation.navigate('Promotions');
    // props.navigation.goBack();
  };

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### ******** OPEN MODAL WHEN GO GO BACK    *************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const onGoBack = () => {
    setOpenModal(true);
  };

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** WHEN VIDEO END    ******************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const onVideoEnd = async () => {
    let numberOfWatchByUser = userPromotion.nombreVueUser;
    // console.log('numberOfWatchByUser when video end :', numberOfWatchByUser);
    // console.log(
    //   'numberOfWatchByUser < occurrence:',
    //   numberOfWatchByUser < occurrence,
    // );
    // console.log('occurrence:', occurrence);
    // console.log('numberOfWatchByUser:', numberOfWatchByUser);

    if (numberOfWatchByUser == undefined && occurrence > 0) {
      await updateLoyaltlyPoints()
        .then(points => {
          // console.log('points:', points);
        })
        .catch(errrrrrrrr => {
          throw errrrrrrrr;
        });

      // ****************************************************************************
      await updateUserNumberOfWatchVideo()
        .then(res => {})
        .catch(err => {
          throw err;
        });

      setTimeout(() => {
        backToPromotion();
      }, 1000);
    } else if (numberOfWatchByUser < occurrence) {
      await updateLoyaltlyPoints()
        .then(points => {
          // console.log('points:', points);
        })
        .catch(errrrrrrrr => {
          throw errrrrrrrr;
        });

      // ****************************************************************************
      await updateUserNumberOfWatchVideo()
        .then(res => {})
        .catch(err => {
          throw err;
        });

      setTimeout(() => {
        backToPromotion();
      }, 1000);
    } else {
      await updateUserNumberOfWatchVideo()
        .then(res => {})
        .catch(err => {
          throw err;
        });

      setTimeout(() => {
        backToPromotion();
      }, 1000);
    }
  };

  const postAllUSerPromotionInformation = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }),

        body: JSON.stringify({
          userId: user.id,
          promoId: promoId,
          dateDebut: new Date().toISOString(),
          dateFin: new Date().toISOString(),
          dateVue: new Date().toISOString(),
          nombreVueUser: 0,
        }),
      };

      const userpromotion = await fetch(`${url}/userpromotion`, requestOptions);
      let info = userpromotion.json();

      return info;
    } catch (e) {}
  };
  const postUSerpromotionDetail = async () => {
    let userPromotion = await postAllUSerPromotionInformation();
    // console.log(
    //   ' ============================= POST userPromotion ============================================\n',
    //   userPromotion,
    // );
  };

  const getAllUSerInfoDEtail = async () => {
    let id = user.id;

    try {
      const requestOptions = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }),
      };

      const allPromostion = await fetch(
        `${url}/userpromotion?userId=${id}&promoId=${promoId}`,

        requestOptions,
      );
      let user = allPromostion.json();

      return user;
    } catch (e) {}
  };

  const getAllUSerInfoPromotion = async () => {
    let allUSerInfoPromotion = await getAllUSerInfoDEtail();
    //console.log('allUSerInfoPromotion:', allUSerInfoPromotion)
    // console.log(
    //   ' ============================= GET  userPromotion ============================================\n',
    //   allUSerInfoPromotion,
    // );
    if (allUSerInfoPromotion.status == 500) {
      postUSerpromotionDetail();
    } else {
      // console.log('allUSerInfoPromotion:', allUSerInfoPromotion);

      setUserPromotion(() => allUSerInfoPromotion);
    }
  };
  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### ******** UPDATE LOYATLY POINT BY USER ID    ********** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const updateLoyaltlyPoints = async () => {
    let userPoint = user.loyaltyPoints + points;
    // console.log('points:', points);
    // console.log('user.loyaltyPoints:', user.loyaltyPoints);
    // console.log('userPoint:', userPoint);
    // console.log(
    //   ' ######################" userPoint ####################"":',
    //   userPoint,
    // );

    let id = user.id;

    try {
      const requestOptions = {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }),
        body: JSON.stringify({
          id: id,
          loyaltyPoints: userPoint,
        }),
      };

      const updatePoints = await fetch(
        `${url}/user/updateLoyltiPoint`,
        requestOptions,
      );
      const checkUpdated = updatePoints.status;
      return checkUpdated;
    } catch (e) {}
  };

  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** WHEN VIDEO IS PLAYING    ************* ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const onPlayVideo = () => {
    getAllUSerInfoPromotion();
  };
  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### *************** ON VIDEO ERROR    ******************** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const onVedioError = () => {
    setOpenModalError(true);
  };
  // ********************************************************************
  // **   ##******************************************************##   **
  // *  ### **** UPDATE USER LOYALTY POINT AFTER SEE VEDIO  ****** ###  *
  // **   ##******************************************************##   **
  // ********************************************************************
  const updateUserNumberOfWatchVideo = async () => {
    let id = user.id;
    let usernumberOfWatch = userPromotion.nombreVueUser;
    // console.log('usernumberOfWatch:', usernumberOfWatch);

    if (usernumberOfWatch == undefined) {
      usernumberOfWatch = 1;
    } else {
      usernumberOfWatch += 1;
    }
    // console.log(
    //   'numberOfWatch after first post request to create this oject :',
    //   usernumberOfWatch,
    // );
    try {
      const requestOptions = {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }),
        body: JSON.stringify({
          userId: id,
          promoId: promoId,
          value: usernumberOfWatch,
        }),
      };

      const updateWhenFinish = await fetch(
       
        `${url}/userpromotion`,
        requestOptions,
      );
      const updated = updateWhenFinish.ok;
      return updated;
    } catch (e) {}
  };

  return (
    <>
      {/* *********************** Modal ********************************** */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(!openModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginBottom: 16, flexDirection: 'column'}}>
              <Button icon="gift"></Button>
              <Text style={{}}> Fermer Video ? </Text>
              <Text style={{}}>
                {' '}
                Si vous fermer cette video , vous pouvez pas gagner des points
              </Text>
            </View>
            <View style={{marginBottom: 16, flexDirection: 'column'}}></View>

            <View style={{marginTop: 16, flexDirection: 'row'}}>
              <Button
                color="blue"
                onPress={() => {
                  backToPromotion();
                  // resetAll();
                }}>
                fermer
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  setOpenModal(false);
                }}>
                continuer
              </Button>
            </View>
          </View>
        </View>
      </Modal>
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
            height: height / 3.5,
          }}></View>
        <View
          style={{
            width: '100%',
            height: height / 2.5,
          }}>
          <VideoPlayer
            source={{
              uri: `http://145.239.166.14:8085/catchyVideos/${props.route.params.vedioName}.mp4`,
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
            onPlay={() => onPlayVideo()}
            paused={pauseVideo}
          />
        </View>
        <ProgressBar progress={0.1} color="white" />
      </View>
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
    fontFamily: Font.primary,
    fontVariant: ['small-caps'],
    color: '#000',
  },
});
