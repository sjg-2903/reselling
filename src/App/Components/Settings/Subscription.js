import React,{useState} from 'react';
import { View, Text, Image, StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import HomeHeader from './HomeHeader';
import SubscriptionTab from './SubscriptionTab';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Subscription= () => {
    const navigation = useNavigation();
    const BrandScreen = () => {
    navigation.navigate('BrandScreen');
  };
 
    const [selectedTab, setSelectedTab] = useState('Starter');
  
  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };
    return(
       <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <HomeHeader/>
            <View style={styles.container}>
                <Text style={styles.text1}>Subscription</Text>
            </View>
            <View style={styles.tablecontainer}> 
                <SubscriptionTab selectedTab={selectedTab} handleTabPress={handleTabPress} />
                <TouchableOpacity>
                    <LinearGradient colors={['rgba(44, 57, 139, 1)','rgba(1, 170, 236, 1)']} style={styles.linearGradient} start={{ x: 0, y: 0 }}end={{ x: 1, y: 0 }}>
                        <Text style={styles.loginText}>$<Text style={styles.loginText1}>29.99</Text>/month</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={styles.container1}>
                <Text style={styles.heading}>Features and benefits</Text>
                <Text style={styles.space}>
                    <Image source={require('../../../../assets/images/App/check1.png')} style={styles.check} /> 
                    <Text style={styles.subheading}>  Lorem Ipsum is simply</Text>
                </Text>
                <Text style={styles.space1}>
                    <Image source={require('../../../../assets/images/App/check1.png')} style={styles.check} /> 
                    <Text style={styles.subheading}>  Lorem Ipsum is simply du</Text>
                </Text>
                <Text style={styles.space2}>
                    <Image source={require('../../../../assets/images/App/check1.png')} style={styles.check} /> 
                    <Text style={styles.subheading}>  Lorem Ipsum is simply dummy</Text>
                </Text>
                <Text style={styles.space3}>
                    <Image source={require('../../../../assets/images/App/check1.png')} style={styles.check} /> 
                    <Text style={styles.subheading}>  Lorem Ipsum is simply</Text>
                </Text>
                <TouchableOpacity onPress={BrandScreen}>
                    <LinearGradient colors={['#2C398B', '#01AAEC']} style={styles.linearGradient1} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                        <Text style={styles.loginText2}>Choose Brands</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
export default Subscription;
const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
      },
      container: {
        alignItems: 'center',
        backgroundColor:'#2C398B',
        height:150,
    },
    container1: {
        alignItems: 'center',
        backgroundColor:'white',
        height:330,
    },
    text1:{
        fontFamily:'Poppins-Bold',
        fontSize:20,
        color:'white',
        top:20,
    },
    tablecontainer: {
        backgroundColor: 'white',
        borderTopStartRadius:28,
        borderTopEndRadius:28,
        marginTop:-50,
        height:300
    },
    loginText:{
        fontFamily:"Poppins-Bold",
        fontSize: 20,
        color:"white",
        textAlign:'center',
        top:15,
        left:10
     },
     loginText1:{
       
        fontSize: 40,
    },
      linearGradient:{
        top:80,
        left:65,
        width:280,
        height:98,
        borderRadius:100,
       
      },
      heading:{
        fontFamily:'Poppins-Bold',
        color:'#1F3D4D',
        fontSize:18,
        paddingBottom:15,
        left:-51
    },
    space:{
        paddingBottom:5,
        left:-58
    },
    space1:{
        paddingBottom:5,
        left:-47
    },
    space2:{
        paddingBottom:5,
        left:-28
    },
    space3:{
        paddingBottom:5,
        left:-58
    },
    
    subheading:{
        fontFamily:'Poppins-SemiBold',
        color:'#1F3D4D',
        fontSize:14,
       
    },
    check:{
        height:26,
        width:26,
    },
    linearGradient1: {
        top:65,
        width: 414,
        height:60,
        padding:15,
        alignItems: 'center',
      },
      loginText2: {
        fontFamily: "Poppins-Bold",
        fontSize: 16,
        color: 'white',
      },

});