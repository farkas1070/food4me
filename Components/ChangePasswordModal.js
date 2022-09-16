import { StyleSheet, Text, View, TextInput,TouchableOpacity, Alert } from 'react-native'
import React,{useState} from 'react'
import { getAuth,updatePassword,reauthenticateWithCredential,EmailAuthProvider } from "firebase/auth";

const ChangePasswordModal = () => {
    
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
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Insert New password In the Inputs</Text>
                <View style={styles.formContainer}>

                    <TextInput
                        style={styles.input}
                        placeholder="Current Password"
                        placeholderTextColor="white"
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <TextInput
                        placeholderTextColor="white"
                        style={styles.input}
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
    modalView: {
        width: 300,
        height: 500,
        margin: 20,
        backgroundColor: "white",
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
    },
    formContainer: {
        width: "100%",
        padding: 20,
        marginTop: 10
    },
    input: {
        width: "100%",
        height: 50,
        color: "black",
        backgroundColor:"#fd5a43",
        fontWeight: "700",
        
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center'
    },
    opacity:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:40,
        width:100,
        height:100,
        backgroundColor: '#fd5a43',

    }
})