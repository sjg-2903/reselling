import React, {useEffect} from 'react';
import { View, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const GridView = ({ data, selectedBrands, setSelectedBrands }) => {
  
  const handlePress = (item) => {
    if (selectedBrands.includes(item.id)) {
      setSelectedBrands(selectedBrands.filter((id) => id !== item.id));
    } else {
      if (selectedBrands.length < 3) {
        setSelectedBrands([...selectedBrands, item.id]);
      } else {
        setSelectedBrands([...selectedBrands.slice(1), item.id]);
      }
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.gridItem,
        selectedBrands.includes(item.id) && styles.selectedGridItem,
      ]}
      onPress={() => handlePress(item)}
    >
      <Image
        source={item.imageSource}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
    />
  );
};

const { width } = Dimensions.get('window');
const itemMargin = 5;

const styles = StyleSheet.create({
  gridItem: {
    margin: itemMargin,
    width: 116,
    height: 113,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#C8C8C8',
    backgroundColor:'white',
    borderRadius:8
  },
  selectedGridItem: {
    transform: [{ scale: 1.1 }],
    borderColor:'#01AAEC',
    borderWidth:3
  },
 
});

export default GridView;
