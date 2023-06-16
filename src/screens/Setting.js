import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Image,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Switch} from 'react-native-paper';
import {Color, Font} from '../constants/colors/color';
import {HEIGHT, WIDTH} from '../utils/Dimension';
import {
  request,
  PERMISSIONS,
  check,
  RESULTS,
  checkNotifications,
} from 'react-native-permissions';
import {useIsFocused} from '@react-navigation/native';

export const Setting = () => {
  const [notificationPermission, setNotificationPermission] = useState(false);
  const [showSwitch, setShowSwitch] = useState(true)
  const isFocused = useIsFocused();


  useEffect(() => {
    if (isFocused){
      checkNotificationPermission();

    }
  }, [isFocused]);

  const checkNotificationPermission = async () => {
    try {
      const permissionStatus = await checkNotifications();

      if (permissionStatus.status === RESULTS.GRANTED) {
        setNotificationPermission(() => true);
      } else {
        setNotificationPermission(() => false);
      }
    } catch (error) {
      setNotificationPermission(false);
    }
  };

  const requestNotificationPermission = async () => {
    
    try {
      const permission = Platform.select({
        android: PERMISSIONS.ANDROID.NOTIFICATIONS,
        ios: PERMISSIONS.IOS.NOTIFICATIONS,
      });

      const result = await check(permission);
      if (result !== RESULTS.GRANTED) {
        openSettings();
        setShowSwitch(()=> false)
      }
    } catch (error) {
      setNotificationPermission(() => false);
    }
  };

  const openSettings = () => {
    Alert.alert(
      'Permission de notification requise',
      "Veuillez activer les permissions de notification dans les paramètres de l'appareil pour recevoir des notifications.",
      [
        {
          text: 'Cancel',
          // onPress: () => console.log('Permission denied'),
          style: 'cancel',
        },
        {text: 'Open Settings', onPress: openAppSettings},
      ],
    );
  };

  const openAppSettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    } else {
      Linking.openURL('app-settings:');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!notificationPermission && showSwitch && (
        <View style={styles.allowNotificationContainer}>
          <Text style={styles.showNotificationText}>
            Avitivez Vos Notification
          </Text>
          <Switch
            value={notificationPermission}
            onValueChange={() => {
              if (!notificationPermission) {
                requestNotificationPermission();
              }
            }}
          />
        </View>
      )}
      <View style={styles.noNotificationImageContainer}>
        <Image
          source={require('../assets/appIcones/56.png')}
          style={styles.noNotificationImage}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.light,
  },
  allowNotificationContainer: {
    marginTop: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-around',
    padding: 10,
    marginHorizontal: '4%',
  },
  showNotificationText: {
    fontFamily: Font.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  noNotificationImageContainer : {justifyContent: 'center', alignItems: 'center', flex: 1},
  noNotificationImage : {width: WIDTH / 2, height: HEIGHT / 4.5}
});
