/**
 * @format
 */
import React, { useEffect, useState } from 'react';
import { AppRegistry, View, Text, Platform } from 'react-native';
import App from './App';
import PushNotification from 'react-native-push-notification';
import NoInternet from './src/App/Components/Home/NoInternet'; // Import your NoInternet component
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo from community package

// Push notification configuration
PushNotification.configure({
  onRegister: function(token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION RECEIVED:', notification);

    // Handle the notification here
    if (notification.message) {
      console.log('Notification message:', notification.message);
    } else {
      console.log('No message in the notification.');
    }

    PushNotification.localNotification({
      channelId: "default-channel-id", // The id of the channel
      channelName: "Default Channel", // The user-visible name of the channel
      channelDescription: "A default channel for notifications", // The user-visible description of the channel
      playSound: true, // Whether to play a sound when notifications are received
      soundName: "default", // The sound to play, 'default' means the default notification sound
      importance: 4, // Importance level: 1=low, 2=medium, 3=high, 4=max
      vibrate: true, // Enter your channel ID here
      title: notification.title || 'No Title',
      message: notification.message || 'No message provided',
    });

    PushNotification.channelExists("default-channel-id", function (exists) {
      console.log(exists); // true/false
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
  const [isConnected, setIsConnected] = useState(true); // State to track internet connection

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type:', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log('isConnected:', isConnected); // Add this log to check the value of isConnected

  if (!isConnected) {
    // Display NoInternet component if not connected to the internet
    console.log('No internet connection detected. Showing NoInternet component.');
    return <NoInternet />;
  }

  console.log('Rendering App component.');
  return <App />;
};

AppRegistry.registerComponent('AwesomeProject', () => Main);

