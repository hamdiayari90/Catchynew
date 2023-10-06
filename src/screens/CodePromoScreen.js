import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MenuHeaders } from '../components/menuComponent/MenuHeaders';
import { HEIGHT, WIDTH } from '../utils/Dimension';

const promoCodes = [
  { id: 1, code: 'FANTA123', discount: '10%' },
  { id: 2, code: 'ZARA20', discount: '20%' },
  { id: 3, code: 'ADIDAS50', discount: '50%' },
];

const CodePromoScreen = ({ navigation }) => {
  const renderPromoCode = ({ item }) => (
    <View style={styles.promoCodeContainer}>
      <Text style={styles.promoCodeText}>Code: {item.code}</Text>
      <Text style={styles.promoCodeText}>Remise: {item.discount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ height: HEIGHT / 3.3 }}>
        <MenuHeaders navigation={navigation} title="SONDAGE" />
      </View>

      {/* Title */}
      <Text style={styles.title}>Mes code promos</Text>

      {/* Promo Code List */}
      <FlatList
        data={promoCodes}
        renderItem={renderPromoCode}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  retourButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  retourButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  promoCodeContainer: {
    marginVertical: 10,
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    width: WIDTH - 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoCodeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CodePromoScreen;
