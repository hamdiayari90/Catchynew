import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';
import Navigator from './src/navigation/AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Linking, LogBox} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {ErrorScreen} from './src/screens/NoInternet/Error';
import { NavigationContainer } from '@react-navigation/native';
import { DarkModeProvider } from './DarkModeContext';


import notifee, {
  AndroidColor,
  AndroidStyle,
  AndroidImportance,
  EventType,
  AndroidNotificationSetting
} from '@notifee/react-native';

import jwt_decode from 'jwt-decode';
import * as api from './src/services/api';
import {navigate} from './src/services/RootNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {OnboardingScreen} from './src/screens/OnboardingScreen';
import {useRecoilState} from 'recoil';
import {isConnected} from './src/atom/auth';
LogBox.ignoreAllLogs(); //Ignore all log notifications

LogBox.ignoreLogs([
  'Reanimated 2',
  'DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release.',
  'componentWillReceiveProps has been renamed, and is not recommended for use.',
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
  'Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.r',
]);
LogBox.ignoreLogs(['Please update the following components: Carousel']);
LogBox.ignoreLogs(['EventEmitter.removeListener']);
// Hide PropTypes warning messages
LogBox.ignoreLogs([
  ' Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
]);
function App() {
  const [intenet, setInternet] = useRecoilState(isConnected);
  const [token, setToken] = useState('');
  const [notif, setNotif] = useState({});
  const [events, setEvents] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [isFirstLanch, setIsFirstLanch] = useState(true);
  const [netInfo, setNetInfo] = useState('');
  useEffect(() => {
   
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('state:', state.isConnected);
      if (!state.isConnected) {
        setInternet(false);
      }
      setNetInfo(
        `Connection type: ${state.type}
        Is connected?: ${state.isConnected}
        IP Address: ${state.details.ipAddress}`,
      );

      // if (!state.isConnected) {
      //   Alert.alert('No internet', 'please verify you intenet connecton!');
      // }
    });

    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    // listeningToFireBase();
    requestUserPermission();
    bootstrap()
      .then(() => console.log('this app as open after killllled'))
      .catch(err => console.log('some thing went wrong when open the '));
    getToken();
    checkFirstLanch();
    return () => {
      // This cleanup function is called before the next render
      // or when the component is unmounted.
      // It's a good place to cancel the API request if it's still in progress.
      // ...
    };
  }, []);

  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage.data);
      //let message = JSON.stringify(remoteMessage)
      // Request permissions (required for iOS)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'hollow',
        vibration: true,
        vibrationPattern: [300, 500],
      });
      await notifee.displayNotification({
        title: remoteMessage.data?.title,
        body: remoteMessage.data.body,
        data: remoteMessage.data ? remoteMessage.data : {},

        android: {
          channelId,
          smallIcon: 'ic_ted',
          color: AndroidColor.WHITE,
          style: {type: AndroidStyle.BIGTEXT, text: remoteMessage.data.body},
          pressAction: {
            id: 'default',
          },
          priority: 'high',
        },
      });
      await AsyncStorage.setItem('hasNotification', 'true');

    });
    return () => {
      unsubscribe();
    };
  }, []);


  // ==============================================================================================================
  // ==============  Bootstrap sequence function when the app is opned by notfication =============================
  // ==============================================================================================================
  async function bootstrap() {
    var initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      redirectNotif(initialNotification.notification.data);
    }
    initialNotification = null;
  }

  // ==============================================================================================================
  // ================================  Notification Permission firebase============================================
  // ==============================================================================================================

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    // console.log('messaging.AuthorizationStatus.PROVISIONA:', messaging.AuthorizationStatus.DENIED)
    // console.log('messaging.AuthorizationStatus.AUTHORIZED:', messaging.AuthorizationStatus.AUTHORIZED)

  }

  const getToken = async () => {
    try {
      const result = await AsyncStorage.getItem('profile');
      if (result != null) {
        const parsedToken = JSON.parse(result);
        const token = jwt_decode(parsedToken);
        setToken(token);
      }
    } catch (e) {}
  };

  // ==============================================================================================================
  // ================================  REDIRECT NOTFICATION =======================================================
  // ==============================================================================================================

  const redirectNotif = async data => {
    // console.log('data:', data);
    switch (data.type) {
      case 'EVENT':
        {
          Linking.openURL(`tde://catchy/eventById/${data.idItem}`);
        }
        break;
      case 'SURVEY':
        {
          Linking.openURL(`tde://catchy/survey/${data.idItem}`);
        }
        break;
      case 'PROMOTION':
        {
          Linking.openURL(`tde://catchy/promotion`);
        }
        break;
      case 'MESSAGE':
        {
          Linking.openURL(`tde://catchy/home`);
        }
        break;
      case 'APPROVE_PHOTO_VIDEO':
        {
          Linking.openURL(`tde://catchy/gallery`);
        }
        break;
      case 'REFUSE_PHOTO_VIDEO':
        {
          Linking.openURL(`tde://catchy/gallery`);
        }
        break;
    }
  };

  // ==============================================================================================================
  // ================================  Handle notification when the app is foreground  ============================
  // ==============================================================================================================

  // ==============================================================================================================
  // ================================  Handle notification when the app is closed =================================
  // ==============================================================================================================

  notifee.onBackgroundEvent(async ({type, detail}) => {
    // console.log('detail: ============> \n', detail.notification.data);
    // console.log(
    //   '==============================================================',
    // );
    // console.log('type:============> \n ', type);
    // console.log('detail:', detail)
    switch (type) {
      case EventType.DISMISSED:
        notifee.cancelNotification(detail.notification.id);
        break;
      case EventType.PRESS:
        redirectNotif(detail.notification.data);
        break;
      default:
        break;
    }
  });

  // ==============================================================================================================
  // ==================================Check is first lanch for onbording screen===================================
  // ==============================================================================================================

  const checkFirstLanch = async () => {
    const value = await AsyncStorage.getItem('alReadyLanched');
    const isAlreadyLanched = JSON.parse(value);

    if (isAlreadyLanched != null) {
      setIsFirstLanch(false);
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1, flexGrow: 1}}>
        <DarkModeProvider>
            {intenet ? (
                <>
                    {/* Uncomment below if you plan to reintegrate the onboarding screen logic in the future */}
                    {/* {!isFirstLanch ? ( */}
                        <Navigator />
                    {/* ) : (
                        <OnboardingScreen
                            setIsFirstLanch={setIsFirstLanch}
                            checkFirstLanch={checkFirstLanch}
                        />
                    )} */}
                </>
            ) : (
                <ErrorScreen />
            )}
        </DarkModeProvider>
    </GestureHandlerRootView>
);
}

export default App;