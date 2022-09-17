import { StyleSheet, Text, View, TouchableOpacity, Switch, Image, ScrollView,Modal,Alert} from 'react-native'
import React from 'react'
import { useContext,useState } from "react";
import {  themeContext } from "../Components/SetData.js"
import { getAuth, updateProfile, sendEmailVerification } from "firebase/auth";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ChangePasswordModal from "./ChangePasswordModal"
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import ChangeUsernameModal from "./ChangeUsernameModal"
import DeleteUserModal from "./DeleteUserModal"



const ProfileComponent = ({ navigation }) => {

  const [darkTheme, setDarkTheme] = useContext(themeContext)
  const auth = getAuth();
  const user = auth.currentUser
  const [passwordmodalVisible, setpasswordModalVisible] = useState(false);
  const [usernamemodalVisible, setusernameModalVisible] = useState(false);
  const [deleteusermodalVisible, setdeleteusermodalVisible] = useState(false);

  const toggleSwitch = () => setDarkTheme(previousState => !previousState);

  const openMenu = () => {
    navigation.openDrawer();
  }


  const updateProfilePicture = () => {
    console.log("inside update function")
    updateProfile(auth.currentUser, {
      photoURL: "https://i.pinimg.com/originals/cb/b6/1d/cbb61dc9f560a4e96c2c64f41a90ce3f.jpg"
    }).then(() => {
      console.log("user modified")
    }).catch((error) => {
      console.log(error)
    });
    

  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("verification sent")
      });
  }
 
  const signOut = () => {
    
  }
  const deleteAccount = () => {
    
  }
  


  return (
    <ScrollView style={{ width: '100%' }}>
      {/* Setting Up modals*/} 


      <Modal animationType="slide" transparent={true} visible={passwordmodalVisible} onRequestClose={() => {setpasswordModalVisible(!passwordmodalVisible);}}>
        <ChangePasswordModal/>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={usernamemodalVisible} onRequestClose={() => {setusernameModalVisible(!usernamemodalVisible);}}>
        <ChangeUsernameModal/>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={deleteusermodalVisible} onRequestClose={() => {setdeleteusermodalVisible(!deleteusermodalVisible);}}>
        <DeleteUserModal/>
      </Modal>


      {/* Setting Up modals*/} 

      <View style={styles.headerContainer(darkTheme)}>
        <TouchableOpacity onPress={() => { openMenu() }}><Feather style={styles.feathericon} name="menu" size={35} color={darkTheme?"#fd5a43" :"white"} /></TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          {darkTheme ? <Feather name="moon" size={25} color={darkTheme?"#fd5a43" :"white"} style={{ marginTop: 25, marginRight: 10 }} /> : <Feather name="sun" size={25} color={darkTheme?"#fd5a43" :"white"} style={{ marginTop: 25, marginRight: 10 }} />}
          <Switch trackColor={{ false: "#767577", true: "white" }} thumbColor={darkTheme?"#fd5a43" :"white"} onValueChange={toggleSwitch} value={darkTheme} style={styles.switch} >

          </Switch>
        </View>
      </View>
      <View style={styles.bodyContainer(darkTheme)}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>

          <View style={styles.innerbody}>
            
            {user.photoURL == null ? <MaterialIcons name="account-circle" size={200} color="black" /> : <Image
              style={styles.profileimage}
              source={{ uri: user.photoURL }}
            />}
          </View>

          <View style={styles.bottomBody(darkTheme)}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity style={styles.Button(darkTheme)} onPress={() => { updateProfilePicture() }}>
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
              <TouchableOpacity style={styles.optionButton(darkTheme)} onPress={() => { signOut() }} ><Feather name="log-out" size={24} color={darkTheme? "#fd5a43":"black" } style={{marginLeft: 15}} /><Text style={styles.optionText(darkTheme)}>Log Out</Text></TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileComponent

const styles = StyleSheet.create({

  headerContainer: (darkTheme) => ({
    width: '100%',
    height: 80,
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
    height: "100%",

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
    height: 600,
    backgroundColor: darkTheme ? "#181616" : "#fd5a43",
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