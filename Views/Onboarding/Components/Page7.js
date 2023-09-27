import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import ResultAsset from "../../../assets/results.png";
import { Button } from "react-native-paper";
import Background from "../../../assets/test.jpg";
import { styles } from "./Page7Style";
import { useNavigation } from "@react-navigation/native";
const Page7 = ({ goToPrevPage, UploadData, value, amr, bmr, bmi }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.page} key="7">
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={styles.imagebackground}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            <Image
              style={styles.AssetImage}
              source={ResultAsset}
              resizeMode="contain"
            />
            <Text style={styles.topText}>These are your results:</Text>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
                padding: 15,
                marginTop: 50,
              }}
            >
              <Text
                style={{
                  fontFamily: "CustomFont",
                  fontSize: 15,
                  color: "black",
                  marginLeft: 10,
                }}
              >
                Your BMR or Basal Metabolic Rate is: {bmr}
              </Text>

              <Text
                style={{
                  fontFamily: "CustomFont",
                  fontSize: 15,
                  color: "black",
                  marginLeft: 10,
                }}
              >
                Your AMR or Active Metabolic Rate is: {amr}
              </Text>
              <Text
                style={{
                  fontFamily: "CustomFont",
                  fontSize: 15,
                  color: "black",
                  marginLeft: 10,
                }}
              >
                Your BMI or Body Mass Index is: {bmi}
              </Text>
              <Text
                style={{
                  fontFamily: "CustomFont",
                  fontSize: 12,
                  color: "black",
                  marginLeft: 10,
                }}
              >
                BMR and AMR estimates were calculated by uing the
                Harris-Benedict formula which is not 100% accurate. Research
                studies have indicated the formula is about 90% accurate around
                60% of the time.
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              icon="arrow-left-bold"
              buttonColor="white"
              mode="elevated"
              onPress={() => {
                goToPrevPage();
              }}
              style={{ marginBottom: 50 }}
            >
              previous
            </Button>
            <Button
              icon="arrow-right-bold"
              buttonColor="white"
              disabled={value == "" ? true : false}
              mode="elevated"
              onPress={() => {
                UploadData();
                navigation.navigate("Home");
              }}
              style={{ marginBottom: 50 }}
            >
              Finish
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page7;
