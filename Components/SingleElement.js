import { StyleSheet, Text, View,Image,TouchableOpacity,ScrollView } from 'react-native'
import React,{useState,useContext} from 'react'
import { themeContext,foodContext,showContext } from "../Components/SetData.js"

const GetRandomFood = () => { 
    const [darkTheme] = useContext(themeContext)
    const [show, setShow] = useState(showContext)
    const [foodarray, setFoodArray] = useContext(foodContext)

    const getRandomElement = (  ) => {
        return foodarray[Math.floor(Math.random() * foodarray.length)]
      }
    var randelement = getRandomElement();
    
    
    const hideComponent = () => {
        setShow(!show)
      }

    return ( 
      <View style={styles.randomContainer}>
        <Text style={styles.quoteText}>{randelement.name}</Text>
        <Image source={{ uri: randelement.image }} style={styles.image}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.subButton} onPress={() =>{hideComponent()}}><Text>Get Another</Text></TouchableOpacity>
          <TouchableOpacity style={styles.subButton}><Text>Go to Recipe</Text></TouchableOpacity>
        </View>
       <ScrollView style={styles.recipeContainer}><Text style={styles.recipeText}>{randelement.recipe}</Text></ScrollView>
        
      </View>
    )
  }

export default GetRandomFood

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