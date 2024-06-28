import React from 'react';
import { ScrollView } from 'react-native';
import Header1 from './Components/Offers/Header1';
import OffersTabNavigator from './Components/Offers/OffersTabNavigator';


const Offers = () => {
 
  return (
    <ScrollView>
        <Header1 />
        <OffersTabNavigator/>
    </ScrollView>
  );
};

export default Offers;
