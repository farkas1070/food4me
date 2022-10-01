
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Switch } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { themeContext, } from "../Components/SetData.js"
import { useContext, } from "react";
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const navigation = useNavigation();
    const [darkTheme, setDarkTheme] = useContext(themeContext)

    const toggleSwitch = () => setDarkTheme(previousState => !previousState);

    const openMenu = () => {
        navigation.openDrawer();
    }
    return (


        <View style={styles.headerContainer(darkTheme)}>
            <TouchableOpacity onPress={() => { openMenu() }}><Feather style={styles.feathericon} name="menu" size={35} color={darkTheme ? "#fd5a43" : "white"} /></TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                {darkTheme ? <Feather name="moon" size={25} color={darkTheme ? "#fd5a43" : "white"} style={{ marginTop: 25, marginRight: 10 }} /> : <Feather name="sun" size={25} color={darkTheme ? "#fd5a43" : "white"} style={{ marginTop: 25, marginRight: 10 }} />}
                <Switch trackColor={{ false: "#767577", true: "#661b1c" }} thumbColor="white" onValueChange={toggleSwitch} value={darkTheme} style={styles.switch} >

                </Switch>
            </View>
        </View>


    );
}

const styles = StyleSheet.create({
    container: (darkTheme) => ({
        flex: 1,
        backgroundColor: darkTheme ? "white" : '#fd5a43',
        padding: 25
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
        marginTop: 35,
        marginLeft: 30

    },
    switch: {
        marginTop: 25,
        marginRight: 25,
        transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }]
    },
    bodyContainer: (darkTheme) => ({
        width: "100%",

        backgroundColor: darkTheme ? 'black' : "white"

    }),
    text: (darkTheme) => ({
        fontWeight: "700",
        fontSize: 20,
        marginLeft: 30,
        color: darkTheme ? "white" : "black",

    }),

    scrollView: {
        marginTop: 30,
        marginBottom: 20,
        height: 250,

        marginHorizontal: 20,
        borderRadius: 20,
    },
    innerBox: {
        padding: 5,
        width: 160,
        height: "100%",

    },
    profileImage: (darkTheme) => ({
        width: 100,
        height: 100,
        borderRadius: 400 / 2,
        borderWidth: 2,
        borderColor: darkTheme ? "white" : "black"

    }),
    image: {
        width: "100%",
        height: 130,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    whatwillyoudotext: (darkTheme) => ({
        marginTop: 50,
        marginLeft: 30,
        fontSize: 15,
        fontWeight: '700',
        color: darkTheme ? "white" : "black"
    }),
    posterimage: {
        width: "100%",
        height: 200,
    },
    homepictureview: (darkTheme) => ({
        borderTopColor: darkTheme ? '#fd5a43' : '#d3d3d3',
        borderTopWidth: 1,
        alignItems: 'center',

        width: '100%',
        height: 400,
        marginTop: 30,
        backgroundImage: 'url'
    }),
    homepic: {
        width: "80%",
        height: 200,
        borderRadius: 10,
        marginTop: 50,
    }
});