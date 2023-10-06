import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { FontFamily, Color, Border, Padding } from "../../assets/cads/GlobalStyles";

export const GiftItem = ({ item }) => {
  const textStyle = item.name.length > 17 ? styles.itemText : styles.itemText;
  let progressBarWidth = styles.frameInner.width;
  let reservationColor = Color.lightGrey3;
  let traitementColor = Color.lightGrey3;
  let expeditionColor = Color.lightGrey3;
  let livraisonColor = Color.lightGrey3;
  let frameItemColor = Color.lightGrey3; // Add this line

  if (item.status === 'InProgress') {
    progressBarWidth = styles.frameInner.width * 1 / 3;
    reservationColor = Color.accent; // Add this line
  } else if (item.status === 'OutForDelivery') {
    progressBarWidth = styles.frameInner.width * 2 / 3;
    reservationColor = Color.accent;
    traitementColor = Color.accent;
    frameItemColor = Color.accent; // Add this line
  } else if (item.status === 'Delivered') {
    progressBarWidth = styles.frameInner.width;
    reservationColor = Color.accent;
    traitementColor = Color.accent;
    expeditionColor = Color.accent;
    livraisonColor = Color.accent; // Make sure to set this color for Delivered status
    frameItemColor = Color.accent;
}
  return (
    <View>
      <View style={[styles.frameGroup, styles.frameFlexBox]}>
        <View style={[styles.frameChild, styles.frameFlexBox]} />
        <View style={[styles.maskGroupParent, styles.parentFlexBox]}>
          <Image
            style={styles.maskGroupIcon}
            resizeMode="cover"
            source={require("../../assets/cads/mask-group.png")}
          />
          <View style={styles.frameWrapper}>
            <View>
              <View style={styles.textParent}>
                <Text style={styles.text}>
                  {item.name.length > 17 ? item.name.substring(0, 17) + "..." : item.name}
                </Text>
                <Text style={styles.text1}>Cadeau gagné avec {item.price} points</Text>
              </View>
            </View>
          </View>
          <Image
              style={[
                styles.screenshot20230913At209,
                styles.frameWrapper1Position,
              ]}
              resizeMode="cover"
              source={{ uri: `https://www.catchy.tn/media/product/${item.image.name}` }}
          />
        </View>
        <View style={[styles.frameWrapper1, styles.frameWrapper1Position]}>
          <View style={[styles.lineParent, styles.parentFlexBox]}>
          <View style={[styles.frameItem, styles.framePosition, { borderColor: frameItemColor }]} /> 
          <View style={[styles.frameInner, { width: progressBarWidth, borderColor: Color.accent }, styles.framePosition]} />
            
            <View style={[styles.instanceParent, styles.instanceParentSpaceBlock]}>
              <Image
                style={[styles.groupIconLayout]}
                resizeMode="cover"
                source={require("../../assets/cads/group-6356436.png")}
              />
              <Text style={[styles.rservation, { color: reservationColor }, styles.expditionSpaceBlock]}>
                Réservation
              </Text>
            </View>
            <View style={[styles.instanceGroup, styles.instanceParentSpaceBlock]}>
              <View style={[styles.wrapper, styles.wrapperFlexBox, { borderColor: traitementColor, backgroundColor: traitementColor }]}>
                <Text style={[styles.text2, styles.textLayout]}>2</Text>
              </View>
              <Text style={[styles.rservation, { color: traitementColor }, styles.expditionSpaceBlock]}>
                Traitement
              </Text>
            </View>
            <View style={[
              styles.instanceContainer,
              styles.instanceParentSpaceBlock,
            ]}>
              <View style={[styles.container, styles.wrapperFlexBox, { backgroundColor: expeditionColor }]}>
                <Text style={[styles.text3, { color: expeditionColor }, styles.text3Typo]}>3</Text>
              </View>
              <Text style={[styles.expdition, { color: expeditionColor }, styles.text3Typo]}>
                Expédition
              </Text>
            </View>
            <View style={[styles.instanceParent1, styles.instanceParentSpaceBlock]}>
              <View style={[styles.container, styles.wrapperFlexBox, { backgroundColor: livraisonColor }]}>
                <Text style={[styles.text3, { color: livraisonColor }, styles.text3Typo]}>4</Text>
              </View>
              <Text style={[styles.expdition, { color: livraisonColor }, styles.text3Typo]}>
                Livraison
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frameFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  parentFlexBox: {
    flexDirection: "row",
    position: "absolute",
  },
  frameWrapper1Position: {
    position: "absolute",
    zIndex: 2,
  },
  framePosition: {
    left: 17,
    borderStyle: "solid",
    position: "absolute",
  },
  instanceParentSpaceBlock: {
    marginLeft: 6.72,
    width: 70,
  },
  expditionSpaceBlock: {
    marginTop: 7,
    fontSize: 10,
    lineHeight: 10,
  },
  wrapperFlexBox: {
    padding: 17,
    borderRadius: 101,
    justifyContent: "center",
    alignItems: "center",
  },
  textLayout: {
    lineHeight: 27,
    fontSize: 13,
  },
  text3Typo: {
    fontFamily: FontFamily.interRegular,
    color: Color.lightGrey2,
    textAlign: "left",
  },
  frameChild: {
    width: 319,
    height: 58,
    zIndex: 0,
  },
  maskGroupIcon: {
    flex: 1,
    maxWidth: "100%",
    height: 99,
    overflow: "hidden",
    zIndex: 0,
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.darkGrey2,
    textAlign: "left",
    lineHeight: 18,
    width: 139,
  },
  text1: {
    lineHeight: 16,
    marginTop: 8,
    color: Color.lightGrey2,
    fontSize: 10,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
    width: 139,
  },
  textParent: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    width: 139,
  },
  frameWrapper: {
    justifyContent: "space-between",
    marginLeft: 24,
    height: 99,
    zIndex: 1,
  },
  screenshot20230913At209: {
    top: 10,
    left: 15,
    width: 80,
    height: 80,
    zIndex: 2,
  },
  maskGroupParent: {
    top: 72,
    left: 10,
    width: 278,
    zIndex: 1,
  },
  frameItem: {
    top: 10,
    borderColor: Color.lightGrey3,
    borderTopWidth: 1,
    width: 238,
    height: 1,
    borderStyle: "solid",
    zIndex: 0,
  },
  frameInner: {
    top: 9,
    borderColor: Color.accent,
    borderTopWidth: 1.7,
    width: 69,
    height: 2,
    borderStyle: "solid",
    zIndex: 1,
  },
  groupIconLayout: {
    height: 35,
    width: 35,
  },
  rservation: {
    color: Color.accent,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  instanceParent: {
    zIndex: 2,
  },
  text2: {
    color: Color.pureWhite,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  wrapper: {
    backgroundColor: Color.accent,
    borderColor: "#ffd8b4",
  
    width: 24,
    height: 24,
    borderStyle: "solid",
  },
  instanceGroup: {
    height: 44,
    zIndex: 3,
  },
  text3: {
    width: 8,
    lineHeight: 27,
    fontSize: 13,
  },
  container: {
    backgroundColor: Color.lightGrey3,
    height: 15,
    width: 15,
  },
  expdition: {
    marginTop: 2,
    fontSize: 10,
    lineHeight: 18,
  },
  instanceContainer: {
    zIndex: 4,
  },
  instanceParent1: {
    zIndex: 5,
  },
  lineParent: {
    top: 3,
    left: 25,
    width: 300,
  },
  frameWrapper1: {
    top: 0,
    left: 0,
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: Color.lightGrey4,
    height: 56,
    zIndex: 2,
    overflow: "hidden",
    width: 320,
  },
  frameGroup: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.pureWhite,
    shadowColor: "#b0b0b0",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 2,
    elevation: 20,
    shadowOpacity: 1,
    height: 186,
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: 0,
    width: 320,
  },
});

