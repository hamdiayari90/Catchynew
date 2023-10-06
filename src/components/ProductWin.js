import React, { useState, useEffect } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Card } from 'react-native-paper';
import jwt_decode from 'jwt-decode';
import { useRecoilValue } from 'recoil';
import { baseUrl } from '../atom/responseSurveyState';
import moment from 'moment';
import 'moment/locale/fr';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoWin from './VideoWin';
import WarVideo from './WarVideo';
import VideoLoose from './VideoLoose';

import { HEIGHT, WIDTH } from '../../utils/Dimension';
import Orientation from 'react-native-orientation-locker';
import { Color, FontSize, FontFamily } from "../assets/home6/GlobalStyles";
import Video from 'react-native-video';
import { ImageBackground } from 'react-native';

function formatDuration(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  let durationStr = "";
  if (hrs > 0) {
      durationStr += `${hrs}:${mins < 10 ? "0" : ""}`;
  }
  durationStr += `${mins}:${secs < 10 ? "0" : ""}${secs}`;

  return durationStr;
}
export function ProductWin({ item, navigation, getUserInformation, user, promoId }) {
  const [duration, setDuration] = React.useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = React.useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [showVideoWin, setShowVideoWin] = useState(false);
  const [showWarVideoModal, setShowWarVideoModal] = useState(false);
  const [showVideoLoose, setShowVideoLoose] = useState(false);

  const url = useRecoilValue(baseUrl);

  const videoURL = `https://www.catchy.tn/media/promotion/${item.nameVideo}`;
  useEffect(() => {
    const fetchWatchedVideos = async () => {
      const storedWatchedVideos = await AsyncStorage.getItem('watchedVideos');
      if (storedWatchedVideos) {
        setWatchedVideos(JSON.parse(storedWatchedVideos));
      }
    };

    fetchWatchedVideos();
  }, []);
  const handlePlayButtonPress = () => {
    setShowVideoPlayer(true);
    Orientation.lockToLandscape();
  };

  const onVideoClose = () => {
    setShowVideoPlayer(false);
    setShowWarVideoModal(true);
    Orientation.lockToPortrait();
    
  };
  const handleVideoLoad = (metaData) => {
    const videoDuration = metaData.duration;
    setDuration(videoDuration);
  };
  const submitAnswers = async () => {
    const url = "https://tanitpress.com.tn/survey.php?json=true";
  
    // Check if all answers are the second choice
    const allSecondChoiceSelected = item.quiz.questions.every((question, index) => {
      const selectedChoice = selectedChoices[index];
      return selectedChoice === question.choices[1].content;
    });
  
    if (!allSecondChoiceSelected) {
      console.log("Not all second choices were selected. Loyalty points not updated.");
      // Reset after an incorrect answer
      setShowQuizModal(false);
      setCurrentQuestionIndex(0);
      setSelectedChoices([]);
      setShowVideoLoose(true); // Show the VideoLoose modal
      setTimeout(() => {
        setShowVideoLoose(false);
      }, 5000);
      return; // Exit the function early, do not proceed
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.id,
                answers: selectedChoices,
            }),
        });

        const rawResponse = await response.text();
        console.log("Raw Response:", rawResponse);

        if (rawResponse.trim().startsWith('<')) {
            // Handle HTML response
        } else {
            const data = JSON.parse(rawResponse);
            console.log(data);
        }

        // Reset after submitting
        setShowQuizModal(false);
        setCurrentQuestionIndex(0);
        setSelectedChoices([]);

        const updateStatus = await updateLoyaltyPoints(item.points);
        if (updateStatus === 200) {
            console.log("Loyalty points updated successfully!");
            setShowVideoWin(true); // Show the VideoWin modal
            setTimeout(() => {
              setShowVideoLoose(false); // Hide the modal after a duration (e.g., 5 seconds)
            }, 5000);

            // Add the video to the watchedVideos list ONLY if answers are correct
            const newWatchedVideos = [...watchedVideos, item.id];
            setWatchedVideos(newWatchedVideos);
            await AsyncStorage.setItem('watchedVideos', JSON.stringify(newWatchedVideos));

        } else {
            console.error("Error updating loyalty points.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


const updateLoyaltyPoints = async (points) => {
  let userPoint = user.loyaltyPoints + item.points;
  let id = user.id;

  // Adjust this if the endpoint or method is different
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

  const updatePoints = await fetch(`${url}/user/updateLoyltiPoint`, requestOptions);
  const checkUpdated = updatePoints.status;

  return checkUpdated;
};
const updateUserNumberOfWatchVideo = async () => {
  const response = await fetch(`${url}/user/updateWatchCount`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      userId: user.id,
      videoId: item.id
    }),
  });

  if (response.status !== 200) {
    console.error("Failed to update watch count");
    return;
  }

  const responseBody = await response.text();
  if (responseBody) {
    try {
      const parsedResponse = JSON.parse(responseBody);
      if (!parsedResponse.canWatch) {
        setShowOverlay(true);
        setMessage(parsedResponse.message);
      } else {
        setShowVideoPlayer(true);
        Orientation.lockToLandscape();
      }
    } catch (e) {
      console.error("Failed to parse response:", e);
    }
  }
};

  return (
    
    <View style={styles.watchWin}>
      {showVideoPlayer && (
        <Modal
          transparent={false}
          visible={showVideoPlayer}
          onRequestClose={onVideoClose} 
          animationType="slide"
        >
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'black' }}
            onPress={onVideoClose}
          >
            <Video
              source={{ uri: videoURL }}
              style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
              controls={true}
              paused={!showVideoPlayer}
              onLoad={handleVideoLoad}
              resizeMode="cover"
              fullscreen={true}
              fullscreenOrientation="landscape"
              onEnd={async () => {
                onVideoClose();
                setShowWarVideoModal(false);
                setShowQuizModal(true);
                await updateUserNumberOfWatchVideo(); 
              }}
            />
          </TouchableOpacity>
        </Modal>
      )}

      <View>
        
      <View style={[styles.rectangleParent, styles.groupChildLayout]}>
    <Image
        source={{ uri: `data:thumbnail/png;base64,${item.thumbnail}` }}
        style={styles.groupChildLayout}
        resizeMode="cover"
    />

    {watchedVideos.includes(item.id) && (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            borderRadius: 15,
            bottom: 0,
            backgroundColor: 'rgba(211, 211, 211, 0.7)', // light gray with some opacity
            zIndex: 10,
        }} />
    )}
</View>

            <View style={styles.frameParent}>
                <View style={[styles.wrapper, styles.wrapperLayout]}>
                    <Text style={styles.textTypo}>
                        {duration ? formatDuration(duration) : "00:00"}
                    </Text>
                </View>
                <View style={[styles.groupParent, styles.wrapperLayout]}>
                    <Image
                        style={styles.frameChild}
                        resizeMode="cover"
                        source={require("../assets/home6/group-6356432.png")}
                    />
                    <Text style={[styles.text2, styles.textTypo]}>{item.points}</Text>
                </View>
            </View>
            
            <Image
                style={styles.groupItem}
                resizeMode="cover"
                source={require("../assets/home6/group-6356441.png")}
            />
            <TouchableOpacity
              style={[styles.groupItem, { position: 'absolute' }]}
              onPress={() => {
                if (!watchedVideos.includes(item.id)) {
                    handlePlayButtonPress();
                }
            }}
        >
              <Image
                resizeMode="contain"
                source={require("../assets/home6/group-6356441.png")}  // This will be displayed as the play button
              />
            </TouchableOpacity>
        </View>
        <View style={styles.textGroup}>
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
                
            </TouchableOpacity>
            <Text style={[styles.text3, styles.text3Typo]}>{item.title}</Text>
            {
  showQuizModal && (
    <Modal
      transparent={true}
      visible={showQuizModal}
      onRequestClose={() => {
        setShowQuizModal(false);
        setCurrentQuestionIndex(0); // reset the index when modal closes
        setSelectedChoices([]); // reset the choices when modal closes
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white', padding: 20, borderRadius: 15 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.quiz.title}</Text>

          {item.quiz.questions[currentQuestionIndex] && (
    <View key={currentQuestionIndex} style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
            {item.quiz.questions[currentQuestionIndex].title}
        </Text>
        {item.quiz.questions[currentQuestionIndex].choices.map((choice, idx) => (
            <TouchableOpacity
                key={idx}
                style={{
                    padding: 10,
                    marginVertical: 5,
                    backgroundColor: selectedChoices[currentQuestionIndex] === choice.content ? 'lightgray' : 'transparent',
                    borderRadius: 5,
                }}
                onPress={() => {
                    let updatedChoices = [...selectedChoices];
                    updatedChoices[currentQuestionIndex] = choice.content;
                    setSelectedChoices(updatedChoices);
                }}
            >
                <Text>{choice.content}</Text>
            </TouchableOpacity>
        ))}
    </View>
)}

          <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity
              disabled={currentQuestionIndex === 0}
              style={{
                padding: 15,
                width: '70%',
                backgroundColor: 'black',
                borderRadius: 20,
                marginBottom: 10,
                alignItems: 'center',
                opacity: currentQuestionIndex === 0 ? 0.5 : 1
              }}
              onPress={() => {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
              }}
            >
              <Text style={{ color: '#FFC700' }}>Précédent</Text>
            </TouchableOpacity>
            {currentQuestionIndex < item.quiz.questions.length - 1 ? (
              <TouchableOpacity
                disabled={selectedChoices[currentQuestionIndex] === undefined}
                style={{
                  padding: 15,
                  width: '70%',
                  backgroundColor: 'black',
                  borderRadius: 20,
                  marginBottom: 10,
                  alignItems: 'center'
                }}
                onPress={() => {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                }}
              >
                <Text style={{ color: '#FFC700' }}>Suivant</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  padding: 15,
                  width: '70%',
                  backgroundColor: 'black',
                  borderRadius: 20,
                  marginBottom: 10,
                  alignItems: 'center'
                }}
                onPress={submitAnswers}
              >
                <Text style={{ color: '#FFC700' }}>Finir</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

{
  showVideoWin && (
    <Modal
      transparent={true}
      visible={showVideoWin}
      onRequestClose={() => setShowVideoWin(false)}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <VideoWin points={item.points} />
      </View>
    </Modal>
  )
}
{
  showVideoLoose && (
    <Modal
      transparent={true}
      visible={showVideoLoose}
      onRequestClose={() => setShowVideoLoose(false)}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <VideoLoose points={item.points} /> 
      </View>
    </Modal>
  )
}

{
  showWarVideoModal && (
    <Modal
      transparent={true}
      visible={showWarVideoModal}
      onRequestClose={() => setShowWarVideoModal(false)}
      animationType="slide"
    >
      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => {}}
      >
        <WarVideo 
          onQuit={() => {
            setShowWarVideoModal(false);   // Close the WarVideo modal
            setShowVideoPlayer(false);     // Close the video player
            Orientation.lockToPortrait();
          }}
          onContinue={() => {
            setShowWarVideoModal(false);   // Close the WarVideo modal
            setShowVideoPlayer(true);      // Reopen the video player
            Orientation.lockToLandscape();
          }}
        />
      </TouchableOpacity>
    </Modal>
  )
}
        </View>
      </View>

  );
};
const styles = StyleSheet.create({
  groupChildLayout: {
    height: 138,
    width: 292,
    borderRadius: 17,
    flexDirection: "row",

  },
  wrapperLayout: {
    padding: 3,
    width: 58,
    backgroundColor: Color.colorGray_100,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
  },
  textTypo: {
    color: Color.background,
    fontSize: 10,
    fontFamily: FontFamily.poppinsSemiBold,
    lineHeight: 23,
    textAlign: "left",
    fontWeight: "600",
  },
  text3Typo: {
    fontFamily: FontFamily.poppinsSemiBold,
    textAlign: "left",
    color: Color.black1,
    fontWeight: "900",
    fontSize: 20,
  },
  text: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.interSemiBold,
    textAlign: "left",
    color: Color.black1,
    fontWeight: "600",
    lineHeight: 24,
  },

  groupChild: {
    top: 0,
    left: 0,
    borderRadius: 10,
    position: "absolute",
  },
  wrapper: {
    justifyContent: "center",
  },
  frameChild: {
    width: 26,
    height: 27,
  },
  text2: {
    marginLeft: 0.50,
    top: 0.05,
  },
  groupParent: {
    marginLeft: 159,
  },
  frameParent: {
    top: 15,
    left: 11,
    flexDirection: "row",
    position: "absolute",
  },
  groupItem: {
    top: 45,
    left: 120,
    width: 41,
    height: 41,
    position: "absolute",
  },
  rectangleParent: {
    marginTop: 8,
  },
  text3: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsSemiBold,
    lineHeight: 24,
  },
  fanta: {
    fontSize: 13,
    marginTop: -1,
    lineHeight: 23,
    fontFamily: FontFamily.poppinsSemiBold,
  },
  textGroup: {
    marginTop: 8,
  },
  watchWin: {
    alignItems: "center",
  },
});

export default ProductWin;
