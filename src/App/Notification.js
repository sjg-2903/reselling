// import React from 'react';
import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Platform } from 'react-native';
import { showLocalNotification } from './Components/Home/NotificationHandler';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationHeader from './Components/Home/NotificationHeader';

const Notification = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const loadNotificationState = async () => {
      try {
        const storedState = await AsyncStorage.getItem('notificationState');
        if (storedState !== null) {
          setIsEnabled(JSON.parse(storedState));
        }
      } catch (error) {
        console.error('Failed to load notification state:', error);
      }
    };

    loadNotificationState();
  }, []);

  const toggleSwitch = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);

    try {
      await AsyncStorage.setItem('notificationState', JSON.stringify(newState));
    } catch (error) {
      console.error('Failed to save notification state:', error);
    }

    if (newState) {
      // Enable notifications
      showLocalNotification("Notifications Enabled", "You will now receive notifications");
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
    } else {
      // Disable notifications
      showLocalNotification("Notifications Disabled", "You will not receive notifications");
      PushNotification.cancelAllLocalNotifications();
    }
  };

  return (
    <>
      <NotificationHeader />
      <View style={styles.container}>
        <View style={styles.notificationContainer}>
          <Text style={styles.text}>Notifications {isEnabled ? "On" : "Off"}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop:20
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    width: '90%' // Adjust this width as needed
  },
  text: {
    fontSize: 18,
    color: 'black'
  },
});

export default Notification;
