import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const Header = ({ title }) => {
  const navigation = useNavigation();

  // Function to handle navigation to SearchBar screen
  const handleSearchFocus = () => {
    navigation.navigate('SearchBar');
  };

  const Notification = () => {
    navigation.navigate('Notification');
  };

  return (
    <View style={styles.headercontainer}>
      <View style={styles.header}>
        <Image source={require('../../../../assets/images/App/headerlogo.png')} style={styles.headerimage} />
        <TouchableOpacity style={styles.notificationIconContainer} onPress={Notification}>
          <Icon1 name="bell" size={15} color={'blue'} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onFocus={handleSearchFocus} // Navigate to SearchBar screen on focus
        />
        <Icon name="search" size={12} style={styles.searchIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 80,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, // Added paddingHorizontal
  },
  headercontainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 120,
    paddingHorizontal: 10, // Added paddingHorizontal
  },
  headerimage: {
    width: 147.63,
    height: 40,
    left: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(31, 61, 77, 0.1)',
    borderRadius: 70,
    marginBottom: 10,
    backgroundColor: 'rgba(242, 243, 250, 1)',
    paddingHorizontal: 10,
    width: windowWidth - 50, // Adjusted width
    height: 40,
    marginTop: -10,
    left: 30,
  },
  searchInput: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    flex: 1,
    paddingVertical: 0, // Added paddingVertical
  },
  searchIcon: {
    marginRight: 10,
  },
  notificationIconContainer: {
    paddingHorizontal: 10,
    left: -10,
    top: -3,
  },
});

export default Header;
