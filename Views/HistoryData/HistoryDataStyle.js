import { StyleSheet} from 'react-native'


export const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        width:'100%',
        height:'100%',
        backgroundColor:"#fff",
    },
    contentContainer:{
        width:'100%',
        flexGrow:1,
        padding:10
    },
    dateText:{
        color:'#fd5a43',
        paddingLeft:15,
        fontSize:20,
        paddingTop:20
    },
    foodContainer: {
        width: "100%",
        marginTop: 20,
    
        padding: 10,
        borderRadius: 10,
      },
      foodItemContainer: {
        flexDirection: "row", // Align items horizontally
        alignItems: "center", // Center items vertically
        backgroundColor: "black",
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
        fontSize: 12, // Font size for the food name
        color: "grey",
        width: "70%",
      },
      foodCalories: {
        fontSize: 14, // Font size for the calorie text
        color: "#fd5a43", // Text color for calories
      },
})