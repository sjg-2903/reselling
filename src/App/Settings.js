import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import SettingsDrawer from './Components/Settings/SettingsDrawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { IP_ADDRESS } from './global';

const Settings = () => {
    
    const [userData, setUserData] = useState({});
    const [token, setToken] = useState(''); // Initialize token state
    const navigation = useNavigation();

    const navigateToHomeScreen = () => {
        navigation.navigate('Home');
    };

    const navigateToEditProfileScreen = () => {
        navigation.navigate('EditProfile', { data: userData, token: token });
    };

    const handleBackPress = () => {
        Alert.alert('Exit App', 'Are you sure you want to exit?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            {
                text: 'Exit',
                onPress: () => BackHandler.exitApp(),
            },
        ]);
        return true;
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
            BackHandler.addEventListener('hardwareBackPress', handleBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
            };
        }, []),
    );

    useEffect(() => {
    }, []);

    const fetchData = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
            if (storedToken) {
                setToken(storedToken); // Set token state
                const response = await axios.post(`${IP_ADDRESS}/userdata`, { token: storedToken }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${storedToken}`
                    },
                });
                const data = response.data;
                if (response.status === 200) {
                    setUserData(data);
                } else {
                    Alert.alert('Error', data.error);
                }
            } else {
                // If no token, set default user data
                setUserData({ name: '', email: '' });
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred');
        }
    };

    const settings = [
        { id: 1, leftText: 'Manage Payment' },
        { id: 2, leftText: 'Invite Friends' },
        { id: 3, leftText: 'Notifications' },
        { id: 4, leftText: 'Privacy Policy' },
        { id: 5, leftText: 'About Us' },
        { id: 6, leftText: 'Language Selection' },
        { id: 7, leftText: 'Sign Out', } ,
    ];

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.gradientContainer}>
                <TouchableOpacity onPress={navigateToHomeScreen}>
                    <Icon name="arrow-left" size={17} color="white" style={styles.filterIcon} />
                </TouchableOpacity>
                <Text style={styles.offersText}> Settings </Text>
                <TouchableOpacity onPress={navigateToEditProfileScreen}>
                    <Text style={styles.editprofile}> Edit Profile </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TouchableOpacity  style={styles.avatar} >
                    <Avatar.Image
                     size={120}
                   
                        source={{
                            uri: userData.image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC' // Use a default image if no image is available
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.text}>{userData.name}</Text>
                <Text style={styles.text1}>{userData.email}</Text>
            </View>
            <View style={styles.tablecontainer}>
                {settings.map((setting) => (
                    <SettingsDrawer
                        key={setting.id}
                        leftText={setting.leftText}
                        rightText={setting.rightText}
                        id={setting.id}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#2C398B',
        height: 300,
    },
    profileimage: {
        marginTop: 20,
        marginBottom:10
    },
    text: {
        fontFamily: 'Poppins-Bold',
        color: 'white',
        fontSize: 16,
    },
    text1: {
        fontFamily: 'Poppins-Bold',
        color: '#C8C8C8',
        fontSize: 14,
    },
    text2: {
        fontFamily: 'Poppins-Medium',
        color: 'white',
        fontSize: 14,
    },
    text3: {
        fontFamily: 'Poppins-Bold',
        color: 'white',
        fontSize: 14,
    },
    tablecontainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 60,
        backgroundColor: 'white',
        borderTopStartRadius: 35,
        borderTopEndRadius: 35,
        marginTop: -40,
    },
    avatar: {
        borderRadius: 80,
        marginTop: 20,
        marginBottom:10,
        backgroundColor: 'white',
        height: 138,
        width: 138,
        borderColor: '#ccc',
        borderWidth: 1,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#2C398B',
        height: 48
    },
    offersText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: 'white',
        top: 5,
        right: 10
    },
    filterIcon: {
        marginRight: 20,
        top: 3
    },
    editprofile: {
        marginLeft: 210,
        top: 5,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: 'white',
        textDecorationLine: 'underline'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginTop:20,
        width: 350,
        height: 48
    },
    text: {
        fontFamily: 'Poppins-Bold',
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
});