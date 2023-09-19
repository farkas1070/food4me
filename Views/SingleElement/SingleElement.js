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
  const { item } = route.params;

  const [page, setPage] = useState(0);
  const [modifiedIngredients, setModifiedIngredients] = useState([]);
  const [modifiedTypes, setModifiedTypes] = useState([]);

  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const ITEMS_PER_PAGE = 4;
  console.log(item.docid)
  const docid = item.docid;
  const recipeRef = doc(db, "Recipes", docid);
  const userRef = doc(db, "Users", auth.currentUser.uid);

  const nutrientquery = query(
    collection(db, "Recipe_Nutrition"),
    where("Recipe_ID", "==", recipeRef)
  );
  const typequery = query(
    collection(db, "Recipe_Types"),
    where("Recipe_ID", "==", recipeRef)
  );
  const ingredientquery = query(
    collection(db, "Recipes_Ingredients"),
    where("Recipe_ID", "==", recipeRef)
  );
  const stepsquery = query(
    collection(db, "Steps"),
    where("Recipe_ID", "==", recipeRef)
  );
  const favouritesquery = query(
    collection(db, "Favourites"),
    where("User_ID", "==", userRef),
    where("Recipe_ID", "==", recipeRef)
  );

  const [nutritionSnapshot, nutritionSnapshotLoading, nutritionSnapshotError] =
    useCollectionData(nutrientquery);
  const [ingredientSnapshot, ingredientSnapshotLoading] =
    useCollectionData(ingredientquery);
  const [typeSnapshot, typeSnapshotLoading] = useCollectionData(typequery);
  const [stepsSnapshot, stepsSnapshotLoading] = useCollectionData(stepsquery);
  const [favouritesSnapshot, favouritesSnapshotLoading] =
    useCollectionData(favouritesquery);

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
          console.log("Entire Document has been deleted successfully.");
        })
        .catch((error) => {
          console.log(error);
        });
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
    const getTypeRef = () => {
      if (!typeSnapshotLoading) {
        let newarray = [];

        typeSnapshot.map((type) => {
          const typeName = type.name; // Get the "name" field value directly
          newarray.push({ ...type, name: typeName });
        });

        setModifiedTypes(newarray);
      }
    };
    if (modifiedIngredients.length == 0) {
      getIngredientRef();
    }
    if (modifiedTypes.length == 0) {
      getTypeRef();
    }
  });

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
      {favouritesSnapshotLoading ||
      nutritionSnapshotLoading ||
      modifiedIngredients.length == 0 ||
      modifiedTypes.length == 0 ||
      stepsSnapshotLoading ? (
        <LoadingScreen />
      ) : (
        <View style={{ width: "100%", height: "100%" }}>
          <ScrollView style={{ width: "100%", flexGrow: 1 }}>
            <Header item={item} />

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <TopInfo
                item={item}
                nutritionSnapshot={nutritionSnapshot}
                modifiedTypes={modifiedTypes}
                favouritesSnapshot={favouritesSnapshot}
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
                  {item.description}
                </Text>
              </View>

              <GeneralInformation item={item} />

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

              <Steps stepsSnapshot={stepsSnapshot} />

              <DataTableComponent
                getPaginatedData={getPaginatedData}
                page={page}
                nutritionSnapshot={nutritionSnapshot}
                ITEMS_PER_PAGE={ITEMS_PER_PAGE}
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
            {favouritesSnapshot.length == 0 ? (
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
