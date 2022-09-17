
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView, TextInput, ImageBackground, Switch } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { themeContext, foodContext } from "../Components/SetData.js"
import Background from "../background.png"
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const RecipeBrowser = ({ navigation }) => {
    const [darkTheme, setDarkTheme] = useContext(themeContext)
    const [show, setShow] = useState(false)
    const [foodarray, setFoodArray] = useContext(foodContext)
    const [searchvalue, setSearchValue] = useState("")
    var showarray = foodarray.slice(0, 10);
    let pagecount = 0
    const toggleSwitch = () => setDarkTheme(previousState => !previousState);

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View>
            <View style={styles.headerContainer(darkTheme)}>
                <TouchableOpacity onPress={() => { openMenu() }}><Feather style={styles.feathericon} name="menu" size={25} color={darkTheme ? "#fd5a43" : "white"} /></TouchableOpacity>
                <TextInput
                    style={styles.input(darkTheme)}
                    placeholder="Search for something"
                    placeholderTextColor={darkTheme ? "white" : "black"}
                    value={searchvalue}
                    onChangeText={text => setSearchValue(text)}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                    <Switch trackColor={{ false: "#767577", true: "white" }} thumbColor={darkTheme ? "#fd5a43" : "white"} onValueChange={toggleSwitch} value={darkTheme} style={styles.switch} >

                    </Switch>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.mainContainer(darkTheme)}>
                {showarray.map((data) => {

                    return (
                        <TouchableOpacity style={styles.singlefood(darkTheme)}>

                            <Image source={{ uri: data.image }} style={styles.image} />
                            <Text>{data.name}</Text>

                        </TouchableOpacity>
                    )
                })}
                <View style={styles.pagingview}>
                    
                    <AntDesign name="arrowleft" size={30} color="black" />
                    <Text>{pagecount}</Text>
                    <AntDesign name="arrowright" size={30} color="black" />

                </View>
            </ScrollView>

        </View>
    )
}

export default RecipeBrowser

const styles = StyleSheet.create({
    mainContainer: (darkTheme) => ({
        width: '100%',
        height: 1600,
        alignItems: 'center',
        backgroundColor: darkTheme ? "black" : "white"
    }),
    input: (darkTheme) => ({
        width: "60%",
        borderRadius: 5,
        height: 40,
        marginTop: 25,
        backgroundColor: darkTheme ? "#181616" : "white",
        textAlign: 'center'
    }),
    image: {
        width: 60,
        height: 60,
        borderRadius: 20,
        marginLeft: 20
    },
    headerContainer: (darkTheme) => ({
        width: '100%',
        height: 80,
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
        marginRight: 15,
        transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }]
    },
    foodcontainer: {

    },
    singlefood: (darkTheme) => ({
        width: '80%',
        height: 100,
        borderRadius: 20,
        marginTop: 25,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: darkTheme ? "black" : "#fd5a43"
    }),
    pagingview: {
        marginTop: 25,
        alignItems: 'center',
        flexDirection: 'row',
    }

})