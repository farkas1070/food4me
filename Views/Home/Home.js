import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import NewHeader from "../../Components/NewHeader";
import InfoCarousel from "./Components/InfoCarousel";
import Footer from "./Components/Footer";
import GridView from "./Components/GridView";
import TopImage from "./Components/TopImage";
import Card from "./Components/Card";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import CustomFont from "../../fonts/Raleway-Bold.ttf";
import { styles } from "./HomeStyle";

export default function ScreenOne() {
  const navigation = useNavigation();

  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });

  if (!loaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <NewHeader />
      <View style={styles.bodyContainer}>
        <View style={styles.topCard}>
          <Text style={[styles.welcomeText, { fontFamily: "CustomFont" }]}>
            Welcome To Food4Me,{"\n"}Have a Look Around 🍔
          </Text>
          <Card></Card>
        </View>
        <View style={styles.homepictureview}>
          <View style={styles.topContainer}>
            <Text style={[styles.popularText, { fontFamily: "CustomFont" }]}>
              Popular
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Recipe Browser");
              }}
            >
              <Text style={[styles.viewAllText, { fontFamily: "CustomFont" }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <InfoCarousel />
        </View>
        <View style={styles.GridContainer}>
          <GridView></GridView>
        </View>
        <View style={styles.ImageContainer}>
          <TopImage></TopImage>
        </View>

        <View style={styles.footerContainer}>
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
