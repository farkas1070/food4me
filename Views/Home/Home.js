import React from "react";
import { View, ScrollView } from "react-native";

import { themeContext } from "../../Context/GlobalContext";
import { useContext, useEffect } from "react";

import { auth, db } from "../../firebase-config";
import { doc } from "firebase/firestore";
import { generateStyles } from "./HomeStyle";
import NewHeader from "../../Components/NewHeader";
import InfoCarousel from "./Components/InfoCarousel";
import Footer from "./Components/Footer";
import GridView from "./Components/GridView";
export default function ScreenOne() {
  const [darkTheme, setDarkTheme] = useContext(themeContext);
  const styles = generateStyles(darkTheme);

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
        <View>
          <GridView></GridView>
        </View>
        <View style={styles.homepictureview(darkTheme)}>
          <InfoCarousel />
        </View>

        <View style={styles.footerContainer(darkTheme)}>
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
}
