import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fd5a43",
        padding: 20
      },
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // dark overlay with 40% opacity
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      image: {
    
        width: 300,
        height: 300
      },
      topText: {
        fontWeight: "700",
        color: "white"
      },
      formContainer: {
        width: "100%",
        padding: 20,
        marginTop: 10
      },
      input: {
        height: 50,
        width: "80%",
        color: "#fd5a43",
        fontWeight: "700",
        backgroundColor: "white",
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 20,
    
      },
      topinput: {
        height: 50,
        width: "100%",
        color: "#fd5a43",
        fontWeight: "700",
        backgroundColor: "white",
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 20,
      },
      buttonContainer: {
        marginTop: 50,
        width: "50%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 20,
    
        justifyContent: "center",
        alignItems: "center"
      },
      registerButton: {
        fontWeight: "700",
    
      },
      loginButton: {
        textDecorationLine: 'underline',
        fontWeight: "700",
        color: "white",
        marginTop: 20
      }
})