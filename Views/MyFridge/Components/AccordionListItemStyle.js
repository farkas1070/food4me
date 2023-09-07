import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    width: "80%",
    marginTop: "40%",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
  },
  generateButton: {
    position: "absolute",
    flexDirection: "row",
    top: 50,
    right: 20,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
  },
  generateText: {
    color: "white",
    fontSize: 18,
  },
  chiplistContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  topTextContainer: {
    width: "100%",
    alignItems: "center",
  },
  topText: {
    marginTop: 10,
  },
  chipContainer: {
    padding: 20,
  },
  emptySearchContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",

    alignItems: "center",
  },
  emptySearchImage: {
    width: "50%",
    height: "50%",
  },
  selectText: {
    marginTop: 20,
  },
  loadingOverlay: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { textAlign: "center",marginTop:20 },
});
