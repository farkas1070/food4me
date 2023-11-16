import { db, auth } from "../../firebase-config";
import { useEffect, useState } from "react";
import {
  where,
  query,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { View, Text,ScrollView,Image } from "react-native";
import { styles } from "./HistoryDataStyle";
import Navbar from "./components/Navbar";

const HistoryData = () => {
  const [foodHistory, setFoodHistory] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const userRef = doc(db, "Users", auth.currentUser.uid);

      const userCalorieQuery = query(
        collection(db, "User_Calories"),
        where("userId", "==", userRef)
      );

      const querySnapshot = await getDocs(userCalorieQuery);

      // Iterate through the querySnapshot
      for (const item of querySnapshot.docs) {
        const data = item.data();
        const consumedDate = data.consumedDate;
        const recipeId = data.recipeId;

        // Fetch additional data for recipeId
        const recipeDoc = await getDoc(recipeId);

        if (recipeDoc.exists()) {
          const recipeData = recipeDoc.data();

          // Replace recipeId reference with actual data
          data.recipeId = recipeData;

          // Update state based on the consumedDate
          setFoodHistory((prevFoodHistory) => {
            const updatedHistory = { ...prevFoodHistory };

            if (!updatedHistory[consumedDate]) {
              updatedHistory[consumedDate] = [];
            }

            updatedHistory[consumedDate].push(data);

            return updatedHistory;
          });
        }
      }
    };

    getUserData();
  }, []);

  console.log(foodHistory); // Check the console to see the organized data.

  return (
    // Render your component using the organized foodHistory state.
    // You can map through the dates and render each day's data as needed.
    <ScrollView style={styles.mainContainer}>
      <Navbar></Navbar>
      {Object.entries(foodHistory)
        .sort((a, b) => new Date(b[0]) - new Date(a[0])) // Sort entries by date
        .map(([date, items]) => (
          <View key={date}>
            <Text style={styles.dateText}>{date}</Text>
            <View>
              {items.map((item, index) => (
                
                <View key={index} style={styles.foodItemContainer}>
                <Image
                  source={{ uri: item.recipeId.image }} // Replace with the actual image URL
                  style={styles.foodImage}
                />
                <View style={styles.foodDetails}>
                  <Text
                    style={[styles.foodName]}
                  >
                    {item.recipeId.name}
                  </Text>
                  <Text style={styles.foodCalories}>
                    {item.caloriesConsumed} Kcal
                  </Text>
                </View>
              </View>
              ))}
            </View>
          </View>
        ))}
    </ScrollView>
  );
};

export default HistoryData;
