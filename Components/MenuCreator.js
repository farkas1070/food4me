import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native'
import React from 'react'
import { themeContext, foodContext } from "../Components/SetData.js"
import { useContext } from "react";
import Carousel from 'react-native-reanimated-carousel';
import RecipeBackground1 from "../RecipeBackground1.png"
import Recipelight1 from "../recipelight1.png"
import RecipeDark1 from "../recipedark1.png"
import { Ionicons } from '@expo/vector-icons'; 


const MenuCreator = ({navigation}) => {
  const [darkTheme, setDarkTheme] = useContext(themeContext)
  const [foodarray, setFoodArray] = useContext(foodContext)
  


  const lunchfood = foodarray.filter(food => food.type === "Lunch");
  const breakfastfood = foodarray.filter(food => food.type === "Breakfast");
  const dinnerfood = foodarray.filter(food => food.type === "Dinner");

  var randlunchelement = lunchfood[Math.floor(Math.random() * lunchfood.length)]
  var randbreakfastelement = breakfastfood[Math.floor(Math.random() * breakfastfood.length)]
  var randdinnerelement = dinnerfood[Math.floor(Math.random() * dinnerfood.length)]

  let finallist = [randlunchelement, randbreakfastelement, randdinnerelement]

  console.log(foodarray)
  const width = Dimensions.get('window').width;

  const goBack= (index) => {
    index = index-1
  } 

  return (
    <View style={styles.maincontainer(darkTheme)}>

      <View style={{ flex: 1 }}>
        <Carousel
          loop
          width={width}
          height="100%"
          autoPlay={false}
          data={finallist}
          scrollAnimationDuration={2000}
          renderItem={({ index }) => (
            <View
              style={styles.carouselcontainer(darkTheme)}>
              <ImageBackground source={darkTheme? RecipeDark1:Recipelight1} style={styles.backgroundimage}>
                <View style={{width:'10%',alignItems: 'center',justifyContent: 'center'}}>
                  <TouchableOpacity onPress={() => { goBack(index)  }} style={{backgroundColor:'white',width:'100%',height:200,alignItems:"center",justifyContent: 'center',borderTopEndRadius:30,borderBottomRightRadius:30}}><Ionicons name="return-up-back" size={24} color="black" style={{}} /></TouchableOpacity>
                
                </View>
                <View style={{width:'80%'}}>
                <Text style={{ textAlign: 'center', fontSize: 20,marginTop:50,color: 'white' }}>
                  {finallist[index].name}
                </Text>
                <View style={{alignItems: 'center'}}>
                  <Image
                    style={styles.image}
                    source={{ uri: finallist[index].image }}
                  />
                </View>
                <View style={{alignItems: 'center',padding:40 }}>
                <Text style={{alignItems: 'center',marginTop: 20,marginBottom:10,fontWeight: 'bold', color: 'white' }}>Difficulty: {finallist[index].difficulty}</Text>
                <Text style={{alignItems: 'center',marginTop: 20,textAlign:"center",fontWeight: 'bold', color: 'white'}} >Descripion: {finallist[index].description}</Text>
                </View>
                <View style={{flex:1,alignItems: 'center',justifyContent: 'flex-end'}}><TouchableOpacity onPress={() => { navigation.navigate("SingleElement", { item: finallist[index] })  }} style={{backgroundColor:"white",marginBottom: 30,width:120,height:60,borderRadius:30,justifyContent: 'center',alignItems:"center",padding:10}}><Text style={{textAlign:"center"}}>Click Here For the Recipe</Text></TouchableOpacity></View>
                  
                </View>
                <View style={{width:'10%',alignItems: 'center',justifyContent: 'center'}} >
                  <TouchableOpacity onPress={() => { navigation.navigate("Singleelement", { item: finallist[index] })  }} style={{backgroundColor:'white',width:'100%',height:200,alignItems:"center",justifyContent: 'center',borderTopStartRadius:30,borderBottomLeftRadius:30}}><Ionicons name="return-up-forward" size={24} color="black" style={{}} /></TouchableOpacity>
                
                </View>
                
              </ImageBackground>
            </View>
          )}
        />
      </View>

    </View>
  );

}

export default MenuCreator

const styles = StyleSheet.create({
  maincontainer: (darkTheme) => ({
    width: '100%',
    height: '100%',
    
    backgroundColor: darkTheme ? "black" : "white",
    
  }),
  carouselcontainer: (darkTheme) => ({
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
  }),
  backgroundimage: {
    width: '100%',
    height: '100%',
    
    flexDirection: 'row'
  },
  image: {
    marginTop: 30,
    width: '70%',
    height: 200,
    borderRadius:20,
  }
})