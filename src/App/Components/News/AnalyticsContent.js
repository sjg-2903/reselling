import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IP_ADDRESS } from '../../global';

const AnalyticsContent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { analyticsItem } = route.params;
  const { title, heading, subheading, paragraph, subparagraph, contentimage, uploadDate } = analyticsItem;


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.gradientContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={17} color="white" style={styles.filterIcon} />
        </TouchableOpacity>
        <Text style={styles.analyticsText}>{title}</Text>
      </View>
      <Image source={{ uri: `${IP_ADDRESS}/${contentimage}` }} style={styles.contentImage} resizeMode="cover" />
      <Text style={styles.date}>Uploaded on: {uploadDate}</Text>
      <View style={styles.content}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.paragraph}>{paragraph}</Text>
        <Text style={styles.subheading}>{subheading}</Text>
        <Text style={styles.subparagraph}>{subparagraph}</Text>
        <Text style={styles.heading}>Contents:</Text>
        <TouchableOpacity><Text style={styles.linktext}>Business registration and tax office</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.linktext}>Own domain and email</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.linktext}>Business and Paypal accounts</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.linktext}>Accounting Software</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.linktext}>Legal texts</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#2C398B',
    height: 48,
  },
  content: {
    paddingHorizontal: 20,
  },
  analyticsText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: 'white',
    top: 5,
    right: 10,
  },
  filterIcon: {
    marginRight: 20,
    top: 3,
  },
  contentImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  date: {
    fontFamily: 'Poppins-Medium',
    color: 'grey',
    fontSize: 12,
    paddingLeft: 150
  },
  heading: {
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Poppins-Bold',
    color: '#1F3D4D',
    fontSize: 15,
  },
  paragraph: {
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
    fontSize: 12,
  },
  subparagraph: {
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
    fontSize: 12,
  },
  subheading: {
    marginTop: 10,
    marginBottom: 7,
    fontFamily: 'Poppins-Bold',
    color: '#1F3D4D',
    fontSize: 15,
  },
  linktext: {
    fontFamily: 'Poppins-SemiBold',
    color: '#01AAEC',
    textDecorationLine: 'underline',
    fontSize: 13,
  },
});

export default AnalyticsContent;
