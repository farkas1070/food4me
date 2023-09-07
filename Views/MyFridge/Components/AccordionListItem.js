import React, { useState, useRef, useMemo, useCallback,useEffect } from "react";
import {
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";
import { Chip } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./AccordionListItemStyle";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import CustomFont from "../../../fonts/Raleway-Bold.ttf";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../../firebase-config";
import { doc,query,collection,where,getDocs,getDoc } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
function MultiValueTextInput() {
  const [inputValue, setInputValue] = useState("");
  const [chipData, setChipData] = useState([]);
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation();
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  async function filterRecipesByIngredients() {
    try {
      const recipesWithIngredients = {};
  
      // Fetch references to recipes based on selected ingredients
      const ingredientRefs = chipData.map((ingredient) =>
        doc(db, 'Ingredients', ingredient)
      );
  
      // Query the 'Ingredients:Recipes' collection for each ingredient
      for (const ingredientRef of ingredientRefs) {
        const ingredientquery = query(
          collection(db, 'Recipes_Ingredients'),
          where('Ingredient_ID', '==', ingredientRef)
        );
        const ingredientSnapshot = await getDocs(ingredientquery);
  
        ingredientSnapshot.forEach((doc) => {
          const recipeID = doc.data().Recipe_ID.id.split('-')[0]; // Extract the recipe ID
  
          // If the recipe hasn't been encountered yet, initialize its data
          if (!recipesWithIngredients[recipeID]) {
            recipesWithIngredients[recipeID] = {
              ingredientRefs: [ingredientRef],
              totalIngredients: 0, // Initialize total ingredients count
            };
          } else {
            // Add the ingredient reference to the existing recipe's data
            recipesWithIngredients[recipeID].ingredientRefs.push(ingredientRef);
          }
        });
      }
  
      // Fetch the total number of ingredients for each recipe
      const filteredRecipes  = [];
      for (const recipeID of Object.keys(recipesWithIngredients)) {
        const recipeRef = doc(db, 'Recipes', recipeID);
        const recipeDoc = await getDoc(recipeRef);
  
        if (recipeDoc.exists()) {
          const recipeData = recipeDoc.data();
          
          // Count the total number of relevant documents in Recipes_Ingredients
          const totalIngredientsQuery = query(
            collection(db, 'Recipes_Ingredients'),
            where('Recipe_ID', '==', recipeRef)
          );
          const totalIngredientsSnapshot = await getDocs(totalIngredientsQuery);
          
          // Update the total ingredients count based on the query result
          recipesWithIngredients[recipeID].totalIngredients = totalIngredientsSnapshot.size;
          
          // Check if the number of encountered ingredients is equal or higher than the required count
          if (
            recipesWithIngredients[recipeID].ingredientRefs.length >=
            recipesWithIngredients[recipeID].totalIngredients
          ) {
            filteredRecipes.push(recipeDoc.data());
            
          }
        }
      }
      console.log(filteredRecipes)
      return filteredRecipes;
    } catch (error) {
      console.error('Error filtering recipes:', error);
      throw error;
    }
  }

  

  const handleFilterPress = async () => {
    try {
      const recipes = await filterRecipesByIngredients();
      console.log(recipes)
      setFilteredRecipes(recipes);
    } catch (error) {
      // Handle error
    }
  };

  const addChip = () => {
    if (inputValue.trim() !== "") {
      setChipData([...chipData, inputValue]);
      setInputValue("");
    }
  };

  const removeChip = (index) => {
    const newChips = [...chipData];
    newChips.splice(index, 1);
    setChipData(newChips);
  };

  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });

  if (!loaded) {
    return null;
  }

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={{
        uri: "https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
      }}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <AntDesign name="back" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.generateButton}
        onPress={() => {
          handleFilterPress()
        }}
      >
        <Text style={styles.generateText}>Generate</Text>
        <Ionicons name="send-outline" size={30} color="white" />
      </TouchableOpacity>
      <TextInput
        label="Comment on the Video..."
        style={styles.textInput}
        value={inputValue}
        mode="outlined"
        onChangeText={(text) => setInputValue(text)}
        theme={{
          colors: {
            primary: "#ffaa9e",
          },
        }}
        right={
          <TextInput.Icon
            icon={() => (
              <TouchableOpacity
                onPress={() => {
                  addChip();
                }}
              >
                <AntDesign name="pluscircle" size={24} color="#fd5a43" />
              </TouchableOpacity>
            )}
          />
        }
      />
      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <BottomSheetScrollView contentContainerStyle={styles.chiplistContainer}>
          <View style={styles.topTextContainer}>
            <Text style={[styles.topText, { fontFamily: "CustomFont" }]}>
              Entered Ingredients:
            </Text>
          </View>

          {chipData.map((chip, index) => (
            <Chip
              key={index}
              mode="outlined"
              onClose={() => removeChip(index)}
              style={{ margin: 4 }}
            >
              {chip}
            </Chip>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </ImageBackground>
  );
}

export default MultiValueTextInput;
