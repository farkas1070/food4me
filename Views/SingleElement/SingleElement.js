import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import CustomFont from "../../fonts/myfont.otf";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { auth } from "../../firebase-config";
import { Snackbar } from "react-native-paper";
import { styles } from "./SingleElementStyle";
import LoadingScreen from "./Components/LoadingScreen";
import Header from "./Components/Header";
import TopInfo from "./Components/TopInfo";
import GeneralInformation from "./Components/GeneralInformation";
import Ingredients from "./Components/Ingredients";
import Steps from "./Components/Steps";
import DataTableComponent from "./Components/DataTable";
const NewSingleElement = ({ route }) => {
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const [page, setPage] = useState(0);

  const [ingredients, setIngredients] = useState([]);
  const [types, setTypes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [steps, setSteps] = useState([]);
  const [nutrients, setNutrients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = React.useState(false);

  const recipeRef = doc(db, "Recipes", route.params.item.docid);
  const userRef = doc(db, "Users", auth.currentUser.uid);

  const fetchDataFromFirestore = async (collectionRef, setState, queryType) => {
    try {
      switch (queryType) {
        case "generalQuery":
          const generalQuery = query(
            collectionRef,
            where("Recipe_ID", "==", recipeRef)
          );
          const generalSnapshot = await getDocs(generalQuery);
          const generalData = generalSnapshot.docs.map((doc) => {
            const subdata = doc.data();
            return { ...subdata };
          });

          setState(generalData);
          break;
        case "favouriteQuery":
          const favouritesQuery = query(
            collectionRef,
            where("Recipe_ID", "==", recipeRef),
            where("User_ID", "==", userRef)
          );
          const favouriteSnapshot = await getDocs(favouritesQuery);
          const favouriteData = favouriteSnapshot.docs.map((doc) => {
            const subdata = doc.data();
            return { ...subdata };
          });

          setState(favouriteData);
          break;
        case "ingredientQuery":
          
          const ingredientsQuery = query(
            collectionRef,
            where("Recipe_ID", "==", recipeRef)
          );
          const ingredientsSnapshot = await getDocs(ingredientsQuery);

          let newarray = [];
          await Promise.all(
            ingredientsSnapshot.docs.map(async (ingredient) => {
              const docSnap = await getDoc(ingredient.data().Ingredient_ID);
              var subdata = { ...ingredient.data() };
              subdata.name = docSnap.data().name;
              newarray.push({ ...subdata });
            })
          );

          setIngredients(newarray);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataFromFirestore(
      collection(db, "Recipe_Types"),
      setTypes,
      "generalQuery"
    );
    fetchDataFromFirestore(
      collection(db, "Recipe_Nutrition"),
      setNutrients,
      "generalQuery"
    );
    fetchDataFromFirestore(collection(db, "Steps"), setSteps, "generalQuery");
    fetchDataFromFirestore(
      collection(db, "Favourites"),
      setFavourites,
      "favouriteQuery"
    );
    fetchDataFromFirestore(
      collection(db, "Recipes_Ingredients"),
      setIngredients,
      "ingredientQuery"
    );
    setLoading(false);
  }, []);

  const getPaginatedData = () => {
    const startIndex = page * 4;
    const endIndex = startIndex + 4;
    return nutrients.slice(startIndex, endIndex);
  };

  const handleFavouriteChange = async () => {
    if (favourites.length == 0) {
      await setDoc(
        doc(
          db,
          "Favourites",
          `${route.params.item.docid}-${auth.currentUser.uid}`
        ),
        {
          Recipe_ID: doc(db, `Recipes/${route.params.item.docid}`),
          User_ID: doc(db, `Users/${auth.currentUser.uid}`),
        }
      );
      setFavourites([route.params.item]);
    } else {
      const docRef = doc(
        db,
        "Favourites",
        `${route.params.item.docid}-${auth.currentUser.uid}`
      );
      deleteDoc(docRef)
        .then(() => {
          console.log("Entire Document has been deleted successfully.");
        })
        .catch((error) => {
          console.log(error);
        });
      setFavourites(
        favourites.filter((item) => item.docid !== route.params.item.docid)
      );
    }
  };

  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.mainContainer}>
          <ScrollView style={styles.scrollView}>
            <Header item={route.params.item} />

            <View style={styles.innerContainer}>
              <TopInfo
                item={route.params.item}
                nutritionSnapshot={nutrients}
                modifiedTypes={types}
                favouritesSnapshot={favourites}
                handleFavouriteChange={handleFavouriteChange}
                onToggleSnackBar={onToggleSnackBar}
              />
              <View style={styles.descriptionContainer}>
                <Text
                  style={[styles.summaryText, { fontFamily: "CustomFont" }]}
                >
                  Summary:
                </Text>
                <Text
                  style={[styles.descriptionText, { fontFamily: "CustomFont" }]}
                >
                  {route.params.item.description}
                </Text>
              </View>

              <GeneralInformation item={route.params.item} />

              <View style={styles.ingredientsContainer}>
                <Text
                  style={[styles.ingredientsText, { fontFamily: "CustomFont" }]}
                >
                  Ingredients:
                </Text>
              </View>

              <Ingredients modifiedIngredients={ingredients} />

              <View style={styles.instructionsContainer}>
                <Text
                  style={[
                    styles.instructionsText,
                    { fontFamily: "CustomFont" },
                  ]}
                >
                  Instructions:
                </Text>
              </View>

              <Steps stepsSnapshot={steps} />

              <DataTableComponent
                getPaginatedData={getPaginatedData}
                page={page}
                nutritionSnapshot={nutrients}
                ITEMS_PER_PAGE={4}
                setPage={setPage}
              />
            </View>
          </ScrollView>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={2000}
            action={{
              label: "Hide",
              onPress: () => {
                // Do something
              },
            }}
          >
            {favourites.length == 0 ? (
              <Text
                style={styles.snackText}
              >
                Removed from favourites!
              </Text>
            ) : (
              <Text
                style={styles.snackText}
              >
                Added to favourites!
              </Text>
            )}
          </Snackbar>
        </View>
      )}
    </View>
  );
};

export default NewSingleElement;
