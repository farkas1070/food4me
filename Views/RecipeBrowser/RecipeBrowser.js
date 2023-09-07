
import React, { useContext, useState } from 'react'
import {  Text, View, Image, TouchableOpacity, ScrollView,  ImageBackground } from 'react-native'
import { themeContext, foodContext } from "../../Context/GlobalContext.js"
import { useRef } from 'react';
import { Appbar } from 'react-native-paper';
import { useFonts } from 'expo-font';
import CustomFont from '../../fonts/myfont.otf';
import Cheese from '../../assets/cheese.png'
import Wheat from '../../assets/wheat.png'
import Heart from '../../assets/like.png'
import Dollar from '../../assets/dollar.png'
import Leaf from '../../assets/leaf.png'
import { Button } from 'react-native-paper';
import { generateStyles } from './RecipeBrowserStyle.js';
import HeaderBackground from "../../assets/HomeAssets/HeaderBackground.jpg"
const RecipeBrowser = ({ navigation }) => {

    const [darkTheme, setDarkTheme] = useContext(themeContext)
    const [foodarray] = useContext(foodContext)
    const styles = generateStyles(darkTheme)
    const [pagestart, setPageStart] = useState(0)
    const [pageend, setPageEnd] = useState(9)
    const [pagecount, setPageCount] = useState(0)

    const scrollRef = useRef();
 
    const goBackToHome = () => {
        navigation.goBack();
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
                    source={HeaderBackground}
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

