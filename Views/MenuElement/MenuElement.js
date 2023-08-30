import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native'
import React,{useContext } from 'react'
import { themeContext } from "../../Context/GlobalContext.js"
import Carousel from 'react-native-reanimated-carousel';
import Recipelight1 from "../../assets/recipelight1.png"
import Recipedark1 from "../../assets/recipedark1.png"
import Recipelight2 from "../../assets/recipelight2.png"
import Recipedark2 from "../../assets/recipedark2.png"
import Recipelight3 from "../../assets/recipelight3.png"
import Recipedark3 from "../../assets/recipedark3.png"
import { Ionicons } from '@expo/vector-icons'; 
import { generateStyles } from './MenuElementStyle.js';

const MenuCreator = ({navigation,route}) => {
  const [darkTheme] = useContext(themeContext)
  const styles = generateStyles(darkTheme)
  const darkpictures = [Recipedark1,Recipedark2,Recipedark3]
  const lightpictures = [Recipelight1,Recipelight2,Recipelight3]
  const { item } = route.params;

  const width = Dimensions.get('window').width;


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

