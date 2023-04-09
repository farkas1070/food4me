import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { themeContext, userContext, userDataContext } from "../Components/SetData.js"
import { useContext, useState, useEffect } from "react";
import SecondLogo from "../assets/second.png"
import FirstLogo from "../assets/first.jpeg"
import ThirdLogo from "../assets/third.jpg"
import Header from "./Header.js"
import Carousel from 'react-native-reanimated-carousel';
import { Entypo } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { auth } from "../firebase-config";
import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore"
import { db } from "../firebase-config";
import axios from 'axios';

export default function ScreenOne({ navigation }) {

  const [newfoodData, setNewFoodData] = useState([])
  const [darkTheme, setDarkTheme] = useContext(themeContext)
  const [user] = useContext(userContext)
  const [pagingEnabled] = useState(true);
  const [snapEnabled] = useState(true);
  const [mode] = useState('horizontal-stack');
  const [snapDirection] = useState('left');
  const [userData, setUserData] = useContext(userDataContext)
  const viewCount = 5;

  const carouseldata = [
    {
      "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "text": "Suscribe to Our food delivery services, and get all the products you need to keep cooking!"
    }, {
      "image": "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "text": "Browse our Recipes and get inspired!"
    }, {
      "image": "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "text": "Or make it extra easy to decide and just let us pick a meal for you"
    }, {
      "image": "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80",
      "text": "Suscribe to Our food delivery services, and get all the products you need to keep cooking!"
    }, {
      "image": "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "text": "Or an entire menu!"
    }, {
      "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "text": "Keep in touch with us, and we will keep you updated on special deals tailor made just for you!"
    }
  ];
  useEffect(() => {
    const getUserData = async (recipeId) => {
      console.log(auth.currentUser.uid)
      const docRef = doc(db, "Users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

    }
    getUserData();
  }, [])

  
/*
  useEffect(() => {
    const saveRecipeToFirestore = async (recipeId) => {
      try {
        
        
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&includeIngredients=true&apiKey=e7f08530cd1d44b79b6cd127fd5bc332`
        );
        const response2 = await axios.get(
          `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=e7f08530cd1d44b79b6cd127fd5bc332`
        );

        const data = response.data;
        const data2 = response2.data;
          
        const newsummary = data.summary.replace(/<\/?b>|<\/?a>/g, ' ')
        
        await setDoc(doc(db, "Recipes", recipeId.toString()), {
          name: data.title,
          image: data.image,
          description: newsummary,
          healthy: data.veryHealthy,
          cheap: data.cheap,
          glutenfree: data.glutenFree,
          vegetarian: data.vegetarian,
          servings: data.servings,
          ready: data.readyInMinutes,
          dairy: data.dairyFree,
          healthscore: data.healthScore,
        });
        //ingredients done
        data.extendedIngredients.forEach(async (ingredient) => {
          
          await setDoc(doc(db, "Ingredients", ingredient.name.toString()), {
            name: ingredient.name,

          });
         
          //recipes_ingredients done
          await setDoc(doc(db, "Recipes_Ingredients",`${recipeId.toString()}-${ingredient.name.toString()}` ), {
            Recipe_ID: doc(db, `Recipes/${recipeId.toString()}`),
            Ingredient_ID: doc(db,`Ingredients/${ingredient.name.toString()}`),
            amount: ingredient.amount,
            unit: ingredient.unit
            
          });
        
          

        });
        //steps done
        data2[0].steps.forEach(async (step) => {
          await setDoc(doc(db, "Steps", `${recipeId.toString()}-${step.number}`), {
            Recipe_ID: doc(db, `Recipes/${recipeId.toString()}`),
            step: step.step,
            number: step.number,


          });
          

        });

        //nutrition done
        data.nutrition.nutrients.forEach(async (nutrition) => {
          
          await setDoc(doc(db, "Recipe_Nutrition", `${recipeId.toString()}-${nutrition.name.toString()}`), {
            Recipe_ID: doc(db, `Recipes/${recipeId.toString()}`),
            amount: nutrition.amount,
            percentOfDailyNeeds: nutrition.percentOfDailyNeeds,
            name: nutrition.name,
            unit: nutrition.unit


          });
          

        })
        data.dishTypes.forEach(async (type) => {
          await setDoc(doc(db, "Types", type.toString()), {
            name: type
          });
          //recipes_nutrition done
          
          await setDoc(doc(db, "Recipe_Types", `${recipeId.toString()}-${type.toString()}`), {
            Recipe_ID: doc(db, `Recipes/${recipeId.toString()}`),
            Type_ID: doc(db,`Types/${type.toString()}`),
            
          });
          
        })

      } catch (error) {
        console.error(error);
      }
    };
    const ids = [
      649567,
      636812,
      639054,
      660697,
      637014,
      638315,
      640238,
      661925,
      795751,
      636962,
      716432,
      634040,
      660868,
      660306,
      729532,
      651453,
      716431,
      641063,
      639492,
      638552,
      716334,
      660504,
      638249,
      636325,
      149425,
      638338,
      662654,
      663054,
      660243,
      654571,
    ]
    ids.map((id) => {
      saveRecipeToFirestore(id);
    })
    
  }, [])*/

  return (
    <View style={styles.container}>

      <Header />
      <View style={{ height: "88%", width: "100%" }}>
        <ScrollView style={styles.bodyContainer(darkTheme)}>
          <View>

            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20, height: 150 }}>
              {user.photoURL == null ? <MaterialIcons name="account-circle" size={100} color="black" /> : <Image
                style={styles.profileImage(darkTheme)}
                source={{ uri: user.photoURL }}
              />}
              <Text style={styles.text(darkTheme)}>Welcome Back {user.displayName}</Text>
            </View>
            <Text style={styles.whatwillyoudotext(darkTheme)} >What will you do today?</Text>
            <SafeAreaView style={styles.container}>
              <ScrollView horizontal={true} style={styles.scrollView}>
                <TouchableOpacity onPress={() => { navigation.navigate("RecipeFinder") }}>
                  <View style={styles.innerBox}>
                    <View style={{ backgroundColor: '#fd5a43', borderRadius: 30 }}>
                      <View style={{ backgroundColor: '#fd5a43', borderTopEndRadius: 30, borderTopStartRadius: 30, }}>
                        <Image
                          style={styles.image}
                          source={FirstLogo}
                        />
                      </View>
                      <View style={{ backgroundColor: '#fd5a43', width: "100%", height: 80, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Find A recipe</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("MenuCreator") }} >
                  <View style={styles.innerBox}>
                    <View style={{ backgroundColor: '#fd5a43', borderRadius: 30 }}>
                      <View style={{ backgroundColor: '#fd5a43', borderTopEndRadius: 30, borderTopStartRadius: 30, }}>
                        <Image
                          style={styles.image}
                          source={SecondLogo}
                        />
                      </View>
                      <View style={{ backgroundColor: '#fd5a43', width: "100%", height: 80, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Create a Menu</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("RecipeBrowser") }} >
                  <View style={styles.innerBox}>
                    <View style={{ backgroundColor: '#fd5a43', borderRadius: 30 }}>
                      <View style={{ backgroundColor: '#fd5a43', borderTopEndRadius: 30, borderTopStartRadius: 30, }}>
                        <Image
                          style={styles.image}
                          source={ThirdLogo}
                        />
                      </View>
                      <View style={{ backgroundColor: '#fd5a43', width: "100%", height: 80, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Browse Recipes</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

              </ScrollView>

              <View style={styles.homepictureview(darkTheme)}>

                <View style={{ flex: 1, marginTop: 50 }}>
                  <Carousel
                    style={{
                      width: 350,
                      height: 240,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    loop
                    mode={mode}
                    pagingEnabled={pagingEnabled}
                    snapEnabled={snapEnabled}
                    width={280}
                    height={210}
                    autoPlay={true}
                    modeConfig={{
                      snapDirection,
                      stackInterval: mode === 'vertical-stack' ? 8 : 18,
                    }}
                    customConfig={() => ({ type: 'positive', viewCount })}
                    data={carouseldata}
                    scrollAnimationDuration={3000}
                    renderItem={({ index }) => (
                      <View
                        style={{
                          flex: 1,

                          justifyContent: 'center',


                          borderRadius: 30
                        }}
                      >
                        <ImageBackground source={{ uri: carouseldata[index].image }} resizeMode="cover" style={{ justifyContent: "center", alignItems: 'center', height: '100%', width: '100%' }}>
                          <View style={{ justifyContent: "center", alignItems: 'center', width: "60%", backgroundColor: "rgba(255, 255, 255, 0.85)", height: 60, borderRadius: 50 }}>
                            <Text style={{ textAlign: 'center', fontSize: 10 }}>
                              {carouseldata[index].text}
                            </Text>
                          </View>
                        </ImageBackground>
                      </View>
                    )}
                  />
                </View>
              </View>

            </SafeAreaView>
          </View>
          <View style={{ justifyContent: "center", alignItems: 'center', height: 100, backgroundColor: darkTheme ? "#181616" : "black", flexDirection: 'row' }}>
            <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
              <TouchableOpacity onPress={() => { Linking.openURL('https://www.facebook.com/'); }}><Entypo name="facebook-with-circle" size={30} color="#fd5a43" style={{ marginLeft: 5, marginRight: 5 }} /></TouchableOpacity>
              <TouchableOpacity onPress={() => { Linking.openURL('https://www.instagram.com/'); }}><Entypo name="instagram-with-circle" size={30} color="#fd5a43" style={{ marginLeft: 5, marginRight: 5 }} /></TouchableOpacity>
              <TouchableOpacity onPress={() => { Linking.openURL('https://github.com/'); }}><Entypo name="github-with-circle" size={30} color="#fd5a43" style={{ marginLeft: 5, marginRight: 5 }} /></TouchableOpacity>
              <TouchableOpacity onPress={() => { Linking.openURL('https://www.pinterest.com/'); }}><Entypo name="pinterest-with-circle" size={30} color="#fd5a43" style={{ marginLeft: 5, marginRight: 5 }} /></TouchableOpacity>
              <TouchableOpacity onPress={() => { Linking.openURL('https://www.youtube.com/'); }}><Entypo name="youtube-with-circle" size={30} color="#fd5a43" style={{ marginLeft: 5, marginRight: 5 }} /></TouchableOpacity>
            </View>
            <View style={{ width: '50%', alignItems: 'center', justifyContent: "center" }}>
              <Text style={{ color: '#fd5a43', fontSize: 8, fontWeight: 'bold' }}>Copyright: Foodemy Coorporation 2022</Text>
              <Text style={{ color: '#fd5a43', fontSize: 8, fontWeight: 'bold', marginTop: 10 }}>Get In touch with us!</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: (darkTheme) => ({
    flex: 1,
    backgroundColor: darkTheme ? "white" : '#fd5a43',
    padding: 25
  }),
  headerContainer: (darkTheme) => ({
    width: '100%',
    height: "12%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: darkTheme ? 'black' : "#fd5a43",
    borderBottomWidth: darkTheme ? 5 : 0,
    borderColor: darkTheme ? "#181616" : "transparent",

  }),
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 35
  },

  feathericon: {
    marginTop: 35,
    marginLeft: 30

  },
  switch: {
    marginTop: 25,
    marginRight: 25,
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }]
  },
  bodyContainer: (darkTheme) => ({
    width: "100%",

    backgroundColor: darkTheme ? 'black' : "white"

  }),
  text: (darkTheme) => ({
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 20,
    color: darkTheme ? "white" : "black",

  }),

  scrollView: {
    marginTop: 30,
    marginBottom: 20,
    height: 250,

    marginHorizontal: 20,
    borderRadius: 20,
  },
  innerBox: {
    padding: 5,
    width: 160,
    height: "100%",

  },
  profileImage: (darkTheme) => ({
    width: 100,
    height: 100,
    borderRadius: 400 / 2,
    borderWidth: 2,
    borderColor: darkTheme ? "white" : "black"

  }),
  image: {
    width: "100%",
    height: 130,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  whatwillyoudotext: (darkTheme) => ({
    marginTop: 50,
    marginLeft: 30,
    fontSize: 15,
    fontWeight: '700',
    color: darkTheme ? "white" : "black"
  }),
  posterimage: {
    width: "100%",
    height: 200,
  },
  homepictureview: (darkTheme) => ({
    borderTopColor: darkTheme ? '#fd5a43' : '#d3d3d3',
    borderTopWidth: 1,
    alignItems: 'center',

    width: '100%',
    height: 400,
    marginTop: 30,
    backgroundImage: 'url'
  }),
  homepic: {
    width: "80%",
    height: 200,
    borderRadius: 10,
    marginTop: 50,
  }
});