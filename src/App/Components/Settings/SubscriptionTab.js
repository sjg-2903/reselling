import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const SubscriptionTab = ({ selectedTab, handleTabPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleTabPress('Starter')}>
        <View style={[styles.tab, selectedTab === 'Starter' && styles.selectedTab]}>
          <Text style={[styles.tabText, selectedTab === 'Starter' && styles.selectedTabText]}>Starter</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('Basic')}>
        <View style={[styles.tab, selectedTab === 'Basic' && styles.selectedTab]}>
          <Text style={[styles.tabText, selectedTab === 'Basic' && styles.selectedTabText]}>Basic</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('Pro')}>
        <View style={[styles.tab, selectedTab === 'Pro' && styles.selectedTab]}>
          <Text style={[styles.tabText, selectedTab === 'Pro' && styles.selectedTabText]}>  Pro</Text>
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
    borderTopStartRadius:28,
    borderTopEndRadius:28,
    marginBottom: 10,
    borderBottomWidth:1,
    borderBottomColor:'lightgrey'
    
  },
  tab: {
    padding:12,
    justifyContent:'space-between',
    paddingHorizontal:45,
    borderBottomWidth: 2,
    borderColor: 'transparent',
    // initially transparent
  },
  selectedTab: {
    alignItems:'center',
    borderColor: '#01AAEC', // change border color for selected tab
  },
  tabText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#C8C8C8',
  },
  selectedTabText: {
    color: '#1F3D4D', // change text color for selected tab
  },
});

export default SubscriptionTab;
