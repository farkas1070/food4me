import { Text, View, ScrollView } from "react-native";
import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import CustomFont from "../../fonts/myfont.otf";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase-config";
import { collection, query, where } from "firebase/firestore";
import { ActivityIndicator } from "react-native-paper";
import RangeSlider from "react-native-range-slider-expo";
import { foodContext } from "../../Context/GlobalContext";
import ChipList from "./Components/Chiplist";
import { styles } from "./FilterRecipesStyle";
import Header from "./Components/Header";
const FilterRecipes = ({ navigation }) => {
  const [typessnapshot, typesloading, typeserror] = useCollectionData(
    query(collection(db, "Types"))
  );
  const [ingredientsnapshot, ingredientloading, ingredienterror] =
    useCollectionData(query(collection(db, "Ingredients")));
  const [nutrientsnapshot, nutrientloading, nutrienterror] = useCollectionData(
    query(collection(db, "Recipe_Nutrition"), where("name", "==", "Calories"))
  );
  const [selectedGeneralChips, setSelectedGeneralChips] = useState([]);
  const [selectedTypeChips, setSelectedTypeChips] = useState([]);
  const [selectedIngredientChips, setSelectedIngredientChips] = useState([]);
  const [foodarray] = useContext(foodContext);
  const [ServingfromValue, setServingFromValue] = useState(0);
  const [ServingtoValue, setServingToValue] = useState(15);
  const [KcalfromValue, setKcalFromValue] = useState(0);
  const [KcaltoValue, setKcalToValue] = useState(2000);
  const [MinutesfromValue, setMinutesFromValue] = useState(0);
  const [MinutestoValue, setMinutesToValue] = useState(180);
 
  const generalfilteringoptions = [
    "cheap",
    "glutenfree",
    "dairy",
    "healthy",
    "vegetarian",
  ];

  const GoBackToRecipeBrowser = () => {
    navigation.goBack();
  };
  const filterRecipesByGeneralFilters = () => {
    if (selectedGeneralChips.length === 0) {
      return foodarray; // Return the original array when no filters are selected
    } else {
      let filteredlist = foodarray.filter((item) => {
        return selectedGeneralChips.every((chip) => item[chip] === true);
      });
      console.log("Filtered list:", filteredlist);
      return filteredlist;
    }
  };
  const filterRecipesByServingValues = () => {
    let filteredlist = foodarray.filter((item) => {
      return (
        item.servings >= ServingfromValue && item.servings <= ServingtoValue
      );
    });
    return filteredlist;
  };
  const filterRecipesByTime = () => {
    let filteredlist = foodarray.filter((item) => {
      return (
        item.ready >= MinutesfromValue && item.ready <= MinutestoValue
      );
    });
    return filteredlist;
  };
  const filterRecipesAndNavigate = () => {
    let filteredlist = filterRecipesByTime();

    navigation.navigate("FilteredRecipeBrowser", { item: filteredlist });
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

      <ScrollView style={{ backgroundColor: "white", width: "100%", flexGrow: 1 }}>
        <ScrollView style={{ flexGrow: 1, width: "100%" }}>
          <View
            style={{
              width: "100%",
              padding: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: "#040507",
            }}
          >
            <Text
              style={{
                fontFamily: "CustomFont",
                fontSize: 20,
                color: "rgba(253, 90, 67, 1)",
                textAlign: "left",
                marginTop: 10,
              }}
            >
              Food Attributes
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                padding: 20,
                width: "100%",
              }}
            >
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
            <Text
              style={{
                fontFamily: "CustomFont",
                fontSize: 20,
                color: "rgba(253, 90, 67, 1)",
                textAlign: "left",
                marginTop: 10,
              }}
            >
              Filter by Kcalorie interval
            </Text>
            <View style={{ paddingHorizontal: 10 }}>
              <RangeSlider
                min={0}
                max={2000}
                gravity={"center"}
                fromValueOnChange={(value) => setKcalFromValue(value)}
                toValueOnChange={(value) => setKcalToValue(value)}
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
            <Text
              style={{
                fontFamily: "CustomFont",
                fontSize: 20,
                color: "rgba(253, 90, 67, 1)",
                textAlign: "left",
                marginTop: 10,
              }}
            >
              Filter by Servings
            </Text>
            <View style={{ paddingHorizontal: 10 }}>
              <RangeSlider
                min={1}
                max={8}
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
            <Text
              style={{
                fontFamily: "CustomFont",
                fontSize: 20,
                color: "rgba(253, 90, 67, 1)",
                textAlign: "left",
                marginTop: 10,
              }}
            >
              Food Types:
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                padding: 20,
                width: "100%",
              }}
            >
              <ScrollView horizontal={true}>
                {typesloading ? (
                  <ActivityIndicator animating={true} color="grey" />
                ) : (
                  <ChipList
                    options={typessnapshot.map((a) => a.name)}
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
            <Text
              style={{
                fontFamily: "CustomFont",
                fontSize: 20,
                color: "rgba(253, 90, 67, 1)",
                textAlign: "left",
                marginTop: 10,
              }}
            >
              Filter by Minutes till done 
            </Text>
            <View style={{ paddingHorizontal: 10 }}>
              <RangeSlider
                min={0}
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
