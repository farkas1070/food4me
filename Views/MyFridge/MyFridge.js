import { Text, View } from "react-native";
import React from "react";
import { styles } from "./MyFridgeStyle";
import NewHeader from "../../Components/NewHeader";
import AccordionListItem from "./Components/AccordionListItem";

const MyFridge = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}></View>
      <View style={styles.bodyContainer}>
        <AccordionListItem/>
      </View>
    </View>
  );
};

export default MyFridge;
