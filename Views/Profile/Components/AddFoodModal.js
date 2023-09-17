import React, { useState, useEffect } from "react";
import { View, Modal, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./AddFoddModalStyle";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { query,doc,getDocs,collection, where,addDoc  } from "firebase/firestore";
import Card from "./Card";
import { db,auth } from "../../../firebase-config";

const AddFoodModal = ({ isVisible, onClose, options }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const onAddPress = async (selectedOption) => {
    try {
      const recipeDocRef = doc(db, "Recipes", selectedOption.docid);
      const userRef = doc(db, "Users", auth.currentUser.uid);
      
  
      const nutrientQuery = query(
        collection(db, "Recipe_Nutrition"),
        where("Recipe_ID", "==", recipeDocRef),
        where("name", "==", "Calories") // Make sure it matches the field name in Firestore
      );
  
      const querySnapshot = await getDocs(nutrientQuery);

      if (!querySnapshot.empty) {
        const matchingDocument = querySnapshot.docs[0];
        
        await addDoc(collection(db, "User_Calories"), {
          userId: userRef,
          recipeId: recipeDocRef, // Replace 'option.id' with the actual recipe ID
          consumedDate: new Date().toISOString().split('T')[0], // Current date in 'YYYY-MM-DD' format
          caloriesConsumed: matchingDocument.data().amount,
        });
      } else {
        console.log('No matching documents found.');
      }
    } catch (error) {
      console.error('Error querying database:', error);
    }
    
  };
  useEffect(() => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = options.filter((option) =>
      option.name.toLowerCase().includes(lowerCaseSearchText)
    );
    setFilteredOptions(filtered);
  }, [searchText]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <ScrollView
          style={styles.modalView}
          contentContainerStyle={styles.modalViewContent}
        >
          <TextInput
            label="E-mail"
            value={searchText}
            mode="flat"
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
            onChangeText={(searchText) => setSearchText(searchText)}
            style={{ width: "80%", marginTop: 20, backgroundColor: "white" }}
            theme={{
              colors: {
                primary: "#fd5a43",
              },
            }}
          />
          {filteredOptions.map((option, index) => {
            return <Card key={index} option={option}  onAddPress={() => onAddPress(option)} />;
          })}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AddFoodModal;
