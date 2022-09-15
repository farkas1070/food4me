import { StyleSheet, Text, View, TouchableOpacity, Switch, Image, ScrollView } from 'react-native'
import React from 'react'
import { useContext } from "react";
import { userContext, themeContext } from "../Components/SetData.js"
import { getAuth, updateProfile, sendEmailVerification } from "firebase/auth";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const ProfileComponent = ({ navigation }) => {

  const [darkTheme, setDarkTheme] = useContext(themeContext)
  const auth = getAuth();
  const user = auth.currentUser


  const toggleSwitch = () => setDarkTheme(previousState => !previousState);

  const openMenu = () => {
    navigation.openDrawer();
  }


  const updateProfilePicture = async () => {
    console.log("inside update function")
    await updateProfile(auth.currentUser, {
      photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn7n_hjrfOEgfm7CTRjgTURpIw1IN0Yp4pBQ&usqp=CAU"
    }).then(() => {
      console.log("user modified")
    }).catch((error) => {
      console.log(error)
    });
    console.log("updated user: " + user)

  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("verification sent")
      });
  }
  const updatePassword = () => {

  }
  const deleteAccount = () => {

  }


  return (
    <ScrollView style={{ width: '100%' }}>

      <View style={styles.headerContainer(darkTheme)}>
        <TouchableOpacity onPress={() => { openMenu() }}><Feather style={styles.feathericon} name="menu" size={35} color="white" /></TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          {darkTheme ? <Feather name="moon" size={25} color="white" style={{ marginTop: 25, marginRight: 10 }} /> : <Feather name="sun" size={25} color="white" style={{ marginTop: 25, marginRight: 10 }} />}
          <Switch trackColor={{ false: "#767577", true: "#661b1c" }} thumbColor="white" onValueChange={toggleSwitch} value={darkTheme} style={styles.switch} >

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
                  <AntDesign name="picture" size={50} color={darkTheme ? "white" : "#36454F"} />
                </TouchableOpacity>
                <Text style={styles.buttonText(darkTheme)}> Change Profile Pic </Text>
              </View>
              <View style={{ alignItems: 'center', marginTop: 40 }} >
                <TouchableOpacity style={styles.Button(darkTheme)} onPress={() => { verifyEmail() }}>

                  <FontAwesome name="envelope-o" size={50} color={darkTheme ? "white" : "#36454F"} />
                </TouchableOpacity>
                <Text style={styles.buttonText(darkTheme)}> Verify Email</Text>
              </View>
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity style={styles.Button(darkTheme)} onPress={() => { updatePassword() }}>
                  <Feather name="lock" size={50} color={darkTheme ? "white" : "#36454F"} />

                </TouchableOpacity>
                <Text style={styles.buttonText(darkTheme)}> Change Password </Text>
              </View>
            </View>
            <View style={{ width: '100%', marginTop: 50, alignItems: 'center' }}>
              
              <TouchableOpacity style={styles.optionButton(darkTheme)}><MaterialIcons name="alternate-email" size={24} color={darkTheme? "white":"black" } style={{marginLeft: 15}} /><Text style={styles.optionText(darkTheme)}>Change E-mail</Text></TouchableOpacity>
              <TouchableOpacity style={styles.optionButton(darkTheme)}><MaterialCommunityIcons name="account-outline" size={24} color={darkTheme? "white":"black" } style={{marginLeft: 15}} /><Text style={styles.optionText(darkTheme)}>Change Username</Text></TouchableOpacity>
              <TouchableOpacity style={styles.optionButton(darkTheme)}><AntDesign name="delete" size={24} color={darkTheme? "white":"black" } style={{marginLeft: 15}} /><Text style={styles.optionText(darkTheme)}>Delete Account</Text></TouchableOpacity>
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
    backgroundColor: darkTheme ? '#1b222c' : "#fd5a43",


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

    backgroundColor: darkTheme ? '#661b1c' : "white"
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
    backgroundColor: darkTheme ? "#661b1c" : "white",
    width: 80,
    borderRadius: 20,
    marginTop: "20%",
    marginLeft: 5,
    marginRight: 5,

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
    backgroundColor: darkTheme ? "#1b222c" : "#fd5a43",
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

    backgroundColor: darkTheme ? "#661b1c" : "white",

  }),
  optionText: (darkTheme) => ({
    fontWeight: "700",
    color: darkTheme ? "white" : "black",
    fontFamily: 'Roboto',
    fontSize: 15,
    marginRight: 20,
  })

})