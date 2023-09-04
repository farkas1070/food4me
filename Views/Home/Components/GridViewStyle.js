import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
    justifyContent: "center",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridItem: {
    flex: 1,
    height: 200,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  fullWidth: {
    flex: 1, // Takes up full width
  },
  imageBackground: {
    flex: 1,
    height: 200,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    position:'absolute',
    bottom:20,
    left:20
  },
  overlay1: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(127, 17, 224, 0.2)", // Orange with 50% opacity
  },
  overlay2: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 136, 130, 0.4)", // Orange with 50% opacity
  },
  overlay3: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 189, 84, 0.4)", // Orange with 50% opacity
  },
  
});
