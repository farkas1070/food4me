
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
import { Button } from 'react-native-paper';
const RecipeBrowser = ({ navigation }) => {

    const [darkTheme, setDarkTheme] = useContext(themeContext)
    const [foodarray] = useContext(foodContext)

    const [searchvalue, setSearchValue] = useState("")
    const [showsearch, setShowSearch] = useState(false)







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

    const [loaded] = useFonts({
        CustomFont: CustomFont,
    });
    if (!loaded) {
        return null;
    }

    return (

        <View style={{ width: '100%', height: '100%', flex: 1, backgroundColor: 'white' }}>

            <View style={{ width: '100%', height: '100%', flexGrow: 1 }}>
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
                        <Appbar.Action color="rgba(255, 255, 255, 1)" icon="magnify" onPress={() => { navigation.navigate("SearchComponent") }} />
                        <Appbar.Action color="rgba(255, 255, 255, 1)" icon="filter-variant" onPress={() => { handleNavigation() }} />
                    </Appbar.Header>
                </ImageBackground>

                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <ScrollView contentContainerStyle={styles.mainContainer(darkTheme)}  >
                        <View style={{ width: '100%' }}>
                            {foodarray.map((data, i) => {
                                if (i >= pagestart && i <= pageend) {
                                    return (
                                        <TouchableOpacity onPress={() => { navigation.navigate("SingleElement", { item: data }) }} style={styles.singlefood} key={i}>

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
                            <Button buttonColor={pagestart <= 0  ?  "#e5e5e5":"#fd5a43" } icon="arrow-left-bold-circle" mode="contained" onPress={() => {pageBackwards()}} disabled={pagestart <= 0 ? true : false} style={{marginRight:20}}  >
                                Prev
                            </Button>
                            

                            <Text style={styles.pagecounttext(darkTheme)}>{pagecount}</Text>

                            
                            <Button buttonColor={pageend > foodarray.length ?  "#e5e5e5":"#fd5a43" } icon="arrow-right-bold-circle" mode="contained" onPress={() => {pageForward()}} disabled={pageend > foodarray.length ? true : false} style={{marginLeft:20}} contentStyle={{flexDirection: 'row-reverse'}}>
                                Next
                            </Button>

                        </View>
                    </ScrollView>
                </View>
            </View>


        </View>
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

    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 35
    },




    singlefood: {
        width: '100%',
        height: 120,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: "white",
        borderColor: "#d3d3d3",
        borderBottomWidth: 2,

    },
    pagingview: {

        height: 90,
        width: '100%',
        justifyContent: 'center',

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