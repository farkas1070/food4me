import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
  },
  circularProgressContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  addButon: {
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 50,
    backgroundColor: "#fd5a43",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  informationContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  infoTextContainer: {
    width: "90%",
  },
  topText: {
    fontSize: 20,
    marginBottom: 20,
    color:'#989898'
  },
});
