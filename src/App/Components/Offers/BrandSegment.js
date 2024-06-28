import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { IP_ADDRESS } from '../../global'; // Import axios for making HTTP requests

const BrandSegment = ({ id }) => {
  const navigation = useNavigation();
  const [segmentData, setSegmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://${IP_ADDRESS}:3005/amazonone`); // Replace with your backend URL and endpoint
      setSegmentData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const navigateToAmazonCoupon = () => {
    navigation.navigate('AmazonCoupon', {
      segmentData: segmentData // Pass segmentData as a prop to AmazonCoupon screen
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Image source={require('../../../../assets/images/App/amazon.png')} style={styles.icon1} />
        <View>
          <Text style={styles.text}>{segmentData.title}</Text>
          <Text style={styles.text1}>Offer Price: <Text style={styles.text4}>{segmentData.offerPrice}</Text></Text>
        </View>
      </View>
      <View style={styles.container1}>
        <Image source={require('../../../../assets/images/App/timer.png')} style={styles.timer} />
        <Text style={styles.text2}>Expires in <Text style={styles.text3}>{segmentData.expiresIn} hours</Text></Text>
        <TouchableOpacity onPress={navigateToAmazonCoupon}>
          <LinearGradient colors={['#2C398B', '#01AAEC']} style={styles.linearGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.loginText}>Claim</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: '#ccc',
    marginBottom: 2,
    backgroundColor: 'white',
    width: 366,
    left: 24,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: 'white',
    width: 366,
    left: 24,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10
  },
  icon1: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontFamily: 'Poppins-Bold',
    color: '#1F3D4D',
    fontSize: 14,
  },
  text1: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
    fontSize: 12,
    left: 2
  },
  text2: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
    fontSize: 12,
    left: 10
  },
  text3: {
    fontFamily: 'Poppins-Bold',
    color: '#E5246A'
  },
  text4: {
    fontFamily: 'Poppins-Bold',
    color: '#2EBD59'
  },
  timer: {
    width: 17,
    height: 17,
    marginLeft: 5
  },
  loginText: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: 'white',
  },
  linearGradient: {
    width: 90,
    height: 30,
    borderRadius: 30,
    padding: 3,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default BrandSegment;
