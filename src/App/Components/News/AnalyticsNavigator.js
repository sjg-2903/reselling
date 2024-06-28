import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewsPage from './NewsPage';
import Analytics from './Analytics';
import Coupons from './Coupons';

const Tab = createMaterialTopTabNavigator();

const AnalyticsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Analytics"
      screenOptions={{
        tabBarActiveTintColor: '#1F3D4D',
        tabBarInactiveTintColor: '#C8C8C8',
        tabBarStyle: { backgroundColor: 'white',  fontFamily: 'Poppins-Bold' },
        tabBarIndicatorStyle: { backgroundColor: '#01AAEC',  fontFamily: 'Poppins-Bold' },
      }}
    >
      <Tab.Screen name="News" component={NewsPage} />
      <Tab.Screen name="Analytics" component={Analytics} />
      <Tab.Screen name="Coupons" component={Coupons} />
    </Tab.Navigator>
  );
};

export default AnalyticsNavigator;

