import { StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity, View, Image, ScrollView, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import { useContext } from "react";
import { foodContext, themeContext } from "../Components/SetData.js"


import Svg, { Path } from 'react-native-svg';



const Homepage = ({navigation}) => {

  //const [darkTheme] = useContext(themeContext)

  const [foodarray, setFoodArray] = useContext(foodContext)
  const [darkTheme, setDarkTheme] = useContext(themeContext)

  const getRandomElement = () => {
    var randelement = foodarray[Math.floor(Math.random() * foodarray.length)]
    navigation.navigate("SingleElement",{ item: randelement })

  }

  return (
    <KeyboardAvoidingView style={styles.mainContainer(darkTheme)}>


      

        <View style={styles.questioncontainer(darkTheme)}>
          <Text style={styles.dontshowtext(darkTheme)}>Click on the Button below, And we will give you a recipe suggestion!</Text>
          <TouchableOpacity style={styles.button(darkTheme)} onPress={() => { getRandomElement()  }}>
            <Text style={styles.text}>What should I cook today?</Text>
          </TouchableOpacity>
        </View>
      

    </KeyboardAvoidingView>
  )
}

export default Homepage

const styles = StyleSheet.create({
  mainContainer: (darkTheme) => ({
    flex: 1,
    backgroundColor: darkTheme ? "black" : "white",
  }),
  questioncontainer: (darkTheme) => ({
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: darkTheme ? "black" : "white"
  }),
  headerContainer: {
    marginTop: 20,
    marginHorizontal: 10
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',

    color: '#fff',
    textAlign: 'center',
    marginTop: 35,
    marginBottom: 100
  },

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

  recipeText:(darkTheme) => ({
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
  dontshowtext: (darkTheme) => ({
    textAlign: "center",
    fontWeight: "700",
     marginLeft: 50,
      marginRight: 50,
       fontSize: 18,
       color: darkTheme ? "white" : "black"
  })
})