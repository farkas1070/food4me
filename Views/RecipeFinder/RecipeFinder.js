import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Switch,
  ImageBackground,
} from "react-native";
import React from "react";
import { useContext } from "react";
import { foodContext, themeContext } from "../../Context/GlobalContext.js";
import { generateStyles } from "./RecipeFinderStyle.js";
import recipebackground from "../../assets/recipebackground.jpg";
import Header from "../../Components/Header.js";
import NewHeader from "../../Components/NewHeader.js";
const Homepage = ({ navigation }) => {
  const [foodarray] = useContext(foodContext);
  const [darkTheme] = useContext(themeContext);
  const styles = generateStyles(darkTheme);
  const getRandomElement = () => {
    var randelement = foodarray[Math.floor(Math.random() * foodarray.length)];
    navigation.navigate("SingleElement", { item: randelement });
  };

  return (
    <View style={{flex:1}}>
      <NewHeader></NewHeader>
      <KeyboardAvoidingView style={styles.mainContainer(darkTheme)}>
        <ImageBackground
          source={recipebackground}
          resizeMode="cover"
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <View style={styles.questioncontainer(darkTheme)}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: 80,
                width: "80%",
              }}
            >
              <View>
                <Text style={styles.dontshowtext}>
                  Click on the Button below, And we will give you a recipe
                  suggestion!
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button(darkTheme)}
                onPress={() => {
                  getRandomElement();
                }}
              >
                <Text style={styles.text(darkTheme)}>
                  What should I cook today?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Homepage;
