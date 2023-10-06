import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import { Color, FontSize, FontFamily, Border, Padding } from "../../assets/event/GlobalStyles";
import moment from 'moment/min/moment-with-locales';

export const EventBannerCarousel = ({item, navigation}) => {
  const {
    id,
    image: { name: imageName },
    name,
    endDate,
    status,
    gameUrl,
    locations,
} = item;
if (locations && locations.length > 0) {
}
const baseImageUrl = "https://www.catchy.tn/media/event/";
const handleOpenURL = async () => {
  const canOpen = await Linking.canOpenURL(item.gameUrl);

  if (canOpen) {
      Linking.openURL(item.gameUrl);
  } else {
      console.log('Cannot open URL');
  }
};

  return (
    <View style={styles.instanceParent}>
      <View style={styles.frameWrapper}>
        <View style={styles.maskGroupParent}>
                    

        <TouchableOpacity
  onPress={() =>
    navigation.navigate('Event', {
      item: item,
      long: item.locations[0].longitude,
      lat: item.locations[0].latitude,
    })
  }
>
  <Image
    style={styles.maskGroupIcon}
    resizeMode="cover"
    source={{ uri: `${baseImageUrl}${imageName}` }}
  />
</TouchableOpacity>

          <View style={styles.frameParent}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>{item.name}</Text>
            </View>
            <View style={styles.frameContainer}>
              <View style={styles.textWrapper}>
                <View style={styles.textWrapper}>
                  <View style={styles.iconsParent}>
                    <Image
                      style={styles.iconsLayout}
                      resizeMode="cover"
                      source={require("../../assets/event/icons.png")}
                    />
                    <Text style={[styles.text1, styles.textTypo]}>
                    {moment(item.startDate)
                      .locale('fr')
                      .format('MMMM Do YYYY, h:mm ')}</Text>
                  </View>
                  <View style={styles.iconsGroup}>
                    <Image
                      style={[styles.icons1, styles.iconsLayout]}
                      resizeMode="cover"
                      source={require("../../assets/event/icons1.png")}
                    />
                    <View style={styles.textParent}>
                      <Text style={styles.textTypo}>Emplacements</Text>
                      <View style={styles.wrapper}>
                      <Text style={styles.text3}>+{locations.length}</Text>

                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={handleOpenURL}>
    <Image
        style={styles.icons2}
        resizeMode="cover"
        source={require("../../assets/event/icons2.png")}
    />
</TouchableOpacity>
                  <Image
                    style={[styles.frameChild, styles.frameLayout]}
                    resizeMode="cover"
                    source={require("../../assets/event/icons3.png")}
                  />
                  <Image
                    style={[styles.frameItem, styles.frameLayout]}
                    resizeMode="cover"
                    source={require("../../assets/event/frame-9310.png")}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    color: Color.lightGrey2,
    lineHeight: 16,
    fontSize: FontSize.size_2xs,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  iconsLayout: {
    height: 12,
    width: 12,
  },
  frameLayout: {
    marginLeft: 8,
    height: 30,
    borderRadius: Border.br_21xl,
  },
  maskGroupIcon: {
    width: 115,
    borderRadius: 10,
    height: 126,
  },
  text: {
    fontSize: FontSize.size_sm,
    lineHeight: 18,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.black1,
    textAlign: "left",
  },
  textWrapper: {
    alignSelf: "stretch",
  },
  text1: {
    marginLeft: 4,
  },
  iconsParent: {
    alignItems: "center",
    flexDirection: "row",
  },
  icons1: {
    overflow: "hidden",
  },
  text3: {
    position: "absolute",
    top: 0,
    left: 5,
    fontSize: FontSize.size_4xs_4,
    lineHeight: 11,
    color: Color.white,
    width: 11,
    height: 10,
    zIndex: 0,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  wrapper: {
    borderRadius: Border.br_6xs,
    backgroundColor: Color.error,
    width: 21,
    height: 13,
    marginLeft: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  textParent: {
    marginLeft: 4,
    alignItems: "center",
    flexDirection: "row",
  },
  iconsGroup: {
    marginTop: 2,
    alignItems: "center",
    flexDirection: "row",
  },
  icons2: {
    height: 30,
    borderRadius: Border.br_21xl,
    width: 30,
    overflow: "hidden",
  },
  frameChild: {
    width: 31,
    overflow: "hidden",
  },
  frameItem: {
    width: 30,
    marginLeft: 8,
  },
  iconsContainer: {
    marginTop: 8,
    flexDirection: "row",
  },
  frameContainer: {
    marginTop: 8,
    alignSelf: "stretch",
  },
  frameParent: {
    paddingVertical: Padding.p_5xs,
    marginLeft: 1,
    padding: 5, // reduce this value to reduce the spacing


  },
  maskGroupParent: {
    justifyContent: "center",
    flexDirection: "row",
  },
  frameWrapper: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.pureWhite,
    shadowColor: "rgba(38, 38, 38, 0.04)",
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowRadius: 40,
    elevation: 40,
    shadowOpacity: 1,
    padding: 10,
    marginHorizontal: 0,

  },
  instanceParent: {
    flexDirection: "row",
    
    },
});

