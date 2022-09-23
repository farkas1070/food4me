
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Switch } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { themeContext } from "../Components/SetData.js"
import { useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import noitemfound from "../assets/noitemfound.png"



const RecipeBrowser = ({ navigation, route }) => {
    const { item } = route.params;
    const [darkTheme, setDarkTheme] = useContext(themeContext)

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

    return (
        <KeyboardAvoidingView style={{ height: '100%', }}>

            <View style={styles.headerContainer(darkTheme)}>
                <TouchableOpacity onPress={() => { openMenu() }}><AntDesign name="back" size={25} color={darkTheme ? "#fd5a43" : "white"} style={styles.anticon} /></TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>

                    <Switch trackColor={{ false: "#767577", true: "white" }} thumbColor={darkTheme ? "#fd5a43" : "white"} onValueChange={toggleSwitch} value={darkTheme} style={styles.switch} >

                    </Switch>
                </View>
            </View>
            <View style={{ height: "88%" }}>
                <ScrollView contentContainerStyle={styles.mainContainer(darkTheme)} ref={scrollRef} >
                    <View style={{ width: "100%" }}>
                        {item.length === 0 ?
                            <View style={{ marginTop: 100, alignItems: "center" }}>
                                <Image
                                    style={styles.noitemimage}
                                    source={noitemfound}
                                />
                            </View>
                            :
                            item.map((data, i) => {
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

                        <TouchableOpacity style={ pagestart <= 0 ? styles.disabledButton(darkTheme) : styles.Button(darkTheme)} onPress={() => { pageBackwards() }} disabled={pagestart <= 0 ? true : false} >
                            <AntDesign name="arrowleft" size={30} color={ pagestart <= 0 ? "#d3d3d3" : "white" } />
                        </TouchableOpacity>

                        <Text style={styles.pagecounttext(darkTheme)}>{pagecount}</Text>

                        <TouchableOpacity style={pageend > item.length ? styles.disabledButton(darkTheme) : styles.Button(darkTheme)} onPress={() => { pageForward() }} disabled={pageend > item.length ? true : false} >
                            <AntDesign name="arrowright" size={30} color={pageend > item.length ? "#d3d3d3" : "white"} />
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
    input: (darkTheme) => ({
        width: "85%",
        borderRadius: 20,
        height: 40,
        backgroundColor: darkTheme ? "black" : "white",

        textAlign: 'center'
    }),
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginLeft: 20,

    },
    noitemimage: {

        width: 300,
        height: 300
      },
    headerContainer: (darkTheme) => ({
        width: '100%',
        height: "12%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: darkTheme ? 'black' : "#fd5a43",
        borderBottomWidth: darkTheme ? 5 : 0,
        borderColor: darkTheme ? "#fd5a43" : "transparent",
    }),
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 35
    },

    anticon: {
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
    disabledButton:(darkTheme)=> ({
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        height: 50,
        backgroundColor: darkTheme ? "#181616" : "#e5e5e5",
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

    }

})