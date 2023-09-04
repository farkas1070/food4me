import { StyleSheet } from "react-native";

export const generateStyles = (darkTheme) => {
  return StyleSheet.create({
    container: (darkTheme) => ({
      flex: 1,
      backgroundColor: darkTheme ? "white" : "#fd5a43",
      padding: 25,
    }),
    headerContainer: (darkTheme) => ({
      width: "100%",
      height: "12%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: darkTheme ? "black" : "#fd5a43",
      borderBottomWidth: darkTheme ? 5 : 0,
      borderColor: darkTheme ? "#181616" : "transparent",
    }),

    bodyContainer: (darkTheme) => ({
      width: "100%",

      backgroundColor: darkTheme ? "black" : "white",
      flexGrow: 1,
    }),

    profileImage: (darkTheme) => ({
      width: 100,
      height: 100,
      borderRadius: 400 / 2,
      borderWidth: 2,
      borderColor: darkTheme ? "white" : "black",
    }),

    whatwillyoudotext: (darkTheme) => ({
      marginTop: 50,
      marginLeft: 30,
      fontSize: 15,
      fontWeight: "700",
      color: darkTheme ? "white" : "black",
    }),

    homepictureview: (darkTheme) => ({
      alignItems: "center",

      width: "100%",
      

      backgroundImage: "url",
    }),

    footerContainer: (darkTheme) => ({
      justifyContent: "center",
      alignItems: "center",
      height: 100,
      backgroundColor: darkTheme ? "#181616" : "black",
      flexDirection: "row",
    }),
    topCard: {
      width: "100%",

      padding: 20,
      marginBottom: 60,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 60,
    },
    ImageContainer: {marginTop:60},
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
    },
  });
};
