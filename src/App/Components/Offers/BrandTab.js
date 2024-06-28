import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const BrandTab = ({ selectedTab, handleTabPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleTabPress('H&M')}>
        <View style={[styles.tab, selectedTab === 'H&M' && styles.selectedTab]}>
          <Text style={[styles.tabText, selectedTab === 'H&M' && styles.selectedTabText]}>H&M</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('Tommy')}>
        <View style={[styles.tab, selectedTab === 'Tommy' && styles.selectedTab]}>
          <Text style={[styles.tabText, selectedTab === 'Tommy' && styles.selectedTabText]}>Tommy</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('Amazon')}>
        <View style={[styles.tab, selectedTab === 'Amazon' && styles.selectedTab]}>
          <Text style={[styles.tabText, selectedTab === 'Amazon' && styles.selectedTabText]}>Amazon</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('Lego')}>
        <View style={[styles.tab, selectedTab === 'Lego' && styles.selectedTab]}>
          <Text style={[styles.tabText, selectedTab === 'Lego' && styles.selectedTabText]}>Lego</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  tab: {
    marginRight: 20,
    padding: 20,
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
    color:'#1F3D4D', // change text color for selected tab
  },
});

export default BrandTab;
