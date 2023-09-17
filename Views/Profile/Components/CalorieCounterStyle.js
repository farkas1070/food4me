import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  calorieContainer: { width: "100%", alignItems: "center",marginTop:20 },
  addButon: {
    position: "absolute",
    top: 0,
    right: "20%",
    borderRadius: 50,
    backgroundColor: "#ffe4e0",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  foodContainer: {
    width: "90%",
    marginTop:40,
    borderColor:'#fd5a43',
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
  },
  foodItemContainer: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Center items vertically
    marginBottom: 10, // Add margin between each food item
    padding: 10, // Add padding to each food item
    backgroundColor: "#fff", // Background color for the card
    borderRadius: 8, // Rounded corners for the card
  },
  foodImage: {
    width: 50, // Width of the food image
    height: 50, // Height of the food image
    marginRight: 10, // Add margin between the image and text
    borderRadius: 4, // Rounded corners for the image
  },
  foodDetails: {
    flex: 1, // Take up remaining space in the container
    flexDirection: "row",
    justifyContent: "space-between",
  },
  foodName: {
    fontSize: 16, // Font size for the food name
    fontWeight: "bold", // Bold text for the food name
  },
  foodCalories: {
    fontSize: 14, // Font size for the calorie text
    color: "#888", // Text color for calories
  },
  textContainer: {width:'100%'},
  topText: {
    marginBottom:20,
    
    color:'#fd5a43',
    fontSize:18
  },
});
