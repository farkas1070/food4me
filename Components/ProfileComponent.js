import { StyleSheet, Text, View, TouchableOpacity, Switch, Image, ScrollView } from 'react-native'
import React from 'react'
import { useContext } from "react";
import { userContext, themeContext } from "../Components/SetData.js"
import { getAuth, updateProfile, sendEmailVerification } from "firebase/auth";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

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
      photoURL: "https://us-tuna-sounds-images.voicemod.net/80acc95b-e18a-48cb-8e31-9cd5b770d49d-1647869397227.jpg"
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
        <TouchableOpacity onPress={() => { openMenu() }}><Feather style={styles.feathericon} name="menu" size={35} color="black" /></TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          {darkTheme ? <Feather name="moon" size={24} color="black" style={{ marginTop: 35, marginRight: 10 }} /> : <Feather name="sun" size={24} color="black" style={{ marginTop: 35, marginRight: 10 }} />}
          <Switch trackColor={{ false: "#767577", true: "#81b0ff" }} onValueChange={toggleSwitch} value={darkTheme} style={styles.switch} >

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
            <View style={{flexDirection: 'row'}}>
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity style={styles.Button(darkTheme)} onPress={() => { updateProfilePicture() }}>
                  <AntDesign name="picture" size={50} color={darkTheme ? "white" : "#36454F"} />
                </TouchableOpacity>
                <Text style={styles.buttonText(darkTheme)}> Change Profile Picture </Text>
              </View>
              <View style={{ alignItems: 'center', marginTop: 40 }} >
                <TouchableOpacity style={styles.Button(darkTheme)} onPress={() => { verifyEmail() }}>
                  <MaterialIcons name="email" size={50} color={darkTheme ? "white" : "#36454F"} />
                </TouchableOpacity>
                <Text style={styles.buttonText(darkTheme)}> Verify Email</Text>
              </View>
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <TouchableOpacity style={styles.Button(darkTheme)} onPress={() => { updatePassword() }}>
                  <Entypo name="lock" size={50} color={darkTheme ? "white" : "#36454F"} />
                </TouchableOpacity>
                <Text style={styles.buttonText(darkTheme)}> Change Password </Text>
              </View>
            </View>
            <TouchableOpacity><Text>asfaf</Text></TouchableOpacity>
           
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
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: darkTheme ? '#36454F' : "#A9A9A9",


  }),
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 35
  },

  feathericon: {
    marginTop: 35,
    marginLeft: 30
  },
  switch: {
    marginTop: 35,
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
    backgroundColor: darkTheme ? "black" : "white"
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
    fontSize: 10,
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
    height: 100,
    backgroundColor: darkTheme ? "black" : "white",
    width: 100,
    borderRadius: 30,
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
    backgroundColor: darkTheme ? "#36454F" : "#A9A9A9",
    alignItems: 'center',
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  }),

})