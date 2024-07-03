import React from 'react';
import { Image, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import DetailsHeader from './Components/Offers/DetailsHeader';
import Cell from './Components/Offers/Cell';
import LinearGradient from 'react-native-linear-gradient';
import { IP_ADDRESS } from './global';

const Toy = ({ route }) => {
  const { legoData } = route.params;
  console.log('Lego Data:', legoData); // Log legoData to verify its structure

  const offers = [
    { id: 1, leftText: 'New Price', price: legoData.newprice, previousprice: legoData.truncatedPrice },
    { id: 2, leftText: 'Discount(%)', discount: legoData.discountPercentage, amount: legoData.discountPrice },
    { id: 3, leftText: 'Shipping Charge', rightText: legoData.ShippingCharge },
    { id: 4, leftText: 'eBay Average Price', rightText: legoData.ebayAveragePrice },
    { id: 5, leftText: 'eBay Top Price', rightText: legoData.eBayTopPrice },
    { id: 6, leftText: 'eBay Sales', rightText: legoData.eBaySales },
    { id: 7, leftText: 'Manufacturer Price', rightText: legoData.ManufacturerPrice },
    { id: 8, leftText: 'Seller', rightText: legoData.Seller },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <DetailsHeader />
      <View style={styles.container}>
        <Image source={{ uri:`${IP_ADDRESS}/${legoData.contentimage}`}} style={styles.backgroundImage} />
        <Image source={require('../../assets/images/App/legoicon.png')} style={styles.iconImage} />
        <Text style={styles.text}>{legoData.title}</Text>
      </View>
      <View style={styles.tableContainer}>
        {offers.map((offer) => (
          <Cell
            key={offer.id}
            leftText={offer.leftText}
            rightText={offer.rightText}
            price={offer.price}
            previousprice={offer.previousprice}
            discount={offer.discount}
            amount={offer.amount}
            id={offer.id}
          />
        ))}
        <Text style={styles.dateText}>{legoData.uploadDate}</Text>
        <View style={styles.emojiContainer}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/App/thumbsup.png')} style={styles.emoji} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/App/thumbsdown.png')} style={styles.emoji} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/App/rocket.png')} style={styles.emoji} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/App/fire.png')} style={styles.emoji} />
          </TouchableOpacity>
        </View>
       </View>
      <TouchableOpacity>
          <LinearGradient colors={['#2C398B', '#01AAEC']} style={styles.linearGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.loginText}>Get Coupon</Text>
          </LinearGradient>
        </TouchableOpacity>
    </ScrollView>
  );
};

export default Toy;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  tableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  iconImage: {
    width: 39,
    height: 39,
    position: 'absolute',
    right: 20,
    top:180
  },
  backgroundImage: {
    marginTop:10,
    width: 290,
    height: 226
  },
  dateText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
  },
  emojiContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  emoji: {
    marginLeft: 10,
  },
  linearGradient: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  loginText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'white',
  },
  text:{
    fontFamily:'Poppins-Bold',
    fontSize:16,
    color:'#2C398B',
    marginTop:10,
    marginBottom:10
  },
});
