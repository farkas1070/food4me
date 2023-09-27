import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import WeightAsset from "../../../assets/weight.png";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import Background from "../../../assets/test.jpg";
import { styles } from "./Page4Style";
const Page4 = ({
  goToPrevPage,
  goToNextPage,
  setWeightText,
  weightText,
  text,
}) => {
  return (
    <View style={styles.page} key="4">
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
              source={WeightAsset}
              resizeMode="contain"
            />
            <Text style={styles.topText}>How Much do you Weight?</Text>
            <TextInput
              label="Weight"
              value={weightText}
              mode="outlined"
              right={<TextInput.Icon icon={() => <Text>Kg</Text>} />}
              onChangeText={(weightText) => setWeightText(weightText)}
              style={{ width: "60%", marginTop: 50 }}
            />
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
              disabled={text == "" ? true : false}
              mode="elevated"
              onPress={() => {
                goToNextPage();
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

export default Page4;
