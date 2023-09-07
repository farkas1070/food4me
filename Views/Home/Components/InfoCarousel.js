import React,{useContext} from 'react';
import { View, Text, Image,  StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import {styles} from "./InfoCarouselStyle"
import { foodContext } from '../../../Context/GlobalContext';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import CustomFont from '../../../fonts/Raleway-Bold.ttf';
const RecipeCard = ({ item }) => {
  const navigation = useNavigation();
  const [loaded] = useFonts({
    CustomFont: CustomFont,
});

if (!loaded) {
    return null;
}
  return (
    <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate("SingleElement", { item: item }) }}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View >
        <Text style={[styles.title,{fontFamily:'CustomFont'}]}>{item.name.length > 40 ? item.name.slice(0, 40) + '...' : item.name}</Text>
        <Text style={[styles.title,{fontFamily:'CustomFont'}]}>{}</Text>
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
        keyExtractor={(item) => item.docid}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};



export default InfoCarousel;