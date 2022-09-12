import { StyleSheet, Text, View,KeyboardAvoidingView } from 'react-native'
import React from 'react'

const RecipeComponent = () => {
  return (
    
    <View style={styles.randomContainer}>
        
        
        
      </View>
  )
}

export default RecipeComponent

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
    }
})