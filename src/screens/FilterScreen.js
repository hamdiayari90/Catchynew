import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuHeaders } from '../components/menuComponent/MenuHeaders';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import {FlatList} from 'react-native';
import LottieView from 'lottie-react-native';
import catoutAnimation from '../assets/animated/catout.json'; // Replace this with the path to your Lottie animation JSON file
import ResultScreen from './ResultScreen';
const FilterScreen = () => {
  const navigation = useNavigation();
  const [interests, setInterests] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isInterestDropdownVisible, setIsInterestDropdownVisible] = useState(false);
  const [isProductDropdownVisible, setIsProductDropdownVisible] = useState(false);

  useEffect(() => {
    // Fetch the list of "centres d'intérêts" from the API
    fetchInterests();
    // Fetch the list of products from the API
    fetchProducts();
  }, []);

  const fetchInterests = async () => {
    try {
      const response = await fetch('http://94.237.82.88:8082/interests');
      if (!response.ok) {
        throw new Error('Failed to fetch interest data');
      }
      const data = await response.json();
      setInterests(data);
    } catch (error) {
      console.error('Error fetching interests:', error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://94.237.82.88:8082/partner-products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleInterestSelect = (interestId) => {
    setSelectedInterest(interestId);
    setIsInterestDropdownVisible(false);
  };
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsProductDropdownVisible(false);
  };

  return (
    <>
      <View style={{ height: HEIGHT / 3.8 }}>
        <MenuHeaders navigation={navigation} title="Filtres" />
      </View>
  
    <View style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        </TouchableOpacity>
        <Text style={styles.title}>Filtrez vos recherches</Text>
        <View style={styles.lottieContainer}>
          <LottieView
            source={require('../assets/animated/catous.json')}
            autoPlay
            loop
            style={styles.lottieIcon}
          />
        </View>
      </View>

      {/* Display the dropdown list of selectable "centres d'intérêts" */}
      <View style={styles.centreContainer}>
        <Text style={styles.subtitle}>Par catégorie</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setIsInterestDropdownVisible(true)}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedInterest ? selectedInterest.name : 'Sélectionner un centre d\'intérêt'}
          </Text>
        </TouchableOpacity>
        <Modal
          visible={isInterestDropdownVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsInterestDropdownVisible(false)}
        >
          <View style={styles.dropdownModal}>
            {interests.map((interest) => (
              <TouchableOpacity
                key={interest.id}
                style={styles.dropdownItem}
                onPress={() => handleInterestSelect(interest)}
              >
                <Text style={styles.dropdownItemText}>{interest.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      </View>

          
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonReset}>
          <Text style={styles.buttonText}>Réinitialiser</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.buttonApply}
          onPress={() => navigation.navigate('ResultScreen', { selectedInterestId: selectedInterest.id })}
        >
          <Text style={[styles.buttonText, styles.buttonTextBlack]}>Appliquer</Text>
          
        </TouchableOpacity>
        
      </View>
      <View style={styles.animationContainer}>
              <LottieView
                source={catoutAnimation} // Replace this with the imported Lottie animation
                autoPlay
                loop
                style={styles.animation}
              />
            </View> 
    </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconOption: {
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 100,
    height: 100,
  },
  iconText: {
    fontSize: 14,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  smallForm: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  smallFormText: {
    fontSize: 14,
    color: '#333',
  },
  sponsorContainer: {
    marginBottom: 16,
  },
  sponsor: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
    productContainer: {
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownModal: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 32,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
  sponsorText: {
    fontSize: 14,
    color: '#333',
  },
  centreContainer: {
    marginBottom: 16,
  },
  centreForms: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centreForm: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  centreFormText: {
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonReset: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  lottieContainer: {
    position: 'absolute',
    left: 0,
    right: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieIcon: {
    width: 200,
    height: 200,
  },
  buttonApply: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 12,
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
  },
  buttonTextBlack: {
    color: '#fff',
  },
});

export default FilterScreen;
