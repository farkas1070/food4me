import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 20,
  },
  listContainer: {
    
  },
  card: {
    borderRadius: 12,

    
    marginLeft: 20,
    marginRight: 5,
    overflow: "hidden",
    width: 300,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },

  title: {
    fontSize: 20,

    
    marginLeft: 2,
  },
  servings:{
    fontSize: 20,
    color:'grey',
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    color: "#777",
  },
  servingsView:{
    flexDirection:'row',
    width:'100%',
    marginTop:10
  },
  utensil:{
    marginLeft:5
  },
  utensil2:{
    marginLeft:2
  }
});
