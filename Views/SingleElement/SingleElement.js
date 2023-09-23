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
import { useCollectionData } from "react-firebase-hooks/firestore";
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
  const [modifiedIngredients, setModifiedIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [types, setTypes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [steps, setSteps] = useState([]);
  const [nutrients, setNutrients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = React.useState(false);

  const recipeRef = doc(db, "Recipes", route.params.item.docid);
  const userRef = doc(db, "Users", auth.currentUser.uid);
  const ingredientCollectionRef = collection(db, "Recipes_Ingredients");

  const fetchDataFromFirestore = async (
    collectionRef,
    setState,
    isfavoruitesquery
  ) => {
    try {
      const generalQuery = query(collectionRef,where("Recipe_ID", "==", recipeRef));
      const favouritesQuery = query(collectionRef,where("Recipe_ID", "==", recipeRef),where("User_ID", "==", userRef));
      const ingredientsQuery = query(collectionRef, where("Recipe_ID", "==", recipeRef))

      const snapshot = isfavoruitesquery
        ? await getDocs(favouritesQuery)
        : await getDocs(generalQuery);
      const newData = snapshot.docs.map((doc) => {
        const subdata = doc.data();
        return { ...subdata };
      });

      setState(newData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataFromFirestore(collection(db, "Recipe_Types"), setTypes, false);
    fetchDataFromFirestore(collection(db, "Recipe_Nutrition"),setNutrients,false);
    fetchDataFromFirestore(collection(db, "Steps"), setSteps, false);
    fetchDataFromFirestore(collection(db, "Favourites"), setFavourites, true);
    setLoading(false);
  }, []);

  const ingredientquery = query(
    collection(db, "Recipes_Ingredients"),
    where("Recipe_ID", "==", recipeRef)
  );

  const [ingredientSnapshot, ingredientSnapshotLoading] =
    useCollectionData(ingredientquery);

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
  useEffect(() => {
    const getIngredientRef = async () => {
      if (!ingredientSnapshotLoading) {
        let newarray = [];
        await Promise.all(
          ingredientSnapshot.map(async (ingredient) => {
            const docSnap = await getDoc(ingredient.Ingredient_ID);
            var subdata = { ...ingredient };
            subdata.name = docSnap.data().name;

            newarray.push({ ...subdata });
          })
        );
        setModifiedIngredients(newarray);
      }
    };

    if (modifiedIngredients.length == 0) {
      getIngredientRef();
    }
  });

  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {modifiedIngredients.length == 0 || loading ? (
        <LoadingScreen />
      ) : (
        <View style={{ width: "100%", height: "100%" }}>
          <ScrollView style={{ width: "100%", flexGrow: 1 }}>
            <Header item={route.params.item} />

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <TopInfo
                item={route.params.item}
                nutritionSnapshot={nutrients}
                modifiedTypes={types}
                favouritesSnapshot={favourites}
                handleFavouriteChange={handleFavouriteChange}
                onToggleSnackBar={onToggleSnackBar}
              />
              <View style={{ width: "100%", marginBottom: 50, padding: 20 }}>
                <Text
                  style={{
                    fontFamily: "CustomFont",
                    fontSize: 20,
                    color: "rgba(253, 90, 67, 1)",
                    marginBottom: 20,
                    textAlign: "left",
                  }}
                >
                  Summary:
                </Text>
                <Text
                  style={{
                    fontFamily: "CustomFont",
                    fontSize: 16,
                    color: "grey",
                    marginBottom: 20,
                    textAlign: "left",
                  }}
                >
                  {route.params.item.description}
                </Text>
              </View>

              <GeneralInformation item={route.params.item} />

              <View style={{ width: "100%", padding: 20, marginBottom: 20 }}>
                <Text
                  style={{
                    fontFamily: "CustomFont",
                    fontSize: 20,
                    color: "#fd5a43",
                    textAlign: "left",
                  }}
                >
                  Ingredients:
                </Text>
              </View>

              <Ingredients modifiedIngredients={modifiedIngredients} />

              <View
                style={{
                  width: "100%",
                  padding: 20,
                  marginBottom: 20,
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    fontFamily: "CustomFont",
                    fontSize: 20,
                    color: "#fd5a43",
                    textAlign: "left",
                  }}
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
                style={{
                  fontFamily: "CustomFont",
                  fontSize: 16,
                  color: "white",
                  textAlign: "left",
                }}
              >
                Removed from favourites!
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: "CustomFont",
                  fontSize: 16,
                  color: "white",
                  textAlign: "left",
                }}
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
