import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import AgeAsset from "../../../assets/age.png";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import Background from "../../../assets/test.jpg";
import { styles } from "./Page6Style";
const Page6 = ({
  goToPrevPage,
  goToNextPage,
  setAgeText,
  ageText,
  calculateData,
}) => {
  return (
    <View style={styles.page} key="6">
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
              source={AgeAsset}
              resizeMode="contain"
            />
            <Text style={styles.topText}>What is Your Age?</Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "space-between",
                justifyContent: "center",
                padding: 15,
              }}
            >
              <TextInput
                label="Age"
                value={ageText}
                mode="outlined"
                right={<TextInput.Icon icon={() => <Text>Yrs</Text>} />}
                onChangeText={(ageText) => setAgeText(ageText)}
                style={{ width: "60%", marginTop: 50 }}
              />
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
              disabled={ageText == "" ? true : false}
              mode="elevated"
              onPress={() => {
                goToNextPage();
                calculateData();
              }}
              style={{ marginBottom: 50 }}
            >
              Next
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page6;
