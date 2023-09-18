import { StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity, View, Switch, ImageBackground } from 'react-native'
import React from 'react'
import { useContext } from "react";
import { foodContext, themeContext } from "../../Context/GlobalContext.js"

import menubackground from "../../assets/menubackground.jpg"
import NewHeader from '../../Components/NewHeader.js';
import { generateStyles } from './MenuCreatorStyle.js';
const MenuElement = ({ navigation }) => {
  const [darkTheme, setDarkTheme] = useContext(themeContext)
  const [foodarray] = useContext(foodContext)
  console.log(foodarray)
  const styles = generateStyles(darkTheme)
  const getRandomMenu = () => {
    const lunchfood = foodarray.filter(food => food.type === "Lunch");
    const breakfastfood = foodarray.filter(food => food.type === "Breakfast");
    const dinnerfood = foodarray.filter(food => food.type === "Dinner");

    var randlunchelement = lunchfood[Math.floor(Math.random() * lunchfood.length)]
    var randbreakfastelement = breakfastfood[Math.floor(Math.random() * breakfastfood.length)]
    var randdinnerelement = dinnerfood[Math.floor(Math.random() * dinnerfood.length)]

    let finallist = [randbreakfastelement, randlunchelement, randdinnerelement]
    console.log(finallist)
    navigation.navigate("MenuElement", { item: finallist })

  }

  return (
    <View style={{flex:1}}>
      <NewHeader></NewHeader>
      <KeyboardAvoidingView style={styles.mainContainer(darkTheme)}>



        <ImageBackground source={menubackground} resizeMode="cover" style={{ justifyContent: "center", alignItems: 'center', height: '100%', width: '100%' }}>
          <View style={styles.questioncontainer(darkTheme)}>

            <View style={{ justifyContent: "center", alignItems: 'center', backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: 80, width: "80%" }}>
              <View><Text style={styles.dontshowtext}>Click on the Button below, And we will give you a recipe suggestion!</Text></View>

              <TouchableOpacity style={styles.button(darkTheme)} onPress={() => { getRandomMenu() }}>
                <Text style={styles.text(darkTheme)}>What should I cook today?</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ImageBackground>


      </KeyboardAvoidingView>
    </View>
  )
}

export default MenuElement

