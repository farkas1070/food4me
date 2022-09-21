import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native'
import React from 'react'
import { themeContext, foodContext } from "../Components/SetData.js"
import { useContext } from "react";
import Carousel from 'react-native-reanimated-carousel';

import Recipelight1 from "../recipelight1.png"
import Recipedark1 from "../recipedark1.png"
import Recipelight2 from "../recipelight2.png"
import Recipedark2 from "../recipedark2.png"
import Recipelight3 from "../recipelight3.png"
import Recipedark3 from "../recipedark3.png"
import { Ionicons } from '@expo/vector-icons'; 


const MenuCreator = ({navigation,route}) => {
  const [darkTheme, setDarkTheme] = useContext(themeContext)
  const darkpictures = [Recipedark1,Recipedark2,Recipedark3]
  const lightpictures = [Recipelight1,Recipelight2,Recipelight3]
  const { item } = route.params;

  

  
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
          autoPlay={true}
          data={item}
          scrollAnimationDuration={7000}
          renderItem={({ index }) => (
            <View
              style={styles.carouselcontainer(darkTheme)}>
              <ImageBackground source={darkTheme? darkpictures[index]:lightpictures[index]} style={styles.backgroundimage}>
                <View style={styles.leftbuttoncontainer(darkTheme)}>
                  <View onPress={() => { goBack(index)  }} style={styles.leftbutton(darkTheme)}><Ionicons name="return-up-back" size={24} color="black" style={{}} /></View>
                
                </View>
                <View style={{width:'80%'}}>
                <Text style={styles.toptext(darkTheme)}>
                  For {item[index].type}, We suggest Today you cook: {item[index].name}
                </Text>
                <View style={{alignItems: 'center'}}>
                  <Image
                    style={styles.image}
                    source={{ uri: item[index].image }}
                  />
                </View>
                <View style={{alignItems: 'center',padding:40 }}>
                <Text style={styles.difficultytext(darkTheme)}>Difficulty: {item[index].difficulty}</Text>
                <Text style={styles.descriptiontext(darkTheme)} >Descripion: {item[index].description}</Text>
                </View>
                <View style={{flex:1,alignItems: 'center',justifyContent: 'flex-end'}}><TouchableOpacity onPress={() => { navigation.navigate("SingleElement", { item: item[index] })  }} style={styles.recipebutton(darkTheme)}><Text style={{textAlign:"center"}}>Click Here For the Recipe</Text></TouchableOpacity></View>
                  
                </View>
                <View style={styles.rightbuttoncontainer(darkTheme)} >
                  <View onPress={() => { }} style={styles.rightbutton(darkTheme)}><Ionicons name="return-up-forward" size={24} color="black" style={{}} /></View>
                
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
  },
  leftbuttoncontainer: (darkTheme) => ({
    width:'10%',
    alignItems: 'center',
    justifyContent: 'center'

  }),
  rightbuttoncontainer: (darkTheme) => ({
    width:'10%',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  toptext: (darkTheme) => ({
    textAlign: 'center',
     fontSize: 20,
     marginTop:50,
     fontWeight: 'bold',
     color:darkTheme? "white" : "black"
  }),
  leftbutton: (darkTheme) => ({
    backgroundColor:'white',
    width:'100%',
    height:200,
    alignItems:"center",
    justifyContent: 'center',
    borderTopEndRadius:30,
    borderBottomRightRadius:30
  }),
  rightbutton: (darkTheme) => ({
    backgroundColor:'white',
    width:'100%',
    height:200,
    alignItems:"center",
    justifyContent: 'center',
    borderTopStartRadius:30,
    borderBottomLeftRadius:30
  }),
  difficultytext: (darkTheme) => ({
    alignItems: 'center',
    marginTop: 20,
    marginBottom:10,
    fontWeight: 'bold',
    color:darkTheme? "white" : "black"
  }),
  descriptiontext: (darkTheme) => ({
    alignItems: 'center',
    marginTop: 20,
    marginBottom:10,
    fontWeight: 'bold',
    color:darkTheme? "white" : "black"
  }),
  recipebutton: (darkTheme) => ({
    backgroundColor:"white",
    marginBottom: 30,
    width:120,
    height:60,
    borderRadius:30,
    justifyContent: 'center',
    alignItems:"center",
    padding:10,
    borderWidth:2,
    BorderColor:"black"
  })

  
})