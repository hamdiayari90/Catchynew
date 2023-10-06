import * as React from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { FontFamily, Color } from "../assets/home4/GlobalStyles";
const SurveyBanner = ({item, navigation, userId}) => {
    const {
      id,
      title,
      points,
      
      product: {
        photo: { name: imageName }
      }
    } = item;
  return (
    <View style={styles.frameParent}>
      <TouchableOpacity 
    onPress={() =>
        navigation.navigate('DetailsSondage', {
            survey: item,
            userId: userId,
        })
    }
    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
>
      <View style={styles.textParent}>
        <Image
          style={[styles.frameChild, styles.textPosition]}
          resizeMode="cover"
          source={require("../assets/home4/group-6356428.png")}
        />

    <Image
        style={styles.frameItem}
        onPress={() =>
            navigation.navigate('DetailsSondage', {
                survey: item,
                userId: userId,
            })
        }
       
        resizeMode="cover"
        source={{ uri: `https://www.catchy.tn/media/partner-products/${imageName}` }}
    />

        <Image
          style={styles.subtractIcon}
          resizeMode="cover"
          source={require("../assets/home4/subtract.png")}
        />
        <Image
          style={styles.unionIcon}
          resizeMode="cover"
          source={require("../assets/home4/union.png")}
        />
        <Image
          style={styles.frameInner}
          resizeMode="cover"
          source={require("../assets/home4/group-6356443.png")}
        />
        <Text style={[styles.text1, styles.textTypo2]}>{item.title}</Text>
        <View style={styles.groupParent}>
          <Image
            style={styles.groupIcon}
            resizeMode="cover"
            source={require("../assets/home4/group-6356432.png")}
          />
          <Text style={[styles.text2, styles.textTypo]}>{item.points}</Text>
        </View>
      </View>
      </TouchableOpacity>

    </View>
    
  );
};

const styles = StyleSheet.create({
  textPosition: {
    display: "none",
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  textTypo2: {
    textAlign: "left",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "900",
    fontSize: 18,

  },
  text: {
    top: 111,
    left: 21,
    fontSize: 14,
    lineHeight: 24,
    color: Color.black,
    textAlign: "left",
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  frameChild: {
    height: "44.34%",
    width: "94.69%",
    top: "18.24%",
    right: "2.65%",
    bottom: "37.42%",
    left: "2.65%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  frameItem: {
    top: 0,
    left: 0,
    width: 230,
    height: 100,
    position: "absolute",
  },
  subtractIcon: {
    width: 515,
    height: 838,
  },
  unionIcon: {
    width: 0,
    height: 0,
  },
  frameInner: {
    top: 28,
    left: 6,
    width: 76,
    height: 123,
    position: "absolute",
  },
  text1: {
    top: 127,
    left: 15,
    fontSize: 13,
    lineHeight: 18,
    textTransform: "capitalize",
    color: Color.darkGrey,
    width: 129,
    position: "absolute",
  },
  groupIcon: {
    width: 18,
    height: 19,
  },
  text2: {
    fontSize: 10,
    lineHeight: 16,
    color: Color.background,
    marginLeft: 1.81,
  },
  groupParent: {
    top: 11,
    left: 90,
    borderRadius: 12,
    backgroundColor: "rgba(32, 32, 32, 0.6)",
    width: 70,
    height: 20,
    padding: 2,
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
  },
  textParent: {
    borderRadius: 10,
    backgroundColor: Color.background,
    shadowColor: "#ddaf0b",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 0,
    elevation: 0,
    shadowOpacity: 1,
    width: 139,
    height: 174,
    overflow: "hidden",
  },
  frameParent: {
    flex: 1,
    width: "100%",
    height: 178,
    left: 30,
    flexDirection: "row",
  },
});

export default SurveyBanner;
