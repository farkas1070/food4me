import React from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";

import { themeContext } from "../../Context/GlobalContext";
import { useContext, useEffect } from "react";

import { auth, db } from "../../firebase-config";
import { doc } from "firebase/firestore";
import { generateStyles } from "./HomeStyle";
import NewHeader from "../../Components/NewHeader";
import InfoCarousel from "./Components/InfoCarousel";
import Footer from "./Components/Footer";
import GridView from "./Components/GridView";
import TopImage from "./Components/TopImage";
import Card from "./Components/Card";
import { useNavigation } from "@react-navigation/native";

export default function ScreenOne() {
  const [darkTheme, setDarkTheme] = useContext(themeContext);
  const styles = generateStyles(darkTheme);
  const navigation = useNavigation();
  useEffect(() => {
    const getUserData = async (recipeId) => {
      console.log(auth.currentUser.uid);
      const docRef = doc(db, "Users", auth.currentUser.uid);
    };
    getUserData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <NewHeader />
      <View style={styles.bodyContainer(darkTheme)}>
        <View style={styles.topCard}>
          <Text style={styles.welcomeText}>
            Welcome To Food4Me,{"\n"}Have a Look Around 🍔
          </Text>
          <Card></Card>
        </View>
        <View style={styles.homepictureview(darkTheme)}>
          <View style={styles.topContainer}>
            <Text style={styles.popularText}>Popular</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Recipe Browser");
              }}
            >
              <Text style={styles.viewAllText}>View All</Text>
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

        <View style={styles.footerContainer(darkTheme)}>
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
