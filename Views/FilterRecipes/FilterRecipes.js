import { Text, View, ScrollView } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useFonts } from "expo-font";
import CustomFont from "../../fonts/myfont.otf";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase-config";
import { query, collection, where, getDoc } from "firebase/firestore";
import { ActivityIndicator } from "react-native-paper";
import RangeSlider from "react-native-range-slider-expo";
import { foodContext } from "../../Context/GlobalContext";
import ChipList from "./Components/Chiplist";
import { styles } from "./FilterRecipesStyle";
import Header from "./Components/Header";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const FilterRecipes = ({ navigation }) => {
  const [typessnapshot, typesloading, typeserror] = useCollectionData(
    query(collection(db, "Recipe_Types"))
  );
  const [nutrientsnapshot, nutrientloading, nutrienterror] = useCollectionData(
    query(collection(db, "Recipe_Nutrition"), where("name", "==", "Calories"))
  );
  const [selectedGeneralChips, setSelectedGeneralChips] = useState([]);

  const [selectedTypeChips, setSelectedTypeChips] = useState([]);
  const [distinctTypes, setDistinctTypes] = useState([]);
  const [foodarray] = useContext(foodContext);
  const [ServingfromValue, setServingFromValue] = useState(1);
  const [ServingtoValue, setServingToValue] = useState(15);
  const [KcalfromValue, setKcalFromValue] = useState("0");
  const [KcaltoValue, setKcalToValue] = useState("2000");
  const [MinutesfromValue, setMinutesFromValue] = useState(1);
  const [MinutestoValue, setMinutesToValue] = useState(180);

  const generalfilteringoptions = [
    "cheap",
    "glutenfree",
    "dairy",
    "healthy",
    "vegetarian",
  ];
  useEffect(() => {
    if (!typesloading) {
      const distinctNames = new Set();

      typessnapshot.forEach((doc) => {
        const name = doc.name; // Assuming 'name' is the field in your Recipe_Types collection
        distinctNames.add(name);
      });

      const distinctArray = Array.from(distinctNames);
      setDistinctTypes(distinctArray);
    }
  }, [typesloading]);

  const GoBackToRecipeBrowser = () => {
    navigation.goBack();
  };
  const filterRecipesByGeneralFilters = (array) => {
    if (selectedGeneralChips.length > 0) {
      return array.filter((item) => {
        return selectedGeneralChips.every((chip) => item[chip] === true);
      });
    } else {
      return array;
    }
  };
  const filterRecipesByServingValues = (array) => {
    if (ServingfromValue > 1 || ServingtoValue < 15) {
      return array.filter((item) => {
        return (
          item.servings >= ServingfromValue && item.servings <= ServingtoValue
        );
      });
    } else {
      return array;
    }
  };

  const filterRecipesByTime = (array) => {
    if (MinutesfromValue > 1 || MinutestoValue < 180) {
      return array.filter((item) => {
        return item.ready >= MinutesfromValue && item.ready <= MinutestoValue;
      });
    } else {
      return array;
    }
  };
  const filterRecipesByKcal = async (array) => {
    let permanentList = [];
    if (!nutrientloading) {
      // Map the snapshot to an array of promises
      await Promise.all(
        nutrientsnapshot.map(async (item) => {
          if (
            item.amount >= parseInt(KcalfromValue) &&
            item.amount <= parseInt(KcaltoValue)
          ) {
            const docSnap = await getDoc(item.Recipe_ID);
            const recipeData = docSnap.data(); // Get the recipe data
            console.log(recipeData);
            permanentList.push({ ...recipeData });
          }
        })
      );
    }

    return array.filter((foodItem) =>
      permanentList.some(
        (permanentItem) => permanentItem.name === foodItem.name
      )
    );
  };

  const filterRecipesByTypes = async (array) => {
    if (selectedTypeChips.length > 0) {
      const filteredTypes = typessnapshot.filter((type) => {
        return selectedTypeChips.includes(type.name);
      });

      let permanentList = [];
      await Promise.all(
        filteredTypes.map(async (item) => {
          const docSnap = await getDoc(item.Recipe_ID);
          const recipeData = docSnap.data(); // Get the recipe data
          permanentList.push({ ...recipeData });
        })
      );
      return array.filter((foodItem) =>
        permanentList.some(
          (permanentItem) => permanentItem.name === foodItem.name
        )
      );
    } else {
      return array;
    }
  };

  const filterRecipesAndNavigate = async () => {
    let foodarrayCopy = foodarray.map((i) => ({ ...i }));
    foodarrayCopy = filterRecipesByGeneralFilters(foodarrayCopy);
    foodarrayCopy = await filterRecipesByTypes(foodarrayCopy);
    foodarrayCopy = filterRecipesByServingValues(foodarrayCopy);
    foodarrayCopy = await filterRecipesByKcal(foodarrayCopy);
    foodarrayCopy = filterRecipesByTime(foodarrayCopy);
    console.log(foodarrayCopy.length);

    //navigation.navigate("FilteredRecipeBrowser", { item: foodarrayCopy });
  };

  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });
  if (!loaded) {
    return null;
  }

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Header
        filterRecipesAndNavigate={filterRecipesAndNavigate}
        GoBackToRecipeBrowser={GoBackToRecipeBrowser}
      />

      <ScrollView
        style={{ backgroundColor: "white", width: "100%", flexGrow: 1 }}
      >
        <ScrollView style={{ flexGrow: 1, width: "100%" }}>
          <View
            style={{
              width: "100%",
              padding: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: "#040507",
            }}
          >
            <View style={styles.textContainer}>
              <MaterialCommunityIcons
                name="filter"
                size={24}
                color="#fd5a43"
                style={styles.icon}
              />
              <Text style={[styles.text, { fontFamily: "CustomFont" }]}>
                Food Attributes
              </Text>
            </View>
            <View style={styles.chiplistContainer}>
              <ScrollView horizontal={true}>
                {typesloading ? (
                  <ActivityIndicator animating={true} color="grey" />
                ) : (
                  <ChipList
                    options={generalfilteringoptions}
                    selectedIndices={selectedGeneralChips}
                    setSelectedIndices={setSelectedGeneralChips}
                  />
                )}
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              padding: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: "#040507",
            }}
          >
            <View style={styles.textContainer}>
              <MaterialCommunityIcons
                name="food-apple"
                size={24}
                color="#fd5a43"
                style={styles.icon}
              />
              <Text style={[styles.text, { fontFamily: "CustomFont" }]}>
                Filter by Kcalorie interval
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={{
                  flex: 1,
                  marginRight: 20,
                  padding: 2,
                  marginLeft: 20,
                  marginTop: 20,
                  marginBottom: 20,
                  backgroundColor: "white",
                  borderColor: "black",
                }}
                placeholder="Min (0)"
                mode="outlined"
                keyboardType="numeric"
                value={KcalfromValue}
                onChangeText={(KcalfromValue) =>
                  setKcalFromValue(KcalfromValue)
                }
                theme={{
                  colors: {
                    primary: "#fd5a43",
                  },
                }}
              />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: 20,
                  padding: 2,
                  marginRight: 20,
                  marginTop: 20,
                  marginBottom: 20,
                  backgroundColor: "white",
                  borderColor: "black",
                }}
                placeholder="Max (2000)"
                mode="outlined"
                keyboardType="numeric"
                value={KcaltoValue}
                onChangeText={(KcaltoValue) => setKcalToValue(KcaltoValue)}
                theme={{
                  colors: {
                    primary: "#fd5a43",
                  },
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              padding: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: "#040507",
            }}
          >
            <View style={styles.textContainer}>
              <FontAwesome5
                name="utensils"
                size={24}
                color="#fd5a43"
                style={styles.icon}
              />
              <Text style={[styles.text, { fontFamily: "CustomFont" }]}>
                Filter by Servings
              </Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <RangeSlider
                min={1}
                max={15}
                gravity={"center"}
                fromValue={ServingfromValue} // Set the initial from value
                toValue={ServingtoValue}
                fromValueOnChange={(value) => setServingFromValue(value)}
                toValueOnChange={(value) => setServingToValue(value)}
                initialFromValue={0}
                fromKnobColor="rgba(253, 90, 67, 1)"
                toKnobColor="rgba(253, 90, 67, 1)"
                inRangeBarColor="#d1d1d1"
                outOfRangeBarColor="#efefef"
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              padding: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: "#040507",
            }}
          >
            <View style={styles.textContainer}>
              <MaterialCommunityIcons
                name="food-takeout-box"
                size={24}
                color="#fd5a43"
                style={styles.icon}
              />
              <Text style={[styles.text, { fontFamily: "CustomFont" }]}>
                Food Types:
              </Text>
            </View>
            <View style={styles.chiplistContainer}>
              <ScrollView horizontal={true}>
                {typesloading ? (
                  <ActivityIndicator animating={true} color="grey" />
                ) : (
                  <ChipList
                    options={distinctTypes.map((a) => a)}
                    selectedIndices={selectedTypeChips}
                    setSelectedIndices={setSelectedTypeChips}
                  />
                )}
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              padding: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: "#040507",
            }}
          >
            <View style={styles.textContainer}>
              <MaterialCommunityIcons
                name="clock"
                size={24}
                color="#fd5a43"
                style={styles.icon}
              />
              <Text style={[styles.text, { fontFamily: "CustomFont" }]}>
                Filter by Minutes till done
              </Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <RangeSlider
                min={1}
                max={180}
                gravity={"center"}
                fromValue={MinutesfromValue} // Set the initial from value
                toValue={MinutestoValue}
                fromValueOnChange={(value) => setMinutesFromValue(value)}
                toValueOnChange={(value) => setMinutesToValue(value)}
                initialFromValue={0}
                fromKnobColor="rgba(253, 90, 67, 1)"
                toKnobColor="rgba(253, 90, 67, 1)"
                inRangeBarColor="#d1d1d1"
                outOfRangeBarColor="#efefef"
              />
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default FilterRecipes;
