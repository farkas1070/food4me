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
    backgroundColor: "rgba(0, 0, 0, 0.1)", // dark overlay with 40% opacity
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    width: "100%",
    flex: 1,
    height: "100%",
    brightness: 0.7,
    contrast: 0.7,
    zIndex: -10,
    position: "absolute",
  },
  image: { width: 300, height: 300, marginTop: 30 },
  textinputContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  text: {
    fontSize: 22,
    color: "white",
    marginBottom: 10,
    textAlign: "left",
  },
  textinputIcon: { width: "80%", marginTop: 20, backgroundColor: "white" },
});
