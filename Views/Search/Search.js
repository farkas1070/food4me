import React, { useState, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { foodContext } from "../../Context/GlobalContext.js";
import { styles } from "./SearchStyle.js";

const SearchComponent = ({ navigation }) => {
  const [searchvalue, setSearchValue] = useState("");
  const [foodarray] = useContext(foodContext);

  const filterItems = () => {
    return foodarray.filter((item) =>
      item.name.toLowerCase().includes(searchvalue.toLowerCase())
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Appbar.Header
          style={{
            backgroundColor: "transparent",
            width: "100%",
            borderBottomColor: "rgba(253, 90, 67, 1)",
            borderBottomWidth: 0.6,
          }}
        >
          <Appbar.BackAction
            color="rgba(253, 90, 67, 1)"
            onPress={() => {
              navigation.goBack();
            }}
          />

          <TextInput
            label="Search for Foods"
            value={searchvalue}
            mode="outlined"
            right={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name="food-apple-outline"
                    size={24}
                    color="black"
                  />
                )}
              />
            }
            onChangeText={(searchvalue) => setSearchValue(searchvalue)}
            style={{ flexGrow: 1 }}
          />
          <Appbar.Action
            color="rgba(253, 90, 67, 1)"
            icon="magnify"
            onPress={() => {
              navigation.navigate("FilteredRecipeBrowser", {
                item: filterItems(),
              });
            }}
          />
        </Appbar.Header>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        >
          {filterItems().map((item) => {
            return (
              <TouchableOpacity
                style={styles.suggestionField}
                onPress={() => {
                  navigation.navigate("FilteredRecipeBrowser", {
                    item: [item],
                  });
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchComponent;
