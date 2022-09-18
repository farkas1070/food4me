
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView, TextInput, ImageBackground, Switch } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { themeContext, foodContext } from "../Components/SetData.js"

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const RecipeBrowser = ({ navigation }) => {
    const [darkTheme, setDarkTheme] = useContext(themeContext)
    const [foodarray, setFoodArray] = useContext(foodContext)
    const [searchvalue, setSearchValue] = useState("")
    const [pagestart, setPageStart] = useState(0)
    const [pageend, setPageEnd] = useState(9)
    const [pagecount, setPageCount] = useState(0)

    const getTextStyle = (item) => {
        if (item.difficulty === "Easy") {
            return {
                color: 'green', fontSize: 10, fontWeight: "700", textAlign: 'right'
            }
        }
        if (item.difficulty === "Intermediate") {
            return {
                color: 'orange', fontSize: 10, fontWeight: "700", textAlign: 'right'
            }
        }
        if (item.difficulty === "Hard") {
            return {
                color: 'red', fontSize: 10, fontWeight: "700", textAlign: 'right'
            }
        }
    }

    const toggleSwitch = () => setDarkTheme(previousState => !previousState);

    const openMenu = () => {
        navigation.openDrawer();
    }
    const pageBackwards = () => {
        setPageStart(pagestart - 10)
        setPageEnd(pageend - 10)
        setPageCount(pagecount - 1)
    }
    const pageForward = () => {
        setPageStart(pagestart + 10)
        setPageEnd(pageend + 10)
        setPageCount(pagecount + 1)
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
                {foodarray.map((data, i) => {
                    if (i >= pagestart && i <= pageend) {
                        return (
                            <TouchableOpacity onPress={() => { navigation.navigate("SingleElement", { item: data }) }} style={styles.singlefood(darkTheme)} key={i}>

                                <Image source={{ uri: data.image }} style={styles.image} />

                                <View style={{ marginRight: 20 }}>
                                    {data.healthy == true ? <Ionicons name="md-heart-sharp" size={18} color="green" style={{textAlign:'right',marginBottom:10}} /> : <Ionicons name="md-heart-dislike-sharp" size={18} color="red" style={{textAlign:'right',marginBottom:10}} />}
                                    <Text style={{ color: "black", fontSize: 10, fontWeight: "700", textAlign: 'right',textDecorationLine: 'underline',marginBottom:5 }}>{data.name}</Text>
                                    <Text style={{ color: "black", fontSize: 10, fontWeight: "700", textAlign: 'right' }}>{data.kcalories} Kcal / 100g</Text>
                                    <Text style={getTextStyle(data)}> {data.difficulty}</Text>
                                </View>

                            </TouchableOpacity>
                        )
                    }

                })}
                <View style={styles.pagingview}>

                    <TouchableOpacity style={styles.Button(darkTheme)} onPress={() => { pageBackwards() }} disabled={pagestart <= 0 ? true : false} >
                        <AntDesign name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>

                    <Text>{pagecount}</Text>

                    <TouchableOpacity style={styles.Button(darkTheme)} onPress={() => { pageForward() }} disabled={pageend > foodarray.length ? true : false} >
                        <AntDesign name="arrowright" size={30} color="black" />
                    </TouchableOpacity>

                </View>
            </ScrollView>

        </View>
    )
}

export default RecipeBrowser

const styles = StyleSheet.create({
    mainContainer: (darkTheme) => ({
        width: '100%',
        height: 1370,
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
        width: 80,
        height: 80,
        borderRadius: 10,
        marginLeft: 20,

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

    singlefood: (darkTheme) => ({
        width: '100%',
        height: 120,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: darkTheme ? "black" : "white",
        borderColor: darkTheme ? "grey" : "#fd5a43",
        borderBottomWidth: 1,

    }),
    pagingview: {
        marginTop: 25,
        alignItems: 'center',
        flexDirection: 'row',
    },
    Button: (darkTheme) => ({
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        height: 50,
        backgroundColor: darkTheme ? "#181616" : "white",
        width: 50,
        borderRadius: 20,

    }),

})