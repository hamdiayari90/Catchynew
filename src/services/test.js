import React, {useEffect} from 'react';
import notifee, {EventType} from '@notifee/react-native';

import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StyleSheet, Text, View} from 'react-native';

const Stack = createNativeStackNavigator();

function handleEvent({type, detail}, navigation) {
  console.log(
    `handleEvent:   ${JSON.stringify(type)} ,
        ${JSON.stringify(detail)}`,
  );

  switch (type) {
    case EventType.DELIVERED:
      console.log('DELIVERED');
      break;
    case EventType.DISMISSED:
      console.log('User dismissed notification');
      break;
    case EventType.PRESS:
      console.log(
        'User pressed notification',
        detail.notification.data.messageData,
      );
      return navigation.navigate('DataDrivenView', {
        messageData: detail.notification.data.messageData,
      });
  }
}

// Bootstrap sequence function
async function bootstrap(navigation) {
  const initialNotification = await notifee.getInitialNotification();

  if (initialNotification) {
    console.log(
      'Notification caused application to open',
      initialNotification.notification,
    );
    console.log(
      'Press action used to open the app',
      initialNotification.pressAction,
    );

    return navigation.navigate('DataDrivenView', {
      messageData: initialNotification.notification.data.actionUrl,
    });
  }
}

async function requestUserPermission() {
  console.log('requestUserPermission');

  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status: enabled');
    const token = await messaging().getToken();
    return;
  }

  console.log('Authorization status: disabled');
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

function HomeScreen({navigation}) {
  useEffect(() => requestUserPermission(), []);

  useEffect(() => bootstrap(navigation));

  useEffect(() => {
    return notifee.onForegroundEvent(event => {
      console.log(`notifee.onForegroundEvent:`);
      return handleEvent(event, navigation);
    });
  });

  return (
    <View style={styles.container}>
      <Text>There's no place like home .... screen</Text>
    </View>
  );
}

function DataDrivenView({route}) {
  const {messageData} = route.params;

  console.log('DataDrivenView: ', messageData);

  return (
    <View style={styles.container}>
      <Text>{messageData}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DataDrivenView">
          {props => <DataDrivenView {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//Using this approach we get the desired results (at least on Android): using react-navigation to render the correct view when the app is each state (quit, background, or foreground). Is this a pretty common setup? Anything we're missing here?