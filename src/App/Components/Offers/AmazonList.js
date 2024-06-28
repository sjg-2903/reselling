import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';



const AmazonList = ({ leftText, rightText, id,price,previousprice,discount,amount,productname}) => {
  // Define a function to determine the style for the right text based on the id
  const getRightTextStyle = () => {
    switch (id) {
      case 1:
        return (
          <Text>
           <Text style={styles.rightText}>{price}</Text>
            <Text style={styles.rightTextCut}>{previousprice}</Text>
          </Text>
        ); // Nested text for id 2
      case 2:
        return (
          <Text>
            <Text style={styles.rightText}>{discount}</Text>
            <Text style={styles.rightTextGrey}>{amount}</Text>
          </Text>
        );
      case 3:
        return(
          <Text style={styles.rightText}>{rightText}</Text>
        );
      case 4:
        return (
          <TouchableOpacity>
          
              <Text style={styles.rightTextBlue}> Tap to Unlock </Text>
           
          </TouchableOpacity>
        );
        case 5:
          return (
            <TouchableOpacity>
             
               <Text style={styles.rightTextBlue}> Tap to Unlock </Text>
            
            </TouchableOpacity>
          );
          case 6:
            return (
              <TouchableOpacity>
               <Text style={styles.rightTextBlue}> Tap to Unlock </Text>
              </TouchableOpacity>
            );
        
      default:
        return <Text style={styles.rightText}>{rightText}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.leftText}>{leftText}</Text>
      <View>{getRightTextStyle()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
    borderBottomColor: '#ccc',
    borderTopColor:'lightgrey',
    width:377
  },
  leftText: {
    fontFamily:'Poppins-SemiBold',
    color:'#1F3D4D',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight:'auto'
  },
  rightText: {
    fontSize: 14,
    fontFamily:'Poppins-Bold',
    color:'#1F3D4D'
  },
  rightTextCut: {
    fontFamily:'Poppins-SemiBold',
    fontSize: 12,
    textDecorationLine:'line-through',
    color:'grey'
  }, 
  rightTextGrey: {
    fontSize: 12,
    fontFamily:'Poppins-Bold',
    color:'grey'
  },
  rightTextBlue: {
    fontSize: 12,
    fontFamily:'Poppins-Bold',
    color:'#2C398B'
  },
  text:{
    fontFamily:'Poppins-Bold',
    fontSize:16,
    color:'#2C398B'
  },
  
});

export default AmazonList;


