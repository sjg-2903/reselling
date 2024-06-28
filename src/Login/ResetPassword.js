import React, { useState } from 'react';
import { ImageBackground, View, StyleSheet, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native'; // Import Alert from 'react-native'
import { Text } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import LoadingScreen from '../App/Components/Home/Loading';
import { IP_ADDRESS } from '../App/global';


const ResetPassword = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handlePasswordReset = async () => {
        setLoading(true);
        if (!email) {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }
    
        try {
            const response = await axios.post(`http://${IP_ADDRESS}:3005/request-password-reset`, { email });
            console.log('Response:', response);
            const { data } = response;
            if (data.message) {
                ToastAndroid.show( data.message, ToastAndroid.SHORT)
                navigation.navigate('ConfirmPassword', { email, resetToken: data.resetToken }); // Pass reset token to ConfirmPassword screen
            } else {
                ToastAndroid.show( 'Failed to reset password', ToastAndroid.SHORT)
            }
        } catch (error) {
            console.error('Error requesting password reset:', error);
            ToastAndroid.show('Error occured. Please try again', ToastAndroid.SHORT)
        }
        setLoading(false);
    };
    

    const handleSignIn = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/Login/resetpassword.png')} style={styles.backgroundImage} />

            <Text style={styles.heading}>
                Enter your email address below to reset your password
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                />
                <Icon name="email" size={20} color="#999" style={styles.inputIcon} />
            </View>

            <TouchableOpacity onPress={handlePasswordReset}>
                <LinearGradient colors={['#2C398B', '#01AAEC']} style={styles.linearGradient}>
                    <Text style={styles.loginText}>RESET PASSWORD</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignIn}>
                <Text style={styles.subheading}>
                    Remembered your password?
                    <Text style={styles.subheading2}> Sign In</Text>
                </Text>
            </TouchableOpacity>
            {loading && <LoadingScreen />}
        </View>
    );
};

export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: 298,
        height: 236,
        top: -60,
    },
    heading: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        alignItems: 'center',
        top: -20,
        color: 'black',
    },
    inputText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    loginText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    linearGradient: {
        width: 366,
        height: 48,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    subheading: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        marginTop: 15,
    },
    subheading2: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        color: '#01AAEC',
        marginLeft: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(31, 61, 77, 0.1)',
        width: 366,
        height: 48,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: 'rgba(242, 243, 250, 1)',
        marginTop: 20,
    },
    inputIcon: {
        marginRight: 10,
    },
});
