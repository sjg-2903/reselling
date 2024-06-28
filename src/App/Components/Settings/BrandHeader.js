import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';

const BrandHeader = () => {
  const navigation = useNavigation();
  
  const HomeScreen = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.gradientContainer}>
      <TouchableOpacity onPress={HomeScreen}>
        <Icon name="arrow-left" size={17} color="white" style={styles.filterIcon} />
      </TouchableOpacity>
      <Text style={styles.offersText}> Brands </Text>
      <TouchableOpacity>
        <Icon name="search" size={17} color="white" style={styles.shareIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#2C398B',
    height:48
  },
  offersText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'white',
    top:5,
    right: 7
  },
  filterIcon: {
    marginRight: 20,
    top: 3
  },
  shareIcon: {
    marginLeft:270, // This will push the share icon to the end of the container
    top: 3
  },
});

export default BrandHeader;
