import React from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AmazonTab from './AmazonTab';
import HMTab from './HMTab';
import TommyTab from './TommyTab';
import LegoItem from './Lego1';
const Tab = createMaterialTopTabNavigator();

const OffersTabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Amazon"
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#1F3D4D',
                tabBarInactiveTintColor: '#C8C8C8',
                tabBarStyle: { backgroundColor: 'white', fontFamily: 'Poppins-Bold',marginBottom:15 },
                tabBarIndicatorStyle: { backgroundColor: '#01AAEC', fontFamily: 'Poppins-Bold' },
                tabBarLabel: ({ focused, color }) => {
                    let displayName;

                    switch (route.name) {
                        case 'H&M':
                            displayName = 'H&M';
                            break;
                        case 'Tommy':
                            displayName = 'Tommy';
                            break;
                        case 'Amazon':
                            displayName = 'Amazon';
                            break;
                        case 'Lego':
                            displayName = 'Lego';
                            break;
                        default:
                            displayName = route.name;
                            break;
                    }

                    return <Text style={{ color: focused ? color : '#C8C8C8', fontFamily: 'Poppins-Bold' }}>{displayName}</Text>;
                },
            })}
        >
            <Tab.Screen name="H&M" component={HMTab} />
            <Tab.Screen name="Tommy" component={TommyTab} />
            <Tab.Screen name="Amazon" component={AmazonTab} />
            <Tab.Screen name="Lego" component={LegoItem} />
        </Tab.Navigator>
    );
};

export default OffersTabNavigator;
