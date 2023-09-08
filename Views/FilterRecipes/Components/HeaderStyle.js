import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    appBar: {
        backgroundColor: "transparent",
        justifyContent: "center",
    
        width: "100%",
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(253, 90, 67, 0.1)", // Orange with 50% opacity
      },
      text:{
        
        fontSize: 20,
        color: "white",
        textAlign: "left",
        marginLeft: 10,
      }
})