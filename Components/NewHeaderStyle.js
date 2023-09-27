import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(253, 90, 67, 0.1)", // Orange with 50% opacity
  },

  appBar: {
    backgroundColor: "transparent",
    justifyContent: "center",
    height: 60,
    width: "100%",
    flexDirection: "column",
  },

  innerView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  smallIcon: {
    width: 40, // Adjust the width and height as needed
    height: 40,
    marginRight: 10,
    marginTop: 10,
  },
});
