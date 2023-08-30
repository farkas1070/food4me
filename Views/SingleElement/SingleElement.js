import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ImageBackground, Text, ScrollView,  } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useFonts } from 'expo-font';
import CustomFont from '../../fonts/myfont.otf';
import { Surface } from 'react-native-paper';
import CircularProgress from 'react-native-circular-progress-indicator';
import { collection, query, where, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../../firebase-config";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Chip } from 'react-native-paper';
import Searching from "../../assets/searching.gif"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Cheese from '../../assets/cheese.png'
import Wheat from '../../assets/wheat.png'
import Heart from '../../assets/like.png'
import Dish from '../../assets/dish.png'
import Dollar from '../../assets/dollar.png'
import Leaf from '../../assets/leaf.png'
import Clocks from '../../assets/stopwatch.png'
import { DataTable } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { auth } from "../../firebase-config";
import { Snackbar } from 'react-native-paper';
import {styles} from "./SingleElementStyle"
const NewSingleElement = ({ navigation, route }) => {
    const { item } = route.params;
    
    const [page, setPage] = useState(0);
    const [modifiedIngredients, setModifiedIngredients] = useState([]);
    const [modifiedTypes, setModifiedTypes] = useState([]);

    const [visible, setVisible] = React.useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const ITEMS_PER_PAGE = 4;


    const docid = item.docid
    const recipeRef = doc(db, "Recipes", docid);
    const userRef = doc(db, "Users", auth.currentUser.uid);


    const nutrientquery = query(collection(db, "Recipe_Nutrition"), where("Recipe_ID", "==", recipeRef));
    const typequery = query(collection(db, "Recipe_Types"), where("Recipe_ID", "==", recipeRef));
    const ingredientquery = query(collection(db, "Recipes_Ingredients"), where("Recipe_ID", "==", recipeRef));
    const stepsquery = query(collection(db, "Steps"), where("Recipe_ID", "==", recipeRef));
    const favouritesquery = query(collection(db, "Favourites"), where("User_ID", "==", userRef), where("Recipe_ID", "==", recipeRef));

    const [nutritionSnapshot, nutritionSnapshotLoading, nutritionSnapshotError] = useCollectionData(nutrientquery);
    const [ingredientSnapshot, ingredientSnapshotLoading, ingredientSnapshotError] = useCollectionData(ingredientquery);
    const [typeSnapshot, typeSnapshotLoading, typeSnapshotError] = useCollectionData(typequery);
    const [stepsSnapshot, stepsSnapshotLoading, stepsSnapshotError] = useCollectionData(stepsquery);
    const [favouritesSnapshot, favouritesSnapshotLoading, favouritesSnapshotError] = useCollectionData(favouritesquery);

    const getPaginatedData = () => {
        const startIndex = page * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return nutritionSnapshot.slice(startIndex, endIndex);
    };
    if (!stepsSnapshotLoading) {
        stepsSnapshot.sort(function (a, b) {
            return a.number - b.number;
        });
    }

    const goBack = () => {
        navigation.goBack();
    }
    const handleFavouriteChange = async () => {
        if (favouritesSnapshot.length == 0) {
            await setDoc(doc(db, "Favourites", `${docid}-${auth.currentUser.uid}`), {
                Recipe_ID: doc(db, `Recipes/${docid}`),
                User_ID: doc(db, `Users/${auth.currentUser.uid}`),
            });
        } else {
            const docRef = doc(db, "Favourites", `${docid}-${auth.currentUser.uid}`);
            deleteDoc(docRef)
                .then(() => {
                    console.log("Entire Document has been deleted successfully.")
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }
    useEffect(() => {
        const getIngredientRef = async () => {
            if (!ingredientSnapshotLoading) {
                let newarray = []
                await Promise.all(ingredientSnapshot.map(async (ingredient) => {
                    const docSnap = await getDoc(ingredient.Ingredient_ID);
                    var subdata = { ...ingredient }
                    subdata.name = docSnap.data().name


                    newarray.push({ ...subdata })


                }))
                setModifiedIngredients(newarray)
            }
        };
        const getTypeRef = async () => {
            if (!typeSnapshotLoading) {
                let newarray = []
                await Promise.all(typeSnapshot.map(async (type) => {
                    const docSnap = await getDoc(type.Type_ID);
                    var subdata = { ...type }
                    subdata.name = docSnap.data().name


                    newarray.push({ ...subdata })


                }))
                setModifiedTypes(newarray)
            }
        };
        if (modifiedIngredients.length == 0) {
            getIngredientRef()
        }
        if (modifiedTypes.length == 0) {
            getTypeRef()
        }
    })

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
            {favouritesSnapshotLoading || nutritionSnapshotLoading || (modifiedIngredients.length == 0) || (modifiedTypes.length == 0) || stepsSnapshotLoading ?

                <View style={{ width: '100%', height: '100%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Text>Just a sec, loading data...</Text>
                    <Image
                        style={styles.noitemimage}
                        source={Searching}
                    />
                </View> :
                <View style={{ width: '100%', height: '100%', }}>

                    <ScrollView style={{ width: '100%', flexGrow: 1, }}>





                        <View style={styles.appBar}>

                            <ImageBackground
                                style={styles.backgroundImage}
                                source={{
                                    uri: item.image,
                                    cache: 'force-cache',
                                }}



                            >

                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 25 }}>
                                    <Appbar.Action icon="arrow-left-top" color="rgba(253, 90, 67, 1)" onPress={() => { goBack() }} style={{ backgroundColor: 'white', marginLeft: 10 }} />

                                </View>
                            </ImageBackground>
                        </View>

                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>



                            <View style={{ width: '100%', }}>
                                <View style={{ padding: 20, flexDirection: 'row' }}>
                                    <View style={{ width: '70%' }}>
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, textAlign: 'left' }}>{item.name}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => { handleFavouriteChange(); onToggleSnackBar() }} style={{ borderRadius: 50, width: 60, height: 60, backgroundColor: '#f44336', justifyContent: 'center', alignItems: 'center', top: -50, right: -30, borderColor: 'white', borderWidth: 2 }}>

                                        {favouritesSnapshot.length == 0 ? <MaterialCommunityIcons name="heart-outline" size={30} color="white" /> : <MaterialCommunityIcons name="heart" size={30} color="white" />}

                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomColor: '#efefef', borderBottomWidth: 1.3 }}>
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
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 20, }}>
                                    {modifiedTypes.map((item, index) => (
                                        <Chip key={index} selectedColor="white" style={{ marginTop: 5, marginRight: 5, marginBottom: 5, backgroundColor: 'rgba(253, 90, 67, 1)' }}>
                                            {item.name}
                                        </Chip>
                                    ))}

                                </View>


                            </View>
                            <View style={{ width: '100%', marginBottom: 50, padding: 20, }}>
                                <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'rgba(253, 90, 67, 1)', marginBottom: 20, textAlign: 'left' }}>Summary:</Text>
                                <Text style={{ fontFamily: 'CustomFont', fontSize: 16, color: 'grey', marginBottom: 20, textAlign: 'left' }}>{item.description}</Text>
                            </View>


                            <Surface style={{ marginBottom: 30, justifyContent: 'center', alignItems: 'center', width: '90%', borderRadius: 10, backgroundColor: 'white', borderColor: 'rgba(253, 90, 67, 1)', borderWidth: 0.6 }}>
                                <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'rgba(253, 90, 67, 1)', marginTop: 20, textAlign: 'left' }}> General Information:</Text>
                                <View style={{ marginTop: 30, marginBottom: 20 }}>
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
                                <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#efefef' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                        <Image
                                            style={{ width: 40, height: 40 }}
                                            source={Leaf}
                                        />
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, marginBottom: 20, textAlign: 'left', marginLeft: 20, }}>Vegetarian?</Text>
                                    </View>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, marginBottom: 20, textAlign: 'left', marginRight: 20 }}>{item.vegetarian == true ? 'Yes' : 'No'}</Text>
                                </View>
                                <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#efefef' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                        <Image
                                            style={{ width: 40, height: 40 }}
                                            source={Cheese}
                                        />
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, marginBottom: 20, textAlign: 'left', marginLeft: 20, }}>DairyFree?</Text>
                                    </View>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, marginBottom: 20, textAlign: 'left', marginRight: 20 }}>{item.dairy == true ? 'Yes' : 'No'}</Text>
                                </View>
                                <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#efefef' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                        <Image
                                            style={{ width: 40, height: 40 }}
                                            source={Dollar}
                                        />
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, marginBottom: 20, textAlign: 'left', marginLeft: 20, }}>Cheap?</Text>
                                    </View>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, marginBottom: 20, textAlign: 'left', marginRight: 20 }}>{item.cheap == true ? 'Yes' : 'No'}</Text>
                                </View>
                                <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#efefef' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                        <Image style={{ width: 40, height: 40 }} source={Wheat} />
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, marginBottom: 20, textAlign: 'left', marginLeft: 20, }}>Glutenfree?</Text>
                                    </View>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, marginBottom: 20, textAlign: 'left', marginRight: 20 }}>{item.glutenfree == true ? 'Yes' : 'No'}</Text>
                                </View>
                                <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#efefef' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                        <Image style={{ width: 40, height: 40 }} source={Heart} />
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, marginBottom: 20, textAlign: 'left', marginLeft: 20, }}>Healthy?</Text>
                                    </View>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, marginBottom: 20, textAlign: 'left', marginRight: 20 }}>{item.healthy == true ? 'Yes' : 'No'}</Text>
                                </View>
                                <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#efefef' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                        <Image style={{ width: 40, height: 40 }} source={Clocks} />
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, marginBottom: 20, textAlign: 'left', marginLeft: 20, }}>Ready in:</Text>
                                    </View>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, marginBottom: 20, textAlign: 'left', marginRight: 20 }}>{item.ready} Minutes</Text>
                                </View>
                                <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                        <Image style={{ width: 40, height: 40 }} source={Dish} />
                                        <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, marginBottom: 20, textAlign: 'left', marginLeft: 20, }}>Servings:</Text>
                                    </View>
                                    <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: 'black', marginTop: 20, marginBottom: 20, textAlign: 'left', marginRight: 20 }}>{item.servings} People</Text>
                                </View>

                            </Surface>
                            <View style={{ width: '100%', padding: 20, marginBottom: 20 }}>
                                <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', textAlign: 'left' }}>Ingredients:</Text>
                            </View>

                            <View style={{ width: '90%', height: 400, borderWidth: 1, borderColor: 'grey', alignItems: 'center', justifyContent: 'space-between', borderTopEndRadius: 30, borderBottomStartRadius: 30 }}>

                                <View style={{ backgroundColor: 'white', top: -16, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="silverware-fork" size={30} color="black" />
                                </View>
                                <View style={{ flex: 1, width: '100%' }}>
                                    <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1 }}>
                                        {modifiedIngredients.map((ingredient, index) => {



                                            return (
                                                <View key={index} style={{ width: '100%', flexDirection: 'row', marginTop: 10, alignItems: 'center', marginBottom: 10 }}>

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
                                    </ScrollView>
                                </View>

                                <View style={{ backgroundColor: 'white', bottom: -16, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="knife" size={30} color="black" />
                                </View>
                            </View>
                            <View style={{ width: '100%', padding: 20, marginBottom: 20, marginTop: 30 }}>
                                <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', textAlign: 'left' }}>Instructions:</Text>
                            </View>

                            <View style={{ alignItems: 'flex-start' }}>
                                {stepsSnapshot.map((step, index) => {

                                    return (
                                        <View key={index} style={{ width: '100%', flexDirection: 'column', padding: 20 }}>
                                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                                <FontAwesome5 name="utensils" size={24} color="#fd5a43" style={{ marginRight: 10 }} />
                                                <Text style={{ fontFamily: 'CustomFont', fontSize: 18, color: '#ffaa9e', textAlign: 'left', marginBottom: 2, marginTop: 10 }}> Step {step.number}:</Text>
                                            </View>
                                            <Text style={{ fontFamily: 'CustomFont', fontSize: 15, color: 'grey', textAlign: 'left' }}> {step.step}</Text>
                                        </View>
                                    )

                                })}




                            </View>

                            <View style={{ marginBottom: 50, marginTop: 50, width: '90%' }}>
                                <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: '#fd5a43', marginTop: 5, marginBottom: 25, textAlign: 'left' }}>NutrientData:</Text>
                                <DataTable style={{ borderRadius: 10, backgroundColor: '#ffe4e0' }}>
                                    <DataTable.Header>
                                        <DataTable.Title >Name</DataTable.Title>
                                        <DataTable.Title numeric>Amount</DataTable.Title>
                                        <DataTable.Title numeric>Unit</DataTable.Title>
                                        <DataTable.Title numeric>daily %</DataTable.Title>
                                    </DataTable.Header>
                                    {getPaginatedData().map((doc, index) => {
                                        return (
                                            <DataTable.Row key={index}>
                                                <DataTable.Cell >{doc.name}</DataTable.Cell>
                                                <DataTable.Cell numeric>{doc.amount}</DataTable.Cell>
                                                <DataTable.Cell numeric>{doc.unit}</DataTable.Cell>
                                                <DataTable.Cell numeric>{doc.percentOfDailyNeeds}</DataTable.Cell>
                                            </DataTable.Row>

                                        )
                                    })}



                                    <DataTable.Pagination
                                        page={page}
                                        numberOfPages={Math.ceil(nutritionSnapshot / ITEMS_PER_PAGE)}
                                        onPageChange={(page) => setPage(page)}
                                        style={{ color: 'white' }}


                                        showFastPagination
                                        label={`${page + 1} of ${Math.ceil(nutritionSnapshot.length / ITEMS_PER_PAGE)}`}
                                    />
                                </DataTable>
                            </View>




                        </View>



                    </ScrollView >
                    <Snackbar
                        visible={visible}
                        onDismiss={onDismissSnackBar}
                        duration={2000}
                        action={{
                            label: 'Hide',
                            onPress: () => {
                                // Do something
                            },
                        }}>
                        {favouritesSnapshot.length == 0 ? <Text style={{ fontFamily: 'CustomFont', fontSize: 16, color: 'white', textAlign: 'left' }}>Removed from favourites!</Text> : <Text style={{ fontFamily: 'CustomFont', fontSize: 16, color: 'white', textAlign: 'left' }}>Added to favourites!</Text>}
                    </Snackbar>
                </View>

            }

        </View >
    );
};



export default NewSingleElement;