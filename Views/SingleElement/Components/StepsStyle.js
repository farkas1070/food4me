import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { alignItems: "flex-start" },
  stepContainer: {
    width: "100%",
    flexDirection: "column",
    padding: 20,
  },
  innerStepContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#ffaa9e",
    textAlign: "left",
    marginBottom: 2,
    marginTop: 10,
  },
  secondaryText: {
    fontFamily: "CustomFont",
    fontSize: 15,
    color: "grey",
    textAlign: "left",
  },
});
