import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  bodyContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  uploadButton: {
    marginTop: 20,
    borderColor: "#d1d1d1",
    borderWidth: 1,
    width: "80%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    color: "#d1d1d1",
    marginTop: 10,
  },
  uploadVideoButton: {
    width: "80%",
    height: 60,
    backgroundColor: "#fd5a43",
    marginTop: 30,
    margonBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  uploadText: {
    color: "white",
  },
  video: { width: 300, height: 200, marginTop: 20 },
  image: { width: 300, height: 200, marginTop: 20 },
});
