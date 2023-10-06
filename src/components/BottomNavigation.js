import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontSize, FontFamily, Color, Border, Padding } from "../assets/home/GlobalStyles";
import Home from '../screens/HomeScreen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {HEIGHT, WIDTH} from '../utils/Dimension';

const Frame = ({ currentRouteName }) => {
  console.log("BottomNavigation received currentRouteName:", currentRouteName);

  console.log("Rendering tab with active route:", currentRouteName);

  const navigation = useNavigation();
  const [activeScreenName, setActiveScreenName] = React.useState("Home");
  React.useEffect(() => {
    setActiveScreenName(currentRouteName);
}, [currentRouteName]);
  const screenIconMap = {
    Home: require("../assets/home/icons5.png"),
    EventScreen: require("../assets/home/icons6.png"),
    Promotion: require("../assets/home/icons7.png"),
    Cadeaux: require("../assets/home/property-1gift-property-224.png"),
    Ecata: require("../assets/home/icons8.png")
  };

  const handleIconPress = (screenName) => {
    console.log("Navigating to:", screenName);
    setActiveScreenName(screenName);
    navigation.navigate(screenName);
}
  const renderIconWithText = (screenName, text) => {
    const iconSource = screenIconMap[screenName];
    return (
      <TouchableOpacity onPress={() => handleIconPress(screenName)}>
        <View 
          style={[
            styles.iconsParent, 
            styles.navMenuFlexBox, 
            activeScreenName === screenName ? {backgroundColor: Color.primary} : {}
          ]}
        >
          <Image style={styles.icons} resizeMode="cover" source={iconSource} />
          {activeScreenName === screenName && <Text style={styles.accueil}>{text}</Text>}
        </View>
      </TouchableOpacity>
    );
};

  const setTabActive = (tabName) => {
  setActiveScreenName(tabName);
};

  return (
    <View style={styles.navMenuParent}>
      <View style={[styles.navMenu, styles.navMenuFlexBox]}>
        {renderIconWithText("Home", "Accueil")}
        {renderIconWithText("EventScreen", "Évennements")}
        {renderIconWithText("Promotion", "Gagner")}
        {renderIconWithText("Cadeaux", "Cadeaux")}
        {renderIconWithText("Ecata", "Shop")}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  navMenuFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  iconsLayout: {
    width: 24,
    height: 24,
  },
  icons: {
    width: 16,
    height: 16,
  },
  accueil: {
    fontSize: 15,
    lineHeight: 16,
    fontWeight: "800",
    fontFamily: FontFamily.poppinsSemiBold,
    color: Color.black1,
    textAlign: "left",
    marginLeft: 2,
  },
  iconsParent: {
    borderRadius: Border.br_41xl,
    height: 48,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_9xs,
    justifyContent: "center",
  },
  icons1: {
    height: 24,
  },
  icons2: {
    width: 25,
    height: 24,
  },
  icons4: {
    overflow: "hidden",
    height: 24,
  },
  navMenu: {
    backgroundColor: Color.lightGrey4,
    width: WIDTH,
    paddingVertical: 0,
    justifyContent: "space-between",
    height: 64,
  },
  navMenuParent: {
    width: 372,
    height: 64,
  },
});

export default Frame;
