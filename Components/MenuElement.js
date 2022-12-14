import { StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity, View, Switch, ImageBackground } from 'react-native'
import React from 'react'
import { useContext } from "react";
import { foodContext, themeContext } from "../Components/SetData.js"

import menubackground from "../assets/menubackground.jpg"
import Header from "./Header.js"
const MenuElement = ({ navigation }) => {
  const [darkTheme, setDarkTheme] = useContext(themeContext)
  const [foodarray] = useContext(foodContext)
  
  const getRandomMenu = () => {
    const lunchfood = foodarray.filter(food => food.type === "Lunch");
    const breakfastfood = foodarray.filter(food => food.type === "Breakfast");
    const dinnerfood = foodarray.filter(food => food.type === "Dinner");

    var randlunchelement = lunchfood[Math.floor(Math.random() * lunchfood.length)]
    var randbreakfastelement = breakfastfood[Math.floor(Math.random() * breakfastfood.length)]
    var randdinnerelement = dinnerfood[Math.floor(Math.random() * dinnerfood.length)]

    let finallist = [randbreakfastelement, randlunchelement, randdinnerelement]
    navigation.navigate("MenuElement", { item: finallist })

  }

  return (
    <View>
      <Header/>
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

const styles = StyleSheet.create({
  headerContainer: (darkTheme) => ({
    width: '100%',
    height: "11%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: darkTheme ? 'black' : "#fd5a43",
    borderBottomWidth: darkTheme ? 5 : 0,
    borderColor: darkTheme ? "#181616" : "transparent",


  }),
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 35
  },

  feathericon: {
    marginTop: 25,
    marginLeft: 30
  },
  switch: {
    marginTop: 25,
    marginRight: 25,
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }]
  },
  mainContainer: (darkTheme) => ({
    height: "89%",
    backgroundColor: darkTheme ? "black" : "white",
  }),
  questioncontainer: (darkTheme) => ({
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  }),




  quoteText: (darkTheme) => ({
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    color: "#fff",
  }),
  button: (darkTheme) => ({
    marginTop: 30,
    width: "60%",
    height: 50,
    marginBottom: 50,
    backgroundColor: darkTheme ? "white" : "#fd5a43",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  }),
  text: (darkTheme)=>({
    fontweight: "700",
    color:darkTheme? "black": "white",
    textAlign: "center"
  }),
  dontshowtext:{
    textAlign: "center",
    fontWeight: "700",
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    fontSize: 15,
    color: "black"
  }
})