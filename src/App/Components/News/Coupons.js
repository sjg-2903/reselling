import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import { IP_ADDRESS } from '../../global';
import axios from 'axios';

const Coupons = () => {
  const navigation = useNavigation();
  const [couponsData, setCouponsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCouponsData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCouponsData();
    setRefreshing(false);
  }, []);

  const fetchCouponsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${IP_ADDRESS}/couponsone`);
      setCouponsData(response.data);
    } catch (error) {
      setError('Error fetching coupons data');
    } finally {
      setLoading(false);
    }
  };

  const handleCouponsContent = (couponsItem) => {
    navigation.navigate('CouponsContent', { couponsItem });
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
        couponsData.map((coupons) => (
          <View key={coupons._id} style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `${IP_ADDRESS}/${coupons.imageSource}` }}
                style={styles.image}
                resizeMode='cover'
              />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.textContainer}>
                <TouchableOpacity onPress={() => handleCouponsContent(coupons)}>
                  <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    {coupons.title}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
                  {coupons.description}
                </Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.dateContainer}>
                <Text style={styles.uploadDate}>Uploaded on: {coupons.uploadDate}</Text>
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
    marginTop: 25,
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
    width: 122,
    height: 122,
    borderRadius: 8,
    marginRight: 10,
  },
  image: {
    borderRadius: 5,
    flex: 1,
    width: 122,
    height: 122
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
    fontSize: 12,
  },
  content: {
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
    fontSize: 10
  },
  dateContainer: {
    flex: 1
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
    fontSize: 11
  },
});

export default Coupons;
