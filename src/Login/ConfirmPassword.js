import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Alert,ToastAndroid } from 'react-native';
import { Text } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadingScreen from '../App/Components/Home/Loading';
import { IP_ADDRESS } from '../App/global';

const ConfirmPassword = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { email, resetToken } = route.params;
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };



    const handlePasswordResetConfirmation = async () => {
        setLoading(true);
        if (!verificationCode || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please enter both the verification code and a new password.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'The new password and confirm password do not match. Please try again.');
            return;
         }
        console.log('Email:', email);
        console.log('Reset Token:', resetToken);
        console.log('Verification Code:', verificationCode);
        console.log('New Password:', newPassword);

        try {
            const response = await axios.post(`http://${IP_ADDRESS}:3005/confirm-password-reset`, {
                email,
                resetToken,
                verificationCode,
                newPassword,
            });
            const { data } = response;
            if (data.message) {
                ToastAndroid.show('Your Password has been changed', ToastAndroid.SHORT)
                navigation.navigate('Login'); // Navigate to login screen after successful password reset
            } else {
                ToastAndroid.show('Failed to change the password', ToastAndroid.SHORT)
            }
        } catch (error) {
            console.error('Error confirming password reset:', error);
            ToastAndroid.show('Error in changing th password', ToastAndroid.SHORT)
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Enter verification code and new password</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                />
                <Icon name="key" size={20} color="#999" style={styles.inputIcon} />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholder="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!isPasswordVisible}
                />
                <Ionicons name="key" size={20} color="#999" style={styles.inputIcon} />
                {newPassword.length > 0 && (
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            size={20}
                            color="#999"
                            style={{ marginRight: 10 }}
                        />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry 
                />
            <Icon name="key" size={20} color="#999" style={styles.inputIcon} />            
            </View>

            <TouchableOpacity onPress={handlePasswordResetConfirmation}>
                <LinearGradient colors={['#2C398B', '#01AAEC']} style={styles.linearGradient}>
                    <Text style={styles.resetText}>RESET PASSWORD</Text>
                </LinearGradient>
            </TouchableOpacity>
            {loading && <LoadingScreen />}
        </View>
    );
};

export default ConfirmPassword;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        alignItems: 'center',
        color: 'black',
    },
    inputText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    resetText: {
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
