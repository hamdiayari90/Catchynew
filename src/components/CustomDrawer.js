import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { userInfomation, userToken, verifyIsSignedIn } from '../atom/auth';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { fetchUSerInforamtion } from "../services/homePageApi/home"
import jwt_decode from "jwt-decode";
import { Font } from '../constants/colors/color';

export const CustomDrawer = props => {
  const [isSignedIn, setIsSignedIn] = useRecoilState(verifyIsSignedIn);
  const [token, setToken] = useRecoilState(userToken)
  const isFocused = useIsFocused();
  const [user, setUser] = useRecoilState(userInfomation)

  const navigation = useNavigation()


  useEffect(() => {
    if (isFocused) {
      getUSerInfo()
    }
  }, [navigation]);


  const getUSerInfo = async () => {
    let tokenId = jwt_decode(token)
    let data = await fetchUSerInforamtion(tokenId.id)
    setUser(() => data)
  }
  const Logout = async () => {
    try {
      AsyncStorage.removeItem('profile');
      setTimeout(() => {
        setIsSignedIn(() => false);
        //props.navigation.replace('Login');
      }, 1000);
    } catch (e) { }
  };
  
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetchUserData(); // Call the function to fetch user data
  }, []);

  const fetchUserData = async () => {
    try {
      const result = await AsyncStorage.getItem('profile');
      if (result !== null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);
        const userId = token.id;
        await fetchProfileImage(userId);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchProfileImage = async (userId) => {
    try {
      console.log('Fetching profile image...');
      const response = await fetch(`http://94.237.82.88:8082/user/${userId}/`);
      const data = await response.json();

      if (data && data.image && data.image.name) {
        const baseUrl = 'https://www.catchy.tn/media/user/';
        const imageName = data.image.name;
        const imageUrl = baseUrl + imageName;
        console.log('Profile image fetched successfully:', imageUrl);
        setImageUrl(imageUrl);

      } else {
        console.error('Error fetching profile image: Invalid response data');
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.blueShape} />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.contentContainer}>
        {user && (
          <View style={styles.profileContainer}>
          <TouchableOpacity
  onPress={() => Linking.openURL(`tde://catchy/profil`)}
  style={styles.profileImageContainer}
>
<View style={styles.profileImageContainer}>
  <Image
    source={{ uri: imageUrl }}
    style={styles.profileImage}
  />
</View>
</TouchableOpacity>


            <Text style={styles.usernameText}>
              {user.username} {user.lastname}
            </Text>
          </View>
        )}

        <View style={styles.drawerItemsContainer}>
          <DrawerItemList {...props} />
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity
            onPress={() => {
              Logout();
            }}
            style={styles.logoutButton}>
            <View style={styles.logoutButtonContent}>
              <Ionicons name="exit-outline" size={22} />
              <Text style={styles.logoutButtonText}>Déconnexion</Text>
            </View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 70,
  },
  blueShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#000000',
 
},
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  profileContainer: {
    margin: 20,
  },
  profileImageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  usernameText: {
    color: '#040606',
    fontSize: 16,
    fontFamily: Font.primary,
    fontWeight: 'bold',
    paddingLeft: 10,
    marginTop: '3%',
  },
  drawerItemsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  logoutContainer: {
    borderTopWidth: 0,
    borderRadius: 2,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  logoutButton: {
    paddingVertical: 15,
  },
  logoutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  logoutButtonText: {
    fontSize: 15,
    fontFamily: Font.primary,
    marginLeft: 5,
  },
});
