
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Switch, KeyboardAvoidingView, ImageBackground } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { themeContext, foodContext } from "../Components/SetData.js"
import { useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import { useFonts } from 'expo-font';
import CustomFont from '../fonts/myfont.otf';

const RecipeBrowser = ({ navigation }) => {

    const [darkTheme, setDarkTheme] = useContext(themeContext)
    const [foodarray] = useContext(foodContext)

    const [searchvalue, setSearchValue] = useState("")
    const [loaded] = useFonts({
        CustomFont: CustomFont,
    });

    
    const [pagestart, setPageStart] = useState(0)
    const [pageend, setPageEnd] = useState(9)
    const [pagecount, setPageCount] = useState(0)

    const scrollRef = useRef();

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
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }
    const pageForward = () => {
        setPageStart(pagestart + 10)
        setPageEnd(pageend + 10)
        setPageCount(pagecount + 1)
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }
    const filterAndNavigate = () => {
        let filteredlist = foodarray.filter(item => {
            if (item.name.toLowerCase().includes(searchvalue.toLowerCase())) {
                return item;
            }
        })
        navigation.navigate("FilteredRecipeBrowser", { item: filteredlist });
    }

    return (
        <KeyboardAvoidingView>

            <ImageBackground
                style={styles.backgroundImage}
                source={{
                    uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=962&q=80',
                    cache: 'force-cache',
                }}
                resizeMode="cover"
                
            >
                <View style={styles.overlay} />
                <Appbar.Header style={styles.appBar}>
                    <Appbar.BackAction color="rgba(255, 255, 255, 1)" onPress={() => { }} />
                    <Appbar.Content color="rgba(255, 255, 255, 1)" title={<Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', textAlign: 'left' }}>Recipes</Text>} />

                    <Appbar.Action color="rgba(255, 255, 255, 1)" icon="filter-variant" onPress={() => { }} />
                </Appbar.Header>
            </ImageBackground>
            <View style={{ height: "88%" }}>
                <ScrollView contentContainerStyle={styles.mainContainer(darkTheme)} ref={scrollRef} >
                    <View style={{ width: "100%" }}>
                        {foodarray.map((data, i) => {
                            if (i >= pagestart && i <= pageend) {
                                return (
                                    <TouchableOpacity onPress={() => { navigation.navigate("SingleElement", { item: data }) }} style={styles.singlefood(darkTheme)} key={i}>

                                        <Image source={{ uri: data.image }} style={styles.image} />

                                        <View style={{ marginRight: 20 }}>
                                            {data.healthy == true ? <Ionicons name="md-heart-sharp" size={18} color="green" style={{ textAlign: 'right', marginBottom: 10 }} /> : <Ionicons name="md-heart-dislike-sharp" size={18} color="red" style={{ textAlign: 'right', marginBottom: 10 }} />}
                                            <Text style={styles.nametext(darkTheme)}>{data.name}</Text>
                                            <Text style={styles.kcalorietext(darkTheme)}>{data.kcalories} Kcal / 100g</Text>
                                            <Text style={getTextStyle(data)}> {data.difficulty}</Text>
                                        </View>

                                    </TouchableOpacity>
                                )
                            }

                        })}
                    </View>
                    <View style={styles.pagingview}>

                        <TouchableOpacity style={pagestart <= 0 ? styles.disabledButton(darkTheme) : styles.Button(darkTheme)} onPress={() => { pageBackwards() }} disabled={pagestart <= 0 ? true : false} >
                            <AntDesign name="arrowleft" size={30} color={pagestart <= 0 ? "#d3d3d3" : "white"} />
                        </TouchableOpacity>

                        <Text style={styles.pagecounttext(darkTheme)}>{pagecount}</Text>

                        <TouchableOpacity style={pageend > foodarray.length ? styles.disabledButton(darkTheme) : styles.Button(darkTheme)} onPress={() => { pageForward() }} disabled={pageend > foodarray.length ? true : false} >
                            <AntDesign name="arrowright" size={30} color={pageend > foodarray.length ? "#d3d3d3" : "white"} />
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>

        </KeyboardAvoidingView>
    )
}

export default RecipeBrowser

const styles = StyleSheet.create({
    mainContainer: (darkTheme) => ({
        width: '100%',
        flexGrow: 1,
        justifyContent: 'space-between',

        alignItems: 'center',
        backgroundColor: darkTheme ? "black" : "white"
    }),
    appBar: {

        backgroundColor: 'transparent',
        justifyContent: "center",

        width: "100%",



    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(253, 90, 67, 0.6)', // Orange with 50% opacity
    },

    input: (darkTheme) => ({
        width: "85%",
        borderRadius: 20,
        height: 40,
        marginLeft: 5,
        backgroundColor: "white",

        textAlign: 'center'
    }),
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginLeft: 20,

    },
    disabledButton: (darkTheme) => ({
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        height: 50,
        backgroundColor: darkTheme ? "#181616" : "#e5e5e5",
        width: 50,
        borderRadius: 20,
    }),
    headerContainer: (darkTheme) => ({
        width: '100%',
        height: "12%",
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
        borderColor: darkTheme ? "grey" : "#d3d3d3",
        borderBottomWidth: 2,

    }),
    pagingview: {
        height: 90,
        alignItems: 'center',
        flexDirection: 'row',
    },
    Button: (darkTheme) => ({
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        height: 50,
        backgroundColor: darkTheme ? "#fd5a43" : "#fd5a43",
        width: 50,
        borderRadius: 20,

    }),
    nametext: (darkTheme) => ({
        color: "black",
        fontSize: 10,
        fontWeight: "700",
        textAlign: 'right',
        textDecorationLine: 'underline',
        marginBottom: 5,
        color: darkTheme ? "white" : "black"
    }),
    kcalorietext: (darkTheme) => ({
        color: "black",
        fontSize: 10,
        fontWeight: "700",
        textAlign: 'right',
        color: darkTheme ? "white" : "black"
    }),
    pagecounttext: (darkTheme) => ({
        color: darkTheme ? "white" : "black",
        fontWeight: "700",
        fontSize: 20
    }),
    searchbutton: (darkTheme) => ({
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,



    }),
    searchicon: {
        marginRight: 8
    }

})