import {  Text, View, ImageBackground, Image,  TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState,useContext } from 'react'
import { collection, query, where,  doc, getDoc,   } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../../firebase-config";
import { Appbar } from 'react-native-paper';
import { auth } from "../../firebase-config";
import Searching from "../../assets/searching.gif"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import CustomFont from '../../fonts/myfont.otf';
import { foodContext } from "../../Context/GlobalContext.js"
import {styles} from "./FavouritesStyle"
const Favourites = ({ navigation }) => {
    const userRef = doc(db, "Users", auth.currentUser.uid);
    const favouritesquery = query(collection(db, "Favourites"), where("User_ID", "==", userRef));
    const [favouritesSnapshot, favouritesSnapshotLoading, favouritesSnapshotError] = useCollectionData(favouritesquery);
    const [favourites, setFavourites] = useState([])
    const [foodarray] = useContext(foodContext)

    useEffect(() => {
        const getFavouriteRef = async () => {
            try {
              if (!favouritesSnapshotLoading) {
                const newarray = await Promise.all(
                  favouritesSnapshot.map(async (favourite) => {
                    const docSnap = await getDoc(favourite.Recipe_ID);
                    const subdata = {
                      ...favourite,
                      name: docSnap.data().name,
                      image: docSnap.data().image,
                      servings: docSnap.data().servings,
                      ready: docSnap.data().ready,
                    };
                    return subdata;
                  })
                );
                setFavourites(newarray);
              }
            } catch (error) {
              console.error(error);
            }
          };
          
          
          if (favourites.length === 0 && favouritesSnapshot) {
            getFavouriteRef();
          }

    })
    
    const handleNavigation = (favourite) => {
        foodarray.map((data)=>{
            if(data.name == favourite.name) {
                navigation.navigate("SingleElement", { item: data })
            }
        })
       
    }
    const [loaded] = useFonts({
        CustomFont: CustomFont,
    });

    if (!loaded) {
        return null;
    }
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
                    <View style={{ flex: 1, width: '100%', height: '100%', }}>
                        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center' }}>
                            {favourites.map((favourite,i) => {
                                
                                return (
                                    
                                    <TouchableOpacity  style={{ padding: 8, height: 160, width: "95%", alignItems: 'center', elevation: 4, margin: 5, backgroundColor: 'white', borderRadius: 20, flexDirection: 'row' }} onPress={() => { handleNavigation(favourite) }} key={i}>
                                        <Image source={{ uri: favourite.image }} style={{ width: 100, height: 100, borderRadius: 10, marginLeft: 10 }} />
                                        <View style={{ flex: 1, marginLeft: 30, }}>
                                            <Text style={{ fontFamily: 'CustomFont', fontSize: 13, color: 'grey', marginBottom: 10, textAlign: 'left' }}>{favourite.name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <MaterialCommunityIcons name="camera-timer" size={24} color="black" />
                                                <Text style={{ fontFamily: 'CustomFont', fontSize: 13, color: 'grey', textAlign: 'left' }}> {favourite.servings} People</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <MaterialCommunityIcons name="bowl-mix-outline" size={24} color="black" />
                                                <Text style={{ fontFamily: 'CustomFont', fontSize: 13, color: 'grey', textAlign: 'left' }}> {favourite.ready} Minutes</Text>
                                            </View>
                                            

                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                </>

            }

        </View>
    )
}

export default Favourites

