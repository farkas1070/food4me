import { StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity, View,Switch } from 'react-native'
import React from 'react'
import { useContext } from "react";
import { foodContext,themeContext } from "../Components/SetData.js"
import { Feather } from '@expo/vector-icons';

const MenuElement = ({navigation}) => {
    const [darkTheme, setDarkTheme] = useContext(themeContext)
    const [foodarray, setFoodArray] = useContext(foodContext)
    const toggleSwitch = () => setDarkTheme(previousState => !previousState);

  const openMenu = () => {
    navigation.openDrawer();
  }
  const getRandomMenu = () => {
    const lunchfood = foodarray.filter(food => food.type === "Lunch");
    const breakfastfood = foodarray.filter(food => food.type === "Breakfast");
    const dinnerfood = foodarray.filter(food => food.type === "Dinner");

    var randlunchelement = lunchfood[Math.floor(Math.random() * lunchfood.length)]
    var randbreakfastelement = breakfastfood[Math.floor(Math.random() * breakfastfood.length)]
    var randdinnerelement = dinnerfood[Math.floor(Math.random() * dinnerfood.length)]

    let finallist = [randbreakfastelement,randlunchelement,  randdinnerelement]
    navigation.navigate("MenuElement", { item: finallist })

  }

  return (
    <View>
      <View style={styles.headerContainer(darkTheme)}>
        <TouchableOpacity onPress={() => { openMenu() }}><Feather style={styles.feathericon} name="menu" size={35} color={darkTheme ? "#fd5a43" : "white"} /></TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          {darkTheme ? <Feather name="moon" size={25} color={darkTheme ? "#fd5a43" : "white"} style={{ marginTop: 25, marginRight: 10 }} /> : <Feather name="sun" size={25} color={darkTheme ? "#fd5a43" : "white"} style={{ marginTop: 25, marginRight: 10 }} />}
          <Switch trackColor={{ false: "#767577", true: "white" }} thumbColor={darkTheme ? "#fd5a43" : "white"} onValueChange={toggleSwitch} value={darkTheme} style={styles.switch} >
          </Switch>
        </View>
      </View>
      <KeyboardAvoidingView style={styles.mainContainer(darkTheme)}>




        <View style={styles.questioncontainer(darkTheme)}>
          <Text style={styles.dontshowtext(darkTheme)}>Click on the Button below, And we will give you A full Menu with 3 courses!</Text>
          <TouchableOpacity style={styles.button(darkTheme)} onPress={() => { getRandomMenu() }}>
            <Text style={styles.text}>What should I cook today?</Text>
          </TouchableOpacity>
        </View>


      </KeyboardAvoidingView>
    </View>
  )
}

export default MenuElement

const styles = StyleSheet.create({
    headerContainer: (darkTheme) => ({
        width: '100%',
        height: "9%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: darkTheme ? 'black' : "#fd5a43",
        borderBottomWidth: darkTheme? 5:0,
        borderColor: darkTheme? "#181616":"transparent",
    
    
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
        height: "91%",
        backgroundColor: darkTheme ? "black" : "white",
      }),
      questioncontainer: (darkTheme) => ({
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: darkTheme ? "black" : "white"
      }),
      
     
      
    
      quoteText: (darkTheme) => ({
        fontSize: 25,
        fontWeight: "700",
        textAlign: "center",
        color: "#fff",
      }),
      button: (darkTheme) => ({
        marginTop: 50,
        width: "80%",
        height: 50,
        backgroundColor: darkTheme ? "white" : "black",
        borderRadius: 20,
    
        justifyContent: "center",
        alignItems: "center"
      }),
      text: {
        fontweight: "700",
        color: "#fd5a43",
        textAlign: "center"
      },
      dontshowtext: (darkTheme) => ({
        textAlign: "center",
        fontWeight: "700",
        marginLeft: 50,
        marginRight: 50,
        fontSize: 18,
        color: darkTheme ? "white" : "black"
      })
})