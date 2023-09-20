import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  topText: {
    color: "#FF8882",
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 20,
    marginTop: 20,
  },

  topBlackButton: {
    backgroundColor: "black",
    width: "100%",
    height: 200,
    borderRadius: 30,
    flexDirection: "row",
  },
  cardText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: 20,
  },
  cardInfoText: {
    color: "white",
    textAlign: "center",

    marginTop: 20,
    marginLeft: 20,
    fontWeight: "bold",
  },
  leftContainer: {
    width: "50%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  FoodImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 10,
    right: -100,
  },
  discoverButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 40,
    backgroundColor: "orange",
    borderRadius: 20,
    marginBottom: 25,
    marginLeft: 30,
  },
});
