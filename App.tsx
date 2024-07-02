/**
 * @format
 */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/Home/Splash';
import Login from './src/Login/Login';
import ResetPassword from './src/Login/ResetPassword';
import SignUp from './src/Login/SignUp';
import Notification from './src/App/Notification';
import Toy from './src/App/Toy';
import AmazonCoupon from './src/App/AmazonCoupon';
import NewsContent from './src/App/Components/News/NewsContent';
import AnalyticsContent from './src/App/Components/News/AnalyticsContent';
import CouponsContent from './src/App/Components/News/CouponsContent';
import AboutUs from './src/App/Components/Settings/AboutUs';
import PrivacyPolicy from './src/App/Components/Settings/PrivacyPolicy';
import Subscription from './src/App/Components/Settings/Subscription';
import BrandScreen from './src/App/Components/Settings/BrandScreen';
import EditProfile from './src/App/Components/Settings/Edit Profile';
import ConfirmPassword from './src/Login/ConfirmPassword';
import SearchBar from './src/App/Components/Home/SearchBar';
import messaging from '@react-native-firebase/messaging';
import TopTabNavigator from './src/App/Components/News/TopTabNavigator';
import BottomTabNavigator from './src/App/BottomTabNavigator';
import NoInternet from './src/App/Components/Home/NoInternet';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    // Request permission to receive notifications
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    requestUserPermission();

    // Get the device token
    messaging().getToken().then(token => {
      console.log('Device FCM Token:', token);
    }).catch(error => {
      console.error('Error getting FCM token:', error);
    });

    // Handle foreground messages
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived:', JSON.stringify(remoteMessage));
    });

    // Handle background messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background:', remoteMessage);
    });

    // Handle token refresh
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(token => {
      console.log('FCM Token refreshed:', token);
    });

    return () => {
      unsubscribeForeground();
      unsubscribeTokenRefresh();
    };
  }, []);

  useEffect(() => {
    // Handle notification opened from background state
    const unsubscribeNotificationOpened = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
    });

    // Handle notification opened from quit state
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage.notification);
      }
    });

    return unsubscribeNotificationOpened;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainHome" component={BottomTabNavigator} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Toy" component={Toy} />
        <Stack.Screen name="AmazonCoupon" component={AmazonCoupon} />
        <Stack.Screen name="NewsContent" component={NewsContent} />
        <Stack.Screen name="AnalyticsContent" component={AnalyticsContent} />
        <Stack.Screen name="CouponsContent" component={CouponsContent} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name="BrandScreen" component={BrandScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
        <Stack.Screen name="News" component={TopTabNavigator} />
        <Stack.Screen name="SearchBar" component={SearchBar} />
        <Stack.Screen name="NoInternet" component={NoInternet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
