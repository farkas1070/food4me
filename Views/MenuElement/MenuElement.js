import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground, Image } from "react-native";
import PagerView from "react-native-pager-view"; // Import PagerView from react-native-pager-view
import { styles } from "./MenuElementStyle";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import CustomFont from "../../fonts/myfont.otf";
import MontserratBold from "../../fonts/Montserrat-Bold.ttf";
import { useNavigation } from "@react-navigation/native";
import Dish from "../../assets/dish.png";
import Clocks from "../../assets/stopwatch.png";
export default function RecipeCarousel({ route }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { item } = route.params;
  console.log(item[0].docid)
  const types = ["Breakfast", "Lunch", "Dinner"];
  const navigation = useNavigation();
  const [loaded] = useFonts({
    CustomFont: CustomFont,
    MontserratBold: MontserratBold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={activeIndex}
        onPageSelected={(event) => setActiveIndex(event.nativeEvent.position)}
      >
        {item.map((item, index) => (
          <View key={index} style={styles.page}>
            <View style={{width:'100%'}}>
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.image}
              >
                <View style={styles.imageBackgroundTopView}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    <Ionicons
                      name="md-arrow-back-outline"
                      size={30}
                      color="black"
                    />
                  </TouchableOpacity>
                  <View style={styles.typeContainer}>
                    <Text
                      style={[styles.typeText, { fontFamily: "CustomFont" }]}
                    >
                      {types[activeIndex]}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text
                  style={[styles.recipeName, { fontFamily: "MontserratBold" }]}
                >
                  {item.name}
                </Text>
              </View>
              <View style={styles.miniContainer}>
                <Image source={Clocks} style={styles.icon} />
                <Text style={[styles.subText, { fontFamily: "CustomFont" }]}>
                  Time To Cook: {item.ready < 60 ? item.ready : item.ready / 60}{" "}
                  {item.ready < 60 ? "Minutes" : "Hours"}
                </Text>
              </View>
              <View style={styles.miniContainer}>
                <Image source={Dish} style={styles.icon} />
                <Text style={[styles.subText, { fontFamily: "CustomFont" }]}>
                  servings: {item.servings}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.jumpToFoodButton} onPress={()=>{navigation.navigate("SingleElement", { item: item });}}>
              <Text>Learn How to Make it!</Text>
            </TouchableOpacity>
          </View>
        ))}
      </PagerView>
      <Text style={styles.pageIndicator}>
        {activeIndex + 1} / {item.length}
      </Text>
    </View>
  );
}
