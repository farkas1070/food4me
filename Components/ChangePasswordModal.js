import { StyleSheet, Text, View, TextInput,TouchableOpacity, Alert } from 'react-native'
import React,{useState,useContext} from 'react'
import { getAuth,updatePassword,reauthenticateWithCredential,EmailAuthProvider } from "firebase/auth";
import {  themeContext } from "../Components/SetData.js"


const ChangePasswordModal = () => {
    const [darkTheme] = useContext(themeContext)

    const [password,setPassword] = useState("")
    const [newpassword,setNewPassword] = useState("")
    const auth = getAuth();

    
    const changePassword = () =>{
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        )
        reauthenticateWithCredential(user, credential).then(() => {
            updatePassword(user, newpassword).then(() => {
                Alert.alert("Success")
              }).catch((error) => {
                console.log(error)
              });
          }).catch((error) => {
            console.log(error)
          });
        
        
    }


    return (

        <View style={styles.centeredView}>
            <View style={styles.modalView(darkTheme)}>
                <Text style={styles.modalText(darkTheme)}>Insert New password In the Inputs</Text>
                <View style={styles.formContainer}>

                    <TextInput
                        style={styles.input(darkTheme)}
                        placeholder="Current Password"
                        placeholderTextColor={darkTheme? "black":"white"}
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <TextInput
                        placeholderTextColor={darkTheme? "black":"white"}
                        style={styles.input(darkTheme)}
                        placeholder="New Password"
                        value={newpassword}
                        onChangeText={text => setNewPassword(text)}
                    />
                    <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.opacity} onPress={()=>{ changePassword()}} ><Text>Confirm</Text></TouchableOpacity>
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
    modalView: (darkTheme) => ({
        width: 300,
        height: 500,
        margin: 20,
        backgroundColor:darkTheme? "#1e1e1e": "white",
        borderRadius: 5,
        borderColor: "white",
        borderWidth: 1,

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
        borderRadius: 20,
        backgroundColor: '#fd5a43',

    },
    modalText:(darkTheme)=>( {
        color:darkTheme? "#fd5a43": "black",
        fontWeight: '700',
        fontSize: 12,
    }),
})