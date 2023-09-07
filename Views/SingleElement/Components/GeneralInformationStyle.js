import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  surface: {
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "rgba(253, 90, 67, 1)",
    borderWidth: 0.6,
  },
  generalInformationText: {
    fontFamily: "CustomFont",
    fontSize: 20,
    color: "rgba(253, 90, 67, 1)",
    marginTop: 20,
    textAlign: "left",
  },
  healthscoreContainer: { marginTop: 30, marginBottom: 20 },
  outerContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  icon: { width: 40, height: 40 },
  text: {
    fontSize: 18,
    color: "black",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "left",
    marginRight: 20,
  },
  infoContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  innerInfoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
});
