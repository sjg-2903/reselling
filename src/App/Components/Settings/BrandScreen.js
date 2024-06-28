import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import BrandHeader from './BrandHeader';
import GridView from './GridView';
import LinearGradient from 'react-native-linear-gradient';

const BrandScreen = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const imageData = [
    { id: 1, imageSource: require('../../../../assets/images/App/g1.png') },
    { id: 2, imageSource: require('../../../../assets/images/App/g2.png') },
    { id: 3, imageSource: require('../../../../assets/images/App/g3.png') },
    { id: 4, imageSource: require('../../../../assets/images/App/g4.png') },
    { id: 5, imageSource: require('../../../../assets/images/App/g5.png') },
    { id: 6, imageSource: require('../../../../assets/images/App/g6.png') },
    { id: 7, imageSource: require('../../../../assets/images/App/g7.png') },
    { id: 8, imageSource: require('../../../../assets/images/App/g8.png') },
    { id: 9, imageSource: require('../../../../assets/images/App/g9.png') },
  ];

  const handleSubscribe = () => {
    // Logic to handle subscription based on selected brands
    console.log('Subscribed to:', selectedBrands);
  };

  const handleTouchOutside = () => {
    setSelectedBrands([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BrandHeader />
      <Text style={styles.heading}>Choose Up to 3 Brands</Text>
      <TouchableOpacity style={styles.gridContainer} onTouchStart={handleTouchOutside}>
        <GridView data={imageData} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubscribe}>
        <LinearGradient colors={['#2C398B', '#01AAEC']} style={styles.linearGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <Text style={styles.subscribeText}>Subscribe</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    paddingTop: 10,
    marginBottom: 7,
    fontFamily: 'Poppins-Bold',
    color: '#1F3D4D',
    fontSize: 16,
    marginLeft: 15,
  },
  gridContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  linearGradient: {
    width: '100%',
    height: 60,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subscribeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'white',
  },
});

export default BrandScreen;
