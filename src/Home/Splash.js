import React, { useEffect } from 'react';
import { View, StyleSheet, Image,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Splash = ({ navigation }) => {
 
  useEffect(() => {
    // Check user sign-in status using AsyncStorage
    const checkUserSignIn = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        // If token exists, user is signed in, navigate to Home screen
        if (token) {
          navigation.navigate('MainHome');
        } else {
          // No token found, navigate to Login screen after 7 seconds
          setTimeout(() => {
            navigation.navigate('Login');
          }, 7000);
        }
      } catch (error) {
        console.error('Error checking sign-in status:', error);
        // Handle error (e.g., navigate to Login screen)
        setTimeout(() => {
          navigation.navigate('Login');
        }, 7000);
      }
    };

    // Call the function to check user sign-in status
    checkUserSignIn();
  }, [navigation]); // Ensure navigation is included in dependencies to access navigation.navigate

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/Home/logo.png')} style={styles.backgroundImage} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: 300,
    height: 152,
  },
});
