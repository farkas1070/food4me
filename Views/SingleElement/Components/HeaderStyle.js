import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 450,
    width: "100%",
    flexDirection: "column",
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,

    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "120%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 25,
  },
  arrow: {
    backgroundColor: "white",
    marginLeft: 10,
    padding: 5,
  },
});
