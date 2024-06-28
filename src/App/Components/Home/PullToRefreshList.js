import React, { useState, useEffect } from 'react';
import { ScrollView, Text, RefreshControl, ActivityIndicator, View } from 'react-native';

const PullToRefreshList = ({ fetchDataFunction }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = () => {
    setLoading(true); // Set loading to true while fetching data
    // Simulate fetching data from an API
    setTimeout(() => {
      fetchDataFunction().then(newData => {
        setData([...data, ...newData]);
        setRefreshing(false);
        setLoading(false); // Set loading to false after data is fetched
      });
    }, 1000);
  };

  useEffect(() => {
    // Initial data fetch
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
    >
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        data.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))
      )}
    </ScrollView>
  );
};

export default PullToRefreshList;
