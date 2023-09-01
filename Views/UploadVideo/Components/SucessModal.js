import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const SuccessModal = ({ isVisible, closeModal }) => {
  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          <Text>Video Uploaded Successfully!</Text>
          <TouchableOpacity onPress={closeModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darkened backdrop
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
  },
});

export default SuccessModal;