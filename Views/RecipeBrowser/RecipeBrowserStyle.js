import { StyleSheet } from "react-native";

export const generateStyles = (darkTheme) => {
  return StyleSheet.create({
    mainContainer: (darkTheme) => ({
      width: "100%",
      flexGrow: 1,
      justifyContent: "space-between",

      alignItems: "center",
      backgroundColor: darkTheme ? "black" : "white",
    }),
    appBar: {
      backgroundColor: "transparent",
      justifyContent: "center",

      width: "100%",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(253, 90, 67, 0.1)", // Orange with 50% opacity
    },

    input: (darkTheme) => ({
      width: "85%",
      borderRadius: 20,
      height: 40,
      marginLeft: 5,
      backgroundColor: "white",

      textAlign: "center",
    }),
    image: {
      width: 80,
      height: 80,
      borderRadius: 10,
      marginLeft: 20,
    },
    disabledButton: (darkTheme) => ({
      justifyContent: "center",
      marginLeft: 20,
      marginRight: 20,
      alignItems: "center",
      height: 50,
      backgroundColor: darkTheme ? "#181616" : "#e5e5e5",
      width: 50,
      borderRadius: 20,
    }),

    headerText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "black",
      textAlign: "center",
      marginTop: 35,
    },

    singlefood: {
      width: "100%",
      height: 120,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      backgroundColor: "white",
      borderColor: "#d3d3d3",
      borderBottomWidth: 2,
    },
    pagingview: {
      height: 70,
      width: "100%",
      justifyContent: "center",
      backgroundColor: "white",
      alignItems: "center",
      flexDirection: "row",
    },
    Button: (darkTheme) => ({
      justifyContent: "center",
      marginLeft: 20,
      marginRight: 20,
      alignItems: "center",
      height: 50,
      backgroundColor: darkTheme ? "#fd5a43" : "#fd5a43",
      width: 50,
      borderRadius: 20,
    }),
    nametext: (darkTheme) => ({
      color: "black",
      fontSize: 10,
      fontWeight: "700",
      textAlign: "right",
      textDecorationLine: "underline",
      marginBottom: 5,
      color: darkTheme ? "white" : "black",
    }),
    kcalorietext: (darkTheme) => ({
      color: "black",
      fontSize: 10,
      fontWeight: "700",
      textAlign: "right",
      color: darkTheme ? "white" : "black",
    }),
    pagecounttext: (darkTheme) => ({
      color: darkTheme ? "white" : "black",
      fontWeight: "700",
      fontSize: 20,
    }),
    searchbutton: (darkTheme) => ({
      justifyContent: "center",
      alignItems: "center",
      height: 40,
      width: 40,
      borderRadius: 20,
    }),
    searchicon: {
      marginRight: 8,
    },
  });
};
