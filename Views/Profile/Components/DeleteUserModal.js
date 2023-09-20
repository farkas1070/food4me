import { StyleSheet, Text, View, Image, Alert,Modal,StatusBar,Button } from "react-native";
import React from "react";
import { getAuth, deleteUser } from "firebase/auth";
import DeletePic from "../../../assets/profileAssets/delete.png"
import { useNavigation } from "@react-navigation/native";
const DeleteUserModal = ({ isVisible, onClose }) => {
  
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const deleteFunction = () => {
    deleteUser(user)
      .then(() => {
        Alert.alert("Successfully deleted");
      })
      .catch((error) => {
        console.log(error);
      });
    navigation.navigate("Register");
  };
  return (
    <Modal
      animationType="fade" // You can customize the animation type
      transparent={true} // Make the modal background transparent
      visible={isVisible}
      onRequestClose={onClose} // Close the modal when users press the back button on Android
    >
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.5)"
        barStyle="light-content"
      />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={[styles.topText,{fontFamily:'CustomFont'}]}>Are you sure, this will delete your entire account with everything in it</Text>
          <Image source={DeletePic} resizeMode="contain" style={styles.image} />
          
          <View style={styles.buttonsContainer}>
          <Button title="Delete" onPress={()=>{deleteFunction()}} color="red"  />
          <Button title="Cancel" onPress={onClose} color="grey" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteUserModal;

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darkened background
  },
  modalContent: {
    backgroundColor: "white",
    width: "80%",
    height: "60%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
    justifyContent: "space-between",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  topText: {
    textAlign: "center",
    color: "black",
  },
  textInput: {
    width: "80%",
  },
  image:{
    width:'100%',
    height:'50%'
  }
};
