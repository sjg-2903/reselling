import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import HomeHeader from './HomeHeader';

const AboutUs = () => {
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <HomeHeader />
            <View style={styles.container}>
                <Text style={styles.text1}>About Us</Text>
            </View>
            <View style={styles.tablecontainer}>
                <Text style={styles.heading}>Lorem Ipsum is simply dummy</Text>
                <Text style={styles.paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                <Text style={styles.paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Text>
                <Text style={styles.subheading}>Where does it come from ?</Text>
                <Text style={styles.subparagraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            </View>
        </ScrollView>
    );
};
export default AboutUs;
const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#2C398B',
        height: 100,
    },
    heading: {
        marginTop: 50,
        marginBottom: 5,
        fontFamily: 'Poppins-Bold',
        color: '#1F3D4D',
        fontSize: 16,
    },
    paragraph: {
        fontFamily: 'Poppins-SemiBold',
        color: 'grey',
        fontSize: 14,
        lineHeight: 21,
        marginBottom: 10,
        textAlign: 'justify'
    },
    subparagraph: {
        fontFamily: 'Poppins-SemiBold',
        color: 'grey',
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'justify'
    },
    subheading: {
        marginTop: 10,
        marginBottom: 7,
        fontFamily: 'Poppins-Bold',
        color: '#1F3D4D',
        fontSize: 16,
    },
    text1: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        color: 'white'
    },
    tablecontainer: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: 'white',
        borderTopStartRadius: 28,
        borderTopEndRadius: 28,
        marginTop: -30
    },


});