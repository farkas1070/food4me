import { StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity, View, Switch, ImageBackground } from 'react-native'
import React from 'react'
import { useContext } from "react";
import { foodContext, themeContext } from "../Components/SetData.js"

import recipebackground from "../assets/recipebackground.jpg"
import Header from "./Header.js"
const Homepage = ({ navigation }) => {


  const [foodarray] = useContext(foodContext)
  const [darkTheme, setDarkTheme] = useContext(themeContext)

  const getRandomElement = () => {
    var randelement = foodarray[Math.floor(Math.random() * foodarray.length)]
    navigation.navigate("SingleElement", { item: randelement })

  }

  return (
    <View>
     <Header/>
      <KeyboardAvoidingView style={styles.mainContainer(darkTheme)}>

      <ImageBackground source={recipebackground} resizeMode="cover" style={{ justifyContent: "center", alignItems: 'center', height: '100%',width: '100%'}}>
        <View style={styles.questioncontainer(darkTheme)}>
          
            <View style={{ justifyContent: "center", alignItems: 'center', backgroundColor: "rgba(255, 255, 255, 0.8)",borderRadius: 80,width:"80%"}}>
              <View><Text style={styles.dontshowtext}>Click on the Button below, And we will give you a recipe suggestion!</Text></View>
              
              <TouchableOpacity style={styles.button(darkTheme)} onPress={() => { getRandomElement() }}>
                <Text style={styles.text(darkTheme)}>What should I cook today?</Text>
              </TouchableOpacity>
            </View>
          
        </View>
        </ImageBackground>


      </KeyboardAvoidingView>
    </View>
  )
}

export default Homepage

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
  text: (darkTheme) =>({
    fontweight: "700",
    color:darkTheme? "black": "white",
    textAlign: "center"
  }),
  image: {
    marginTop: 50,
    width: "90%",
    height: 250,
    borderRadius: 10,

  },
  randomContainer: {
    shadowColor: "white",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 6,

  },

  buttonContainer: {
    padding: 20,
    height: 100,
    marginTop: 50,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'center'


  },
  gobackButton: (darkTheme) => ({


    width: "40%",
    height: 50,
    backgroundColor: darkTheme ? "white" : "#fd5a43",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  }),

  recipeText: (darkTheme) => ({
    marginLeft: 30,
    marginRight: 20,
    marginTop: 20,
    fontSize: 16,
    color: darkTheme ? "white" : "black"
  }),
  gobackbuttontext: (darkTheme) => ({
    color: darkTheme ? "black" : "white",
    fontSize: 16,
    fontWeight: "700"
  }),
  descriptiontext: (darkTheme) => ({
    marginTop: 30,
    marginLeft: 30,
    fontWeight: "700",
    fontSize: 15,
    color: darkTheme ? "white" : "black"
  }),
  difficultytext: (darkTheme) => ({
    marginTop: 30,
    marginLeft: 30,
    fontWeight: "700",
    fontSize: 20,
    color: darkTheme ? "white" : "black"
  }),
  typetext: (darkTheme) => ({
    marginTop: 30,
    marginLeft: 30,
    fontWeight: "700",
    fontSize: 15,
    color: darkTheme ? "white" : "black"
  }),
  upperrecipetext: (darkTheme) => ({
    marginTop: 10,
    marginLeft: 30,
    fontWeight: "700",
    fontSize: 13,
    color: darkTheme ? "white" : "black"
  }),
  dontshowtext:{
    textAlign: "center",
    fontWeight: "700",
    marginTop:30,
    marginLeft: 50,
    marginRight: 50,
    fontSize: 15,
    color:"black"
  }
})