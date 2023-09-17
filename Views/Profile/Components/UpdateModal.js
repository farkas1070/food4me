import React, { useState } from "react";
import { Modal, View, Text, Button, StatusBar,Image } from "react-native";
import { styles } from "./UpdateModalStyle";
import { TextInput } from "react-native-paper";
import { doc, updateDoc } from "firebase/firestore";
import { auth } from "../../../firebase-config";
import { db } from "../../../firebase-config";
import ModalPic from "../../../assets/profileAssets/modalPic.png"
const UpdateModal = ({ isVisible, onClose, fieldName }) => {
  const [newValue, setNewValue] = useState("");

  const handleUpdate = async () => {
    try {
      const userRef = doc(db, "Users", auth.currentUser.uid);

      // Use a switch case to determine which field to update
      switch (fieldName) {
        case "age":
          await updateDoc(userRef, {
            age: newValue,
          });
          break;
        case "weight":
          await updateDoc(userRef, {
            weight: newValue,
          });
          break;
        case "height":
          await updateDoc(userRef, {
            height: newValue,
          });
          break;
        case "gender":
          await updateDoc(userRef, {
            gender: newValue,
          });
          break;
        // Add more cases for other fields if needed
        default:
          // Handle the default case or throw an error for an unsupported field
          throw new Error(`Unsupported field: ${fieldName}`);
      }

      // Update the user document with the new value

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.5)"
        barStyle="light-content"
      />

      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={[styles.topText,{fontFamily:'CustomFont'}]}>Almost There, Add your New {fieldName} to Update :</Text>
          <Image source={ModalPic} resizeMode="contain" style={styles.image} />
          <TextInput
            value={newValue}
            onChangeText={(newValue) => setNewValue(newValue)}
            mode="outlined"
            style={styles.textInput}
            placeholder={`Enter new ${fieldName}`}
          />
          <View style={styles.buttonsContainer}>
          <Button title="Update" onPress={handleUpdate} color="#fd5a43"  />
          <Button title="Cancel" onPress={onClose} color="grey" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModal;
