import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  "black",
    
  },
  headerContainer: {
    width: "100%",
    height: "12%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fd5a43",
    borderBottomWidth:  0,
    borderColor: "transparent",
  },

  bodyContainer: {
    width: "100%",

    backgroundColor: "white",
    flexGrow: 1,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 400 / 2,
    borderWidth: 2,
    borderColor: "black",
  },

  whatwillyoudotext: {
    marginTop: 50,
    marginLeft: 30,
    fontSize: 15,
    fontWeight: "700",
    color: "black",
  },

  homepictureview: {
    alignItems: "center",

    width: "100%",

    backgroundImage: "url",
  },

  footerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    backgroundColor: "black",
    flexDirection: "row",
  },
  topCard: {
    width: "100%",

    padding: 20,
    marginBottom: 60,
  },
  welcomeText: {
    fontSize: 24,

    marginTop: 20,
    marginBottom: 60,
  },
  ImageContainer: { marginTop: 60 },
  GridContainer: { marginTop: 50 },
  topContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  popularText: {
    marginLeft: 20,
  },
  viewAllText: {
    marginRight: 20,
    color: "orange",
  },
});
