import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  
});
