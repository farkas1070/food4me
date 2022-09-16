import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { themeContext, userContext } from "../Components/SetData.js"
import { useState, useContext } from "react";
import SecondLogo from "../second.png"
import FirstLogo from "../first.jpeg"
export default function ScreenOne({ navigation }) {

  const [darkTheme, setDarkTheme] = useContext(themeContext)
  const [user, setUser] = useContext(userContext)

  const toggleSwitch = () => setDarkTheme(previousState => !previousState);

  const openMenu = () => {
    navigation.openDrawer();
  }


  return (
    <View style={styles.container}>

      <View style={styles.headerContainer(darkTheme)}>
        <TouchableOpacity onPress={() => { openMenu() }}><Feather style={styles.feathericon} name="menu" size={35} color="white" /></TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          {darkTheme ? <Feather name="moon" size={25} color="white" style={{ marginTop: 25, marginRight: 10 }} /> : <Feather name="sun" size={25} color="white" style={{ marginTop: 25, marginRight: 10 }} />}
          <Switch trackColor={{ false: "#767577", true: "#661b1c" }} thumbColor="white" onValueChange={toggleSwitch} value={darkTheme} style={styles.switch} >

          </Switch>
        </View>
      </View>
      <View style={styles.bodyContainer(darkTheme)}>
        <View style={styles.innerbody}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20, height: 150 }}>
            {user.photoURL == null ? <MaterialIcons name="account-circle" size={100} color="black" /> : <Image
              style={styles.profileImage}
              source={{ uri: user.photoURL }}
            />}
            <Text style={styles.text}>Welcome Back {user.displayName}</Text>
          </View>
          <Text style={{ marginTop: 50, marginLeft: 30 }} >What will you do today?</Text>
          <SafeAreaView style={styles.container}>
            <ScrollView horizontal={true} style={styles.scrollView(darkTheme)}>
              <TouchableOpacity>
                <View style={styles.innerBox(darkTheme)}>
                  <View style={{ backgroundColor: '#fd5a43', borderTopEndRadius: 30, borderTopStartRadius: 30, }}>
                    <Image
                      style={styles.image}
                      source={FirstLogo}
                    />
                  </View>
                  <View style={{ backgroundColor: '#fd5a43', width: "100%", height: 80, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                    <Text>Find A recipe</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.innerBox(darkTheme)}>
                  <View style={{ backgroundColor: '#fd5a43', borderTopEndRadius: 30, borderTopStartRadius: 30, }}>
                    <Image
                      style={styles.image}
                      source={FirstLogo}
                    />
                  </View>
                  <View style={{ backgroundColor: '#fd5a43', width: "100%", height: 80, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                    <Text>Find A recipe</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.innerBox(darkTheme)}>
                  <View style={{ backgroundColor: '#fd5a43', borderTopEndRadius: 30, borderTopStartRadius: 30, }}>
                    <Image
                      style={styles.image}
                      source={FirstLogo}
                    />
                  </View>
                  <View style={{ backgroundColor: '#fd5a43', width: "100%", height: 80, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                    <Text>Find A recipe</Text>
                  </View>
                </View>
              </TouchableOpacity>

            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: (darkTheme) => ({
    flex: 1,
    backgroundColor: darkTheme ? "white" : '#fd5a43',
    padding: 25
  }),
  headerContainer: (darkTheme) => ({
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: darkTheme ? '#fd5a43' : "#fd5a43",


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
    marginTop: 25,
    marginRight: 25,
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }]
  },
  bodyContainer: (darkTheme) => ({

    width: "100%",
    height: "88%",

    backgroundColor: darkTheme ? '#fd5a43' : "white"
  }),
  innerbody: {

  },
  text: {
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 30,

  },
  scrollView: (darkTheme) => ({
    marginTop: 10,
    padding: 10,
    height: 250,

    marginHorizontal: 20,
    borderRadius: 20,
  }),
  innerBox: (darkTheme) => ({

    width: 160,
    height: "100%",
  }),
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 400 / 2,

  },
  image: {
    width: "100%",
    height: 130,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

  }



});