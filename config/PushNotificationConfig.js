import PushNotification from 'react-native-push-notification';

console.log('Creating notification channel...');
PushNotification.createChannel(
  {
    channelId: "default-channel-id", // The id of the channel
    channelName: "Default Channel", // The user-visible name of the channel
    channelDescription: "A default channel for notifications", // The user-visible description of the channel
    playSound: true, // Whether to play a sound when notifications are received
    soundName: "default", // The sound to play, 'default' means the default notification sound
    importance: 4, // Importance level: 1=low, 2=medium, 3=high, 4=max
    vibrate: true, // Whether the phone should vibrate
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback to get channel creation status
);

PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    notification.finish(PushNotification.FetchResult.NoData);
  },

  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },

  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});
