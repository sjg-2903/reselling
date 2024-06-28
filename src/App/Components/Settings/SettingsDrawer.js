import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Fontisto';
import Icon4 from 'react-native-vector-icons/Entypo';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { useNavigation } from '@react-navigation/native';

const SettingsDrawer = ({ leftText, rightText, id }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        setLoading(true);
        try {
            // Check if the user is signed in with Google
            const isGoogleSignedIn = await GoogleSignin.isSignedIn();
            if (isGoogleSignedIn) {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
            }

            // Check if the user is signed in with Facebook
            const isFacebookLoggedIn = await AccessToken.getCurrentAccessToken();
            if (isFacebookLoggedIn) {
                await LoginManager.logOut();
            }

            // Remove user token from AsyncStorage
            await AsyncStorage.removeItem('token');

            // Navigate to login screen
            ToastAndroid.show('Sign-out successful', ToastAndroid.SHORT);
            navigation.navigate('Login');
        } catch (error) {
            console.log('Sign-out error:', error);
            ToastAndroid.show('Sign-out failed', ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOutPress = async () => {
        try {
            const isGoogleSignedIn = await GoogleSignin.isSignedIn();
            const isFacebookLoggedIn = await AccessToken.getCurrentAccessToken();
            const token = await AsyncStorage.getItem('token');
            
            if (isGoogleSignedIn || isFacebookLoggedIn || token) {
                handleSignOut();
            } else {
                // Navigate to login screen directly if not signed in with Google, Facebook, or token is not found
                ToastAndroid.show('Sign-out successful', ToastAndroid.SHORT);
                navigation.navigate('Login');
            }
        } catch (error) {
            console.log('Error checking sign-in status:', error);
        }
    };

    const Notification = () => {
        navigation.navigate('Notification');
    };

    const Login = () => {
        navigation.navigate('Login');
    };

    const AboutUs = () => {
        navigation.navigate('AboutUs');
    };

    const PrivacyPolicy = () => {
        navigation.navigate('PrivacyPolicy');
    };

    const Subscription = () => {
        navigation.navigate('Subscription');
    };

    const getLeftIcon = () => {
        switch (id) {
            case 1:
                return <Icon3 name="credit-card" size={14} color="#1F3D4D" />;
            case 2:
                return <Icon2 name="user-plus" size={16} color="#1F3D4D" />;
            case 3:
                return <Icon3 name="bell" size={16} color="#1F3D4D" />;
            case 4:
                return <Icon2 name="clipboard-list" size={16} color="#1F3D4D" />;
            case 5:
                return <Icon4 name="info-with-circle" size={16} color="#1F3D4D" />;
            case 6:
                return <Icon4 name="language" size={16} color="#1F3D4D" />;
            case 7:
                return <Icon4 name="log-out" size={16} color="#1F3D4D" />;
            default:
                return null;
        }
    };

    const getRightTextStyle = () => {
        switch (id) {
            case 1:
                return (
                    <TouchableOpacity onPress={Subscription}>
                        <Icon name="arrow-forward-ios" size={16} color="blue" />
                    </TouchableOpacity>
                );
            case 2:
                return (
                    <TouchableOpacity>
                        <Icon name="arrow-forward-ios" size={16} color="blue" />
                    </TouchableOpacity>
                );
            case 3:
                return (
                    <TouchableOpacity onPress={Notification}>
                        <Icon name="arrow-forward-ios" size={16} color="blue" />
                    </TouchableOpacity>
                );
            case 4:
                return (
                    <TouchableOpacity onPress={PrivacyPolicy}>
                        <Icon name="arrow-forward-ios" size={16} color="blue" />
                    </TouchableOpacity>
                );
            case 5:
                return (
                    <TouchableOpacity onPress={AboutUs}>
                        <Icon name="arrow-forward-ios" size={16} color="blue" />
                    </TouchableOpacity>
                );
            case 6:
                return (
                    <TouchableOpacity>
                        <Icon name="arrow-forward-ios" size={16} color="blue" />
                    </TouchableOpacity>
                );
            case 7:
                return (
                    <TouchableOpacity onPress={handleSignOutPress}>
                        <Icon name="arrow-forward-ios" size={16} color="blue" />
                    </TouchableOpacity>
                );
            default:
                return <Text style={styles.rightText}>{rightText}</Text>;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftIconContainer}>{getLeftIcon()}</View>
            <Text style={styles.leftText}>{leftText}</Text>
            <View>{getRightTextStyle()}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: 377,
        height: 50
    },
    leftText: {
        fontFamily: 'Poppins-SemiBold',
        color: '#1F3D4D',
        fontSize: 14,
        marginRight: 'auto'
    },
    leftIconContainer: {
        marginRight: 10,
        alignItems: 'center',
        top: 2
    },
    rightText: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#1F3D4D',
    },
});

export default SettingsDrawer;
