import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import {MenuHeaders} from '../components/menuComponent/MenuHeaders';
import TextInput from '../components/TextInput';
import {TapGestureHandler, State} from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import * as api from '../services/api';
import {Storage} from '../services/api';
import RNFS from 'react-native-fs';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import {Color, Font} from '../constants/colors/color';
import {CostumButton} from '../components/Button/CostumButton';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {SwitchPage} from '../components/SwitchPage/SwitchPage';
import {GlobalButton} from '../components/Button/GlobalButton';

export default function MediaForm({navigation}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getUserID();
  }, []);
  const getUserID = async () => {
    Storage.userData().then(result => {
      if (result != null) {
        setUserId(result.id);
      }
    });
  };

  const bs = React.useRef(null);
  const fall = new Animated.Value(1);

  // pick image from gallery
  const choosePhotoFromLibrary = async () => {
    await ImagePicker.openPicker({
      mediaType: 'any',
      multiple: false,
      includeBase64: true,
    })
      .then(image => {
        setSelectedImage(image);
        // console.log(image,"image");
        bs.current.snapTo(1);
        RNFS.readFile(image.path, 'base64')
          .then(res => {
            // console.log(res);
            setSelectedVideo(res);
          })
          .catch(err => {
            Alert.alert("veuillez contacter l'administrateur");
          });
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  };

  // open camera method
  const takeVideoFromCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
      includeBase64: true,
    })
      .then(image => {
        setSelectedImage(image);
        // console.log(image,"image");
        bs.current.snapTo(1);
        RNFS.readFile(image.path, 'base64')
          .then(res => {
            // console.log(res);
            setSelectedVideo(res);
          })
          .catch(err => {
            Alert.alert("veuillez contacter l'administrateur");
          });
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  };
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(image => {
        setSelectedImage(image);
        // console.log(image,"image");
        bs.current.snapTo(1);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  };

  // Bottom menu content
  const renderInner = () => (
    <View style={styles.panel}>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Prendre une photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takeVideoFromCamera}>
        <Text style={styles.panelButtonTitle}>Prendre une video</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>
          Choisir dans la bibliothèque
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Annuler</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const Submit = () => {
    if (description.length < 3) {
      Alert.alert(
        'Alert',
        'veuillez choisir une description pour votre image/vidéo',
      );
    } else {
      setLoad(false);
      var formValues;
      if (selectedImage.mime == 'video/mp4') {
        formValues = {
          userId: userId,
          description: description,
          image: selectedVideo,
          type: selectedImage.mime,
        };
      } else {
        formValues = {
          userId: userId,
          description: description,
          image: selectedImage.data,
          type: selectedImage.mime,
        };
      }

      const data = new FormData();
      data.append('form', JSON.stringify(formValues));
      // console.log(data);
      AsyncStorage.getItem('profile').then(result => {
        if (result !== null) {
          const parsedToken = JSON.parse(result);
          api
            .sendMedia(data, parsedToken)
            .then(res => {
              if (res.status == 200) {
                // console.log("alooooo",res)
                ToastAndroid.showWithGravityAndOffset(
                  'Votre demande a été envoyée ',
                  ToastAndroid.LONG,
                  ToastAndroid.CENTER,
                  25,
                  50,
                );
                setLoad(true);
                navigation.goBack();
              }
            })
            .catch(err => {
              navigation.goBack();

              setLoad(true);
            });
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {load ? (
        <>
          <View style={{height: HEIGHT / 3.5}}>
            <MenuHeaders />
          </View>

          <View
            style={{
              width: WIDTH,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            {/* ********************************* image container ********************************* */}
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
                setTimeout(() => {
                  bs.current.snapTo(0);
                }, 500);
              }}
              style={styles.imageContainer}>
              {selectedImage == null ? (
                // if there is no images picked so you will display a prototype image
                <AntDesign name="picture" color={Color.primary} size={HEIGHT / 6} />

              ) : (
                // if user select an image you sould disply his image from galery or from his phone or he can pik vedio
                <Image
                  resizeMode="center"
                  source={{uri: selectedImage?.path}}
                  style={styles.previewImage}
                />
              )}
            </Pressable>
            <Pressable
              style={styles.CostumButton}
              onPress={() => {
                Keyboard.dismiss();
                setTimeout(() => {
                  bs.current.snapTo(0);
                }, 200);
              }}>
              <Text style={{fontSize:16, letterSpacing:1.2, fontFamily:Font.primary}}>Choisir Image / Vidéo</Text>
    
            </Pressable>
            <View style={{marginTop: 20}}>
              <TextInput
                placeholder="ajouter une discription "
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
                icon="user"
                value={description}
                onChangeText={text => {
                  setDescription(text);
                }}
                onFocus={() => {
                  bs.current.snapTo(1);
                }}
              />
            </View>

            <View style={styles.CostumButton}>
              <GlobalButton title="Envoyer" onPress={Submit} />
            </View>
          </View>
          <BottomSheet
            ref={bs}
            snapPoints={['40%', 0]}
            renderContent={renderInner}
            renderHeader={renderHeader}
            initialSnap={1}
            callbackNode={fall}
            enabledGestureInteraction={true}
          />
        </>
      ) : (
        <>
          <SwitchPage />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
  },
  CostumButton: {
    marginTop: 6,
  },

  imageContainer: {
    width: WIDTH / 1.3,
    height: HEIGHT / 5,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  confirmButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#37435e',
    alignItems: 'center',
    marginVertical: 7,
    width: 250,
    alignSelf: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: '5%',
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    marginBottom: 10,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#37435e',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
