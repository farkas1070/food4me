import React, { useState } from "react";
import { Modal, View, Text, Button, StatusBar } from "react-native";
import { styles } from "./UpdateModalStyle";
import { TextInput } from "react-native-paper";
import { doc, updateDoc } from "firebase/firestore";
import { auth } from "../../../firebase-config";
import { db } from "../../../firebase-config";
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
          <Text>Update {fieldName}:</Text>
          <TextInput
            value={newValue}
            onChangeText={(newValue) => setNewValue(newValue)}
            placeholder={`Enter new ${fieldName}`}
          />
          <Button title="Update" onPress={handleUpdate} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModal;
