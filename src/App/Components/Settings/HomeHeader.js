import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const HomeHeader = () => {
  const navigation = useNavigation();
  
  const HomeScreen = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.gradientContainer}>
      <TouchableOpacity onPress={HomeScreen}>
        <Icon name="arrow-left" size={17} color="white" style={styles.filterIcon} />
      </TouchableOpacity>
        <Text style={styles.offersText}> Home </Text>
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
    fontSize: 12,
    color: 'white',
    top: 5,
    right: 10
  },
  filterIcon: {
    marginRight: 20,
    top: 3
  }
});

export default HomeHeader;
