import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Dimensions, Image } from 'react-native';
import axios from 'axios';
import { IP_ADDRESS } from '../../global';

const { height, width } = Dimensions.get('window');

const Imageslider = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const autoplayInterval = 3000;
  const autoplayEnabled = true;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://${IP_ADDRESS}:3005/image-list`);
        setImages(response.data); // Assuming response.data is an array of image URLs
      } catch (error) {
        console.error('Error fetching images:', error);
        setImages([]); // Set images to empty array if fetching fails
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    let autoplayTimer;

    const handleAutoplay = () => {
      if (autoplayEnabled && images.length > 0) {
        const nextIndex = (currentIndex + 1) % images.length;
        flatListRef.current.scrollToIndex({ index: nextIndex });
        setCurrentIndex(nextIndex);
      }
    };

    autoplayTimer = setInterval(handleAutoplay, autoplayInterval);

    return () => {
      clearInterval(autoplayTimer);
    };
  }, [currentIndex, images]);

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'white' }}>
      <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 16, color: '#1F3D4D', textAlign: 'left'}}>
        Trending Offers
      </Text>
      {images.length > 0 ? (
        <View
          style={{
            width: 366, // Set width to 100%
            height: 140,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            marginTop: 5
          }}
        >
          <FlatList
            ref={flatListRef}
            data={images}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            renderItem={({ item, index }) => (
              <View
                style={{
                  width: 248, // Set width to width of the screen
                  height: 140,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{ uri: item }} // Set source to image URL
                  style={{
                    width: '90%',
                    height: '90%',
                    borderRadius: 10,
                  }}
                />
              </View>
            )}
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentIndex(Math.round(x / width));
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <Text style={{ width: 366, marginTop: 40, fontSize: 16, color: 'red', textAlign: 'center' }}>
           No Banner Available
        </Text>
      )}
    </View>
  );
};

export default Imageslider;
