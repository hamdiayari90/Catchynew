import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {Font, Color} from '../constants/colors/color';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import {useNavigation} from '@react-navigation/native';
import {Card} from 'react-native-paper';
import {GlobalButton} from '../components/Button/GlobalButton';

export const OneProduct = props => {
  const navigationN = useNavigation();

  const buyGifts = (price, id) => {
    AsyncStorage.getItem('profile').then(result => {
      if (result !== null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);

        const data = {
          userID: token.id,
          points: price,
          productId: id,
          contactTel: null,
        };
        navigationN.navigate('contact', {data: {data}});
      }
    });
  };
  const [modalVisible, setModalVisible] = useState(false);

  const openModalConfirm = async (price, id) => {
    if (price < loyaltyPoints) {
      setModalVisible(() => true);
    }
  };

  const {loyaltyPoints} = props.route.params.userInfo;

  const {
    id,
    name,
    price,
    description,
    image: {picByte},
  } = props.route.params.data;

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(() => false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Veuillez confirmer votre achat</Text>
            <Text style={styles.modalText}>
              Le prix du produit sera déduit de votre solde de points de
              fidélité
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '100%',
              }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}> Annuler </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => buyGifts(price, id)}>
                <Text style={styles.textStyle}>Confirmer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Card
        style={{
          flex: 1,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.17,
          shadowRadius: 3.05,
          elevation: 4,
        }}>
        <View style={[styles.container]}>
          <Card.Cover
            source={{uri: `data:image/png;base64,${picByte}`}}
            resizeMode="center"
            style={{
              width: '100%',
              height: '40%',
              backgroundColor: Color.light,
            }}></Card.Cover>
          <View>
            <Text style={styles.description}>{name}</Text>
            <Text
              style={[
                styles.description,
                {color: price > loyaltyPoints ? '#ccc' : Color.primary},
              ]}>
              {price} points
            </Text>
            <Text
              style={[
                styles.description,
                {letterSpacing: 1.2, marginTop: '3%', color: '#636e72'},
              ]}>
              {description}
            </Text>
          </View>
          {/* Footer */}
          <View style={styles.footerContainer}>
            <GlobalButton
              diableBtn={price > loyaltyPoints}
              title="ACHETER"
              onPress={() => openModalConfirm(price, id)}
            />
          </View>
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageDimensions: {
    borderRadius: 3.5,
    width: WIDTH - 50,

    height: HEIGHT / 2,
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    marginTop: 10,
    padding: 16,
    paddingTop: 30,

    backgroundColor: '#f5f6fa',
    marginHorizontal: 20,
    borderRadius: 5,
  },

  footerContainer: {
    padding: 20,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },

  detailModal: {fontFamily: Font.primary, letterSpacing: 1.2, fontSize: 14},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: '10%',
    paddingVertical: '0.5%',
    fontFamily: Font.InterBold,
  },
});
