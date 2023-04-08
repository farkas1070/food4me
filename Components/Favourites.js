import { StyleSheet, Text, View, ImageBackground, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../firebase-config";
import { Appbar } from 'react-native-paper';
import { auth } from "../firebase-config";
import Searching from "../assets/searching.gif"



const Favourites = ({ navigation }) => {
    const userRef = doc(db, "Users", auth.currentUser.uid);
    const favouritesquery = query(collection(db, "Favourites"), where("User_ID", "==", userRef));
    const [favouritesSnapshot, favouritesSnapshotLoading, favouritesSnapshotError] = useCollectionData(favouritesquery);
    const [favourites, setFavourites] = useState([])
    useEffect(() => {
        const getFavouriteRef = async () => {
            if (!favouritesSnapshotLoading) {
                let newarray = []
                await Promise.all(favouritesSnapshot.map(async (favourite) => {
                    const docSnap = await getDoc(favourite.Recipe_ID);
                    var subdata = { ...favourite }
                    subdata.name = docSnap.data().name
                    subdata.image = docSnap.data().image


                    newarray.push({ ...subdata })


                }))
                setFavourites(newarray)
            }
        };

        if (favourites.length == 0) {
            getFavouriteRef()
        }

    })
    return (
        <View style={styles.maincontainer}>
            {favourites.length == 0 ?
                <View style={{ width: '100%', height: '100%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Text>Just a sec, loading data...</Text>
                    <Image
                        style={styles.noitemimage}
                        source={Searching}
                    />
                </View> :
                <>
                    <ImageBackground
                        style={styles.backgroundImage}
                        source={{
                            uri: 'https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
                            cache: 'force-cache',
                        }}
                        resizeMode="cover"

                    >
                        <View style={styles.overlay} />
                        <Appbar.Header style={styles.appBar}>
                            <Appbar.BackAction color="rgba(255, 255, 255, 1)" onPress={() => { navigation.goBack() }} />

                            <Appbar.Content color="rgba(255, 255, 255, 1)" title={<Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', textAlign: 'left' }}>Favourites</Text>} />
                            <Appbar.Action color="rgba(255, 255, 255, 1)" icon="magnify" onPress={() => { }} />

                        </Appbar.Header>
                    </ImageBackground>
                    <View style={styles.foodcontainer}>
                        <FlatList
                            data={favourites}
                            renderItem={({ item }) => {
                                return (

                                    <View style={{ flex: 1, flexDirection: 'column', margin: 1, borderRadius: 10 }}>

                                        <TouchableOpacity style={{ height: 200, borderRadius: 10 }}>

                                            <ImageBackground
                                                style={{ height: 200, borderRadius: 10,justifyContent: 'center',alignItems: 'center'}}
                                                source={{
                                                    uri: item.image,
                                                    cache: 'force-cache',
                                                }}
                                                blurRadius={0}


                                            >
                                                <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.25)', }} />
                                                <Text style={{ color: 'rgba(255, 255, 255,1)',textAlign:'center',width:'80%',backgroundColor: 'rgba(253, 90, 67,0.7)',borderRadius:10,padding:10 }}>{item.name}</Text>
                                            </ImageBackground>
                                        </TouchableOpacity>

                                    </View>)
                            }}
                            keyExtractor={(item) => item.name}
                            numColumns={2}
                        />
                    </View>
                </>

            }

        </View>
    )
}

export default Favourites

const styles = StyleSheet.create({
    maincontainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',

    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(253, 90, 67, 0.6)', // Orange with 50% opacity
    },
    noitemimage: {

        width: 300,
        height: 300
    },
    appBar: {

        backgroundColor: 'transparent',
        justifyContent: "center",
        width: "100%",
    },
    foodcontainer: {
        flexGrow: 1,
        width: '100%',
        height: '100%',
    }
})