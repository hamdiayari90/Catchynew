import notifee, {
  AndroidColor,
  AndroidStyle,
  AndroidImportance,
  EventType,
  
} from '@notifee/react-native';import {Color} from '../constants/colors/color';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationService = () => {
  // Add your service logic here
  
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
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
  await AsyncStorage.setItem('hasNotification', 'true');

});

notifee.onForegroundEvent(async ({type, detail}) => {
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
};

export default NotificationService;