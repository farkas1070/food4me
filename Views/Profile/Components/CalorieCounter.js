import React, { useState, useContext, useEffect } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";

import CircularProgress from "react-native-circular-progress-indicator";

import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./CalorieCounterStyle";
import AddFoodModal from "./AddFoodModal";
import { foodContext } from "../../../Context/GlobalContext";
import {
  where,
  query,
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase-config";
import NoItem from "../../../assets/profileAssets/noItem.png";
import { useNavigation } from "@react-navigation/native";

const CalorieCounter = ({ userData }) => {
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [userCalorie, setUserCalorie] = useState(0);
  const [UserFoodForToday, setUserFoodForToday] = useState([]);
  const [foodarray, setFoodarray] = useContext(foodContext);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    const getUserData = async () => {
      const userRef = doc(db, "Users", auth.currentUser.uid);
      const today = new Date().toISOString().split("T")[0];
      
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      let value = 0;

      const userCalorieQuery = query(
        collection(db, "User_Calories"),
        where("userId", "==", userRef)
      );

      const querySnapshot = await getDocs(userCalorieQuery);
      const fetchRecipeDataPromises = [];

      for (const item of querySnapshot.docs) {
        const data = item.data();
        const consumedDate = data.consumedDate; // Assuming 'consumedDate' is a field in your document.

        if (consumedDate === today) {
          value += data.caloriesConsumed;

          // Process and filter the data as needed
          const recipeDoc = await getDoc(data.recipeId);
          if (recipeDoc.exists()) {
            const recipeData = recipeDoc.data();
            fetchRecipeDataPromises.push({ ...data, recipeId: recipeData });
          }
        } else if (consumedDate <= sevenDaysAgo.toISOString().split("T")[0]) {
          // Delete the document if it's older than 7 days
          await deleteDoc(item.ref);
        }
      }

      // Use Promise.all to ensure all promises are resolved before setting the state
      const userFoodData = await Promise.all(fetchRecipeDataPromises);
      setUserFoodForToday(userFoodData);
      setUserCalorie(value);
    };

    getUserData();
  }, []);
  return (
    <View style={styles.calorieContainer}>
      <Text style={[styles.titleText, { fontFamily: "MontserratBold" }]}>
        Stats For Today:
      </Text>
      <CircularProgress
        value={userCalorie}
        radius={110}
        duration={1000}
        progressValueColor={"#fd5a43"}
        maxValue={userData.BMR}
        activeStrokeColor={"#fd5a43"}
        activeStrokeSecondaryColor={"#C25AFF"}
        inActiveStrokeColor={"#d1d1d1"}
        inActiveStrokeOpacity={0.5}
        inActiveStrokeWidth={20}
        activeStrokeWidth={30}
        title={"Calories"}
        titleStyle={{ fontFamily: "CustomFont", color: "black" }}
      />
      <AddFoodModal
        options={foodarray}
        isVisible={isModalVisible}
        onClose={toggleModal}
      />
      <TouchableOpacity
        style={styles.addButon}
        onPress={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <MaterialIcons name="add-circle-outline" size={30} color="black" />
      </TouchableOpacity>

      <View style={styles.foodContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.topText, { fontFamily: "MontserratBold" }]}>
            Today's Food:
          </Text>
        </View>
        {UserFoodForToday.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image
              source={NoItem} // Replace with the actual image URL
              resizeMode="contain"
              style={styles.noItemImage}
            />
            <Text style={[styles.noItemText, { fontFamily: "CustomFont" }]}>
              You have not eaten anything Today, select something, and it will
              appear here
            </Text>
          </View>
        ) : (
          UserFoodForToday.map((item, index) => {
            return (
              <View key={index} style={styles.foodItemContainer}>
                <Image
                  source={{ uri: item.recipeId.image }} // Replace with the actual image URL
                  style={styles.foodImage}
                />
                <View style={styles.foodDetails}>
                  <Text
                    style={[styles.foodName, { fontFamily: "MontserratBold" }]}
                  >
                    {item.recipeId.name}
                  </Text>
                  <Text style={styles.foodCalories}>
                    {item.caloriesConsumed} Kcal
                  </Text>
                </View>
              </View>
            );
          })
        )}
        <View style={styles.historyButtonContainer}>
          <TouchableOpacity style={styles.historyButton} onPress={()=>{navigation.navigate("HistoryComponent")}}>
            <Text
              style={[styles.historyText, { fontFamily: "MontserratBold" }]}
            >
              See Last week
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CalorieCounter;
