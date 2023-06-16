/**
 * @format
 */

import {
  AppRegistry,
  View,
  ActivityIndicator,
  Linking,
  SafeAreaView,
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {
  AndroidColor,
  AndroidStyle,
  AndroidImportance,
  EventType,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import React from 'react';
import {RecoilRoot} from 'recoil';
import {Provider as PaperProvider} from 'react-native-paper';
import {Color} from './src/constants/colors/color';


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background! when the app is killed', remoteMessage);
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
    data: remoteMessage.data,
    android: {
      channelId,
      priority: 'high',
      smallIcon: 'ic_ted',
      color: AndroidColor.WHITE,
      style: {type: AndroidStyle.BIGTEXT, text: remoteMessage.data.body},
      pressAction: {
        id: 'default',
      },
    },
  });
});

notifee.onBackgroundEvent(async ({type, detail}) => {
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

const redirectNotif = async data => {
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

const RecoilApp = () => {
  return (
    <>
      <RecoilRoot>
        <React.Suspense
          fallback={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color={Color.secondary} />
            </View>
          }>
          <PaperProvider>
            <SafeAreaView style={{flex:1, backgroundColor:Color.light}}>
              <App />
            </SafeAreaView>
          </PaperProvider>
        </React.Suspense>
      </RecoilRoot>
    </>
  );
};

// register background task
// backgroundService();
AppRegistry.registerComponent(appName, () => RecoilApp);
