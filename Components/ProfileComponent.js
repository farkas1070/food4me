import { StyleSheet, Text, View, TouchableOpacity, Switch, Image, ScrollView,Modal,Alert} from 'react-native'
import React from 'react'
import { useContext,useState } from "react";
import {  themeContext } from "../Components/SetData.js"
import { getAuth, updateProfile, sendEmailVerification,updateEmail } from "firebase/auth";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const ProfileComponent = ({ navigation }) => {

  const [darkTheme, setDarkTheme] = useContext(themeContext)
  const auth = getAuth();
  const user = auth.currentUser
  const [modalVisible, setModalVisible] = useState(false);




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
 
  const updatePassword = () => {
    
  }
  const signOut = () => {
    putModal()
  }
  const updateUsername = () => {

  }
  const deleteAccount = () => {

  }
  


  return (
    <ScrollView style={{ width: '100%' }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <TouchableOpacity
              style={{backgroundColor: '#fd5a43',width:50,height:50}}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.headerContainer(darkTheme)}>
        <TouchableOpacity onPress={() => { openMenu() }}><Feather style={styles.feathericon} name="menu" size={35} color={darkTheme?"#fd5a43" :"white"} /></TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          {darkTheme ? <Feather name="moon" size={25} color={darkTheme?"#fd5a43" :"white"} style={{ marginTop: 25, marginRight: 10 }} /> : <Feather name="sun" size={25} color={darkTheme?"#fd5a43" :"white"} style={{ marginTop: 25, marginRight: 10 }} />}
          <Switch trackColor={{ false: "#767577", true: "white" }} color={darkTheme?"#fd5a43" :"#fd5a43"} onValueChange={toggleSwitch} value={darkTheme} style={styles.switch} >

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
                <TouchableOpacity style={styles.Button(darkTheme)} onPress={() => { verifyEmail() }}>
                <MaterialCommunityIcons name="account-outline" size={50} color={darkTheme? "#fd5a43":"black" }  />
                  
                </TouchableOpacity>
                <Text style={styles.buttonText(darkTheme)}> Change Username</Text>
              </View>
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity style={styles.Button(darkTheme)} onPress={() => { updatePassword() }}>
                  <Feather name="lock" size={50} color={darkTheme ? "#fd5a43" : "#36454F"} />

                </TouchableOpacity>
                <Text style={styles.buttonText(darkTheme)}> Change Password </Text>
              </View>
            </View>
            <View style={{ width: '100%', marginTop: 50, alignItems: 'center' }}>
              
             
              <TouchableOpacity style={styles.optionButton(darkTheme)} onPress={() => { setModalVisible(true) }} ><FontAwesome name="envelope-o" size={24} color={darkTheme ? "#fd5a43" : "#36454F"} style={{marginLeft: 15}} /><Text style={styles.optionText(darkTheme)}>Verify Email</Text></TouchableOpacity>
              <TouchableOpacity style={styles.optionButton(darkTheme)} onPress={() => { deleteAccount() }} ><AntDesign name="delete" size={24} color={darkTheme? "#fd5a43":"black" } style={{marginLeft: 15}} /><Text style={styles.optionText(darkTheme)}>Delete Account</Text></TouchableOpacity>
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
    backgroundColor: darkTheme ? '#181616' : "#fd5a43",


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
    borderColor: darkTheme? "#443737":"transparent",
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

    backgroundColor: darkTheme ? "#443737" : "white",

  }),
  optionText: (darkTheme) => ({
    fontWeight: "700",
    color: darkTheme ? "#fd5a43" : "black",
    fontFamily: 'Roboto',
    fontSize: 15,
    marginRight: 20,
  }),
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width:300,
    height:300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

})