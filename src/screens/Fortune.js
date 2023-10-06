import React from "react";
import { Image, StyleSheet, Text, View, Animated, TouchableOpacity, ScrollView } from "react-native";
import { Color, FontFamily, FontSize, Padding, Border } from "../assets/wheel/GlobalStyles";

const RADIUS = 120; // Just an assumption. Please adjust this value based on your actual design.

const RoueDeFortuneWin = () => {
  const rotationValue = React.useRef(new Animated.Value(0)).current;

    const spinWheel = () => {
      const randomRotation = Math.floor(Math.random() * 360) + (360 * 5); // Spin between 5 to 6 full circles.
      Animated.timing(rotationValue, {
          toValue: randomRotation,
          duration: 3000,
          useNativeDriver: true
      }).start(() => {
          const finalRotation = randomRotation % 360;
          const winningIndex = Math.floor(finalRotation / GIFT_ANGLE_INTERVAL);
          console.log("You won:", GIFT_IMAGES[winningIndex]);
          // Here you can update some state or display a message to show which item was won
      });
  };
    const rotationInterpolation = rotationValue.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg']
    });

    const GIFT_IMAGES = [
      {uri: 'https://www.catchy.tn/media/wheel/1.png'},
      {uri: 'https://www.catchy.tn/media/wheel/lose.png'},
      {uri: 'https://www.catchy.tn/media/wheel/3.png'},
      {uri: 'https://www.catchy.tn/media/wheel/loser.png'},
      {uri: 'https://www.catchy.tn/media/wheel/5.png'},
      {uri: 'https://www.catchy.tn/media/wheel/lost.png'},
    ];
    const GIFT_ANGLE_INTERVAL = 360 / GIFT_IMAGES.length;
  return (
    <ScrollView style={styles.roueDeFortuneWin}>
      <Image
        style={styles.maskGroupIcon}
        resizeMode="cover"
        source={require("../assets/wheel/mask-group.png")}
      />
      <View style={[styles.groupParent, styles.groupLayout1]}>
        <View style={[styles.groupWrapper, styles.groupLayout1]}>
          <View style={[styles.groupWrapper, styles.groupLayout1]}>
            <Image
              style={[styles.groupWrapper, styles.groupLayout1]}
              resizeMode="cover"
              source={require("../assets/wheel/group-6356445.png")}
            />
            <View style={[styles.vectorParent, styles.groupItemLayout]}>
              <Image
                style={[styles.groupItem, styles.groupItemLayout]}
                resizeMode="cover"
                source={require("../assets/wheel/rectangle-407.png")}
              />
              <View style={styles.group}>
                <Text style={[styles.text, styles.textTypo1]}> </Text>
                <Text style={[styles.text1, styles.text1Position]}> </Text>
                <View style={[styles.cParent, styles.text1Position]}>
                  <Text style={[styles.c, styles.cTypo]}>C</Text>
                  <Text style={[styles.a, styles.aTypo]}>a</Text>
                  <Text style={[styles.t, styles.tTypo]}>t</Text>
                  <Text style={[styles.c1, styles.aTypo]}>c</Text>
                  <Text style={[styles.h, styles.aTypo]}>h</Text>
                  <Text style={[styles.e, styles.eTypo]}>E</Text>
                  <Text style={[styles.l, styles.cTypo]}>l</Text>
                  <Text style={[styles.z, styles.eTypo]}>Z</Text>
                  <Text style={[styles.h1, styles.aTypo]}>h</Text>
                  <Text style={[styles.a1, styles.aTypo]}>a</Text>
                  <Text style={[styles.r, styles.rPosition]}>r</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.groupView, styles.groupLayout]}>
          <Image
            style={[styles.groupInner, styles.groupLayout]}
            resizeMode="cover"
            source={require("../assets/wheel/group-6356444.png")}
          />
    <View style={styles.wheelContainer}>
        <Animated.View
          style={{
            transform: [{ rotate: rotationInterpolation }],
            position: "absolute",
            width: 2 * RADIUS,
            height: 2 * RADIUS,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {GIFT_IMAGES.map((image, index) => {
            const angle = (GIFT_ANGLE_INTERVAL * index) * (Math.PI / 180);
            const imageX =
              -50 / 2 + RADIUS * Math.cos(angle - Math.PI / 2); // Adjust the - Math.PI / 2 to change starting position if needed
            const imageY = -50 / 2 + RADIUS * Math.sin(angle - Math.PI / 2);
            return (
              <Image
                key={index}
                source={image}
                style={[styles.giftImage, { top: imageY, left: imageX }]}
                resizeMode="cover"
              />
            );
          })}
        </Animated.View>


    
</View>

          <View
            style={[
              styles.pinFillSharpCircle634Parent,
              styles.buttons1ShadowBox,
            ]}
          >
          
            <Image
              style={styles.pinFillSharpCircle634Icon}
              resizeMode="cover"
              source={require("../assets/wheel/knob1.png")}
            />
            
            <Image
              style={styles.unionIcon}
              resizeMode="cover"
              source={require("../assets/wheel/union.png")}
            />
     <TouchableOpacity style={styles.tourneButton} onPress={spinWheel}>
        <Text style={[styles.tourne, styles.text3Typo]}>Tourne</Text>
    </TouchableOpacity>
         </View>
         
        </View>
      <Text style={styles.text2}>Tourne La Roue !</Text>
      <Image
        style={[styles.roueDeFortuneWinChild, styles.rouePosition]}
        resizeMode="cover"
        source={require("../assets/wheel/group-6356469.png")}
      />
      <Image
        style={[styles.roueDeFortuneWinItem, styles.rouePosition]}
        resizeMode="cover"
        source={require("../assets/wheel/group-6356470.png")}
      />
      <View style={styles.roueDeFortuneWinInner}>
        <View
          style={[
            styles.a1ntnf3pjolAcCla21402000Parent,
            styles.frameWrapperFlexBox,
          ]}
        >
          
          <Image
            style={styles.a1ntnf3pjolAcCla21402000Icon}
            resizeMode="cover"
            source={require("../assets/wheel/a1ntnf3pjol-ac-cla-21402000-61sdruiwwllpng-00214020000000214002000-1.png")}
          />
          <View style={styles.frameParent}>
            <View>
              <Text style={[styles.text3, styles.textLayout]}>
                Félicitations !
              </Text>
              <View style={[styles.frameWrapper, styles.frameWrapperFlexBox]}>
                <View>
                  <View style={styles.textWrapper}>
                    <Text style={[styles.text4, styles.textTypo]}>
                      Vous avez gagné un Tee-shirt Fanta 🎉
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.buttons, styles.buttonsFlexBox]}>
         
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.buttons1, styles.buttonsFlexBox]}>
                <Image
                    style={styles.icons}
                    resizeMode="cover"
                    source={require("../assets/wheel/icons.png")}
                />
        </View>
    </View>

    </ScrollView>
  );
};
const styles = StyleSheet.create({
  groupLayout1: {
    height: 570,
    width: 320,
    position: "absolute",
  },
  tourneButton: {
    marginTop: -30,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
},
  groupItemLayout: {
    height: 64,
    width: 171,
    position: "absolute",
  },
  textTypo1: {
    height: 18,
    width: 3,
    textAlign: "left",
    color: Color.colorDarkorange,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: 11,
    transform: [
      {
        rotate: "-3.11deg",
      },
    ],
  },
  text1Position: {
    top: 1,
    position: "absolute",
  },
  cTypo: {
    height: 19,
    fontSize: FontSize.size_xs_4,
    transform: [
      {
        rotate: "-3.11deg",
      },
    ],
    textAlign: "left",
    color: Color.colorDarkorange,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  wheelContainer: {
    position: "relative",
    width: 2 * RADIUS,
    height: 2 * RADIUS,
    alignItems: "center",
    justifyContent: "center",
},
circleContainer: {
  position: 'absolute',   // This makes the Animated View (wheel) position itself relative to the parent (wheelContainer)
},
  aTypo: {
    width: 9,
    height: 19,
    fontSize: FontSize.size_xs_4,
    transform: [
      {
        rotate: "-3.11deg",
      },
    ],
    textAlign: "left",
    color: Color.colorDarkorange,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  tTypo: {
    width: 5,
    height: 19,
    fontSize: FontSize.size_xs_4,
    transform: [
      {
        rotate: "-3.11deg",
      },
    ],
    textAlign: "left",
    color: Color.colorDarkorange,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  eTypo: {
    width: 7,
    height: 19,
    fontSize: FontSize.size_xs_4,
    transform: [
      {
        rotate: "-3.11deg",
      },
    ],
    textAlign: "left",
    color: Color.colorDarkorange,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  rPosition: {
    top: 16,
    position: "absolute",
  },
  groupLayout: {
    height: 288,
    position: "absolute",
  },
  pointsIconLayout: {
    width: 39,
    position: "absolute",
  },
  iconLayout: {
    width: 38,
    position: "absolute",
  },
  buttons1ShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute",
  },
  text3Typo: {
    fontFamily: FontFamily.poppinsBold,
    fontSize: 12,
    color: Color.black,
    textAlign: "left",
    top: 0,
  },
  rouePosition: {
    opacity: 0.3,
    position: "absolute",
  },
  frameWrapperFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  textLayout: {
    lineHeight: 24,
    fontWeight: "700",
  },
  textTypo: {
    fontSize: FontSize.size_xs,
    textAlign: "left",
  },
  buttonsFlexBox: {
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_21xl,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  maskGroupIcon: {
    height: 329,
    width: 360,
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupWrapper: {
    left: 0,
    top: 0,
  },
  groupItem: {
    left: 0,
    top: 0,
  },
  text: {
    left: 63,
    transform: [
      {
        rotate: "-3.11deg",
      },
    ],
    top: 0,
    position: "absolute",
  },
  text1: {
    left: 91,
    transform: [
      {
        rotate: "-3.11deg",
      },
    ],
    height: 18,
    width: 3,
    textAlign: "left",
    color: Color.colorDarkorange,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
    fontSize: 11,
  },
  c: {
    top: 19,
    width: 11,
    left: 0,
  },
  a: {
    left: 14,
    top: 12,
  },
  t: {
    top: 7,
    left: 27,
    position: "absolute",
  },
  c1: {
    top: 5,
    left: 36,
  },
  h: {
    top: 2,
    left: 49,
  },
  e: {
    left: 72,
    top: 0,
  },
  l: {
    left: 84,
    width: 4,
    top: 0,
  },
  z: {
    top: 3,
    left: 102,
  },
  h1: {
    top: 6,
    left: 114,
  },
  a1: {
    top: 11,
    left: 128,
  },
  r: {
    left: 140,
    width: 5,
    height: 19,
    fontSize: FontSize.size_xs_4,
    transform: [
      {
        rotate: "-3.11deg",
      },
    ],
    textAlign: "left",
    color: Color.colorDarkorange,
    fontFamily: FontFamily.poppinsSemiBold,
    fontWeight: "600",
  },
  cParent: {
    height: 36,
    width: 145,
    left: 0,
  },
  group: {
    left: 11,
    height: 37,
    width: 145,
    top: 12,
    position: "absolute",
  },
  vectorParent: {
    top: 48,
    left: 74,
  },
  groupInner: {
    left: 5,
    width: 289,
    top: 0,
  },
  screenshot20230906At1258: {
    left: 89,
    width: 65,
    height: 61,
  },
  fantaDrifterCap111Icon: {
    top: 141,
    left: 228,
    width: 60,
    height: 60,
    position: "absolute",
  },
  s726988ac42ee41de8302867ce7f27Icon: {
    top: 184,
    left: 48,
    width: 59,
    height: 59,
    position: "absolute",
  },
  download81: {
    top: 188,
    left: 146,
    width: 54,
    height: 67,
    position: "absolute",
  },
  download71: {
    top: 26,
    left: 177,
    height: 92,
    width: 92,
    position: "absolute",
  },
  img2177659570327555898544900Icon: {
    top: 82,
    width: 86,
    height: 72,
    left: 0,
    position: "absolute",
  },
  pointsIcon: {
    top: 24,
    left: 153,
    height: 34,
  },
  pointsIcon1: {
    top: 51,
    left: 55,
    width: 41,
    height: 43,
    position: "absolute",
  },
  pointsIcon2: {
    top: 192,
    left: 205,
    height: 41,
  },
  pointsIcon3: {
    top: 229,
    left: 105,
    height: 34,
  },
  icon: {
    top: 153,
    left: 21,
    height: 37,
  },
  icon1: {
    top: 100,
    left: 231,
    height: 37,
  },
  pinFillSharpCircle634Icon: {
    height: "52.26%",
    width: "54.89%",
    top: "-32.28%",
    right: "21.9%",
    bottom: "45.46%",
    left: "23.21%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  unionIcon: {
    width: 48,
    height: 48,
 
  },
  giftImage: {
    position: "absolute",
    width: 50, // You might need to adjust this size
    height: 50, // You might need to adjust this size
  },
  tourne: {
    top: 50,
    left: 4,
    fontSize: 9,
    color: Color.black,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    position: "absolute",
  },
  pinFillSharpCircle634Parent: {
    height: "21%",
    width: "14.29%",
    top: "40.91%",
    right: "41.99%",
    bottom: "43.08%",
    left: "43.72%",
    shadowRadius: 0,
    elevation: 0,
  },
  groupView: {
    top: 128,
    left: 10,
    width: 294,
  },
  groupParent: {
    top: 87,
    left: 20,
  },
  text2: {
    marginLeft: -80,
    top: -10,
    fontSize: 20,
    lineHeight: 30,
    left: "50%",
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
    fontWeight: "700",
    textAlign: "left",
    position: "absolute",
  },
  roueDeFortuneWinChild: {
    top: 127,
    width: 55,
    height: 84,
    left: 14,
  },
  roueDeFortuneWinItem: {
    top: 42,
    left: 268,
    height: 138,
    width: 92,
  },
  a1ntnf3pjolAcCla21402000Icon: {
    borderRadius: 10,
    width: 79,
    height: 96,
  },
  text3: {
    fontSize: 18,
    width: 194,
    color: Color.black,
    fontFamily: FontFamily.poppinsBold,
    textAlign: "left",
    transform: [
      {
        rotate: "-3.11deg",
      },
    ],
  },
  text4: {
    lineHeight: 16,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    width: 197,
    color: Color.black,
    transform: [
      {
        rotate: "-3.11deg",
      },
    ],
  },
  textWrapper: {
    height: 32,
  },
  frameWrapper: {
    marginTop: 8,
  },
  text5: {
    fontFamily: FontFamily.customButton1,
    color: Color.colorGold,
    lineHeight: 24,
    fontWeight: "700",
  },
  buttons: {
    backgroundColor: Color.black,
    width: 98,
    height: 30,
    marginTop: 11,
  },
  frameParent: {
    marginLeft: 18,
  },
  a1ntnf3pjolAcCla21402000Parent: {
    width: 296,
    flexDirection: "row",
    justifyContent: "center",
  },
  roueDeFortuneWinInner: {
    marginLeft: -180,
    top: 598,
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: "rgba(248, 248, 248, 0.9)",
    borderStyle: "solid",
    borderColor: Color.goldVariant,
    borderTopWidth: 3,
    height: 202,
    paddingHorizontal: 36,
    paddingVertical: Padding.p_base,
    alignItems: "center",
    left: "50%",
    width: 360,
    position: "absolute",
    overflow: "hidden",
  },
  icons: {
    width: 24,
    height: 24,
  },
  buttons1: {
    top: 35,
    backgroundColor: Color.colorGold,
    shadowRadius: 20,
    elevation: 20,
    width: 40,
    height: 40,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute",
    left: 20,
  },
  roueDeFortuneWin: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
});

export default RoueDeFortuneWin;
