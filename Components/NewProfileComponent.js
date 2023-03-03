import React, { useContext } from 'react';
import { StyleSheet, ImageBackground, View, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import { themeContext, userContext } from "../Components/SetData.js"
import ProfilePic from "../assets/profile.png"
import { Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import CustomFont from '../fonts/myfont.otf';
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore"

const NewProfileComponent = () => {
    const [user] = useContext(userContext)
    const navigation = useNavigation();
    const [loaded] = useFonts({
        CustomFont: CustomFont,
      });
      if (!loaded) {
        return null;
      }
    const openMenu = () => {
        navigation.openDrawer();
    }
    const userRef = user.uid
    
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <ImageBackground
                style={styles.backgroundImage}
                source={{
                    uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=962&q=80',
                    cache: 'force-cache',
                }}
                resizeMode="cover"
                blurRadius={3}
            >
                <View style={styles.overlay} />
                <BlurView style={styles.blur} blurType="light" blurAmount={5}>
                    <Appbar.Header style={styles.appBar}>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", width: "100%", }}>
                            <Appbar.Action icon="menu" color="white" onPress={() => { openMenu() }} />
                            <Appbar.Action icon="dots-vertical" color="white" onPress={() => console.log('settings')} />
                        </View>

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", width: "100%", alignItems: "center" }}>
                            {user.photoURL == null ? <Image
                                style={styles.profileImage}
                                source={ProfilePic}
                            /> : <Image
                                style={styles.profileImage}
                                source={{ uri: user.photoURL }}
                            />}
                        </View>
                        <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Appbar.Content title={user.displayName} titleStyle={styles.title} />
                        </View>




                    </Appbar.Header>
                </BlurView>
            </ImageBackground>
            <View style={styles.container}>
                <View style={{flex:1,width:'100%',alignItems: "flex-start"}}>
                <Text style={{fontFamily: 'CustomFont', fontSize: 30}}>Calories:{0}</Text>
                </View>        
                





            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:30,


        backgroundColor: "white"
    },
    divider: {
        width: "100%",
        flex: 1,




    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(253, 90, 67, 0.2)', // Orange with 50% opacity
    },
    profileImage: {
        width: 150,
        height: 150,
        marginBottom: 50

    },
    appBar: {

        backgroundColor: 'transparent',
        justifyContent: "center",
        height: 300,
        width: "100%",
        flexDirection: "column",


    },
    title: {
        color: 'white',
        fontSize: 20,
        marginTop: 20
    },
});

export default NewProfileComponent;