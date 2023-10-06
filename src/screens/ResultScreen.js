import React, { useState, useEffect } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { MenuHeaders } from '../components/menuComponent/MenuHeaders';
import { useNavigation } from '@react-navigation/native';
import { HEIGHT, WIDTH } from '../utils/Dimension';
import { FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import catoutAnimation from '../assets/animated/catout.json'; // Replace this with the path to your Lottie animation JSON file

const ResultScreen = ({ route }) => {
  const { selectedInterestId } = route.params;
  const [data, setData] = useState({ events: [], surveys: [], promotions: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInterestData(selectedInterestId);
  }, [selectedInterestId]);

  const fetchInterestData = async (interestId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://94.237.82.88:8082/interests/dataByInterest/${interestId}`);
      setLoading(false);
      if (!response.ok) {
        throw new Error('Failed to fetch interest data');
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching interest data:', error);
      // Show an error message to the user
      Alert.alert('Error', 'Failed to fetch interest data. Please try again later.');
      setLoading(false);
    }
  };

  const renderListItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        {/* Render the base64 image if available */}
        {item.photo?.picByte ? (
          <Image
            source={{ uri: `data:${item.photo.type};base64,${item.photo.picByte}` }}
            style={styles.itemImage}
            onError={() => console.log('Error fetching image')}
          />
        ) : (
          <Image source={require('../assets/placeholder-image.png')} style={styles.itemImage} />
        )}
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
    );
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        <View style={{ height: HEIGHT / 3.8 }}>
          <MenuHeaders navigation={navigation} title="SONDAGE" />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Événements</Text>
          {loading ? (
            <View style={styles.animationContainer}>
              <LottieView
                source={catoutAnimation} // Replace this with the imported Lottie animation
                autoPlay
                loop
                style={styles.animation}
              />
            </View>
          ) : (
            <FlatList
              data={data.events}
              keyExtractor={(item) => item.id}
              renderItem={renderListItem}
              ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={() => fetchInterestData(selectedInterestId)} />}
            />
          )}
        </View>

        {/* Display the list of surveys */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sondages</Text>
          {loading ? (
            <View style={styles.animationContainer}>
              <LottieView
                source={catoutAnimation} // Replace this with the imported Lottie animation
                autoPlay
                loop
                style={styles.animation}
              />
            </View>
          ) : (
            <FlatList
              data={data.surveys}
              keyExtractor={(item) => item.id}
              renderItem={renderListItem}
              ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={() => fetchInterestData(selectedInterestId)} />}
            />
          )}
        </View>

        {/* Display the list of promotions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promotions</Text>
          {loading ? (
            <View style={styles.animationContainer}>
              <LottieView
                source={catoutAnimation} // Replace this with the imported Lottie animation
                autoPlay
                loop
                style={styles.animation}
              />
            </View>
          ) : (
            <FlatList
              data={data.promotions}
              keyExtractor={(item) => item.id}
              renderItem={renderListItem}
              ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={() => fetchInterestData(selectedInterestId)} />}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemImage: {
    width: 40,
    height: 40,
    marginRight: 16,
    borderRadius: 20,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 30,
    height: 30,
  },
});

export default ResultScreen;
