import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NewsTab = ({ selectedTab, handleTabPress }) => {
  const navigation = useNavigation();
  const handlePress = (tab) => {
    handleTabPress(tab);
    navigation.navigate(tab);
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress('News')}>
        <View style={[styles.tab, selectedTab === 'News' && styles.selectedTab]}>
          <Text style={[styles.tabText, selectedTab === 'News' && styles.selectedTabText]}>News</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('Analytics')}>
        <View style={[styles.tab, selectedTab === 'Analytics' && styles.selectedTab]}>
          <Text style={[styles.tabText, selectedTab === 'Analytics' && styles.selectedTabText]}>Analytics</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('Coupons')}>
        <View style={[styles.tab, selectedTab === 'Coupons' && styles.selectedTab]}>
          <Text style={[styles.tabText, selectedTab === 'Coupons' && styles.selectedTabText]}>Coupons</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
    width:'100%',
  },
  tab: {
    marginRight: 60,
    padding: 18,
    paddingHorizontal:20,
    borderBottomWidth: 2,
    borderColor: 'transparent', // initially transparent
  },
  selectedTab: {
    borderColor: '#01AAEC', // change border color for selected tab
  },
  tabText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color:'#C8C8C8'
  },
  selectedTabText: {
    color: '#1F3D4D',
     // change text color for selected tab
  },
});

export default NewsTab;
