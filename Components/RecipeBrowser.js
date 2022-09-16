
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import { themeContext, foodContext } from "../Components/SetData.js"

const RecipeBrowser = () => {
    const [darkTheme] = useContext(themeContext)
    const [show, setShow] = useState(false)
    const [foodarray, setFoodArray] = useContext(foodContext)
    const [searchvalue, setSearchValue] = useState("")

    return (
        <View style={styles.mainContainer}>
            
                <Text style={{marginTop:30}}>Browse Recipes</Text>
                <View style={{ flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
                <Ionicons name="filter-outline" size={30} color="black" />
                    <TextInput
                        style={styles.input}
                        placeholder="New Username"
                        placeholderTextColor="white"
                        value={searchvalue}
                        onChangeText={text => setSearchValue(text)}
                    />
                    <Ionicons name="search" size={30} color="black" />
                </View>
            
        </View>
    )
}

export default RecipeBrowser

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: "white"
    },
    input:{
        width:"60%",
        height:40,
        backgroundColor: "#fd5a43"
    }

})