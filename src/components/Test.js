import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../../GlobalStyles";

export const Test = () => {
  return (
    <View style={styles.vido}>
      <View style={[styles.rectangleParent, styles.rectangleParentPosition]}>
        <View style={styles.groupShadowBox} />
        <Image
          style={[styles.womensLeadership, styles.iconLayout]}
          resizeMode="cover"
        //   source={require("../assets/womens-leadership@3x.png")}
        />
        <View style={[styles.groupParent, styles.groupParentPosition]}>
          <View style={styles.imGoingToShakeYParent}>
            <Text style={styles.imGoingTo}>Women's leadership conference</Text>
            <View style={[styles.minParent, styles.parentPosition1]}>
              <Text style={[styles.min, styles.minPosition]}>
                Radius Gallery • Santa Cruz
              </Text>
              <Image
                style={styles.groupItem}
                resizeMode="cover"
                // source={require("../assets/group-62@3x.png")}
              />
            </View>
          </View>
          <Text style={[styles.stMaySat, styles.stMaySatClr]}>
            1st May- Sat -2:00 PM
          </Text>
        </View>
        <Image
          style={styles.favoriteIconPosition}
          resizeMode="cover"
        //   source={require("../assets/favorite-active1@3x.png")}
        />
      </View>
      <View style={[styles.rectangleGroup, styles.rectangleParentPosition]}>
        <View style={styles.groupShadowBox} />
        <Image
          style={[styles.womensLeadership, styles.iconLayout]}
          resizeMode="cover"
        //   source={require("../assets/international-kids-safe.png")}
        />
        <View style={[styles.groupParent, styles.groupParentPosition]}>
          <View style={styles.imGoingToShakeYParent}>
            <Text style={styles.imGoingTo}>
              International kids safe parents night out
            </Text>
            <View style={[styles.minParent, styles.parentPosition1]}>
              <Text style={[styles.min, styles.minPosition]}>
                Radius Gallery • Santa Cruz
              </Text>
              <Image
                style={styles.groupItem}
                resizeMode="cover"
                // source={require("../assets/group-61.png")}
              />
            </View>
          </View>
          <Text style={[styles.stMaySat, styles.stMaySatClr]}>
            1st May- Sat -2:00 PM
          </Text>
        </View>
        <Image
          style={styles.favoriteIconPosition}
          resizeMode="cover"
        //   source={require("../assets/favorite-iactive.png")}
        />
      </View>
      <View style={[styles.vidoChild, styles.vidoChildPosition]} />
      <View style={[styles.vidoInner, styles.vidoInnerLayout]}>
        <View style={[styles.searchParent, styles.vidoInnerLayout]}>
          <Image
            style={[styles.searchIcon, styles.filtresPosition]}
            resizeMode="cover"
            // source={require("../assets/search.png")}
          />
          <Text style={[styles.recherche, styles.filtresTypo]}>
            Recherche...
          </Text>
          <View style={[styles.lineView, styles.borderBorder]} />
          <View style={[styles.rectangleContainer, styles.rectangleLayout]}>
            <View style={[styles.rectangleView, styles.rectangleLayout]} />
            <View style={[styles.groupView, styles.groupLayout]}>
              <Image
                style={[styles.groupChild1, styles.groupLayout]}
                resizeMode="cover"
                // source={require("../assets/group-18240.png")}
              />
              <Text style={[styles.filtres, styles.filtresPosition]}>
                Filtres
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={[styles.combinedShape2Parent, styles.rectangleParentPosition]}
      >
        <View style={styles.combinedShape2}>
          <View style={styles.combinedShape}>
            <View style={[styles.rectangle, styles.rectanglePosition]} />
            <View style={[styles.rectangleCopy5, styles.rectanglePosition]} />
            <View style={[styles.rectangleCopy6, styles.rectanglePosition]} />
          </View>
        </View>
        <Image
          style={[styles.groupChild2, styles.groupChild2Position]}
          resizeMode="cover"
        //   source={require("../assets/group-18103.png")}
        />
        <View style={[styles.frameParent, styles.groupChild2Position]}>
          <View style={styles.currentLocationParent}>
            <Text style={[styles.currentLocation, styles.timeTypo]}>
              Localisation actuelle
            </Text>
            <Image
              style={[styles.icon, styles.iconLayout]}
              resizeMode="cover"
            //   source={require("../assets/.png")}
            />
          </View>
          <Text style={[styles.dhakaBangladesh, styles.timeTypo]}>
            Tunis, TN
          </Text>
        </View>
      </View>
      <View style={styles.vectorParent}>
        <Image
          style={[styles.rectangleIcon, styles.iconLayout]}
          resizeMode="cover"
        //   source={require("../assets/rectangle-83.png")}
        />
        <View style={[styles.iconlyboldcalendarParent, styles.parentPosition]}>
          <Image
            style={[styles.iconlyboldcalendar, styles.groupChildPosition]}
            resizeMode="cover"
           // source={require("../assets/iconlyboldcalendar.png")}
          />
          <Text style={[styles.events, styles.timeTypo]}>Events</Text>
        </View>
        <Text style={[styles.explorer, styles.timeTypo]}>Explorer</Text>
        <Image
          style={[styles.groupChild3, styles.groupChild3Layout]}
          resizeMode="cover"
          //source={require("../assets/group-33335.png")}
        />
        <View style={styles.uiElements1HomeIndicatorWrapper}>
          <View style={styles.uiElements1HomeIndicator}>
            <View style={[styles.barsHomeIndicatorOnLig, styles.homeLayout]}>
              <View style={[styles.homeIndicator, styles.homeLayout]} />
            </View>
          </View>
        </View>
        <View style={styles.ovalParent}>
          <Image
            style={[styles.ovalIcon, styles.iconLayout]}
            resizeMode="cover"
           // source={require("../assets/oval.png")}
          />
          <Text style={[styles.addBoxMaterial, styles.filtresTypo]}></Text>
        </View>
        <View style={[styles.profileParent, styles.parentPosition]}>
          <Text style={[styles.events, styles.timeTypo]}>Profile</Text>
          <Image
            style={[styles.groupChild4, styles.groupChildPosition]}
            resizeMode="cover"
        //    source={require("../assets/group-33337.png")}
          />
        </View>
        <View style={[styles.mapParent, styles.parentPosition]}>
          <Text style={[styles.events, styles.timeTypo]}>Map</Text>
          <Image
            style={[styles.groupChild5, styles.groupChildPosition]}
            resizeMode="cover"
            source={require("../assets/group-33338.png")}
          />
        </View>
      </View>
      <View style={[styles.barsStatusBarIphoneL, styles.vidoChildPosition]}>
        <View style={styles.battery}>
          <View style={[styles.border, styles.borderBorder]} />
          <Image
            style={styles.capIcon}
            resizeMode="cover"
           // source={require("../assets/cap.png")}
          />
          <View style={styles.capacity} />
        </View>
        <Image
          style={styles.wifiIcon}
          resizeMode="cover"
         // source={require("../assets/wifi.png")}
        />
        <Image
          style={styles.cellularConnectionIcon}
          resizeMode="cover"
        //  source={require("../assets/cellular-connection.png")}
        />
        <View style={[styles.timeStyle, styles.timeLayout]}>
          <Text style={[styles.time, styles.timeLayout]}>9:41</Text>
        </View>
      </View>
      <View style={[styles.popularParent, styles.groupChild3Layout]}>
        <Text
          style={[styles.popular, styles.popularTypo]}
        >{`Watch & Win`}</Text>
        <View style={[styles.allCopyParent, styles.parentPosition1]}>
          <Text style={[styles.allCopy, styles.minPosition]}>Voir tout</Text>
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
         //   source={require("../assets/vector-1.png")}
          />
        </View>
      </View>
      <View style={styles.rectangleParent1}>
        <View style={styles.rectangle1} />
        <View style={styles.groupGroup}>
          <Image
            style={[styles.groupIcon1, styles.iconLayout]}
            resizeMode="cover"
          //  source={require("..//group.png")}
          />
          <Text style={[styles.vousAvez3000, styles.filtresTypo]}>
            Vous avez 3000 points
          </Text>
        </View>
        <View style={styles.groupWrapper}>
          <View style={styles.uiElements1HomeIndicator}>
            <View style={styles.rectangleShadowBox} />
            <Text style={[styles.onLive, styles.liveTypo]}>Redeem</Text>
          </View>
        </View>
        <Image
          style={styles.frameChild}
          resizeMode="cover"
        //  source={require("..//rectangle-4158.png")}
        />
      </View>
      <View style={styles.card1Parent}>
        <View style={[styles.card1, styles.cardLayout]}>
          <View style={styles.card1ShadowBox} />
          <Image
            style={[styles.favoriteIActiveIcon1, styles.favoriteIconPosition]}
            resizeMode="cover"
        //    source={require("..//favorite-iactive1.png")}
          />
          <View
            style={[
              styles.imGoingToShakeYContainer,
              styles.groupParentPosition,
            ]}
          >
            <Text style={[styles.imGoingTo2, styles.popularTypo]}>
              Vidéo publicitaire : Coca Cola Ad
            </Text>
            <Text style={[styles.stMaySat, styles.stMaySatClr]}>
              200 points
            </Text>
          </View>
          <View style={styles.signalDentifriceDoseurSyste} />
          <Image
            style={[styles.tlchargement41, styles.tlchargementLayout]}
            resizeMode="cover"
         //   source={require("..//tlchargement-4-1.png")}
          />
        </View>
        <View style={[styles.card11, styles.cardLayout]}>
          <View style={styles.card1ShadowBox} />
          <Image
            style={[styles.favoriteIActiveIcon1, styles.favoriteIconPosition]}
            resizeMode="cover"
         //   source={require("..//favorite-active1.png")}
          />
          <View
            style={[
              styles.imGoingToShakeYContainer,
              styles.groupParentPosition,
            ]}
          >
            <Text style={[styles.imGoingTo2, styles.popularTypo]}>
              Vidéo éducatif : Rock LMS Tunisie
            </Text>
            <Text style={[styles.stMaySat, styles.stMaySatClr]}>
              1200 points
            </Text>
          </View>
          <View style={[styles.rectangleParent3, styles.groupFrameLayout]}>
            <View style={styles.rectangleShadowBox} />
            <Text style={[styles.onLive1, styles.liveTypo]}>Regarder</Text>
          </View>
          <Image
            style={[styles.tlchargement42, styles.tlchargementLayout]}
            resizeMode="cover"
          //  source={require("..//tlchargement-4-2.png")}
          />
        </View>
        <View style={[styles.groupFrame, styles.groupFrameLayout]}>
          <View style={styles.uiElements1HomeIndicator}>
            <View style={styles.rectangleShadowBox} />
            <Text style={[styles.onLive1, styles.liveTypo]}>Regarder</Text>
          </View>
        </View>
      </View>
      <Image
        style={styles.cart1Icon}
        resizeMode="cover"
      //  source={require("..//cart-1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rectangleParentPosition: {
    right: "6.4%",
    width: "87.2%",
    left: "6.4%",
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  groupParentPosition: {
    left: "32.72%",
    position: "absolute",
  },
  parentPosition1: {
    height: 35,
    top: "50%",
    position: "absolute",
  },
  minPosition: {
    color: Color.slategray_100,
    marginTop: -17.6,
    // fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    top: "50%",
    position: "absolute",
  },
  stMaySatClr: {
    color: Color.colorPrimaryBlue,
    fontSize: 25,
    position: "absolute",
  },
  vidoChildPosition: {
    width: 777,
    left: 0,
    position: "absolute",
  },
  vidoInnerLayout: {
    height: 69,
    width: 677,
    position: "absolute",
  },
  filtresPosition: {
    top: 10,
    position: "absolute",
  },
  filtresTypo: {
    // fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    textAlign: "left",
  },
  borderBorder: {
    borderStyle: "solid",
    position: "absolute",
  },
  rectangleLayout: {
    height: 67,
    width: 155,
    position: "absolute",
  },
  groupLayout: {
    height: 49,
    position: "absolute",
  },
  rectanglePosition: {
    backgroundColor: Color.gainsboro,
    left: "100%",
    height: "12.5%",
    borderRadius: 3,
    position: "absolute",
  },
  groupChild2Position: {
    height: 75,
    top: 0,
    position: "absolute",
  },
  timeTypo: {
    textAlign: "center",
    // fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
  },
  parentPosition: {
    opacity: 0.2,
    bottom: "35.44%",
    top: "35.14%",
    height: "29.42%",
    position: "absolute",
  },
  groupChildPosition: {
    bottom: "29.57%",
    height: "70.43%",
    maxHeight: "100%",
    maxWidth: "100%",
    top: "0%",
    position: "absolute",
    overflow: "hidden",
  },
  groupChild3Layout: {
    height: 48,
    position: "absolute",
  },
  homeLayout: {
    height: 10,
    width: 278,
    left: "50%",
    position: "absolute",
  },
  timeLayout: {
    width: 112,
    position: "absolute",
  },
  popularTypo: {
    fontSize: 37,
    textAlign: "left",
    color: Color.colorTypographyTitle,
    // fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    left: "0%",
    position: "absolute",
  },
  liveTypo: {
    top: "14.29%",
    textAlign: "center",
    color: Color.secondaryWhite100,
    fontSize: 25,
    // fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    position: "absolute",
  },
  cardLayout: {
    height: 232,
    width: 677,
    left: 0,
    position: "absolute",
  },
  favoriteIconPosition: {
    left: "90.83%",
    bottom: "73.21%",
    right: "4.25%",
    top: "12.5%",
    width: "4.93%",
    height: "14.29%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  tlchargementLayout: {
    bottom: "27.57%",
    top: "26.79%",
    width: "15.29%",
    height: "45.65%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  groupFrameLayout: {
    width: "20.49%",
    position: "absolute",
  },
  groupShadowBox: {
    shadowOpacity: 1,
    elevation: 62.13,
    shadowRadius: 62.13,
    shadowOffset: {
      width: 0,
      height: 16.56927490234375,
    },
    shadowColor: "rgba(80, 85, 136, 0.06)",
    borderRadius: 37,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
    backgroundColor: Color.secondaryWhite100,
  },
  womensLeadership: {
    height: "82.14%",
    width: "24.16%",
    top: "8.93%",
    right: "72.78%",
    bottom: "8.93%",
    left: "3.06%",
  },
  imGoingTo: {
    marginTop: -66.28,
    textAlign: "left",
    color: Color.colorTypographyTitle,
    // fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    fontSize: 31,
    top: "50%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  min: {
    left: "12.5%",
    fontSize: 27,
    textAlign: "left",
  },
  groupItem: {
    width: 33,
    height: 33,
    left: 0,
    top: 2,
    position: "absolute",
  },
  minParent: {
    marginTop: 31.07,
    width: "92.15%",
    right: "7.85%",
    left: "0%",
  },
  imGoingToShakeYParent: {
    marginTop: -44.53,
    height: 133,
    top: "50%",
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  stMaySat: {
    textTransform: "uppercase",
    textAlign: "left",
    // fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    left: "0%",
    top: "0%",
  },
  groupParent: {
    marginTop: -89.06,
    width: "58.41%",
    right: "8.87%",
    height: 176,
    top: "50%",
  },
  rectangleParent: {
    top: "91.26%",
    bottom: "-5.05%",
    left: "6.4%",
    height: "13.79%",
    width: "87.2%",
  },
  rectangleGroup: {
    top: "106.77%",
    bottom: "-20.57%",
    left: "6.4%",
    height: "13.79%",
    width: "87.2%",
  },
  vidoChild: {
    borderBottomRightRadius: 68,
    borderBottomLeftRadius: 68,
    backgroundColor: Color.blueviolet_100,
    height: 371,
    top: 0,
  },
  searchIcon: {
    height: 50,
    width: 50,
    left: 0,
    overflow: "hidden",
  },
  recherche: {
    left: 85,
    fontSize: 42,
    letterSpacing: -2,
    opacity: 0.3,
    color: Color.secondaryWhite100,
    top: 0,
    textAlign: "left",
    position: "absolute",
  },
  lineView: {
    top: 13,
    left: 69,
    borderColor: "#7974e7",
    borderRightWidth: 2.1,
    width: 2,
    height: 43,
  },
  rectangleView: {
    borderRadius: 104,
    backgroundColor: Color.mediumslateblue_100,
    top: 0,
    left: 0,
  },
  groupChild1: {
    width: 49,
    top: 0,
    left: 0,
  },
  filtres: {
    left: 57,
    width: 74,
    height: 17,
    color: Color.secondaryWhite100,
    fontSize: 25,
    textAlign: "left",
    // fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
  },
  groupView: {
    left: 9,
    width: 131,
    top: 8,
  },
  rectangleContainer: {
    left: 522,
    top: 2,
  },
  searchParent: {
    top: 0,
    left: 0,
  },
  vidoInner: {
    top: 205,
    left: 50,
  },
  rectangle: {
    top: "270.83%",
    bottom: "-183.33%",
    right: "-100%",
    backgroundColor: Color.gainsboro,
    left: "100%",
    height: "12.5%",
    width: "100%",
  },
  rectangleCopy5: {
    width: "75%",
    top: "314.58%",
    right: "-75%",
    bottom: "-227.08%",
    backgroundColor: Color.gainsboro,
    left: "100%",
    height: "12.5%",
  },
  rectangleCopy6: {
    top: "358.33%",
    bottom: "-270.83%",
    right: "-100%",
    backgroundColor: Color.gainsboro,
    left: "100%",
    height: "12.5%",
    width: "100%",
  },
  combinedShape: {
    height: 40,
    width: 50,
    backgroundColor: Color.secondaryWhite100,
  },
  combinedShape2: {
    height: "53.33%",
    width: "7.34%",
    top: "22.22%",
    right: "92.66%",
    bottom: "24.44%",
    opacity: 0.94,
    left: "0%",
    position: "absolute",
  },
  groupChild2: {
    left: 603,
    width: 75,
  },
  currentLocation: {
    marginTop: -16.57,
    left: "2.8%",
    fontSize: 21,
    opacity: 0.7,
    color: Color.secondaryWhite100,
    top: "50%",
    position: "absolute",
  },
  icon: {
    height: "31.25%",
    width: "9.35%",
    top: "37.5%",
    bottom: "31.25%",
    left: "90.65%",
    opacity: 0.9,
    right: "0%",
  },
  currentLocationParent: {
    height: "44.44%",
    width: "87.7%",
    right: "5.74%",
    bottom: "55.56%",
    left: "6.56%",
    top: "0%",
    position: "absolute",
    overflow: "hidden",
  },
  dhakaBangladesh: {
    marginTop: -6.21,
    left: "27.87%",
    color: Color.ghostwhite,
    fontSize: 27,
    top: "50%",
    position: "absolute",
  },
  frameParent: {
    left: 211,
    width: 253,
    overflow: "hidden",
  },
  combinedShape2Parent: {
    height: "4.43%",
    top: "5.42%",
    bottom: "90.15%",
    left: "6.4%",
  },
  rectangleIcon: {
    height: "89.19%",
    top: "10.81%",
    left: "0%",
    bottom: "0%",
    right: "0%",
    width: "100%",
  },
  iconlyboldcalendar: {
    width: "65.71%",
    right: "17.14%",
    left: "17.14%",
  },
  events: {
    top: "70.43%",
    color: Color.darkslategray,
    fontSize: 25,
    left: "0%",
    position: "absolute",
  },
  iconlyboldcalendarParent: {
    width: "9.33%",
    right: "61.87%",
    left: "28.8%",
  },
  explorer: {
    top: "55.86%",
    left: "7.2%",
    color: Color.colorPrimaryBlue,
    fontSize: 25,
    position: "absolute",
  },
  groupChild3: {
    top: 81,
    left: 79,
    width: 48,
  },
  homeIndicator: {
    marginLeft: -138.77,
    bottom: 0,
    borderRadius: 207,
    backgroundColor: Color.darkslategray,
  },
  barsHomeIndicatorOnLig: {
    marginTop: 6.21,
    marginLeft: -137.73,
    top: "50%",
    overflow: "hidden",
  },
  uiElements1HomeIndicator: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  uiElements1HomeIndicatorWrapper: {
    height: "30.63%",
    top: "69.37%",
    opacity: 0.1,
    left: "0%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  ovalIcon: {
    height: "186.96%",
    width: "186.96%",
    top: "-26.09%",
    right: "-43.48%",
    bottom: "-60.87%",
    left: "-43.48%",
  },
  addBoxMaterial: {
    marginTop: -20.71,
    left: "28.26%",
    fontSize: 41,
    color: Color.secondaryWhite100,
    textAlign: "left",
    top: "50%",
    position: "absolute",
  },
  ovalParent: {
    height: "41.44%",
    width: "12.27%",
    right: "44%",
    bottom: "58.56%",
    left: "43.73%",
    top: "0%",
    position: "absolute",
  },
  groupChild4: {
    width: "67.65%",
    right: "14.71%",
    left: "17.64%",
  },
  profileParent: {
    width: "9.07%",
    right: "8%",
    left: "82.93%",
  },
  groupChild5: {
    width: "95.83%",
    right: "4.17%",
    left: "0%",
  },
  mapParent: {
    width: "6.4%",
    right: "29.07%",
    left: "64.53%",
  },
  vectorParent: {
    height: "13.67%",
    top: "86.33%",
    left: "0%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  border: {
    right: 5,
    borderRadius: 6,
    borderColor: "#fff",
    borderWidth: 2.1,
    width: 46,
    opacity: 0.35,
    height: 23,
    top: 0,
  },
  capIcon: {
    right: 0,
    width: 3,
    height: 8,
    opacity: 0.4,
    top: 8,
    position: "absolute",
  },
  capacity: {
    top: 4,
    right: 9,
    width: 37,
    height: 15,
    borderRadius: 3,
    position: "absolute",
    backgroundColor: Color.secondaryWhite100,
  },
  battery: {
    top: 36,
    right: 32,
    height: 23,
    width: 50,
    position: "absolute",
  },
  wifiIcon: {
    width: 32,
    height: 23,
  },
  cellularConnectionIcon: {
    width: 35,
    height: 22,
  },
  time: {
    marginTop: -7.25,
    letterSpacing: -1,
    textAlign: "center",
    // fontFamily: FontFamily.theSansBold,
    fontWeight: "700",
    color: Color.secondaryWhite100,
    left: 0,
    fontSize: 31,
    top: "50%",
  },
  timeStyle: {
    top: 15,
    left: 43,
    height: 43,
  },
  barsStatusBarIphoneL: {
    top: -2,
    height: 91,
  },
  popular: {
    marginTop: -23.82,
    lineHeight: 70,
    opacity: 0.84,
    top: "50%",
  },
  allCopy: {
    fontSize: FontSize.size_10xl,
    lineHeight: 48,
    textAlign: "right",
    left: "0%",
  },
  vectorIcon: {
    top: 18,
    left: 123,
    borderRadius: 2,
    width: 13,
    height: 19,
    opacity: 0.5,
    position: "absolute",
  },
  allCopyParent: {
    marginTop: -11.39,
    width: "20.11%",
    left: "79.89%",
    right: "0%",
  },
  popularParent: {
    marginTop: -389.38,
    width: "87.12%",
    right: "6.48%",
    top: "50%",
    left: "6.4%",
  },
  rectangle1: {
    backgroundColor: Color.gray_100,
    shadowColor: "rgba(90, 90, 90, 0.1)",
    elevation: 41.42,
    shadowRadius: 41.42,
    borderRadius: 62,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 16.56927490234375,
    },
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  groupIcon1: {
    height: "104.17%",
    width: "16.87%",
    top: "-2.08%",
    right: "83.47%",
    bottom: "-2.08%",
    left: "-0.34%",
  },
  vousAvez3000: {
    height: "39.56%",
    width: "81.04%",
    top: "14.63%",
    left: "18.96%",
    color: Color.blueviolet_200,
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    fontSize: 31,
    position: "absolute",
  },
  groupGroup: {
    height: "56.96%",
    width: "71.53%",
    top: "16.67%",
    right: "23.73%",
    bottom: "26.37%",
    left: "4.75%",
    position: "absolute",
  },
  rectangleShadowBox: {
    shadowColor: "rgba(74, 210, 228, 0.08)",
    backgroundColor: Color.colorPrimaryBlue,
    borderRadius: Border.br_mini_5,
    elevation: 41.42,
    shadowRadius: 41.42,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 16.56927490234375,
    },
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  onLive: {
    left: "17.91%",
  },
  groupWrapper: {
    height: "46.67%",
    width: "22.71%",
    top: "26.67%",
    right: "4.75%",
    bottom: "26.67%",
    left: "72.54%",
    position: "absolute",
  },
  frameChild: {
    height: "66.67%",
    width: "13.56%",
    top: "13.33%",
    right: "83.39%",
    bottom: "20%",
    left: "3.05%",
    borderRadius: 62,
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  rectangleParent1: {
    top: 309,
    left: 97,
    width: 611,
    height: 124,
    position: "absolute",
  },
  card1ShadowBox: {
    elevation: 51.78,
    shadowRadius: 51.78,
    shadowColor: "rgba(83, 89, 144, 0.07)",
    borderRadius: 33,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 16.56927490234375,
    },
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
    backgroundColor: Color.secondaryWhite100,
  },
  favoriteIActiveIcon1: {
    display: "none",
  },
  imGoingTo2: {
    top: "46.52%",
    lineHeight: 52,
    width: "100%",
  },
  imGoingToShakeYContainer: {
    height: "40.3%",
    width: "59.02%",
    top: "16.96%",
    right: "8.26%",
    bottom: "42.73%",
  },
  signalDentifriceDoseurSyste: {
    height: "89.29%",
    width: "30.58%",
    top: "10.71%",
    right: "71.56%",
    left: "-2.14%",
    bottom: "0%",
    position: "absolute",
  },
  tlchargement41: {
    right: "79.2%",
    left: "5.5%",
  },
  card1: {
    top: 0,
  },
  onLive1: {
    left: "14.93%",
  },
  rectangleParent3: {
    height: "25%",
    top: "67.86%",
    right: "5.2%",
    bottom: "7.14%",
    left: "74.31%",
  },
  tlchargement42: {
    right: "78.59%",
    left: "6.12%",
  },
  card11: {
    top: 265,
  },
  groupFrame: {
    height: "11.67%",
    top: "31.67%",
    right: "6.42%",
    bottom: "56.67%",
    left: "73.09%",
  },
  card1Parent: {
    top: 541,
    left: 41,
    height: 497,
    width: 677,
    position: "absolute",
  },
  cart1Icon: {
    top: 1466,
    left: 352,
    width: 62,
    height: 62,
    position: "absolute",
  },
  vido: {
    flex: 1,
    height: 1682,
    overflow: "hidden",
    width: "100%",
    backgroundColor: "#eee",
  },
});


