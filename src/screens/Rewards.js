import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, Pressable,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding, Border } from "../assets/challange2/GlobalStyles";
import MenuHeaders from "../components/menuComponent/MenuHeaders";
import LottieView from 'lottie-react-native';
import {HEIGHT, WIDTH} from '../utils/Dimension';

const Rewards = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetch('http://94.237.82.88:8082/users/')
      .then(response => response.json())
      .then(data => {
        // Assuming the data is already sorted in descending order, 
        // just take the first 3 users
        const topUsers = data.slice(0, 3);
        setUsers(topUsers);
        topUsers.forEach(user => fetchProfileImage(user.id));
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
}, []);
const [userImages, setUserImages] = useState({});

const fetchProfileImage = async (userId) => {
  try {
    const response = await fetch(`http://94.237.82.88:8082/user/${userId}/`);
    const data = await response.json();

    if (data && data.image && data.image.name) {
      const baseUrl = 'https://www.catchy.tn/media/user/';
      const imageName = data.image.name;
      const imageUrl = baseUrl + imageName;

      setUserImages(prevState => ({...prevState, [userId]: imageUrl}));
    } else {
      console.error('Error fetching profile image: Invalid response data');
    }
  } catch (error) {
    console.error('Error fetching profile image:', error);
  }
};

const sortedUsers = users.sort((a, b) => b.loyaltyPoints - a.loyaltyPoints);
const topThreeUsers = sortedUsers.slice(0, 3);

  return (
    <View style={styles.challangehome}>
      <Image
        style={styles.unionIcon}
        resizeMode="cover"
        source={require("../assets/challange2/union1.png")}
      />
      <View style={styles.frameParent}>
        <View style={[styles.subtractParent, styles.subtractIconPosition]}>
          <Image
            style={[styles.subtractIcon, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/challange2/subtract2.png")}
          />
          <Image
            style={[styles.maskGroupIcon, styles.vectorIconLayout]}
            resizeMode="cover"
            source={require("../assets/challange2/mask-group2.png")}
          />
          <View style={styles.ihebCherifParent}>
          <Text style={styles.ihebCherif}>{topThreeUsers[1]?.firstname} {topThreeUsers[1]?.lastname}</Text>
          <Image
  style={[styles.frameChild, styles.frameChildLayout]}
  resizeMode="cover"
  source={userImages[topThreeUsers[1]?.id] ? { uri: userImages[topThreeUsers[1]?.id] } : require('../assets/challange2/ellipse-11.png')}
  />

            <View style={[styles.ptsWrapper, styles.buttonsFlexBox1]}>
              <Text style={[styles.pts, styles.ptsTypo]}>{topThreeUsers[1]?.loyaltyPoints} Pts</Text>
            </View>
            <View style={styles.frameItem} />
          </View>
          <View style={styles.frameGroup}>
            <View style={styles.salmaKooliWrapper}>
              <Text style={styles.ihebCherif}>{topThreeUsers[2]?.firstname} {topThreeUsers[2]?.lastname}</Text>
            </View>
            <Image
  style={[styles.frameChild, styles.frameChildLayout]}
  resizeMode="cover"
  source={userImages[topThreeUsers[2]?.id] ? { uri: userImages[topThreeUsers[2]?.id] } : require('../assets/challange2/ellipse-11.png')}
  />

            <View style={[styles.ptsWrapper, styles.buttonsFlexBox1]}>
              <Text style={styles.ptsTypo}>{topThreeUsers[2]?.loyaltyPoints}Pts</Text>
            </View>
          </View>
          <View style={styles.frameContainer}>
            <View style={styles.salmaKooliWrapper}>
              <View style={styles.salmaKooliWrapper}>
                <Text style={styles.ihebCherif}>{topThreeUsers[0]?.firstname} {topThreeUsers[0]?.lastname}</Text>
              </View>
            </View>
            <View style={styles.ellipseParent}>
            <Image
  style={[styles.frameChild, styles.frameChildLayout]}
  resizeMode="cover"
  source={userImages[topThreeUsers[0]?.id] ? { uri: userImages[topThreeUsers[0]?.id] } : require('../assets/challange2/ellipse-11.png')}
  />

              <View style={[styles.ptsWrapper, styles.buttonsFlexBox1]}>
                <Text style={styles.ptsTypo}>{topThreeUsers[0]?.loyaltyPoints} Pts</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={[styles.buttonsParent, styles.buttonsFlexBox1]}>
          <View style={[styles.buttons, styles.buttonsFlexBox1]}>
            
            <Image
              style={styles.icons}
              resizeMode="cover"
              source={require("../assets/challange2/icons10.png")}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileHome')}>
            <Text style={styles.textTypo15}>Retour</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.challangehomeChild} />
      <Image
        style={styles.challangehomeItem}
        resizeMode="cover"
        source={require("../assets/challange2/group-6356686.png")}
      />
      <Pressable
        style={[styles.cards, styles.cardsLayout]}
        onPress={() => navigation.navigate("ProfileHome")}
      >
        <Image
          style={[styles.maskGroupIcon1, styles.cardsLayout]}
          resizeMode="cover"
          source={require("../assets/challange2/mask-group3.png")}
        />
        <Text style={styles.dcouvresNosReelsContainer}>
          <Text style={styles.dcouvresNos}>{`Découvres Nos 
`}</Text>
          <Text style={styles.reels}>Reels</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('VideoReel')}>

        <Image
          style={styles.cardsChild}
          resizeMode="cover"
          source={require("../assets/challange2/group-6356691.png")}
        />

        <View style={[styles.buttons1, styles.buttonsFlexBox]}>
          <Text style={[styles.text1, styles.textTypo]}>Explorer</Text>
        </View>
        </TouchableOpacity>

        <Image
          style={styles.maskGroupIcon2}
          resizeMode="cover"
          source={require("../assets/challange2/mask-group4.png")}
        />
        <Image
          style={[styles.vectorIcon, styles.vectorIconLayout]}
          resizeMode="cover"
          source={require("../assets/challange2/vector1.png")}
        />
        <Image
          style={[styles.vectorIcon1, styles.vectorIconLayout]}
          resizeMode="cover"
          source={require("../assets/challange2/vector2.png")}
        />
        <Image
          style={[styles.vectorIcon2, styles.vectorIconLayout]}
          resizeMode="cover"
          source={require("../assets/challange2/vector3.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  subtractIconPosition: {
    left: "0%",
    top: "0%",
  },
  vectorIconLayout: {
    maxHeight: HEIGHT,
    maxWidth: WIDTH,
    position: "absolute",
    overflow: "hidden",
  },
  frameChildLayout: {
    height: 45,
    width: 45,
  },
  buttonsFlexBox1: {
    justifyContent: "center",
    flexDirection: "row",
  },
  ptsTypo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "600",
    fontSize: FontSize.size_xs,
    textAlign: "center",
    color: Color.darkGrey2,
    lineHeight: 20,
  },
  cardsLayout: {
    width: 320,
    position: "absolute",
  },
  buttonsFlexBox: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.customButton1,
    lineHeight: 24,
    fontSize: FontSize.customBody1_size,
    textAlign: "left",
    fontWeight: "700",
  },
  unionIcon: {
    height: 160,
    width: 360,
  },
  subtractIcon: {
    height: "104.85%",
    bottom: "-4.85%",
    left: "0%",
    top: "0%",
    right: "0%",
    width: "100%",
  },
  maskGroupIcon: {
    height: "45.24%",
    width: "156.42%",
    right: "-56.42%",
    bottom: "54.76%",
    left: "0%",
    top: "0%",
    maxWidth: "100%",
  },
  ihebCherif: {
    textAlign: "center",
    lineHeight: 20,
    color: Color.darkGrey2,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_sm,
  },
  frameChild: {
    width: 100,
    height: 100,
    borderRadius: 50, // half of width or height
  },
  pts: {
    width: 80,
    height: 22,
  },
  ptsWrapper: {
    marginTop: 2,
  },
  frameItem: {
    marginTop: 2,
    alignItems: "center",
  },
  ihebCherifParent: {
    top: 120,
    height: 91,
    alignItems: "center",
    left: 29,
    position: "absolute",
  },
  salmaKooliWrapper: {
    alignItems: "center",
  },
  frameGroup: {
    top: 134,
    left: 251,
    alignItems: "center",
    position: "absolute",
  },
  ellipseParent: {
    marginTop: 4,
    alignItems: "center",
  },
  frameContainer: {
    top: 71,
    left: 142,
    alignItems: "center",
    position: "absolute",
  },
  subtractParent: {
    height: "100%",
    bottom: "0%",
    right: "0%",
    left: "0%",
    top: "0%",
    width: WIDTH,
    position: "absolute",
  },
  icons: {
    width: 19,
    height: 19,
  },
  textTypo15: {
    textAlign: "left",
    color: Color.black,
    top: 9,
    left: 5,
    lineHeight: 18,
    fontWeight: "700",
    fontSize: FontSize.size_sm,
  },
  buttonsParent: {
    top: 10,
    flexDirection: "row",
    justifyContent: "center",
    left: 20,
    position: "absolute",
  },
  buttons: {
    borderRadius: 32,
    backgroundColor: "#ffc700",
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    lineHeight: 18,
    marginLeft: 8,
    textAlign: "left",
    color: Color.darkGrey2,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    fontSize: FontSize.size_sm,
    flex: 1,
  },

  frameParent: {
    top: 0,
    height: 313,
    left: 0,
    position: "absolute",
    width: 360,
  },
  challangehomeChild: {
    top: 706,
    left: 0,
    position: "absolute",
  },
  challangehomeItem: {
    top: 164,
    height: 164,
    left: WIDTH * 0.01,  // Set the left offset to be 10% of screen width
    position: "absolute",
    width: 360,
  },
  maskGroupIcon1: {
    top: 223,
    height: 111,
    left: 0,
  },
  dcouvresNos: {
    fontSize: 24,
  },
  reels: {
    fontSize: 32,
  },
  dcouvresNosReelsContainer: {
    top: 65,
    left: 14,
    lineHeight: 31,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.colorBlack,
    width: 132,
    height: 104,
    textAlign: "left",
    position: "absolute",
  },
  cardsChild: {
    top: 27,
    left: 140,
    width: 177,
    height: 169,
    position: "absolute",
  },
  text1: {
    color: Color.primary,
  },
  buttons1: {
    top: 200,
    backgroundColor: Color.darkGrey2,
    width: 263,
    height: 48,
    left: 29,
  },
  text2: {
    color: Color.darkGrey2,
  },
  buttons2: {
    top: 255,
    left: 28,
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 2,
    width: 265,
    height: 50,
    backgroundColor: Color.pureWhite,
  },
  maskGroupIcon2: {
    top: -13,
    left: 240,
    width: 80,
    height: 112,
    position: "absolute",
  },
  vectorIcon: {
    height: "4.79%",
    width: "5.54%",
    top: "4.72%",
    right: "27%",
    bottom: "90.5%",
    left: "67.46%",
  },
  vectorIcon1: {
    height: "3.7%",
    width: "4.28%",
    top: "11.35%",
    right: "28.86%",
    bottom: "84.95%",
    left: "66.86%",
  },
  vectorIcon2: {
    height: "5.15%",
    width: "5.96%",
    top: "-2.23%",
    right: "25.38%",
    bottom: "97.09%",
    left: "68.65%",
  },
  cards: {
    marginLeft: -160,
    top: 353,
    left: "50%",
    borderRadius: Border.br_xl,
    height: 334,
    backgroundColor: Color.pureWhite,
  },
  challangehome: {
    backgroundColor: Color.background,
    height: 800,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default Rewards;
