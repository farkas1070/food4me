import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  maincontainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(253, 90, 67, 0.6)", // Orange with 50% opacity
  },
  noitemimage: {
    width: 300,
    height: 300,
  },
  appBar: {
    backgroundColor: "transparent",
    justifyContent: "center",
    width: "100%",
  },
  foodcontainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
