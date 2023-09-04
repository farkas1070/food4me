import React,{useContext} from 'react';
import { View, Text, Image,  StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import {styles} from "./InfoCarouselStyle"
import { foodContext } from '../../../Context/GlobalContext';

const RecipeCard = ({ item }) => {
  
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        
      </View>
    </TouchableOpacity>
  );
};

const InfoCarousel = () => {
  const [foodArray, setFoodArray] = useContext(foodContext)
  const promoArray = foodArray.slice(0, 10);
  return (
    <View style={styles.container}>
      <FlatList
        data={promoArray}
        horizontal={true}
        renderItem={({ item }) => <RecipeCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};



export default InfoCarousel;