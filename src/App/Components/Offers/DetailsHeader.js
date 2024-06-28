import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const DetailsHeader = () => {
  const navigation = useNavigation();
  
  const navigateToOffersScreen = () => {
    navigation.navigate('Offers');
  };

  return (
    <View style={styles.gradientContainer}>
      <TouchableOpacity onPress={navigateToOffersScreen}>
        <Icon name="arrow-left" size={17} color="white" style={styles.filterIcon} />
      </TouchableOpacity>
      <Text style={styles.offersText}> Offer Details </Text>
      <TouchableOpacity>
        <EntypoIcon name="share" size={17} color="white" style={styles.shareIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#2C398B'
  },
  offersText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: 'white',
    top: 5,
    right: 10
  },
  filterIcon: {
    marginRight: 20,
    top: 3
  },
  shareIcon: {
    marginLeft: 235, // This will push the share icon to the end of the container
    top: 3
  },
});

export default DetailsHeader;
