import React from "react";
import { Image, View, Text } from "react-native";

import { useFonts } from "expo-font";
import CustomFont from "../../../fonts/myfont.otf";
import { Surface } from "react-native-paper";
import CircularProgress from "react-native-circular-progress-indicator";
import Cheese from "../../../assets/cheese.png";
import Wheat from "../../../assets/wheat.png";
import Heart from "../../../assets/like.png";
import Dish from "../../../assets/dish.png";
import Dollar from "../../../assets/dollar.png";
import Leaf from "../../../assets/leaf.png";
import Clocks from "../../../assets/stopwatch.png";
import { styles } from "./GeneralInformationStyle";
const GeneralInformation = ({item}) => {
    const [loaded] = useFonts({
        CustomFont: CustomFont,
      });
    
      if (!loaded) {
        return null;
      }
  return (
    <Surface style={styles.surface}>
      <Text style={styles.generalInformationText}> General Information:</Text>
      <View style={styles.healthscoreContainer}>
        <CircularProgress
          value={item.healthscore}
          radius={75}
          progressValueColor={"rgba(253, 90, 67, 1)"}
          duration={2000}
          title={"Healthscore"}
          titleColor={"grey"}
          strokeColorConfig={[
            { color: "red", value: 0 },
            { color: "skyblue", value: 50 },
            { color: "yellowgreen", value: 100 },
          ]}
          activeStrokeColor={"#efefef"}
          inActiveStrokeColor={"#efefef"}
          dashedStrokeConfig={{
            count: 50,
            width: 4,
          }}
        />
      </View>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Image style={styles.icon} source={Leaf} />
          <Text style={[styles.text,{fontFamily:'CustomFont'}]}>Vegetarian?</Text>
        </View>
        <Text style={[styles.text,{fontFamily:'CustomFont'}]}>
          {item.vegetarian == true ? "Yes" : "No"}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.innerInfoContainer}>
          <Image style={styles.icon} source={Cheese} />
          <Text style={[styles.text,{fontFamily:'CustomFont'}]}>DairyFree?</Text>
        </View>
        <Text style={[styles.text,{fontFamily:'CustomFont'}]}>{item.dairy == true ? "Yes" : "No"}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.innerInfoContainer}>
          <Image style={styles.icon} source={Dollar} />
          <Text style={[styles.text,{fontFamily:'CustomFont'}]}>Cheap?</Text>
        </View>
        <Text style={[styles.text,{fontFamily:'CustomFont'}]}>{item.cheap == true ? "Yes" : "No"}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.innerInfoContainer}>
          <Image style={styles.icon} source={Wheat} />
          <Text style={[styles.text,{fontFamily:'CustomFont'}]}>Glutenfree?</Text>
        </View>
        <Text style={[styles.text,{fontFamily:'CustomFont'}]}>
          {item.glutenfree == true ? "Yes" : "No"}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.innerInfoContainer}>
          <Image style={styles.icon} source={Heart} />
          <Text style={[styles.text,{fontFamily:'CustomFont'}]}>Healthy?</Text>
        </View>
        <Text style={[styles.text,{fontFamily:'CustomFont'}]}>{item.healthy == true ? "Yes" : "No"}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.innerInfoContainer}>
          <Image style={styles.icon} source={Clocks} />
          <Text style={[styles.text,{fontFamily:'CustomFont'}]}>Ready in:</Text>
        </View>
        <Text style={[styles.text,{fontFamily:'CustomFont'}]}>{item.ready} Minutes</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.innerInfoContainer}>
          <Image style={styles.icon} source={Dish} />
          <Text style={[styles.text,{fontFamily:'CustomFont'}]}>Servings:</Text>
        </View>
        <Text style={[styles.text,{fontFamily:'CustomFont'}]}>{item.servings} People</Text>
      </View>
    </Surface>
  );
};

export default GeneralInformation;
