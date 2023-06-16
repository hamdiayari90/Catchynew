import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { Storage } from "../services/api";
import * as api from "../services/api";
import loyalty from "../constants/loyalty";
import { HEIGHT, WIDTH } from "../utils/Dimension";
import { Color, Font } from "../constants/colors/color";

const ProductModal = (props) => {
  console.log('props:', props.closeModal)
  const navigationN = useNavigation();

  function buy(price, id) {
    
    AsyncStorage.getItem("profile").then((result) => {
      if (result !== null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);

        const data = {
          userID: token.id,
          points: price,
          productId: id,
          contactTel: null,
        };
        navigationN.navigate("contact", { data: { data } });
      }
    });
  }

  useEffect(() => {
    Storage.getLoyaltyPoints().then((user) => {
      api
        .getUser(user.id)
        .then((user) => {
          loyalty.points = user.data.loyaltyPoints;
        })
        .catch((error) => Alert.alert("veuillez contacter l'administrateur"));
    });
  }, []);

  const ConfirmationDialog = (price, id, close) => {
    Alert.alert(
      "Veuillez  confirmer votre achat ",
      "Le prix du produit sera déduit de votre solde de points de fidélité",
      [
        {
          text: "Confirmer",
          onPress: () => {
            close()
            buy(price, id);
          },
        },
        {
          text: "Annuler",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={props.closeModal}>
            <Icon name="keyboard-arrow-left" size={30} />
          </TouchableOpacity>
        </View>
        {/* Body */}
        <View style={[styles.imgContainer]}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: Font.primary,
              fontWeight: "bold",
              fontSize: 20,
              textDecorationLine: "underline",
              textDecorationStyle: "double",
            }}
          >
            {props.item.name}{" "}
          </Text>
          <Image
            source={{
              uri: `data:image/png;base64,${props.item.image.picByte}`,
            }}
            style={styles.imageDimensions}
            resizeMode="cover"
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailModal}>Price</Text>
          <Text
            style={{
              fontWeight: "bold",
              color: props.item.price > props.userPoint ? "red" : "green",
              fontSize: 18,
            }}
          >
            {props.item.price} points
          </Text>
          <Text style={styles.detailModal}>Description</Text>
          <Text style={{ fontWeight: "bold" }}>{props.item.description}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <TouchableOpacity
            disabled={props.item.price > props.userPoint}
            style={[
              styles.btnContainer,
              {
                backgroundColor:
                  props.item.price > props.userPoint ? "#808e9b" : "green",
              },
            ]}
            onPress={() => ConfirmationDialog(props.item.price, props.item.id, props.closeModal)}
          >
            <Text style={styles.btnText}>ACHETER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontWeight: "bold",
  },
  badgeContainer: {
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  badgeText: {},
  imageDimensions: {
    borderRadius: 3.5,
    width: WIDTH - 50,

    height: HEIGHT / 2,
  },
  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    marginTop: 10,
    padding: 16,
    paddingTop: 30,

    backgroundColor: "#f5f6fa",
    marginHorizontal: 20,
    borderRadius: 5,
  },
  sizesContainer: {
    flexDirection: "row",
  },
  sizeCircleContainer: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  priceText: {
    fontFamily: Font.primary,
    fontSize: 16,
  },
  descriptionText: {
    fontSize: Font.primary,
    fontWeight: "bold",
  },
  footerContainer: {
    padding: 20,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },
  btnContainer: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    flex: 1,
  },
  btnContainer2: {
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  btnText: {
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1.3,
    fontSize: 16,
    fontFamily: Font.primary,
  },
  btnText2: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: Font.primary,
  },
  detailModal: { fontFamily: Font.primary, letterSpacing: 1.2, fontSize: 14 },
});

export default ProductModal;
