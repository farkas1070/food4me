import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ImageBackground, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Appbar } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import CustomFont from '../fonts/myfont.otf';
import { Surface } from 'react-native-paper';
import CircularProgress from 'react-native-circular-progress-indicator';
import Forcefields from "../assets/Forcefields.png"
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Chip } from 'react-native-paper';
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
    const [nutrients, setNutrients] = useState([])
    const coloritem = getColor(item.healthscore)
    const [types, setTypes] = useState([])
    const [ingredients, setIngredients] = useState([])
    const docid = item.docid
    const recipeRef = doc(db, "Recipes", docid);
    const Ingredientsref = collection(db, "Recipes_Ingredients");
    const TypesRef = collection(db, "Recipe_Types");
    const Nutritionref = collection(db, "Recipe_Nutrition")
    const nutrientquery = query(Nutritionref, where("Recipe_ID", "==", recipeRef));
    const typequery = query(TypesRef, where("Recipe_ID", "==", recipeRef));
    const ingredientquery = query(Ingredientsref, where("Recipe_ID", "==", recipeRef));


    useEffect(() => {
        const executeQueries = async () => {


            const nutrientSnapshot = await getDocs(nutrientquery);
            let array1 = []
            let array2 = []
            let array3 = []
            nutrientSnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                var subdata = {}
                const splitString = doc.id.split("-");
                subdata.amount = doc.data().amount
                subdata.percentOfDailyNeeds = doc.data().percentOfDailyNeeds
                subdata.name = splitString[1]
                array1.push({ ...subdata })


            });


            const typeSnapshot = await getDocs(typequery);
            typeSnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots


                const splitString = doc.id.split("-");
                let type = splitString[1]
                array2.push(type)
                console.log(type)

            });


            const ingredientSnapshot = await getDocs(ingredientquery);
            ingredientSnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots

                var subdata = {}
                const splitString = doc.id.split("-");
                subdata.amount = doc.data().amount
                subdata.unit = doc.data().unit
                subdata.name = splitString[1]
                array3.push({ ...subdata })


            });
            setNutrients(array1)
            setTypes(array2)
            setIngredients(array3)
        }
        executeQueries();

    }, [])


    const [loaded] = useFonts({
        CustomFont: CustomFont,
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%', flexGrow: 1, }}>

                <ImageBackground
                    style={styles.backgroundImage}
                    source={{
                        uri: item.image,
                        cache: 'force-cache',
                    }}
                    resizeMode="cover"

                >
                    <View style={styles.overlay} />
                    <LinearGradient
                        colors={['transparent', '#EFEFEF']}
                        locations={[0.1, 0.95]}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                        pointerEvents="none"
                    />
                    <View >
                        <Appbar.Header style={styles.appBar}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                <Appbar.Action icon="menu" color="white" onPress={() => { openMenu() }} />
                                <Appbar.Action icon="dots-vertical" color="white" onPress={() => console.log('cog-outline')} />
                            </View>

                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", width: "100%", alignItems: "flex-start" }}>
                                <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: 20 }}>{item.name}</Text>

                            </View>

                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
                                <CircularProgress
                                    value={item.healthscore}
                                    radius={75}
                                    progressValueColor={'white'}
                                    duration={2000}
                                    strokeColorConfig={[
                                        { color: 'red', value: 0 },
                                        { color: 'skyblue', value: 50 },
                                        { color: 'yellowgreen', value: 100 },
                                    ]}
                                    activeStrokeColor={'white'}
                                    inActiveStrokeColor={'white'}
                                    dashedStrokeConfig={{
                                        count: 50,
                                        width: 4,
                                    }}
                                />
                                <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: coloritem.color, fontWeight: 'bold', marginTop: 5, marginBottom: 5 }}>{coloritem.statement}</Text>
                            </View>




                        </Appbar.Header>


                    </View>
                </ImageBackground>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>



                    <View style={{ width: '100%', marginBottom: 60 }}>
                        {types.map((type, index) => {
                            return (
                                <Chip key={index} icon="information" onPress={() => console.log('Pressed')}>{type}</Chip>

                            )
                        })}
                    </View>




                    <Surface style={{ width: '90%', alignItems: 'center', justifyContent: 'center', elevation: 4, backgroundColor: '#ffffff', borderRadius: 20, marginTop: 10, marginBottom: 20, height: 400 }}>
                        <View style={{ backgroundColor: '#fd5a43', width: '100%', height: 40, alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: 5, marginBottom: 5 }}>Nutrients In the recipe:</Text>
                        </View>
                        <ScrollView nestedScrollEnabled={true} style={{ width: '100%', flexGrow: 1, }}>

                            <ImageBackground
                                style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', }}

                                resizeMode="cover"


                            >

                                {nutrients.map((nutrient, index) => {
                                    return (
                                        <View key={index} style={{ width: '100%', flexDirection: 'row', marginTop: 10, alignItems: 'center', marginBottom: 20, borderBottomWidth: 0.5, borderColor: '#fd5a43' }}>
                                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginLeft: 20 }}>
                                                <CircularProgress
                                                    value={nutrient.percentOfDailyNeeds > 100 ? 100 : nutrient.percentOfDailyNeeds}
                                                    radius={35}
                                                    maxValue={100}
                                                    progressValueColor={'#989898'}
                                                    title={'Daily %'}
                                                    duration={2000}
                                                    titleColor={'#989898'}
                                                    strokeColorConfig={[
                                                        { color: 'green', value: 0 },
                                                        { color: 'yellow', value: 50 },
                                                        { color: 'red', value: 100 },
                                                    ]}

                                                />
                                                <Text style={{ fontFamily: 'CustomFont', fontSize: 14, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>{nutrient.name}:</Text>
                                                <Text style={{ fontFamily: 'CustomFont', fontSize: 14, color: 'black', fontWeight: 'bold', marginLeft: 20 }}>{nutrient.amount}</Text>
                                            </View>


                                        </View>

                                    )
                                })}


                            </ImageBackground>
                        </ScrollView>
                        <View style={{ backgroundColor: '#fd5a43', width: '100%', height: 30, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 20, borderBottomEndRadius: 20 }}>

                        </View>
                    </Surface>
                    <Surface style={{ width: '90%', alignItems: 'center', justifyContent: 'center', elevation: 4, backgroundColor: '#ffffff', borderRadius: 20, marginTop: 10, marginBottom: 20, height: 400 }}>
                        <View style={{ backgroundColor: '#fd5a43', width: '100%', height: 40, alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: 5, marginBottom: 5 }}>Recipe, ingredients</Text>
                        </View>
                        <ScrollView nestedScrollEnabled={true} style={{ width: '100%', flexGrow: 1, }}>
                            <ImageBackground
                                style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', }}

                                resizeMode="cover"


                            >
                                {ingredients.map((ingredient, index) => {
                                    return (
                                        <View key={index} style={{ width: '100%', flexDirection: 'row', marginTop: 10, alignItems: 'center', marginBottom: 20 }}>

                                            <BouncyCheckbox
                                                size={25}
                                                fillColor="#fd5a43"
                                                unfillColor="#FFFFFF"
                                                iconStyle={{ borderColor: "black" }}
                                                innerIconStyle={{ borderWidth: 2 }}
                                                text={`${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`}
                                                style={{ marginLeft: 20 }}
                                            />
                                        </View>

                                    )
                                })}



                            </ImageBackground>
                        </ScrollView>
                    </Surface>

                </View>


            </ScrollView >
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
    appBar: {

        backgroundColor: 'transparent',
        justifyContent: "center",
        alignItems: 'center',
        height: 350,
        width: "100%",
        flexDirection: "column",


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
        backgroundColor: 'rgba(255, 205, 198,0.3)', // Orange with 50% opacity
    },
    fade: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
        opacity: 0.5,
    },
});

export default NewSingleElement;