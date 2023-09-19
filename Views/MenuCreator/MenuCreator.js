import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";

import menubackground from "../../assets/menubackground.jpg";
import NewHeader from "../../Components/NewHeader.js";
import { generateStyles } from "./MenuCreatorStyle.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  where,
  limit,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { themeContext } from "../../Context/GlobalContext";

const MenuElement = ({ navigation }) => {
  const [darkTheme, setDarkTheme] = useContext(themeContext);
  const styles = generateStyles(darkTheme);
  const [foods, setFoods] = useState([]);

  const fetchRecipes = async () => {
    const typesToQuery = ["lunch", "dinner", "breakfast"];
    const uniqueRecipes = new Set(); // Use a Set to store unique recipes

    await Promise.all(
      typesToQuery.map(async (type) => {
        const foodsQuery = query(
          collection(db, "Recipe_Types"),
          where("name", "==", type)
        );
        const snapshot = await getDocs(foodsQuery);
        const randomIndex = Math.floor(Math.random() * snapshot.docs.length);
        const randomDoc = snapshot.docs[randomIndex];
        const randomData = randomDoc.data();
        
        const recipeData = await getDoc(randomData.Recipe_ID);
          let recipe = recipeData.data()
          recipe.docid = recipeData.id
          
        uniqueRecipes.add({...recipe});
      })
    );

    const flattenedResults = [...uniqueRecipes]; // Convert the Set back to an array
    console.log(flattenedResults.length);
    setFoods(flattenedResults);
  };

  

  return (
    <View style={{ flex: 1 }}>
      <NewHeader></NewHeader>
      <KeyboardAvoidingView style={styles.mainContainer(darkTheme)}>
        <ImageBackground
          source={menubackground}
          resizeMode="cover"
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <View style={styles.questioncontainer(darkTheme)}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: 80,
                width: "80%",
              }}
            >
              <View>
                <Text style={styles.dontshowtext}>
                  Click on the Button below, And we will give you a recipe
                  suggestion!
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button(darkTheme)}
                onPress={async() => {
                  await fetchRecipes().then(()=>{
                    navigation.navigate("MenuElement", { item: foods });
                  })
                  
                }}
              >
                <Text style={styles.text(darkTheme)}>
                  What should I cook today?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MenuElement;
