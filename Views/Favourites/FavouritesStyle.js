import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  maincontainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  bodyContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  card: {
    padding: 8,
    height: 160,
    width: "95%",
    alignItems: "center",
    elevation: 4,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
  },
  foodcontainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
    marginLeft: 30,
  },
  nameText: {
    fontSize: 13,
    color: "grey",
    marginBottom: 10,
    textAlign: "left",
  },
  subTextContainer: { flexDirection: "row", alignItems: "center" },
  subText: {
    fontFamily: "CustomFont",
    fontSize: 13,
    color: "grey",
    textAlign: "left",
  },
});
