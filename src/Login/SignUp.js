import React, { useEffect, useState } from 'react';
import { ScrollView, ImageBackground, View, StyleSheet, TextInput, TouchableOpacity, Image, ToastAndroid, ActivityIndicator, Alert } from 'react-native';
import { Text } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../App/Components/Home/Loading';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk-next';
import { IP_ADDRESS } from '../App/global';

const SignUp = () => {
  const navigation = useNavigation();


  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const handleSkip = () => {
    navigation.navigate('MainHome');
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [isChecked, setIsChecked] = useState(false);
  const [fdata, setFdata] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
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
    setLoading(false);
  };

  const sendGoogleUserData = async (fdata) => {
    try {
      const response = await axios.post(`http://${IP_ADDRESS}:3005/googleSignIn`, {
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
      const response = await axios.post(`http://${IP_ADDRESS}:3005/facebookSignIn`, {
        name: fdata.name,
        image: fdata.picture.data.url
      });

      const { token } = response.data;
      await AsyncStorage.setItem('token', token);
      ToastAndroid.show('Facebook Sign-in successful.', ToastAndroid.SHORT);
      navigation.navigate('MainHome');
    } catch (error) {
      console.log('Backend API error:', error);
      ToastAndroid.show('Facebook Sign-in failed.', ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  const [errormsg, setErrormsg] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  // Function to handle Google Sign-In

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text;
    setFdata(prevState => ({
      ...prevState,
      email: emailVar
    }));
    setErrormsg(prevState => ({
      ...prevState,
      email: ''
    }));
    if (/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(emailVar)) {
      setErrormsg(prevState => ({
        ...prevState,
        email: ''
      }));
    } else {
      setErrormsg(prevState => ({
        ...prevState,
        email: 'The text must be a valid Email-Id'
      }));
    }
  }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setFdata(prevState => ({
      ...prevState,
      password: passwordVar
    }));
    setErrormsg(prevState => ({
      ...prevState,
      password: ''
    }));
    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordVar)) {
      setErrormsg(prevState => ({
        ...prevState,
        password: ''
      }));
    } else {
      setErrormsg(prevState => ({
        ...prevState,
        password: 'Password must contain at least one numeric digit, one uppercase and one lowercase letter, and at least 6 characters'
      }));
    }
  }
  const SendToBackend = () => {
    setLoading(true);
    let errors = {};

    if (fdata.name === '') {
      errors.name = 'Username required';
    }
    if (fdata.email === '') {
      errors.email = 'Email required';
    }
    if (fdata.password === '') {
      errors.password = 'Password required';
    }
    if (fdata.cpassword === '') {
      errors.cpassword = 'Re-write the password';
    } else if (fdata.password !== fdata.cpassword) {
      errors.cpassword = 'Password and Confirm Password must be the same';
    }

    setErrormsg(errors);

    if (Object.keys(errors).length === 0) {
      // Proceed with sending data to backend
      let data = JSON.stringify(fdata);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://${IP_ADDRESS}:3005/signup`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data.error) {
            setErrormsg(response.data.error);
          } else {
            // Store token in AsyncStorage
            AsyncStorage.setItem('token', response.data.token)
              .then(() => {
                ToastAndroid.show('Signup done successfully', ToastAndroid.SHORT);
                navigation.navigate('Login', { message: 'Account created successfully', token: response.data.token });
              })
              .catch((error) => {
                console.error('Error storing token:', error);
                setErrormsg({ form: 'An error occurred. Please try again.' });
              });
          }
        })
        .catch((error) => {
          console.log(error);
          setErrormsg({ form: 'An error occurred. Please try again.' });
        })
        .finally(() => {
          setLoading(false); // Set loading state to false after request completion
        });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/Login/logo2.png')} style={styles.logo}></ImageBackground>
        <Text style={styles.heading}>Let's Get Started!</Text>
        <Text style={styles.subheading}>Create an account to get full access </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder='Username'
            value={fdata.name}
            onChangeText={(text) => setFdata({ ...fdata, name: text })}
          />
          <Feather name="user" size={20} color="#999" style={styles.inputIcon} />
        </View>
        {errormsg.name && <Text style={styles.errormessage}>{errormsg.name}</Text>}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder='Email'
            onChange={handleEmail}
          />
          <Icon name="email" size={20} color="#999" style={styles.inputIcon} />
        </View>
        {errormsg.email && <Text style={styles.errormessageemail}>{errormsg.email}</Text>}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            onChange={handlePassword}
            onFocus={() => setIsPasswordVisible(false)}
            onBlur={() => setIsPasswordVisible(true)}
            value={fdata.password}
          />
          <Ionicons name="key" size={20} color="#999" style={styles.inputIcon} />
          {fdata.password.length > 0 && (
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={20}
                color="#999"
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
          )}

        </View>
        {errormsg.password && <Text style={styles.errormessage}>{errormsg.password}</Text>}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            placeholder='Confirm Password'
            secureTextEntry={true}
            onChangeText={(text) => setFdata({ ...fdata, cpassword: text })}
          />
          <Ionicons name="key" size={20} color="#999" style={styles.inputIcon} />
        </View>
        {errormsg.cpassword && <Text style={styles.errormessage}>{errormsg.cpassword}</Text>}

        <TouchableOpacity onPress={SendToBackend}>
          <LinearGradient colors={['#2C398B', '#01AAEC']} style={styles.linearGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.loginText}> SIGN UP </Text>
          </LinearGradient>
        </TouchableOpacity>

        <ImageBackground source={require('../../assets/images/Login/line.png')} style={styles.line}></ImageBackground>
        <TouchableOpacity style={styles.apple} onPress={handleFacebookLogin}>
          <Ionicons name="logo-facebook" size={20} color="white" style={styles.icon} />
          <Text style={styles.text}> Continue with Facebook </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
          <AntDesign name="googleplus" size={25} color="white" style={styles.icon} />
          <Text style={styles.text}> Continue with Google </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.subheading1}> Already have an account?<Text style={styles.subheading2}> Sign In </Text> </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
          <Ionicon name={isChecked ? 'check-square' : 'square-o'} size={24} color="black" />
          <Text style={styles.checkboxText}> By signing up, you agree to our {'\n'}
            <Text style={styles.tc}> Terms & Privacy Policy </Text> </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}> Skip </Text>
        </TouchableOpacity>

        {loading && <LoadingScreen />}
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 251,
    height: 64,
    marginBottom: 20,
    marginTop: 30
  },
  heading: {
    color: '#1F3D4D',
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    marginBottom: 10,
  },
  subheading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    top: -20,
    marginBottom: 40
  },
  inputText: {
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10,
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
    backgroundColor: 'rgba(242, 243, 250, 1)'
  },
  linearGradient: {
    width: 366,
    height: 48,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
  },
  loginText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: 'white',
  },
  line: {
    width: 366,
    height: 30,
    top: -10
  },
  apple: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b5998',
    borderRadius: 8,
    padding: 10,
    width: 366,
    height: 48,
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: 366,
    height: 48
  },
  text: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  subheading1: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    marginBottom: 10,
  },
  subheading2: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: '#01AAEC',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    fontFamily: "Poppins-Bold",
    marginLeft: 10,
    fontSize: 12,
    textAlign: "center"
  },
  tc: {
    fontFamily: "Poppins-Bold",
    marginLeft: 10,
    fontSize: 12,
    color: '#01AAEC',
  },
  skip: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    marginTop: 10,
    color: '#1F3D4D',
    left: 140,
    textDecorationLine: 'underline'
  },
  inputIcon: {
    marginRight: 10,
  },
  errormessage: {
    color: 'red',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    paddingHorizontal:20,
    textAlign: 'justify',
    marginBottom: 5
  },
  errormessageemail: {
    color: 'red',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    paddingHorizontal:25,
    marginBottom: 5,
    alignSelf: 'flex-start' 
  },
});
