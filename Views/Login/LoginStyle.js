import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // dark overlay with 40% opacity
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  textInputsContainer:{
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  video:{
    width: "100%",
    flex: 1,
    height: "100%",
    brightness: 0.7,
    contrast: 0.7,
    zIndex: -10,
    position: "absolute",
  },
  mainIcon:{ width: 300, height: 300, marginTop: 30 },
  loginText:{
    
    fontSize: 22,
    color: "white",
    marginBottom: 10,
    textAlign: "left",
  },
  textInput:{ width: "80%", marginTop: 20, backgroundColor: "white" },
  subText:{
    
    fontSize: 10,
    color: "white",
    marginTop: 60,
    textAlign: "left",
    textDecorationLine: "underline",
  },
  button:{ marginTop: 20, width: "60%" }

});
