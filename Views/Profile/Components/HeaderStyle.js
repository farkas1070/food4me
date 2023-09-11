import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(253, 90, 67, 0.1)", // Orange with 50% opacity
  },
  appBar: {
    backgroundColor: "transparent",
    justifyContent: "center",
    height: 350,
    width: "100%",
    flexDirection: "column",
  },
  topContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  icon: { position: "absolute", top: 0, right: 0 },
  nameContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    marginBottom: 50,
    borderRadius: 400 / 2,
  },
  title: {
    color: "white",
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    
  },
  leftChangeViewContainer: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    
    borderBottomColor:'#fd5a43',
    borderBottomWidth:3,
    
    width:'40%'
  },
  rightChangeViewContainer: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    
    borderBottomColor:'#fd5a43',
    borderBottomWidth:3,
    width:'40%'
  },
  changeViewText: {
    color: "white",
    marginBottom:10
  },
});
