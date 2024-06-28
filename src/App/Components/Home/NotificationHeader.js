import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


const NotificationHeader = () => {
  const navigation = useNavigation();
  const HomeScreen = () => {
    navigation.navigate('Home');
  };
 
  return (
   <View style={styles.gradientContainer}>
      <TouchableOpacity onPress={HomeScreen}>
            <Icon name="arrow-left" size={20} color="#002E99" style={styles.filterIcon} />
      </TouchableOpacity>
      <Text style={styles.offersText}> Notifications </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor:'white'
  },
  offersText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#002E99',
    top:5,
    right:10
  },
  
  filterIcon: {
    marginRight: 20,
    top:3
  },
});

export default NotificationHeader;
