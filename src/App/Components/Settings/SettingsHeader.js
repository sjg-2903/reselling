import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const SettingsHeader = () => {
  const navigation = useNavigation();
  
  const navigateToHomeScreen = () => {
    navigation.navigate('Home');
  };
  const navigateToEditScreen = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.gradientContainer}>
      <TouchableOpacity onPress={navigateToHomeScreen}>
        <Icon name="arrow-left" size={17} color="white" style={styles.filterIcon} />
      </TouchableOpacity>
        <Text style={styles.offersText}> Settings </Text>
      <TouchableOpacity onPress={navigateToEditScreen}>
        <Text style={styles.editprofile}> Edit Profile </Text>
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
    fontSize: 14,
    color: 'white',
    top: 5,
    right: 10
  },
  filterIcon: {
    marginRight: 20,
    top: 3
  },
  editprofile: {
    marginLeft:180,
    top:5,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: 'white',
    textDecorationLine:'underline' // This will push the share icon to the end of the container
    
  },
});

export default SettingsHeader;
