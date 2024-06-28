import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { IP_ADDRESS } from '../../global';

const SegmentWithLike = ({ onRefresh }) => {
  const [segments, setSegments] = useState([]);
  const [likedSegments, setLikedSegments] = useState({});

  useEffect(() => {
    fetchSegments();
  }, [onRefresh]);


  const fetchSegments = async () => {
    try {
      const response = await axios.get(`http://${IP_ADDRESS}:3005/segmentone`);
      setSegments(response.data);
    } catch (error) {
      console.error('Error fetching segments:', error);
    }
  };

  const handleLikePress = (index) => {
    setLikedSegments((prevLikedSegments) => ({
      ...prevLikedSegments,
      [index]: !prevLikedSegments[index],
    }));
  };

  const renderItem = ({ item, index }) => {
    const truncatedTitle = item.title.length > 28 ? item.title.substring(0, 28) + '...' : item.title;
    const liked = likedSegments[index];

    return (
      <>
        <View style={styles.container}>
          <Image source={{ uri: `http://${IP_ADDRESS}:3005/${item.imageSource}` }} style={styles.icon1} />
          <View style={styles.textcontainer}>
            <Text style={styles.text}>{truncatedTitle}</Text>
            <Text numberOfLines={2} style={styles.text1}>{item.description}</Text>
          </View>
          <View style={styles.icon}>
            <TouchableOpacity onPress={() => handleLikePress(index)}>
              <Icon
                name={liked ? 'heart' : 'heart-o'}
                size={15}
                color={liked ? 'pink' : 'red'}
                style={[{ opacity: 0.8 }]} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container1}>
          <Image source={require('../../../../assets/images/App/timer.png')} style={styles.timer} />
          <Text style={styles.text2}>Expires in <Text style={styles.text3}>{item.expiryDate} hours</Text></Text>
          <TouchableOpacity style={styles.claimButtonContainer}>
            <LinearGradient colors={['#2C398B', '#01AAEC']} style={styles.linearGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.loginText}> Claim </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <FlatList
      data={segments}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
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
    width: '100%',
    paddingHorizontal: 10,
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
    width: '100%',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10
  },
  textcontainer: {
    width: 250,
  },
  icon: {
    flex: 1,
    alignItems: 'center' 
  },
  icon1: {
    width: 26,
    height: 26,
    marginRight: 10,
    marginTop:-25
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    color: '#1F3D4D',
    fontSize: 14,
  },
  text1: {
    fontFamily: 'Poppins',
    color: 'grey',
    fontSize: 12,
  },
  text2: {
    fontFamily: 'Poppins-Medium',
    color: 'grey',
    fontSize: 14,
    left: 10
  },
  text3: {
    fontFamily: 'Poppins-Bold',
    color: 'grey',
    fontSize: 14,
    left: 10
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
    alignItems: 'center'  
  },
  claimButtonContainer: {
    flex: 1,
    alignItems: 'flex-end' // Align to the extreme right
  }
});

export default SegmentWithLike;
