import { StyleSheet, Text, View, TextInput,TouchableOpacity, Alert } from 'react-native'
import React,{useState,useContext} from 'react'
import { getAuth,updateProfile  } from "firebase/auth";
import {  themeContext } from "../Components/SetData.js"
const ChangePasswordModal = () => {
    const [darkTheme, setDarkTheme] = useContext(themeContext)
    const [username,setUsername] = useState("")
    
    const auth = getAuth();

    
    const changeUsername = () =>{
        updateProfile(auth.currentUser, {
            displayName: username
          }).then(() => {
            Alert.alert("Success")
          }).catch((error) => {
            console.log(error)
          });
        
    }


    return (

        <View style={styles.centeredView}>
            <View style={styles.modalView(darkTheme)}>
                <Text style={styles.modalText(darkTheme)}>Insert New Username in the input below</Text>
                <View style={styles.formContainer}>

                    <TextInput
                        style={styles.input(darkTheme)}
                        placeholder="New Username"
                        placeholderTextColor={darkTheme? "black":"white"}
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                    
                    <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.opacity} onPress={()=>{ changeUsername()}} ><Text>Confirm</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default ChangePasswordModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
       
    },
    modalView:(darkTheme) => ({
        width: 300,
        height: 500,
        margin: 20,
        backgroundColor:darkTheme? "black": "white",
        borderRadius: 20,
        borderColor: "#fd5a43",
        borderWidth: 3,

        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }),
    formContainer: {
        width: "100%",
        padding: 20,
        marginTop: 10
    },
    input:(darkTheme)=>( {
        width: "100%",
        height: 50,
        color: "black",
        backgroundColor:darkTheme? "white": "#fd5a43",
        fontWeight: "700",
        
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center'
    }),
    opacity:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:40,
        width:100,
        height:100,
        backgroundColor: '#fd5a43',
        borderRadius: 30,

    },
    modalText:(darkTheme) =>({
        color:darkTheme? "#fd5a43": "black",
        fontWeight: '700',
        fontSize: 12,
    }),
})