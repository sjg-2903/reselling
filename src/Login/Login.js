import React, { useState } from 'react';
import { ImageBackground, View, StyleSheet, TextInput, TouchableOpacity, Text, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../App/Components/Home/Loading';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { IP_ADDRESS } from '../App/global';

const Login = ({ route }) => {
    const navigation = useNavigation();
    const { message, token } = route.params || {}; // Retrieve message and token from route params

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await GoogleSignin.configure({
                webClientId: '985636086381-cnunr4otn15gbmg00o7ttqqmn08ggeif.apps.googleusercontent.com', // Your web client ID
                offlineAccess: false,
                scopes: ['profile', 'email', 'openid', 'https://www.googleapis.com/auth/userinfo.profile']
            });

            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            if (userInfo) {
                await sendGoogleUserData(userInfo.user);
            }
        } catch (error) {
            console.log('Google login error:', error);
            ToastAndroid.show('Google login error.', ToastAndroid.LONG);
        }
    };

    const sendGoogleUserData = async (fdata) => {
        try {
            const response = await axios.post(`${IP_ADDRESS}/googleSignIn`, {
                name: fdata.name,
                email: fdata.email,
                image: fdata.photo
            });

            const { token } = response.data;
            await AsyncStorage.setItem('token', token);
            ToastAndroid.show('Google Login Successful.', ToastAndroid.SHORT);
            navigation.navigate('MainHome');
        } catch (error) {
            console.log('Backend API error:', error);
            ToastAndroid.show('Google Login Failed.', ToastAndroid.LONG);
        }
        setLoading(false);
    };

    const handleFacebookLogin = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile']);

            if (result.isCancelled) {
                ToastAndroid.show('Facebook login cancelled.', ToastAndroid.SHORT);
            } else {
                const accessToken = await AccessToken.getCurrentAccessToken();
                // Check if the user is already authenticated with Facebook
                if (!accessToken) {
                    console.log('Facebook access token not found.');
                    ToastAndroid.show('Facebook login error.', ToastAndroid.LONG);
                    return;
                }

                // Fetch user data only if not already logged in
                setLoading(true);
                const profileRequest = new GraphRequest(
                    '/me',
                    {
                        parameters: {
                            fields: { string: 'name,picture.type(large)' }
                        },
                        accessToken: accessToken.accessToken
                    },
                    async (error, result) => {
                        if (error) {
                            console.log('GraphRequest error:', error);
                            ToastAndroid.show('Facebook login error.', ToastAndroid.LONG);
                        } else {
                            console.log('Facebook user info:', result);
                            await sendFacebookUserData(result);
                        }
                        setLoading(false);
                    }
                );

                new GraphRequestManager().addRequest(profileRequest).start();
            }
        } catch (error) {
            console.log('Facebook login error:', error);
            ToastAndroid.show('Facebook login error.', ToastAndroid.LONG);
            setLoading(false);
        }
    };

    const sendFacebookUserData = async (fdata) => {
        try {
            const response = await axios.post(`${IP_ADDRESS}/facebookSignIn`, {
                name: fdata.name,
                image: fdata.picture.data.url
            });

            const { token } = response.data;
            await AsyncStorage.setItem('token', token);
            ToastAndroid.show('Facebook Login Successful.', ToastAndroid.SHORT);
            navigation.navigate('MainHome');
        } catch (error) {
            console.log('Backend API error:', error);
            ToastAndroid.show('Facebook Login Failed.', ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    };

    const [errorMessages, setErrorMessages] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [field]: '',
        }));
    };

    const handleLogin = async () => {
        setLoading(true);
        const errors = {};

        // Validate form fields
        if (formData.email === '') {
            errors.email = 'Email required';
        }
        if (formData.password === '') {
            errors.password = 'Password required';
        }

        setErrorMessages(errors);

        if (Object.keys(errors).length === 0) {
            let data = JSON.stringify(formData);
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${IP_ADDRESS}/signin`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            try {
                const response = await axios.request(config);

                if (response.data.error) {
                    setErrorMessages((prev) => ({ ...prev, form: response.data.error }));
                } else {
                    const { token } = response.data; // Assuming the token is returned in the response
                    await AsyncStorage.setItem('token', token);
                    ToastAndroid.show('Login done successfully', ToastAndroid.SHORT)
                    navigation.navigate('MainHome', { message: 'Login Done successfully' });
                }
            } catch (error) {
                console.error('Login error:', error);
                setErrorMessages((prev) => ({ ...prev, form: 'An error occurred during login. Please try again.' }));
            }
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        navigation.navigate('ResetPassword');
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    };

    const handleSkip = () => {
        navigation.navigate('MainHome');
    };

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/Login/logo2.png')} style={styles.logo} />
            <Text style={styles.heading}>Welcome Back!</Text>
            <Text style={styles.subheading}>Please sign in to continue</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    onChangeText={(text) => handleInputChange('email', text)}
                    value={formData.email}
                    keyboardType="email-address"
                />
                <Icon name="email" size={20} color="#999" style={styles.inputIcon} />
            </View>
            {errorMessages.email && <Text style={styles.errorMessage}>{errorMessages.email}</Text>}

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Password"
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={(text) => handleInputChange('password', text)}
                    value={formData.password}
                />
                <Ionicons name="key" size={20} color="#999" style={styles.inputIcon} />
                {formData.password.length > 0 && (
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
            {errorMessages.password && <Text style={styles.errorMessage}>{errorMessages.password}</Text>}

            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotpasswordContainer}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin}>
                <LinearGradient
                    colors={['rgba(44, 57, 139, 1)', 'rgba(1, 170, 236, 1)']}
                    style={styles.linearGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.loginText}>LOGIN</Text>
                </LinearGradient>
            </TouchableOpacity>

            {errorMessages.form && <Text style={styles.errorMessage}>{errorMessages.form}</Text>}

            <ImageBackground source={require('../../assets/images/Login/line.png')} style={styles.line} />
            <TouchableOpacity style={styles.facebookButton} onPress={handleFacebookLogin}>
                <Ionicons name="logo-facebook" size={20} color="white" style={styles.icon} />
                <Text style={styles.socialButtonText}>Continue with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
                <AntDesign name="googleplus" size={25} color="white" style={styles.icon} />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.subheading1}>
                    New to Reselling.de?
                    <Text style={styles.subheading2}> Sign Up</Text>
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSkip} style={styles.skipContainer}>
                <Text style={styles.skip}>Skip</Text>
            </TouchableOpacity>
            {loading && <LoadingScreen />}
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 251,
        height: 64,
        marginBottom: 20,
    },
    heading: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        color: '#1F3D4D',
        textAlign: 'center',
    },
    subheading: {
        fontFamily: 'Poppins-Black',
        fontSize: 13,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(31, 61, 77, 0.1)',
        width: '100%',
        height: 48,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: 'rgba(242, 243, 250, 1)',
        paddingHorizontal: 10,
    },
    inputText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        flex: 1,
    },
    inputIcon: {
        marginRight: 10,
    },
    forgotpasswordContainer: {
        left: 100
    },
    forgotPassword: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: '#01AAEC',
        textAlign: 'right',
        width: '100%',
        marginBottom: 20,
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
        borderRadius: 8,
        justifyContent: 'center',
        marginBottom: 20,
    },
    line: {
        width: '100%',
        height: 45,
        marginBottom: 20,
    },
    facebookButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3b5998',
        borderRadius: 8,
        width: '100%',
        height: 48,
        padding: 10,
        marginVertical: 10,
        marginBottom: 10,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E72819',
        padding: 10,
        borderRadius: 8,
        width: '100%',
        height: 48
    },
    socialButtonText: {
        fontFamily: 'Poppins-Bold',
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    subheading1: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: '#1F3D4D',
        textAlign: 'center',
        marginVertical: 20,
    },
    subheading2: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: '#01AAEC',
    },
    skipContainer: {
        left: 140,
        bottom: 20,
    },
    skip: {
        fontFamily: 'Poppins-Bold',
        color: '#1F3D4D',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    errorMessage: {
        color: 'red',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 8,
    },
});
