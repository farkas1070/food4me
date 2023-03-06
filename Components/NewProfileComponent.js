import React, { useContext } from 'react';
import { StyleSheet, ImageBackground, View, Image, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import { themeContext, userContext } from "../Components/SetData.js"
import ProfilePic from "../assets/profile.png"
import { Divider, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import CustomFont from '../fonts/myfont.otf';
import { AntDesign } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
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
        <View style={{ width: '100%', height: '100%', flex: 1, backgroundColor: 'white' }}>
            <ScrollView style={{ width: '100%', flexGrow: 1, }}>
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
                    <View style={{ flex: 1, width: '100%', alignItems: "flex-start" }}>
                        <LinearGradient
                            colors={['#FFAA9E', '#ff7966', '#fd5a43']}
                            style={{ flex: 1, width: '100%' }}
                            locations={[0, 0.7, 1]}
                        >
                            <View style={{ width: '100%', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', marginTop:30 }}>Your Calorie Status</Text>
                                <View style={{ width: '100%', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', padding: 20 }}>
                                    <CircularProgress
                                        value={20}
                                        radius={70}
                                        duration={2000}
                                        progressValueColor={'white'}
                                        maxValue={200}
                                        activeStrokeColor={'white'}
                                        inActiveStrokeColor={'#FFCDC6'}
                                        inActiveStrokeOpacity={0.5}
                                        inActiveStrokeWidth={20}
                                        activeStrokeWidth={10}
                                        title={'Calories'}
                                        titleColor={'#FFF3F1'}
                                        titleStyle={{ fontFamily: 'CustomFont', }}

                                    />
                                    <View>
                                        <Button icon="food-apple" textColor='black' buttonColor='white' mode="contained" onPress={() => console.log('Pressed')} style={{ marginBottom: 10, marginLeft: 10 }}>
                                            Add Food You Ate
                                        </Button>
                                        <Button icon="dumbbell" textColor='black' buttonColor='white' mode="contained" onPress={() => console.log('Pressed')} style={{ marginTop: 10, marginLeft: 10 }}>
                                            AddExcesize You did
                                        </Button>
                                    </View>
                                </View>


                            </View>
                            <View style={{ width: '100%', alignItems: 'flex-start', flexDirection: 'column', marginTop: 30 }}>
                                <View style={{ width: '100%', alignItems: 'flex-start', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'white', height: 50 }}>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', marginLeft: 10 }}>BMR:</Text>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', marginLeft: 10 }}>{0}</Text>

                                </View>
                                <View style={{ width: '100%', alignItems: 'flex-start', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'white', height: 50 }}>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', marginLeft: 10 }}>AMR</Text>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', marginLeft: 10 }}>{0}</Text>

                                </View>
                                <View style={{ width: '100%', alignItems: 'flex-start', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'white', height: 50 }}>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', marginLeft: 10 }}>BMI</Text>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', marginLeft: 10 }}>{0}</Text>

                                </View>
                                <View style={{ width: '100%', alignItems: 'flex-start', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'white', height: 50 }}>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', marginLeft: 10 }}>Height:</Text>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', marginLeft: 10 }}>{0}</Text>

                                </View>
                                <View style={{ width: '100%', alignItems: 'flex-start', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'white', height: 50 }}>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', marginLeft: 10 }}>Weight:</Text>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', marginLeft: 10 }}>{0}</Text>

                                </View>
                                <View style={{ width: '100%', alignItems: 'flex-start', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'white', height: 50 }}>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', marginLeft: 10 }}>Age:</Text>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', marginLeft: 10 }}>{0}</Text>

                                </View>

                            </View>

                        </LinearGradient>
                    </View>






                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,



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