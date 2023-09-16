import React, { useState, useContext } from "react";
import { View, TouchableOpacity } from "react-native";

import CircularProgress from "react-native-circular-progress-indicator";

import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./CalorieCounterStyle";
import AddFoodModal from "./AddFoodModal";
import { foodContext } from "../../../Context/GlobalContext";

const CalorieCounter = ({ userData }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [foodarray, setFoodarray] = useContext(foodContext);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.calorieContainer}>
      <CircularProgress
        value={20}
        radius={110}
        duration={2000}
        progressValueColor={"#808080"}
        maxValue={userData.AMR}
        activeStrokeColor={"white"}
        inActiveStrokeColor={"#fd5a43"}
        inActiveStrokeOpacity={0.5}
        inActiveStrokeWidth={20}
        activeStrokeWidth={10}
        title={"Calories"}
        titleColor={"#fd5a43"}
        titleStyle={{ fontFamily: "CustomFont" }}
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
        <MaterialIcons name="add-circle-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CalorieCounter;
