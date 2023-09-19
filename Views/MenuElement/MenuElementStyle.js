import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent:'space-between',
    backgroundColor: "white",
    
    width: "100%",
    height: "100%",
  },
  imageBackgroundTopView: {
    width: "100%",
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
  },
  typeText: {
    color: "black",
    fontSize: 20,
  },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 40,
    padding: 5,
    justifyContent: "center",
    width: 50,
    height: 50,
    alignItems: "center",
  },
  typeContainer: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 40,
    padding: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  content: {
    padding: 20,
    flexGrow:1,
    width: "100%",
    
  },
  recipeName: {
    fontSize: 24,
    color: "gray",
    marginTop: 10,
  },
  recipeDescription: {
    fontSize: 16,
    textAlign: "center",
  },
  pageIndicator: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  miniContainer: {
    width: "100%",
    paddingHorizontal:20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  subText: {
    color: "grey",
    marginLeft: 20,
    fontSize: 16,
  },
  jumpToFoodButton: {
    width: "60%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    
    backgroundColor: "green",
    borderRadius: 10,
  },
});
