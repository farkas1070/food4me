import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  mainContainer: { width: "100%", height: "100%" },

  topRightIcon: {
    top: -10,
    right: -10,
  },
  bottomLeftIcon: {
    bottom: -10,
    left: -10,
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 4 / 3, // Change this to match your image aspect ratio
  },

  bordercontainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  border: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "grey",
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "white",
  },
  surface: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(253, 90, 67, 0.1)",

    overflow: "hidden", // Orange with 50% opacity
  },
  fade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    opacity: 0.5,
  },
  scrollView: { width: "100%", flexGrow: 1 },
  innerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  descriptionContainer: { width: "100%", marginBottom: 50, padding: 20 },
  summaryText: {
    fontSize: 20,
    color: "rgba(253, 90, 67, 1)",
    marginBottom: 20,
    textAlign: "left",
  },
  descriptionText: {
    fontSize: 16,
    color: "grey",
    marginBottom: 20,
    textAlign: "left",
  },
  ingredientsContainer: { width: "100%", padding: 20, marginBottom: 20 },
  ingredientsText: {
    fontSize: 20,
    color: "#fd5a43",
    textAlign: "left",
  },
  instructionsContainer: {
    width: "100%",
    padding: 20,
    marginBottom: 20,
    marginTop: 30,
  },
  instructionsText: {
    fontSize: 20,
    color: "#fd5a43",
    textAlign: "left",
  },
  snackText: {
    fontFamily: "CustomFont",
    fontSize: 16,
    color: "white",
    textAlign: "left",
  },
});
