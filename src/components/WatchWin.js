import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import { Color, FontSize, FontFamily } from "../assets/home6/GlobalStyles";

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

export const PromotionBannerCarousel = ({ item, navigation, user, promoId }) => {
  const [duration, setDuration] = React.useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = React.useState(false);
  const videoURL = `https://www.catchy.tn/media/promotion/${item.nameVideo}`;

  const handlePlayButtonPress = () => {
    setShowVideoPlayer(true);
    Orientation.lockToLandscape();
  };

  const onVideoClose = () => {
    setShowVideoPlayer(false);
    Orientation.lockToPortrait();
  };
  const handleVideoLoad = (metaData) => {
    const videoDuration = metaData.duration;
    setDuration(videoDuration);
  };
  return (
    <View style={styles.watchWin}>
      {showVideoPlayer && (
        <Modal
          transparent={false}
          visible={showVideoPlayer}
          onRequestClose={onVideoClose} // Android back button closing
          animationType="slide"
        >
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'black' }}
            onPress={onVideoClose} // Allow tapping outside to close
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
              onEnd={onVideoClose}
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
              onPress={handlePlayButtonPress}
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
                <Text style={[styles.text3, styles.text3Typo]}>{item.title}</Text>
            </TouchableOpacity>
        </View>
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

export default PromotionBannerCarousel;
