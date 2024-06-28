import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Text, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import Header from './Components/Home/Header';
import Imageslider from './Components/Home/Imageslider';
import IS from './Components/Home/IS';
import IS2 from './Components/Home/IS2';
import Touchabletext from './Components/Home/Touchabletext';
import SegmentWithLike from './Components/Home/Segment';
import Highlights from './Components/Home/Highlights';
import Toast from '../Login/Toast';
import { IP_ADDRESS } from './global';

const windowHeight = Dimensions.get('window').height;

const Home = ({ route }) => {
  const { message } = route.params || {};
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://${IP_ADDRESS}:3005/segmentone`);
      setSegments(response.data);
    } catch (error) {
      console.error('Error fetching segments:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData(); // Call fetchData function when refreshing
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      data={[{ key: 'content' }]}
      renderItem={({ item }) => (
        <>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="blue" />
              <Text>Loading...</Text>
            </View>
          ) : (
            <>
              {message && <Toast message={message} />}
              <Header />
              <View style={styles.content}>
                <View style={[styles.segment, { height: windowHeight * 0.26, marginBottom: 10, marginTop: 10 }]}>
                  <Imageslider />
                </View>
                <View style={[styles.segment, { height: windowHeight * 0.13, marginBottom: 10 }]}>
                  <IS />
                </View>
                <View style={[styles.segment, { height: windowHeight * 0.13, marginBottom: 10 }]}>
                  <IS2 />
                </View>
                <View style={styles.viewsegment}>
                  <Touchabletext />
                  <SegmentWithLike segments={segments} />
                </View>
                <Highlights />
              </View>
            </>
          )}
        </>
      )}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={true}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  segment: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewsegment: {
    paddingHorizontal: 20
  }
});
