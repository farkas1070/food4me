import { StyleSheet, Text,KeyboardAvoidingView,TouchableOpacity } from 'react-native'
import React from 'react'

import {useContext} from "react";
import { showContext } from "../Components/SetData.js"
import SingleElement from "./SingleElement"

const Homepage = () => {
  
  //const [darkTheme] = useContext(themeContext)
  const [show, setShow] = useContext(showContext)
  
  
   
  const showComponent = () =>{
    setShow(true)
  }
  


  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      
      { !show && <Text style={styles.quoteText}>Welcome to Food4Me, What can I help you with today?</Text>}
      { !show && <TouchableOpacity style={styles.button} onPress={()=>{showComponent()}}><Text style={styles.text}>What should I cook today?</Text></TouchableOpacity>}
      {show && <SingleElement showvalue={show} />}
      
    </KeyboardAvoidingView>
  )
}

export default Homepage

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems:"center",
    padding:20,
    
    backgroundColor: "#fd5a43",   
  },
  quoteText:{
    fontSize:25,
    fontWeight: "700",
    color: "#fff",
  },
  button:{
    marginTop: 50,
    width: "80%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center"
  },
  text:{
    fontweight: "700",
    color: "#fd5a43",
    textAlign:"center"
  },
  image:{
    marginTop: 50,
    width: 300,
    height: 220,
    borderRadius: 20,
    
  },
  randomContainer:{
    marginTop: 50,
    
    justifyContent: 'center',
    alignItems:"center",
    shadowColor: "white",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 6,

  },
  subButton:{
    marginTop: 50,
    marginLeft:10,
    marginRight:10,
    width: "30%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
    
    
  },
  gobackButton:{
    marginTop: 20,
    marginLeft:10,
    marginRight:10,
    width: "40%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  recipeContainer:{
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    
  },
  recipeText:{
    fontSize:12
  }
})