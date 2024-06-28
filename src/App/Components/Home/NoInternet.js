import React from 'react'
import { View, Text, Image, StyleSheet} from 'react-native';

const NoInternet = () => {
  return (
    <View style={styles.container}>
         <Image source={require('../../../../assets/images/App/nointernet.png')} style={styles.image} />
         <Text style={styles.text}>No internet!</Text>
         <Text style={styles.text2}>Please check the data connection</Text>
  </View>
  )
}

export default NoInternet

const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems: 'center',
      alignItems:'center',
      justifyContent:'center'
    },
    text: {
      fontFamily:'Poppins-Bold',
      fontSize: 24,
      color:'black'
    },
    text2: {
        fontFamily:'Poppins-SemiBold',
        fontSize: 14,
        color:'black'
      },
    image:{
        width:281,
        height:281
    }
  });