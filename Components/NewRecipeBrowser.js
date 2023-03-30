
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Switch, KeyboardAvoidingView, ImageBackground } from 'react-native'
import { themeContext, foodContext } from "../Components/SetData.js"
import { useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import { useFonts } from 'expo-font';
import CustomFont from '../fonts/myfont.otf';
import Cheese from '../assets/cheese.png'
import Wheat from '../assets/wheat.png'
import Heart from '../assets/like.png'
import Dollar from '../assets/dollar.png'
import Leaf from '../assets/leaf.png'
import { TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const RecipeBrowser = ({ navigation }) => {

    const [darkTheme, setDarkTheme] = useContext(themeContext)
    const [foodarray] = useContext(foodContext)

    const [searchvalue, setSearchValue] = useState("")
    const [showsearch, setShowSearch] = useState(false)


    const [visible, setVisible] = React.useState(false);


    const containerStyle = { backgroundColor: 'white', padding: 20 };

    const [pagestart, setPageStart] = useState(0)
    const [pageend, setPageEnd] = useState(9)
    const [pagecount, setPageCount] = useState(0)

    const scrollRef = useRef();



    const toggleSwitch = () => setDarkTheme(previousState => !previousState);
    const goBackToHome = () => {
        navigation.goBack();
    }

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
    const handleNavigation = () => {

        navigation.navigate("RecipeFilter");
    }
    const changeToSearching = () => {

    }
    const filterAndNavigate = () => {
        let filteredlist = foodarray.filter(item => {
            if (item.name.toLowerCase().includes(searchvalue.toLowerCase())) {
                return item;
            }
        })
        navigation.navigate("FilteredRecipeBrowser", { item: filteredlist });
    }
    const [loaded] = useFonts({
        CustomFont: CustomFont,
    });
    if (!loaded) {
        return null;
    }

    return (

        <KeyboardAvoidingView style={{ width: '100%', height: '100%' }}>
            {showsearch ?
                <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
                    <Appbar.Header style={{ backgroundColor: 'transparent', justifyContent: "center", width: "100%", borderBottomColor: 'rgba(253, 90, 67, 1)', borderBottomWidth: 0.6 }}>
                        <Appbar.BackAction color="rgba(253, 90, 67, 1)" onPress={() => { setShowSearch(false) }} />

                        <Appbar.Content color="rgba(253, 90, 67, 1)" title={<Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', textAlign: 'left' }}>Recipes</Text>} />
                        <Appbar.Action color="rgba(253, 90, 67, 1)" icon="magnify" onPress={() => { filterAndNavigate() }} />

                    </Appbar.Header>
                    <View style={{ flexGrow: 1,alignItems:'center' }}>
                        <TextInput
                            label="Search for Foods"
                            value={searchvalue}
                            mode='outlined'
                            right={<TextInput.Icon icon={() => <MaterialCommunityIcons name="food-apple-outline" size={24} color="black" />} />}
                            onChangeText={searchvalue => setSearchValue(searchvalue)}
                            style={{ width: '80%', marginTop: 10 }}
                        />
                    </View>
                </View>
                :
                <View style={{ width: '100%', height: '100%' }}>
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
                            <Appbar.BackAction color="rgba(255, 255, 255, 1)" onPress={() => { goBackToHome() }} />

                            <Appbar.Content color="rgba(255, 255, 255, 1)" title={<Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', textAlign: 'left' }}>Recipes</Text>} />
                            <Appbar.Action color="rgba(255, 255, 255, 1)" icon="magnify" onPress={() => { setShowSearch(true) }} />
                            <Appbar.Action color="rgba(255, 255, 255, 1)" icon="filter-variant" onPress={() => { handleNavigation() }} />
                        </Appbar.Header>
                    </ImageBackground>

                    <View style={{ flexGrow: 1 }}>
                        <ScrollView contentContainerStyle={styles.mainContainer(darkTheme)} ref={scrollRef} >
                            <View style={{ width: "100%" }}>
                                {foodarray.map((data, i) => {
                                    if (i >= pagestart && i <= pageend) {
                                        return (
                                            <TouchableOpacity onPress={() => { navigation.navigate("SingleElement", { item: data }) }} style={styles.singlefood(darkTheme)} key={i}>

                                                <Image source={{ uri: data.image }} style={styles.image} />

                                                <View style={{ marginRight: 20 }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                                                        {data.healthy == true ? <Image style={{ width: 25, height: 25, marginLeft: 5 }} source={Heart} /> : <></>}
                                                        {data.cheap == true ? <Image style={{ width: 25, height: 25, marginLeft: 5 }} source={Dollar} /> : <></>}
                                                        {data.glutenfree == true ? <Image style={{ width: 25, height: 25, marginLeft: 5 }} source={Wheat} /> : <></>}
                                                        {data.dairy == true ? <Image style={{ width: 25, height: 25, marginLeft: 5 }} source={Cheese} /> : <></>}
                                                        {data.vegetarian == true ? <Image style={{ width: 25, height: 25, marginLeft: 5 }} source={Leaf} /> : <></>}

                                                    </View>


                                                    <Text style={styles.nametext(darkTheme)}>{data.name.length > 40 ? data.name.slice(0, 40) + '...' : data.name}</Text>
                                                    <Text style={styles.kcalorietext(darkTheme)}>{data.kcalories} Kcal / 100g</Text>

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
                </View>
            }

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