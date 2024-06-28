// src/App/News.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopTabNavigator from './Components/News/TopTabNavigator';

const News = () => {
  return (
    <View style={styles.container}>
      <TopTabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default News;
