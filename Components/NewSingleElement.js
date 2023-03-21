import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ImageBackground, Text, ScrollView, Flatlist } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Appbar } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import CustomFont from '../fonts/myfont.otf';
import { Surface } from 'react-native-paper';
import CircularProgress from 'react-native-circular-progress-indicator';
import Forcefields from "../assets/Forcefields.png"
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useDocument, useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../firebase-config";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Chip } from 'react-native-paper';
import Searching from "../assets/searching.gif"
import { Button } from 'react-native-paper';
const getColor = (healthscore) => {
    switch (true) {
        case (healthscore < 25):
            return ({
                color: 'red',
                statement: 'Not Healthy'
            })

        case (healthscore >= 25 && healthscore < 75):
            return ({
                color: 'orange',
                statement: 'Avarage healthiness'
            })
        case (healthscore >= 75):
            return ({
                color: 'green',
                statement: 'Healthy'
            })

    }
}
const NewSingleElement = ({ navigation, route }) => {
    const { item } = route.params;



    const coloritem = getColor(item.healthscore)

    const docid = item.docid
    const recipeRef = doc(db, "Recipes", docid);
    const Ingredientsref = collection(db, "Recipes_Ingredients");
    const TypesRef = collection(db, "Recipe_Types");
    const Nutritionref = collection(db, "Recipe_Nutrition")
    const nutrientquery = query(Nutritionref, where("Recipe_ID", "==", recipeRef));
    const typequery = query(TypesRef, where("Recipe_ID", "==", recipeRef));
    const ingredientquery = query(Ingredientsref, where("Recipe_ID", "==", recipeRef));
    const [ingredients, setIngredients] = useState([])
    const [nutritionSnapshot, nutritionSnapshotLoading, nutritionSnapshotError] = useCollectionData(nutrientquery);
    const [ingredientSnapshot, ingredientSnapshotLoading, ingredientSnapshotError] = useCollectionData(ingredientquery);
    const [typeSnapshot, typeSnapshotLoading, typeSnapshotError] = useCollectionData(typequery);









    const [loaded] = useFonts({
        CustomFont: CustomFont,
    });

    if (!loaded) {
        return null;
    }

    if (nutritionSnapshotError) {
        return <Text>Error: {nutritionError.message}</Text>;
    }

    return (
        <View style={styles.container}>
            {nutritionSnapshotLoading || ingredientSnapshotLoading || typeSnapshotLoading ?

                <View style={{ width: '100%', height: '100%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Text>Just a sec, loading data...</Text>
                    <Image
                        style={styles.noitemimage}
                        source={Searching}
                    />
                </View> :
                <ImageBackground
                    style={styles.backgroundImage}
                    source={{
                        uri: item.image,
                        cache: 'force-cache',
                    }}



                >
                    <ScrollView style={{ width: '100%', flexGrow: 1, }}>




                        <View style={styles.overlay} />
                        <View style={styles.appBar}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 25 }}>
                                <Appbar.Action icon="menu" color="rgba(253, 90, 67, 1)" onPress={() => { openMenu() }} />
                                <Appbar.Action icon="dots-vertical" color="rgba(253, 90, 67, 1)" onPress={() => console.log('cog-outline')} />
                            </View>










                        </View>

                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 30, borderTopEndRadius: 30, backgroundColor: 'white' }}>



                            <View style={{ width: '100%', marginBottom: 60, }}>
                                <View style={{ padding: 20 }}>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, textAlign: 'left' }}>{item.name}</Text>
                                </View>
                                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomColor: '#efefef', borderBottomWidth: 1.3 }}>
                                    {nutritionSnapshot.map((nutrition, index) => {
                                        if (nutrition.name == 'Calories' || nutrition.name == 'Protein' || nutrition.name == 'Carbohydrates' || nutrition.name == 'Fat') {
                                            return (
                                                <View key={index}>
                                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 13, color: 'grey', marginTop: 5, textAlign: 'left' }}>{nutrition.name}</Text>
                                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 14, color: '#fd5a43', fontWeight: '700', marginTop: 5, textAlign: 'left' }}>{nutrition.amount} {nutrition.unit}</Text>
                                                </View>
                                            )

                                        }
                                    })}

                                </View>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 20 }}>
                                    {typeSnapshot.map((item, index) => (
                                        <Chip key={index} selectedColor="white" style={{ marginTop: 5, marginRight: 5, marginBottom: 5, backgroundColor: 'rgba(253, 90, 67, 1)' }}>
                                            {item.name}
                                        </Chip>
                                    ))}

                                </View>


                            </View>

                            <View style={{ marginBottom:50 }}>
                                <CircularProgress
                                    value={item.healthscore}
                                    radius={75}
                                    progressValueColor={'rgba(253, 90, 67, 1)'}
                                    duration={2000}
                                    title={'Healthscore'}
                                    
                                    titleColor={'grey'}
                                    strokeColorConfig={[
                                        { color: 'red', value: 0 },
                                        { color: 'skyblue', value: 50 },
                                        { color: 'yellowgreen', value: 100 },
                                    ]}
                                    activeStrokeColor={'#efefef'}
                                    inActiveStrokeColor={'#efefef'}
                                    dashedStrokeConfig={{
                                        count: 50,
                                        width: 4,
                                    }}
                                />
                            </View>




                        </View>



                    </ScrollView >
                </ImageBackground>

            }
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
        width: '100%',
        height: '100%'
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 4 / 3, // Change this to match your image aspect ratio
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '75%',
        resizeMode: 'cover'

    },
    noitemimage: {

        width: 300,
        height: 300
    },
    appBar: {

        backgroundColor: 'transparent',
        justifyContent: "flex-start",
        alignItems: 'center',
        height: 450,
        width: "100%",
        flexDirection: "column",

        overflow: 'hidden',




    },
    surface: {


        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 20
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(253, 90, 67, 0.1)',

        overflow: 'hidden', // Orange with 50% opacity
    },
    fade: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
        opacity: 0.5,
    },
});

export default NewSingleElement;