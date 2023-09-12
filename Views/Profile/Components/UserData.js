import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";
import CircularProgress from "react-native-circular-progress-indicator";

import Ruler from "../../../assets/profileAssets/ruler.png";
import Hearth from "../../../assets/profileAssets/heart.png";
import Scale from "../../../assets/profileAssets/scale.png";
import Clock from "../../../assets/profileAssets/clock.png";
import Gender from "../../../assets/profileAssets/gender.png";
import Dumbbell from "../../../assets/profileAssets/gym.png";
import Chart from "../../../assets/profileAssets/chart.png";
import { MaterialIcons } from "@expo/vector-icons";

import CustomInfo from "./CustomInfo";
import { styles } from "./UserDataStyle";
const UserData = ({ userData }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.circularProgressContainer}>
        <View>
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
          <TouchableOpacity style={styles.addButon}>
            <MaterialIcons name="add-circle-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.informationContainer}>
          <View style={styles.infoTextContainer}>
            <Text style={[styles.topText, { fontFamily: "MontserratBold" }]}>
              General Information:
            </Text>
          </View>
          <CustomInfo
            leftIcon={Chart} // Pass the left icon
            ageText="BMI" // Pass the age text
            actualValue={userData.BMI.toFixed(2)} // Pass the actual value
            measure={""}
          />
          <CustomInfo
            leftIcon={Dumbbell} // Pass the left icon
            ageText="AMR" // Pass the age text
            actualValue={userData.AMR.toFixed(2)} // Pass the actual value
            measure={""}
          />
          <CustomInfo
            leftIcon={Hearth} // Pass the left icon
            ageText="BMR" // Pass the age text
            actualValue={userData.BMR.toFixed(2)} // Pass the actual value
            measure={""}
          />
        </View>
        <View style={styles.informationContainer}>
          <View style={styles.infoTextContainer}>
            <Text style={[styles.topText, { fontFamily: "MontserratBold" }]}>
              User Data:
            </Text>
          </View>
          <CustomInfo
            leftIcon={Clock} // Pass the left icon
            ageText="Age" // Pass the age text
            actualValue={userData.age} // Pass the actual value
            measure={"y. old"}
          />
          <CustomInfo
            leftIcon={Ruler} // Pass the left icon
            ageText="Height" // Pass the age text
            actualValue={userData.height} // Pass the actual value
            measure={"cm"}
          />

          <CustomInfo
            leftIcon={Scale} // Pass the left icon
            ageText="Weight" // Pass the age text
            actualValue={userData.weight} // Pass the actual value
            measure={"kg"}
          />
          <CustomInfo
            leftIcon={Gender} // Pass the left icon
            ageText="Gender" // Pass the age text
            actualValue={userData.gender} // Pass the actual value
            measure={""}
          />
        </View>
      </View>
    </View>
  );
};

export default UserData;
