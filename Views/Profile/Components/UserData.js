import React, { useState } from "react";
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
import DeleteUser from "../../../assets/profileAssets/deleteuser.png";
import CustomInfo from "./CustomInfo";
import { styles } from "./UserDataStyle";
import CalorieCounter from "./CalorieCounter";
import UpdateModal from "./UpdateModal";

const UserData = ({ userData }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [fieldName, setFieldName] = useState('')
  
  return (
    <View style={styles.mainContainer}>
      <View style={styles.circularProgressContainer}>
        <CalorieCounter userData={userData} />
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
            changeable={false}
            openModal={() => { setModalVisible(!isModalVisible);setFieldName('age')}}
          />
          <CustomInfo
            leftIcon={Dumbbell} // Pass the left icon
            ageText="AMR" // Pass the age text
            actualValue={userData.AMR.toFixed(2)} // Pass the actual value
            measure={""}
            changeable={false}
            openModal={() => { setModalVisible(!isModalVisible);setFieldName('age')}}
          />
          <CustomInfo
            leftIcon={Hearth} // Pass the left icon
            ageText="BMR" // Pass the age text
            actualValue={userData.BMR.toFixed(2)} // Pass the actual value
            measure={""}
            changeable={false}
            openModal={() => { setModalVisible(!isModalVisible);setFieldName('age')}}
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
            changeable={true}
            openModal={() =>{ setModalVisible(!isModalVisible);setFieldName('age')}}
          />
          <CustomInfo
            leftIcon={Ruler} // Pass the left icon
            ageText="Height" // Pass the age text
            actualValue={userData.height} // Pass the actual value
            measure={"cm"}
            changeable={true}
            openModal={() => { setModalVisible(!isModalVisible);setFieldName('height')}}
          />

          <CustomInfo
            leftIcon={Scale} // Pass the left icon
            ageText="Weight" // Pass the age text
            actualValue={userData.weight} // Pass the actual value
            measure={"kg"}
            changeable={true}
            openModal={() => { setModalVisible(!isModalVisible);setFieldName('weight')}}
          />
          <CustomInfo
            leftIcon={Gender} // Pass the left icon
            ageText="Gender" // Pass the age text
            actualValue={userData.gender} // Pass the actual value
            measure={""}
            changeable={true}
            openModal={() => { setModalVisible(!isModalVisible);setFieldName('gender')}}
          />
        </View>
        <View style={styles.informationContainer}>
          <View style={styles.infoTextContainer}>
            <Text style={[styles.topText, { fontFamily: "MontserratBold" }]}>
              Other Options:
            </Text>
          </View>
          <CustomInfo
            leftIcon={DeleteUser} // Pass the left icon
            ageText="Delete Account" // Pass the age text
            actualValue={""} // Pass the actual value
            measure={""}
            changeable={true}
            openModal={() => { setModalVisible(!isModalVisible);setFieldName('age')}}
          />
        </View>
      </View>
      <UpdateModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        fieldName={fieldName} // Specify the field name
        
      />
    </View>
  );
};

export default UserData;
