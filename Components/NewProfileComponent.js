import React, { useContext } from 'react';
import { StyleSheet, ImageBackground, View, Image, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import { themeContext, userContext, userDataContext } from "../Components/SetData.js"
import ProfilePic from "../assets/profile.png"
import { Divider, Text, IconButton, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import CustomFont from '../fonts/myfont.otf';
import { AntDesign } from '@expo/vector-icons';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Surface } from 'react-native-paper';
import AgeAsset from "../assets/age-group.png";
import HeartAsset from "../assets/heartbeat.png";
import DumbbellAsset from "../assets/dumbbell.png";
import HeightAsset from "../assets/height-limit.png";
import WeightAsset from "../assets/weight-scale.png";

const NewProfileComponent = () => {
    const [user] = useContext(userContext)
    const [userData, setUserData] = useContext(userDataContext)
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
                                <Appbar.Action icon="dots-vertical" color="white" onPress={() => console.log('cog-outline')} />
                            </View>

                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", width: "100%", alignItems: "center" }}>
                                {user.photoURL == null ?
                                    <View style={{ position: 'relative' }}>
                                        <Image
                                            style={styles.profileImage}
                                            source={ProfilePic}
                                        />
                                        <IconButton
                                            icon="file-image-plus-outline"
                                            size={25}
                                            mode='contained'
                                            containerColor='#fd5a43'
                                            iconColor='white'
                                            style={{ position: 'absolute', top: 0, right: 0 }}
                                            onPress={() => console.log('Change profile picture')}
                                        />
                                    </View>
                                    :
                                    <View style={{ position: 'relative' }}>
                                        <Image
                                            style={styles.profileImage}
                                            source={{ uri: user.photoURL }}
                                        />
                                        <IconButton
                                            icon="file-image-plus-outline"
                                            size={25}
                                            mode='contained'
                                            containerColor='#fd5a43'
                                            iconColor='white'
                                            style={{ position: 'absolute', top: 0, right: 0 }}
                                            onPress={() => console.log('Change profile picture')}
                                        />
                                    </View>}
                            </View>


                            <View style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}>
                                <Appbar.Content title={user.displayName} titleStyle={styles.title} />
                            </View>




                        </Appbar.Header>
                    </BlurView>
                </ImageBackground>
                <View style={styles.container}>
                    <View style={{ flex: 1, width: '100%', alignItems: "flex-start", backgroundColor: '#f8f8f8' }}>

                        <View style={{ width: '100%', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#808080', marginTop: 30 }}>Your Calorie Status</Text>
                            <View style={{ width: '100%', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', padding: 20 }}>

                                <CircularProgress
                                    value={20}
                                    radius={70}
                                    duration={2000}
                                    progressValueColor={'#808080'}
                                    maxValue={userData.AMR}
                                    activeStrokeColor={'white'}
                                    inActiveStrokeColor={'#fd5a43'}
                                    inActiveStrokeOpacity={0.5}
                                    inActiveStrokeWidth={20}
                                    activeStrokeWidth={10}
                                    title={'Calories'}
                                    titleColor={'#fd5a43'}
                                    titleStyle={{ fontFamily: 'CustomFont', }}

                                />
                                <View>
                                    <Button icon="food-apple" textColor='white' buttonColor='#fd5a43' mode="contained" onPress={() => console.log('Pressed')} style={{ marginBottom: 10, marginLeft: 10 }}>
                                        Add Food You Ate
                                    </Button>
                                    <Button icon="dumbbell" textColor='white' buttonColor='#fd5a43' mode="contained" onPress={() => console.log('Pressed')} style={{ marginTop: 10, marginLeft: 10 }}>
                                        AddExcesize You did
                                    </Button>
                                </View>
                            </View>


                        </View>
                        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'column', marginTop: 30 }}>
                            <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginLeft: 10 }}>Fitness Data:</Text>
                            <Surface style={styles.bigSurface}>
                               
                                    <View style={styles.surface}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            style={styles.AssetImage}
                                            source={HeartAsset}
                                            resizeMode='contain'
                                        />
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginLeft: 10 }}>BMR</Text>
                                    </View>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginRight: 10 }}>{userData.BMR.toFixed(2)}</Text>
                                </View>
                                <View style={styles.surface}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            style={styles.AssetImage}
                                            source={AgeAsset}
                                            resizeMode='contain'
                                        />
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginLeft: 10 }}>AMR</Text>
                                    </View>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginRight: 10 }}>{userData.AMR.toFixed(2)}</Text>
                                </View>
                                <View style={styles.surface}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            style={styles.AssetImage}
                                            source={DumbbellAsset}
                                            resizeMode='contain'
                                        />
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginLeft: 10 }}>BMI</Text>
                                    </View>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginRight: 10 }}>{userData.BMI.toFixed(2)}</Text>
                                </View>
                            </Surface>
                            <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginLeft: 10 }}>Personal Data</Text>
                            <Surface style={styles.bigSurface}>
                                <View style={styles.surface}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Image
                                            style={styles.AssetImage}
                                            source={HeightAsset}
                                            resizeMode='contain'
                                        />
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginLeft: 10 }}>Height</Text>
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginLeft: 10 }}>{userData.height} Cm.</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <IconButton
                                            icon="cog-outline"
                                            iconColor='white'
                                            size={20}
                                            mode='contained'
                                            containerColor='#fd5a43'
                                            onPress={() => console.log('Pressed')}
                                        />
                                    </View>
                                </View>
                                <View style={styles.surface}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Image
                                            style={styles.AssetImage}
                                            source={WeightAsset}
                                            resizeMode='contain'
                                        />
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginLeft: 10 }}>Weight</Text>
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginLeft: 10 }}>{userData.weight} Kg.</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <IconButton
                                            icon="cog-outline"
                                            iconColor='white'
                                            size={20}
                                            mode='contained'
                                            containerColor='#fd5a43'
                                            onPress={() => console.log('Pressed')}
                                        />
                                    </View>
                                </View>
                                <View style={styles.surface}>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                                        <Image
                                            style={styles.AssetImage}
                                            source={AgeAsset}
                                            resizeMode='contain'
                                        />
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginLeft: 10 }}>Age</Text>
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginLeft: 10 }}>{userData.age} Yrs.</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <IconButton
                                            icon="cog-outline"
                                            iconColor='white'
                                            size={20}
                                            mode='contained'
                                            containerColor='#fd5a43'
                                            onPress={() => console.log('Pressed')}
                                        />
                                    </View>

                                </View>
                            </Surface>





                        </View>


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
    AssetImage: {
        height: 50,
        width: 50
    },
    surface: {
        height: 80,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,



        flexDirection: 'row',
    },
    bigSurface: {


        width: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        elevation: 10,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#ffffff',


        flexDirection: 'column',
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