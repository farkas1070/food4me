import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  textContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  icon: {
    marginRight: 10,
  },
  innerView:{ flexGrow: 1, width: "100%" },

  bodyContainer: {
    backgroundColor: "white",
    width: "100%",
    flexGrow: 1,
  },
  text: {
    fontSize: 20,
    color: "black",
    textAlign: "left",
  },
  chiplistContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    width: "100%",
  },
  sectionView:{
    width: "100%",
    padding: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: "#040507",
  },
  textInput:{
    flex: 1,
    marginRight: 20,
    padding: 2,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderColor: "black",
  }


});
