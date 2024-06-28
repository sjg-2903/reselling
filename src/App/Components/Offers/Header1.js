import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Header1 = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('brands');

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };


  const handleBackPress = () => {
    navigation.navigate('Home'); // Ensure this matches your route name in the navigator
  };

  return (
    <LinearGradient
      colors={['rgba(44, 57, 139, 1)', 'rgba(1, 170, 236, 1)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientContainer}>
      <View style={styles.heading}>
      <TouchableOpacity onPress={handleBackPress}>
        <Icon name="arrow-left" size={20} color="white" style={styles.backicon} />
      </TouchableOpacity>
        <Text style={styles.offersText}>Offers</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => handleTabPress('brands')}>
          <View style={[styles.tabBox, selectedTab === 'brands' && styles.selectedTab]}>
            <Text style={[styles.tabText, selectedTab === 'brands' && styles.selectedTabText]}>Brands</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('shops')}>
          <View style={[styles.tabBox, selectedTab === 'shops' && styles.selectedTab]}>
            <Text style={[styles.tabText, selectedTab === 'shops' && styles.selectedTabText]}>Shops</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="filter" size={20} color="#fff" style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  offersText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#fff',
    marginLeft:30
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  tabBox: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    width: 80,
    height: 40
  },
  tabText: {
    fontFamily: 'Poppins',
    fontSize: 13,
    color: '#000',
    textAlign: 'center'
  },
  selectedTab: {
    backgroundColor: '#888',
  },
  selectedTabText: {
    color: '#fff',
  },
  filterIcon: {
    marginLeft: 20,
  },
  heading: {
    flexDirection: 'row'
  },
  backicon:{
    marginTop:6
  }
});

export default Header1;
