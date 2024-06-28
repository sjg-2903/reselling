/**
 * @format
 */
import React, { useEffect, useState } from 'react';
import { AppRegistry, View, Text, Platform, PermissionsAndroid, Alert } from 'react-native';
import App from './App';
import PushNotification from 'react-native-push-notification';
import NoInternet from './src/App/Components/Home/NoInternet'; // Import your NoInternet component
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo from community package

// Push notification configuration
PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // Handle the notification here
    PushNotification.localNotification({
      channelId: 'default-channel-id', // Enter your channel ID here
      title: notification.title,
      message: notification.message,
    });
  },
  // IOS only
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios', // Request permissions for iOS automatically
});

const Main = () => {
  const [notificationPermission, setNotificationPermission] = useState(null);
  const [isConnected, setIsConnected] = useState(true); // State to track internet connection

  useEffect(() => {
    const checkAndRequestNotificationPermission = async () => {
      console.log('Checking notification permissions...');

      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );

          if (granted) {
            console.log('Notification permission already granted.');
            setNotificationPermission(true);
          } else {
            Alert.alert(
              'Notification Permission',
              'This app requires notification permissions to send you updates. Please grant permission.',
              [
                {
                  text: 'Allow',
                  onPress: async () => {
                    console.log('User chose to allow notifications.');
                    const result = await PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
                    );
                    if (result === PermissionsAndroid.RESULTS.GRANTED) {
                      console.log('Notification permission granted.');
                      setNotificationPermission(true);
                    } else {
                      console.log('Notification permission denied.');
                      setNotificationPermission(false);
                      Alert.alert(
                        'Notification Permission',
                        'Notifications will not be shown as permission was denied.'
                      );
                    }
                  },
                },
                {
                  text: 'Deny',
                  onPress: () => {
                    console.log('User chose to deny notifications.');
                    setNotificationPermission(false);
                    Alert.alert(
                      'Notification Permission',
                      'Notifications will not be shown as permission was denied.'
                    );
                  },
                },
              ],
              { cancelable: false }
            );
          }
        } catch (error) {
          console.error(
            'Error checking/requesting notification permission:',
            error
          );
          setNotificationPermission(false);
        }
      } else if (Platform.OS === 'ios') {
        // iOS permissions are handled by PushNotification.configure
        const settings = await messaging().requestPermission();
        const isGranted =
          settings.authorizationStatus ===
            messaging.AuthorizationStatus.AUTHORIZED ||
          settings.authorizationStatus ===
            messaging.AuthorizationStatus.PROVISIONAL;
        setNotificationPermission(isGranted);
      }
    };

    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type:', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });

    checkAndRequestNotificationPermission();

    return () => {
      unsubscribe();
    };
  }, []);

  console.log('isConnected:', isConnected); // Add this log to check the value of isConnected

  if (notificationPermission === null) {
    // Wait for permission to be checked
    return (
      <View>
        <Text>Checking notification permissions...</Text>
      </View>
    );
  }

  if (!isConnected) {
    // Display NoInternet component if not connected to the internet
    console.log('No internet connection detected. Showing NoInternet component.');
    return <NoInternet />;
  }

  return <App />;
};

AppRegistry.registerComponent('AwesomeProject', () => Main);
