import React from 'react';
import { Image, View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import DetailsHeader from './Components/Offers/DetailsHeader';
import AmazonList from './Components/Offers/AmazonList';
import LinearGradient from 'react-native-linear-gradient';
import { IP_ADDRESS } from './global';

const AmazonCoupon = ({ route }) => {
  const { segmentData } = route.params;

  const offers = [
    { id: 1, leftText: 'New Price', price: segmentData.newprice, previousprice: segmentData.truncatedPrice },
    { id: 2, leftText: 'Discount(%)', discount: segmentData.discountPercentage, amount: segmentData.discountPrice },
    { id: 3, leftText: 'Shipping Charge', rightText: segmentData.ShippingCharge },
    { id: 4, leftText: 'eBay Average Price', rightText: segmentData.ebayAveragePrice },
    { id: 5, leftText: 'eBay Top Price', rightText: segmentData.eBayTopPrice },
    { id: 6, leftText: 'eBay Sales', rightText: segmentData.eBaySales },
    { id: 7, leftText: 'Manufacturer Price', rightText: segmentData.ManufacturerPrice },
    { id: 8, leftText: 'Seller', rightText: segmentData.Seller },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <DetailsHeader />
      <View style={styles.container}>
       <Image source={{ uri: `${IP_ADDRESS}/${segmentData.contentimage}` }} style={styles.amazonimage} />
        <Text style={styles.amazontext}>{segmentData.title}</Text>
      </View>
      <View style={styles.container1}>
        <Text style={styles.amazontext1}>No minimum amount required. Just visit website and avail the coupon.</Text>
      </View>
      <View style={styles.tablecontainer}>
        <Text style={styles.text}> More About Offer</Text>
        {offers.map((offer) => (
          <AmazonList
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
        <Text style={styles.text1}>
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
        </Text>
        <TouchableOpacity>
          <LinearGradient colors={['#2C398B', '#01AAEC']} style={styles.linearGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text style={styles.loginText}>Get Coupon</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AmazonCoupon;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C398B',
    height: 60,
  },
  container1: {
    backgroundColor: '#2C398B',
    width:'100%',
    height: 120,
  },
  amazonimage: {
    marginTop: 10,
    width: 100,
    height: 40,
    left: 24,
    borderRadius: 5
  },
  amazontext: {
    marginTop: 10,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 16,
    paddingHorizontal:50,
    textAlign:'justify'
  },
  amazontext1: {
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 12,
    paddingHorizontal:20,
    textAlign:'justify'
  },
  tablecontainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    marginTop: -60
  },
  text: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 14,
    paddingTop: 30,
    paddingBottom: 20,
    right: 110
  },
  emoji: {
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10,
  },
  linearGradient: {
    width: 414,
    height: 60,
    padding: 15,
    alignItems: 'center',
  },
  loginText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: 'white',
  },
  text1: {
    marginTop: 20,
    marginBottom: 100
  }
});
