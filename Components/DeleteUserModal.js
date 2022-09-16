import { StyleSheet, Text, View, TextInput,TouchableOpacity, Alert } from 'react-native'
import React,{useState} from 'react'
import { getAuth,deleteUser    } from "firebase/auth";

const ChangePasswordModal = () => {
    
    const auth = getAuth();
    const user = auth.currentUser;

    const deleteFunction  = () =>{
        deleteUser(user).then(() => {
            Alert.alert("Successfully deleted")
            
          }).catch((error) => {
            console.log(error)
          });
        
    }
    return (

        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Are you sure about this?</Text>
                <View style={styles.formContainer}>

                    <Text style={styles.warningtext}>Warning, This action is IRREVERSIBLE! if you continue, your account will be deleted forever!</Text>
                    
                    <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.opacity} onPress={()=>{ deleteFunction()}} ><Text>Confirm</Text></TouchableOpacity>
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

    },
    warningtext:{
        fontWeight: 'bold',
        fontSize:30,
        color: 'red'
    }
})