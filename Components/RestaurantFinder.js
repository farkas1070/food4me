import { KeyboardAvoidingView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper';
import { Appbar, Provider } from 'react-native-paper';
import { Platform } from 'react-native';
import { themeContext } from "../Components/SetData.js"
import { useContext, useState, useEffect } from "react";
import MapView from 'react-native-maps';
import * as Location from "expo-location";
import { Marker } from 'react-native-maps';
import Searching from "../assets/searching.gif"

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
const RestaurantFinder = () => {
    const [darkTheme, setDarkTheme] = useContext(themeContext)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude);
            setLocation(location.coords);

        })();
    }, []);






    return (
        <View style={styles.container(darkTheme)}>

            <Appbar.Header style={styles.header} >
                <Appbar.BackAction onPress={() => { }} color="white" />
                <Appbar.Content title="Restaurant Finder" color="white" />
                <Appbar.Action icon="magnify" color="white" onPress={() => { }} />
                <Appbar.Action color="white" icon={MORE_ICON} onPress={() => { }} />
            </Appbar.Header>

            <KeyboardAvoidingView style={styles.bodycontainer(darkTheme)}>

                {location ?

                    <MapView initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }} style={styles.map}>
                        <Marker

                            coordinate={{ latitude: latitude, longitude: longitude }}
                            title={"Te vagy itt"}

                        />
                    </MapView> : <View>
                        <Image
                            style={styles.noitemimage}
                            source={Searching}
                        /></View>

                }


            </KeyboardAvoidingView >

        </View >
    )
}

export default RestaurantFinder

const styles = StyleSheet.create({
    container: (darkTheme) => ({
        flex: 1,
        backgroundColor: darkTheme ? "black" : 'white',

    }),
    bodycontainer: (darkTheme) => ({
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkTheme ? "black" : 'white',

    }),
    map: {
        width: '100%',
        height: '100%',
    },
    text: {
        color: 'white'
    },
    header: {
        backgroundColor: "#fd5a43",

    },
    noitemimage: {

        width: 300,
        height: 300
    },

})