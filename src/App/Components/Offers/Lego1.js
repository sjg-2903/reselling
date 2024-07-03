import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Divider } from 'react-native-elements';
import { IP_ADDRESS } from '../../global';
import axios from 'axios';

const LegoItem = () => {
  const navigation = useNavigation();
  const [legoData, setLegoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLegoData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLegoData();
    setRefreshing(false);
  }, []);

  const fetchLegoData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${IP_ADDRESS}/legoone`);
      console.log(response)
      setLegoData(response.data);
    } catch (error) {
      setError('Error fetching lego data');
    } finally {
      setLoading(false);
    }
  };

  const handleLegoContent = (lego) => {
    navigation.navigate('Toy', { legoData: lego });
  };

  return (
    <ScrollView
      style={styles.containerscroll}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        legoData.map((lego) => (
          <View key={lego._id} style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `${IP_ADDRESS}/${lego.imageSource}` }}
                style={styles.image}
              />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.textContainer}>
                <TouchableOpacity onPress={() => handleLegoContent(lego)}>
                  <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    {lego.title}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
                  Offer Price :  <Text style={styles.greentext}>{lego.offerPrice}</Text>
                </Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.dateContainer}>
                <Image source={require('../../../../assets/images/App/timer.png')} style={styles.timer} />
                <Text style={styles.uploadDate}> Expires in <Text style={styles.redtext}>{lego.expiryDate} hrs</Text> </Text>
                <TouchableOpacity onPress={() => handleLegoContent(lego)}>
                    <LinearGradient colors={['#2C398B', '#01AAEC']} style={styles.linearGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                       <Text style={styles.loginText}>Claim</Text>
                    </LinearGradient>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerscroll: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  container: {
    flexDirection: 'row',
    width: 366,
    height: 122,
    marginBottom: 15,
    backgroundColor: 'white',
    marginLeft: 15,
    borderRadius: 8,
    elevation: 10,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginTop:10,
    marginRight: 15,
    marginLeft:10
  },
  image: {
    borderRadius: 5,
    flex: 1,
    width: 90,
    height: 90
  },
  contentContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  textContainer: {
    flex: 2,
    marginRight: 10,
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: '#1F3D4D',
    fontSize: 14,
  },
  content: {
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
    fontSize: 12
  },
  greentext: {
    fontFamily: 'Poppins-SemiBold',
    color: '#2EBD59',
    fontSize: 12
  },
  redtext: {
    fontFamily: 'Poppins-SemiBold',
    color: '#E5246A',
    fontSize: 12
  },
  dateContainer: {
    flex: 1,
    flexDirection:'row'
  },
  divider: {
    height: 1,
    backgroundColor: 'grey',
    marginRight: 10,
    marginVertical: 10,
  },
  uploadDate: {
    fontFamily: 'Poppins-SemiBold',
    justifyContent: 'center',
    color: 'grey',
    fontSize: 12,
    marginTop:-2

  },
  timer: {
    width: 17,
    height: 17
  },
  loginText: {
    fontFamily: "Poppins-Bold",
    fontSize: 13,
    color: 'white',
  },
  linearGradient: {
    width: 70,
    height: 30,
    borderRadius: 30,
    padding: 3,
    alignItems: 'center',
    marginLeft:15,
    marginTop:-5
  },
});

export default LegoItem;
