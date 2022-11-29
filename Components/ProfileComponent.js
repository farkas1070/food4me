import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView,Modal,Alert} from 'react-native'
import React from 'react'
import { useContext,useState } from "react";
import {  themeContext } from "../Components/SetData.js"
import { getAuth, updateProfile, sendEmailVerification,signOut  } from "firebase/auth";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ChangePasswordModal from "./ChangePasswordModal"
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import ChangeUsernameModal from "./ChangeUsernameModal"
import DeleteUserModal from "./DeleteUserModal"
import * as ImagePicker from 'expo-image-picker';
import Header from "./Header.js"

const ProfileComponent = ({ navigation }) => {

  const [darkTheme] = useContext(themeContext)
  const auth = getAuth();
  const user = auth.currentUser
  const [passwordmodalVisible, setpasswordModalVisible] = useState(false);
  const [usernamemodalVisible, setusernameModalVisible] = useState(false);
  const [deleteusermodalVisible, setdeleteusermodalVisible] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      updateProfile(auth.currentUser, {
        photoURL: result.uri
      }).then(() => {
        Alert.alert("Successfully updated profile pic,Login and logout to see your new pic")
      }).catch((error) => {
        console.log(error)
      });
      console.log(user)
    }
    
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        Alert.alert("Verification Email Sent!","check your inbox!")
      });
  }
 
  const signUserOut = () => {
    signOut(auth).then(() => {
      Alert.alert("Success")
    }).catch((error) => {
      console.log(error)
    });
    navigation.navigate("Register")
  }
  
  


  return (
    <View style={{ width: '100%' }}>
      {/* Setting Up modals*/} 
      <Modal animationType="slide" transparent={true} visible={passwordmodalVisible} onRequestClose={() => {setpasswordModalVisible(!passwordmodalVisible);}}>
        <ChangePasswordModal/>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={usernamemodalVisible} onRequestClose={() => {setusernameModalVisible(!usernamemodalVisible);}}>
        <ChangeUsernameModal/>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={deleteusermodalVisible} onRequestClose={() => {setdeleteusermodalVisible(!deleteusermodalVisible);}}>
        <DeleteUserModal nav={"Register"} />
      </Modal>
      {/* Setting Up modals*/} 

      <Header/>
      <ScrollView style={styles.bodyContainer(darkTheme)}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>

          <View style={styles.innerbody}>
            
            {user.photoURL == null ? <MaterialIcons name="account-circle" size={220} color="black" /> : <Image
              style={styles.profileimage}
              source={{ uri: user.photoURL }}
            />}
          </View>

          <View style={styles.bottomBody(darkTheme)}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity style={styles.Button(darkTheme)} onPress={() => { pickImage() }}>
                  <AntDesign name="picture" size={50} color={darkTheme ? "#fd5a43" : "#36454F"} />
                </TouchableOpacity>
                <Text style={styles.buttonText(darkTheme)}> Change Profile Pic </Text>
              </View>
              <View style={{ alignItems: 'center', marginTop: 40 }} >
                <TouchableOpacity style={styles.Button(darkTheme)} onPress={() => { setusernameModalVisible(true) }}>
                <MaterialCommunityIcons name="account-outline" size={50} color={darkTheme? "#fd5a43":"black" }  />
                  
                </TouchableOpacity>
                <Text style={styles.buttonText(darkTheme)}> Change Username</Text>
              </View>
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity style={styles.Button(darkTheme)} onPress={() => { setpasswordModalVisible(true) }}>
                  <Feather name="lock" size={50} color={darkTheme ? "#fd5a43" : "#36454F"} />

                </TouchableOpacity>
                <Text style={styles.buttonText(darkTheme)}> Change Password </Text>
              </View>
            </View>
            <View style={{ width: '100%', marginTop: 50, alignItems: 'center' }}>
              
              
              <TouchableOpacity style={styles.optionButton(darkTheme)} onPress={() => { verifyEmail() }} ><FontAwesome name="envelope-o" size={24} color={darkTheme ? "#fd5a43" : "#36454F"} style={{marginLeft: 15}} /><Text style={styles.optionText(darkTheme)}>Verify Email</Text></TouchableOpacity>
              <TouchableOpacity style={styles.optionButton(darkTheme)} onPress={() => { setdeleteusermodalVisible(true) }} ><AntDesign name="delete" size={24} color={darkTheme? "#fd5a43":"black" } style={{marginLeft: 15}} /><Text style={styles.optionText(darkTheme)}>Delete Account</Text></TouchableOpacity>
              <TouchableOpacity style={styles.optionButton(darkTheme)} onPress={() => { signUserOut() }} ><Feather name="log-out" size={24} color={darkTheme? "#fd5a43":"black" } style={{marginLeft: 15}} /><Text style={styles.optionText(darkTheme)}>Log Out</Text></TouchableOpacity>
              
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

export default ProfileComponent

const styles = StyleSheet.create({

  headerContainer: (darkTheme) => ({
    width: '100%',
    height: "12%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: darkTheme ? 'black' : "#fd5a43",
    borderBottomWidth: darkTheme? 5:0,
    borderColor: darkTheme? "#181616":"transparent",


  }),
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 35
  },

  feathericon: {
    marginTop: 25,
    marginLeft: 30
  },
  switch: {
    marginTop: 25,
    marginRight: 25,
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }]
  },
  bodyContainer: (darkTheme) => ({

    width: "100%",
    height: "88%",

    backgroundColor: darkTheme ? 'black' : "white"
  }),
  innerbody: (darkTheme) => ({
    width: "100%",
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkTheme ? "#661b1c" : "white"
  }),
  text: {
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 40,
    marginTop: 50,

  },
  buttonText: (darkTheme) => ({
    fontWeight: "700",
    color: darkTheme ? "white" : "black",
    fontSize: 9,
    marginTop: 10,
  }),
  profileimage: {

    width: 200,
    height: 200,
    borderRadius: 400 / 2,
    marginTop: 40,
    marginBottom: 40
    
  },
  Button: (darkTheme) => ({
    height: 80,
    backgroundColor: darkTheme ? "#181616" : "white",
    width: 80,
    borderRadius: 20,
    marginTop: "20%",
    marginLeft: 5,
    marginRight: 5,
    borderWidth: darkTheme? 3:0,
    borderColor: darkTheme? "#313131":"transparent",
    justifyContent: 'center',
    alignItems: 'center',
  }),
  deleteButton: {
    height: 55,


    backgroundColor: "#36454F",
    width: 220,
    borderRadius: 30,
    marginTop: "15%",
    justifyContent: 'center',
    alignItems: 'center',

  },
  bottomBody: (darkTheme) => ({

    width: "100%",
    height: 480,
    backgroundColor: darkTheme ? "#1e1e1e" : "#fd5a43",
    alignItems: 'center',
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  }),
  optionButton: (darkTheme) => ({
    width: "80%",
    borderRadius: 20,
    height: 60,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: darkTheme ? "#313131" : "white",

  }),
  optionText: (darkTheme) => ({
    fontWeight: "700",
    color: darkTheme ? "#fd5a43" : "black",
    fontFamily: 'Roboto',
    fontSize: 15,
    marginRight: 20,
  })

})