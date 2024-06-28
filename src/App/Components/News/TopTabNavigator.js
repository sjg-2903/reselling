// src/App/Components/News/TopTabNavigator.js
import React from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewsPage from './NewsPage';
import Analytics from './Analytics';
import Coupons from './Coupons';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="NewsPage"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#1F3D4D',
        tabBarInactiveTintColor: '#C8C8C8',
        tabBarStyle: { backgroundColor: 'white', fontFamily: 'Poppins-Bold' },
        tabBarIndicatorStyle: { backgroundColor: '#01AAEC', fontFamily: 'Poppins-Bold' },
        tabBarLabel: ({ focused, color }) => {
          let displayName;

          switch (route.name) {
            case 'NewsPage':
              displayName = 'News';
              break;
            case 'Analytics':
              displayName = 'Analytics';
              break;
            case 'Coupons':
              displayName = 'Coupons';
              break;
            default:
              displayName = route.name;
              break;
          }

          return <Text style={{ color: focused ? color : '#C8C8C8', fontFamily: 'Poppins-Bold' }}>{displayName}</Text>;
        },
      })}
    >
      <Tab.Screen name="NewsPage" component={NewsPage} />
      <Tab.Screen name="Analytics" component={Analytics} />
      <Tab.Screen name="Coupons" component={Coupons} />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
