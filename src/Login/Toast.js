import React, { useEffect, useState } from 'react';
import {Text, StyleSheet, Animated } from 'react-native';

const Toast = ({ message }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }
    ).start(() => {
      setTimeout(() => {
        Animated.timing(
          fadeAnim,
          {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          }
        ).start();
      }, 3000); 
    });
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    color: 'white',
    fontSize: 16,
    fontFamily:'Poppins-Medium'
  }
});

export default Toast;
