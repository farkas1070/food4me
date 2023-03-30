import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Appbar } from 'react-native-paper';
import { useFonts } from 'expo-font';
import CustomFont from '../fonts/myfont.otf';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../firebase-config";
import { collection, query, where } from "firebase/firestore";
import { Chip } from 'react-native-paper';
import { ActivityIndicator } from 'react-native-paper';
import RangeSlider, { Slider } from 'react-native-range-slider-expo';

const FilterRecipes = ({ navigation }) => {

  const [typessnapshot, typesloading, typeserror] = useCollectionData(query(collection(db, "Types")));
  const [ingredientsnapshot, ingredientloading, ingredienterror] = useCollectionData(query(collection(db, "Ingredients")));
  const [nutrientsnapshot, nutrientloading, nutrienterror] = useCollectionData(query(collection(db, "Recipe_Nutrition"), where("name", "==", 'Calories')));
  const [selectedChips, setSelectedChips] = useState([]);


  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [value, setValue] = useState(0);

  const generalfilteringoptions = [{ name: 'cheap' }, { name: 'glutenfree' }, { name: 'dairyfree' }, { name: 'healthy' }, { name: 'vegetarian' }]


  const GoBackToRecipeBrowser = () => {
    navigation.goBack();
  }
  const filterRecipesAndNavigate = () => {


    
    navigation.navigate("FilteredRecipeBrowser");
    
  }
  const handleChipPress = (chipValue) => {
    const newSelectedChips = [...selectedChips];

    if (newSelectedChips.includes(chipValue)) {
      // Chip is already selected, remove it from selected chips array
      const chipIndex = newSelectedChips.indexOf(chipValue);
      newSelectedChips.splice(chipIndex, 1);
    } else {
      // Chip is not selected, add it to selected chips array
      newSelectedChips.push(chipValue);
    }

    setSelectedChips(newSelectedChips);
  };
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

      <View style={{ backgroundColor: 'white', width: '100%' }}>
        <ScrollView style={{ flexGrow: 1, width: '100%' }}>
          <View style={{ width: '100%', padding: 10, borderBottomWidth: 0.2, borderBottomColor: '#fd5a43' }}>
            <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'rgba(253, 90, 67, 1)', textAlign: 'left', marginTop: 10, }}>
              Food Attributes
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 20, width: '100%' }}>
              <ScrollView horizontal={true}>
                {generalfilteringoptions.map((type, index) => {
                  return (
                    <Chip onPress={() =>  {handleChipPress(type.name)}} key={index} selectedColor={selectedChips.includes(type.name) ? 'white' : '#fd5a43'} style={{ marginTop: 5, marginRight: 5, marginBottom: 5, backgroundColor: selectedChips.includes(type.name) ? '#fd5a43' : 'white', borderColor: '#fd5a43', borderWidth: 0.5 }}>
                      {type.name}
                    </Chip>
                  )
                })}
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
                {typesloading ? <ActivityIndicator animating={true} color="grey" /> : typessnapshot.map((type, index) => {
                  return (
                    <Chip onPress={() => console.log('Pressed')} key={index} selectedColor="#fd5a43" style={{ marginTop: 5, marginRight: 5, marginBottom: 5, backgroundColor: 'white', borderColor: '#fd5a43', borderWidth: 0.5 }}>
                      {type.name}
                    </Chip>
                  )
                })}
              </ScrollView>

            </View>


          </View>
          <View style={{ width: '100%', padding: 10, borderBottomWidth: 0.2, borderBottomColor: '#fd5a43' }}>
            <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'rgba(253, 90, 67, 1)', textAlign: 'left', marginTop: 10, marginBottom: 10 }}>
              Food Ingredients:
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 20, width: '100%' }}>
              <ScrollView horizontal={true}>
                {ingredientloading ? <ActivityIndicator animating={true} color="grey" /> : ingredientsnapshot.map((ingredient, index) => {
                  return (
                    <Chip onPress={() => console.log('Pressed')} key={index} selectedColor="#fd5a43" style={{ marginTop: 5, marginRight: 5, marginBottom: 5, backgroundColor: 'white', borderColor: '#fd5a43', borderWidth: 0.5 }}>
                      {ingredient.name}
                    </Chip>
                  )
                })}
              </ScrollView>
            </View>


          </View>
          <View style={{ width: '100%', padding: 10, borderBottomWidth: 0.2, borderBottomColor: '#fd5a43' }}>
            <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'rgba(253, 90, 67, 1)', textAlign: 'left', marginTop: 10, marginBottom: 10 }}>
              Food Ingredients:
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 20, width: '100%' }}>
              <ScrollView horizontal={true}>
                {ingredientloading ? <ActivityIndicator animating={true} color="grey" /> : ingredientsnapshot.map((ingredient, index) => {
                  return (
                    <Chip onPress={() => console.log('Pressed')} key={index} selectedColor="#fd5a43" style={{ marginTop: 5, marginRight: 5, marginBottom: 5, backgroundColor: 'white', borderColor: '#fd5a43', borderWidth: 0.5 }}>
                      {ingredient.name}
                    </Chip>
                  )
                })}
              </ScrollView>
            </View>


          </View>
          <View style={{ width: '100%', padding: 10, borderBottomWidth: 0.2, borderBottomColor: '#fd5a43' }}>
            <Text style={{ fontFamily: 'CustomFont', fontSize: 20, color: 'rgba(253, 90, 67, 1)', textAlign: 'left', marginTop: 10, marginBottom: 10 }}>
              Food Ingredients:
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 20, width: '100%' }}>
              <ScrollView horizontal={true}>
                {ingredientloading ? <ActivityIndicator animating={true} color="grey" /> : ingredientsnapshot.map((ingredient, index) => {
                  return (
                    <Chip onPress={() => console.log('Pressed')} key={index} selectedColor="#fd5a43" style={{ marginTop: 5, marginRight: 5, marginBottom: 5, backgroundColor: 'white', borderColor: '#fd5a43', borderWidth: 0.5 }}>
                      {ingredient.name}
                    </Chip>
                  )
                })}
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