import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Touchabletext = () => {
  const [selectedTab, setSelectedTab] = useState('popular');

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleTabPress('popular')}>
        {selectedTab === 'popular' ? (
       
        <Text style={styles.tabText2}>Popular Offers</Text>
         
        ) : (
          <Text style={styles.tabText1}>Popular Offers</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('latest')}>
        {selectedTab === 'latest' ? (
          
            <Text style={styles.tabText2}>Latest Offers</Text>
        ) : (
          <Text style={styles.tabText1}>Latest Offers</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 10,
    marginBottom:5 // Adjust padding to align from the left side
  },
  tabText1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    marginRight: 20, // Reduce the space between tabs
  },
  tabText2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#01AAEC',
    marginRight: 20, // Reduce the space between tabs
  },
  selectedTab: {
    borderRadius: 5,
    padding: 5,
  },
});

export default Touchabletext;
