import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Highlights = () => {
  const navigation = useNavigation();

  const NewsScreen = () => {
    navigation.navigate('News', { screen: 'NewsPage' });
  };

  const AnalyticsScreen = () => {
    navigation.navigate('News', { screen: 'Analytics' });
  };

  const CouponsScreen = () => {
    navigation.navigate('News', { screen: 'Coupons' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Highlights </Text>
      <TouchableOpacity onPress={NewsScreen}>
        <Image source={require('../../../../assets/images/App/Highlight.png')} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={AnalyticsScreen}>
        <Image source={require('../../../../assets/images/App/Highlight2.png')} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={CouponsScreen}>
        <Image source={require('../../../../assets/images/App/Highlight1.png')} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#1F3D4D',
    marginTop: 10,
    marginBottom: 10,
    left: 20,
  },
  image: {
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    width: 366,
    height: 58,
  },
});

export default Highlights;
