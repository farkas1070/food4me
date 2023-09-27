import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import ExcersizeAsset from "../../../assets/excersize.png";
import { Button } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import Background from "../../../assets/test.jpg";
import { styles } from "./Page5Style";
const Page5 = ({ goToPrevPage, goToNextPage, setChecked, checked }) => {
  return (
    <View style={styles.page} key="5">
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
              source={ExcersizeAsset}
              resizeMode="contain"
            />
            <Text style={styles.topText}>How Much do you excersize?</Text>
            <View
              style={{
                width: "80%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <RadioButton
                value="1.2"
                status={checked === "1.2" ? "checked" : "unchecked"}
                onPress={() => setChecked("1.2")}
              />
              <Text
                style={{
                  fontFamily: "CustomFont",
                  fontSize: 15,
                  color: "black",
                  marginLeft: 10,
                }}
              >
                Little To No excersize
              </Text>
            </View>
            <View
              style={{
                width: "80%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <RadioButton
                value="1.375"
                status={checked === "1.375" ? "checked" : "unchecked"}
                onPress={() => setChecked("1.375")}
              />
              <Text
                style={{
                  fontFamily: "CustomFont",
                  fontSize: 15,
                  color: "black",
                  marginLeft: 10,
                }}
              >
                light exercise/work 1-3 days per week
              </Text>
            </View>
            <View
              style={{
                width: "80%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <RadioButton
                value="1.55"
                status={checked === "1.55" ? "checked" : "unchecked"}
                onPress={() => setChecked("1.55")}
              />
              <Text
                style={{
                  fontFamily: "CustomFont",
                  fontSize: 15,
                  color: "black",
                  marginLeft: 10,
                }}
              >
                moderate exercise/work 3-5 days per week
              </Text>
            </View>
            <View
              style={{
                width: "80%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <RadioButton
                value="1.725"
                status={checked === "1.725" ? "checked" : "unchecked"}
                onPress={() => setChecked("1.725")}
              />
              <Text
                style={{
                  fontFamily: "CustomFont",
                  fontSize: 15,
                  color: "black",
                  marginLeft: 10,
                }}
              >
                hard exercise/work 6-7 days a week
              </Text>
            </View>
            <View
              style={{
                width: "80%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <RadioButton
                value="1.9"
                status={checked === "1.9" ? "checked" : "unchecked"}
                onPress={() => setChecked("1.9")}
              />
              <Text
                style={{
                  fontFamily: "CustomFont",
                  fontSize: 15,
                  color: "black",
                  marginLeft: 10,
                }}
              >
                very hard exercise/work 6-7 days a week
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
              disabled={checked == "" ? true : false}
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

export default Page5;
