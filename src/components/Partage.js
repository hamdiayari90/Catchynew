import * as React from "react";
import { useState } from "react"; // <-- Add this import
import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { FontFamily, FontSize, Color, Border } from "../assets/partage/GlobalStyles";
import Share from 'react-native-share';

const Partage = () => {
  const [isVisible, setIsVisible] = useState(true); // <-- Add this state

  const shareMessage = (platform) => {
    const shareOptions = {
      title: 'Rejoignez la communauté Catchy',
      message: `Partager l'application avec vos amis sur  ${platform}`,
      url: 'https://play.google.com/store/apps/details?id=com.catchycatchous', // Uncomment if you want to share a URL.
    };

    Share.open(shareOptions);
  };
  if (!isVisible) return null; // Add this line at the start of your return statement

  return (
    <View style={styles.textParent}>
      <Text style={[styles.text, styles.textTypo]}>{`Partage sur `}</Text>
      <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Text style={styles.closeButton}>X</Text>
          </TouchableOpacity>
      <View style={styles.frameParent}>
        <TouchableOpacity onPress={() => shareMessage('Messenger')}>
          <View style={[styles.facebookMessengerLogo20201Parent, styles.parentFlexBox]}>
            <View style={styles.facebookMessengerLogo20201}>
              <Image
                style={styles.facebookMessengerLogo20201Child}
                resizeMode="cover"
                source={require("../assets/partage/group-6356498.png")}
              />
            </View>
            <Text style={[styles.messanger, styles.textTypo]}>Messanger</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shareMessage('WhatsApp')}>
          <View style={[styles.vecteezyWhatsappLogoTranspaParent, styles.parentFlexBox]}>
            <Image
              style={styles.iconLayout}
              resizeMode="cover"
              source={require("../assets/partage/vecteezy-whatsapplogotransparentpng-22101124-293-1.png")}
            />
            <Text style={[styles.messanger, styles.textTypo]}>WhatsApp</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shareMessage('Facebook')}>
          <View style={[styles.vecteezyWhatsappLogoTranspaParent, styles.parentFlexBox]}>
            <Image
              style={styles.iconLayout}
              resizeMode="cover"
              source={require("../assets/partage/group-6356497.png")}
            />
            <Text style={[styles.messanger, styles.textTypo]}>Facebook</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shareMessage('TikTok')}>
          <View style={[styles.vecteezyWhatsappLogoTranspaParent, styles.parentFlexBox]}>
            <Image
              style={[styles.vecteezyTiktokLogoOnTranspIcon, styles.iconLayout]}
              resizeMode="cover"
              source={require("../assets/partage/vecteezy-tiktoklogoontransparentbackground-6057996-1.png")}
            />
            <Text style={[styles.messanger, styles.textTypo]}>Tiktok</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.frameParent}>
        <TouchableOpacity onPress={() => shareMessage('Instagram Story')}>
          <View style={[styles.facebookMessengerLogo20201Parent, styles.parentFlexBox]}>
            <Image
              style={[styles.instagramLogo20161Icon, styles.iconLayout]}
              resizeMode="cover"
              source={require("../assets/partage/instagram-logo-2016-1.png")}
            />
            <Text style={[styles.messanger, styles.textTypo]}>Story</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shareMessage('Discord')}>
          <View style={[styles.vecteezyWhatsappLogoTranspaParent, styles.parentFlexBox]}>
            <Image
              style={styles.iconLayout}
              resizeMode="cover"
              source={require("../assets/partage/discordlogo11-1.png")}
            />
            <Text style={[styles.messanger, styles.textTypo]}>Discord</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => shareMessage('Instagram Direct')}>
          <View style={[styles.vecteezyWhatsappLogoTranspaParent, styles.parentFlexBox]}>
            <Image
              style={[styles.instagramLogo20161Icon, styles.iconLayout]}
              resizeMode="cover"
              source={require("../assets/partage/instagram-logo-2016-11.png")}
            />
            <Text style={[styles.messanger, styles.textTypo]}>Direct</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    lineHeight: 17,
    fontSize: FontSize.size_xs,
  },
  closeButton: {
    backgroundColor: Color.lightGrey2,
    top: -20,
    width: 24, // or any desired size
    height: 24, // or any desired size
    borderRadius: 12, // half of width/height to make it circle
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: FontSize.size_xs,
    fontWeight: 'bold',
    color: Color.darkGrey2,
    left: 300,
},
  parentFlexBox: {
    alignItems: "center",
    width: 74,
    justifyContent: "center",
  },
  iconLayout: {
    height: 46,
    width: 46,
  },
  text: {
    color: Color.lightGrey2,
  },
  facebookMessengerLogo20201Child: {
    position: "absolute",
    top: 9,
    left: 9,
    width: 28,
    height: 28,
    zIndex: 0,
  },
  facebookMessengerLogo20201: {
    borderRadius: 116,
    backgroundColor: Color.pureWhite,
    width: 47,
    height: 47,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  messanger: {
    color: Color.darkGrey2,
  },
  facebookMessengerLogo20201Parent: {
    justifyContent: "center",
  },
  vecteezyWhatsappLogoTranspaParent: {
    marginLeft: 10,
    justifyContent: "center",
  },
  vecteezyTiktokLogoOnTranspIcon: {
    borderRadius: 673,
  },
  frameParent: {
    width: 326,
    marginTop: 20,
    flexDirection: "row",
  },
  instagramLogo20161Icon: {
    overflow: "hidden",
  },
  textParent: {
    borderTopLeftRadius: Border.br_xl,
    borderTopRightRadius: Border.br_xl,
    backgroundColor: Color.background,
    borderStyle: "solid",
    borderColor: Color.goldVariant,
    borderTopWidth: 4,
    width: 360,
    height: 238,
    padding: 16,
    overflow: "hidden",
  },
});

export default Partage;
