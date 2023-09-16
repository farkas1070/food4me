import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
     // Semi-transparent background
  },
  modalView: {
    backgroundColor: "#f6f6f6",
    width: "100%",
    height: "100%",
    
  },
  modalViewContent:{
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 18,
    color: "blue",
  },
  Card:{
    width:'85%',
    backgroundColor:'white',
    marginTop:25,
    borderRadius:10,
    height:100
  }
});
