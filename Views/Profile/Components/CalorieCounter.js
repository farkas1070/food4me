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
} from "firebase/firestore";
import { auth, db } from "../../../firebase-config";

const CalorieCounter = ({ userData }) => {
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

      const userCalorieQuery = query(
        collection(db, "User_Calories"),
        where("userId", "==", userRef),
        where("consumedDate", "==", new Date().toISOString().split("T")[0])
      );
      let value = 0;

      const querySnapshot = await getDocs(userCalorieQuery);

      const fetchRecipeDataPromises = querySnapshot.docs.map(async (item) => {
        let data = item.data();
        value += data.caloriesConsumed;

        const recipeDoc = await getDoc(data.recipeId);

        if (recipeDoc.exists()) {
          data.recipeId = recipeDoc.data();
          console.log(data);
          return { ...data };
        } else {
          return null;
        }
      });

      const userFoodData = await Promise.all(fetchRecipeDataPromises);
      const filteredUserFoodData = userFoodData.filter(
        (foodData) => foodData !== null
      );

      setUserFoodForToday(filteredUserFoodData);
      setUserCalorie(value);
    };

    getUserData();
  }, []);
  return (
    <View style={styles.calorieContainer}>
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
        {UserFoodForToday.map((item, index) => {
          return (
            <View key={index} style={styles.foodItemContainer}>
              <Image
                source={{ uri: item.recipeId.image }} // Replace with the actual image URL
                style={styles.foodImage}
              />
              <View style={styles.foodDetails}>
                <Text style={styles.foodName}>{item.recipeId.name}</Text>
                <Text style={styles.foodCalories}>
                  {item.caloriesConsumed} Kcal
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default CalorieCounter;
