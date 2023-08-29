import React, { useContext } from 'react';
import {  ImageBackground, View, Image, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import { userDataContext } from "../../Components/SetData.js"
import ProfilePic from "../../assets/profile.png"
import { Text, IconButton,} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import CustomFont from '../../fonts/myfont.otf';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Surface } from 'react-native-paper';
import AgeAsset from "../../assets/age-group.png";
import HeightAsset from "../../assets/height-limit.png";
import WeightAsset from "../../assets/weight-scale.png";
import * as ImagePicker from 'expo-image-picker';
import { updateProfile, getAuth } from "firebase/auth";
import {styles} from "./ProfileStyle.js"
const NewProfileComponent = () => {

    const [userData, setUserData] = useContext(userDataContext)
    const navigation = useNavigation();
    const auth = getAuth();
    const user = auth.currentUser
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
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            updateProfile(auth.currentUser, {
                photoURL: result.assets[0].uri
            }).then(() => {
                Alert.alert("Successfully updated profile pic,Login and logout to see your new pic")
            }).catch((error) => {
                console.log(error)
            });
            console.log(user)
        }

    };

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
                                            onPress={() => { pickImage() }}
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
                                            onPress={() => { pickImage() }}
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
                        <LinearGradient
                            colors={['#f8f8f8', '#ffcdc6']}
                            style={styles.gradient}
                        >

                            <Surface style={{ width: '90%', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column', marginTop: 10, borderRadius: 30, backgroundColor: '#ffffff', }}>

                                <View style={{ width: '100%', justifyContent: 'space-evenly', alignItems: 'flex-start', flexDirection: 'column', padding: 20 }}>
                                    <View>
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 15, color: '#fd5a43', fontWeight: 'bold' }}>Your Progress Today:</Text>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                                        <CircularProgress
                                            value={20}
                                            radius={80}
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
                                    </View>
                                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button icon="food-apple" textColor='white' buttonColor='#fd5a43' mode="contained" onPress={() => console.log('Pressed')} style={{ marginBottom: 10 }}>
                                            Add Food You Ate
                                        </Button>

                                    </View>
                                </View>


                            </Surface>
                            <View style={{ width: '100%', alignItems: 'center', flexDirection: 'column', marginTop: 30 }}>

                                
                                <Surface style={styles.bigSurface}>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginLeft: 10 }}>Personal Data</Text>
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

                        </LinearGradient>
                    </View>






                </View>
            </ScrollView >
        </View >
    );
};



export default NewProfileComponent;