import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React, { useState, useContext } from 'react'
import { themeContext, foodContext, showContext } from "../Components/SetData.js"
import HeaderBackground from '../HeaderBackground.png'
import HeaderBackground2 from '../HeaderBackground2.png'

const GetRandomFood = ({navigation,route}) => {
    const { item } = route.params;
    const [darkTheme] = useContext(themeContext)
    const [show, setShow] = useState(showContext)
    

    return (
        
        <View style={styles.randomContainer}>
            
                <Text style={styles.quoteText}>{item.name}</Text>
            
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.subButton} onPress={() => { hideComponent() }}><Text>Get Another</Text></TouchableOpacity>
                <TouchableOpacity style={styles.subButton}><Text>Go to Recipe</Text></TouchableOpacity>
            </View>
            <ScrollView style={styles.recipeContainer}><Text style={styles.recipeText}>{item.recipe}</Text></ScrollView>

        </View>
    )
}

export default GetRandomFood

const styles = StyleSheet.create({

    quoteText: {
        fontSize: 25,
        fontWeight: "700",
        color: "#fff",
    },
    button: {
        marginTop: 50,
        width: "80%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 20,

        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontweight: "700",
        color: "#fd5a43",
        textAlign: "center"
    },
    image: {
        marginTop: 50,
        width: 300,
        height: 220,
        borderRadius: 20,

    },
    svgimage:{
        width: "100%",
        height: 220,
    },
    randomContainer: {
        marginTop: 50,

        alignItems: 'center',
        shadowColor: "white",
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 6,

    },
    subButton: {
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
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
    gobackButton: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        width: "40%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    recipeContainer: {
        marginTop: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,

    },
    recipeText: {
        fontSize: 12
    }
})