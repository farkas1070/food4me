import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 400,
    borderWidth: 1,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  innerContainer: {
    backgroundColor: "white",
    top: -16,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: { flex: 1, width: "100%" },
  innerScrollView: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  bottomScrollContainer: {
    backgroundColor: "white",
    bottom: -16,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
