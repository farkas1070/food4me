import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    padding: 5,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  gridItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    borderRadius: 8,
    margin: 4,
  },
  nothingContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
    
  },
  nothingPic: {
    width: "80%",
    height: 200,
  },
  text: {
    color: "grey",
  },
  uploadVideoButton: {
    backgroundColor: "#fd5a43",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
  },
});
