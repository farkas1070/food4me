import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import React, { useState,useContext } from 'react'
import { Appbar } from 'react-native-paper';
import { useFonts } from 'expo-font';
import CustomFont from '../fonts/myfont.otf';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../firebase-config";
import { collection, query, where } from "firebase/firestore";
import { Chip } from 'react-native-paper';
import { ActivityIndicator } from 'react-native-paper';
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import {  foodContext } from "../Components/SetData.js"
import ChipList from "./Chiplist"


const FilterRecipes = ({ navigation }) => {

  const [typessnapshot, typesloading, typeserror] = useCollectionData(query(collection(db, "Types")));
  const [ingredientsnapshot, ingredientloading, ingredienterror] = useCollectionData(query(collection(db, "Ingredients")));
  const [nutrientsnapshot, nutrientloading, nutrienterror] = useCollectionData(query(collection(db, "Recipe_Nutrition"), where("name", "==", 'Calories')));
  const [selectedGeneralChips, setSelectedGeneralChips] = useState([]);
  const [selectedTypeChips, setSelectedTypeChips] = useState([]);
  const [selectedIngredientChips, setSelectedIngredientChips] = useState([]);
  const [foodarray] = useContext(foodContext)
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [value, setValue] = useState(0);

  const generalfilteringoptions = ['cheap', 'glutenfree', 'dairyfree', 'healthy', 'vegetarian']


  const GoBackToRecipeBrowser = () => {
    navigation.goBack();
  }
  const filterRecipesAndNavigate = () => {



    navigation.navigate("FilteredRecipeBrowser");

  }


  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });
  if (!loaded) {
    return null;
  }

  return (
    <View style={{ width: '100%', height: '100%' }}>





      <Appbar.Header style={styles.appBar}>
        <Appbar.Action icon="check" color="grey" style={{ backgroundColor: 'white' }} onPress={() => { filterRecipesAndNavigate() }} />
        <Appbar.Content title={<Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'white', textAlign: 'left', marginLeft: 10 }}>Filter Menu</Text>} />

        <Appbar.Action color="grey" icon="close" style={{ backgroundColor: 'white' }} onPress={() => { GoBackToRecipeBrowser() }} />
      </Appbar.Header>

      <View style={{ backgroundColor: 'white', width: '100%',flexGrow:1 }}>
        <ScrollView style={{ flexGrow: 1, width: '100%' }}>
          <View style={{ width: '100%', padding: 10, borderBottomWidth: 0.2, borderBottomColor: '#fd5a43' }}>
            <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'rgba(253, 90, 67, 1)', textAlign: 'left', marginTop: 10, }}>
              Food Attributes
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 20, width: '100%' }}>
              <ScrollView horizontal={true}>
                {typesloading ? <ActivityIndicator animating={true} color="grey" /> :
                  <ChipList options={generalfilteringoptions} selectedIndices={selectedGeneralChips} setSelectedIndices={setSelectedGeneralChips} />
                }
              </ScrollView>

            </View>


          </View>
          <View style={{ width: '100%', padding: 10, borderBottomWidth: 0.2, borderBottomColor: '#fd5a43' }}>
            <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'rgba(253, 90, 67, 1)', textAlign: 'left', marginTop: 10, }}>
              Filter by Kcalorie interval
            </Text>
            <View style={{ padding: 20 }}>

              <RangeSlider
                min={0}
                max={2000}
                gravity={'center'}
                fromValueOnChange={value => setFromValue(value)}
                toValueOnChange={value => setToValue(value)}
                initialFromValue={0}
                fromKnobColor="rgba(253, 90, 67, 1)"
                toKnobColor="rgba(253, 90, 67, 1)"
                inRangeBarColor="#d1d1d1"
                outOfRangeBarColor="#efefef"
              />


            </View>


          </View>

          <View style={{ width: '100%', padding: 10, borderBottomWidth: 0.2, borderBottomColor: '#fd5a43' }}>
            <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'rgba(253, 90, 67, 1)', textAlign: 'left', marginTop: 10, }}>
              Food Types:
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 20, width: '100%' }}>
              <ScrollView horizontal={true}>
                {typesloading ? <ActivityIndicator animating={true} color="grey" /> :
                  <ChipList options={typessnapshot.map(a => a.name)} selectedIndices={selectedTypeChips} setSelectedIndices={setSelectedTypeChips} />
                }
              </ScrollView>

            </View>


          </View>
          <View style={{ width: '100%', padding: 10, borderBottomWidth: 0.2, borderBottomColor: '#fd5a43' }}>
            <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'rgba(253, 90, 67, 1)', textAlign: 'left', marginTop: 10, marginBottom: 10 }}>
              Food Ingredients:
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 20, width: '100%' }}>
              <ScrollView horizontal={true}>
                {ingredientloading ? <ActivityIndicator animating={true} color="grey" /> : 
                 <ChipList options={ingredientsnapshot.map(a => a.name)} selectedIndices={selectedIngredientChips} setSelectedIndices={setSelectedIngredientChips} />
                }
              </ScrollView>
            </View>


          </View>
         


          
          


          
        </ScrollView>
      </View>

    </View>
  )
}

export default FilterRecipes

const styles = StyleSheet.create({
  appBar: {

    backgroundColor: 'white',
    justifyContent: "center",

    width: "100%",

    backgroundColor: 'rgba(253, 90, 67, 1)',



  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(253, 90, 67, 0.6)', // Orange with 50% opacity
  },
})