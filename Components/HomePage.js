import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch,Image } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { themeContext } from "../Components/SetData.js"
import { useState, useContext } from "react";
import SecondLogo from "../second.png"
import FirstLogo from "../first.jpeg"
export default function ScreenOne({ navigation }) {

  const [darkTheme, setDarkTheme] = useContext(themeContext)


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
          <Text style={styles.text}>Welcome Back User!</Text>
          <SafeAreaView style={styles.container}>
            <ScrollView horizontal="true" style={styles.scrollView(darkTheme)}>
              <View style={styles.innerBox(darkTheme)}>
                <Image
                  style={styles.image}
                  source={FirstLogo}
                />
                <View style={{backgroundColor: 'white', width:"100%", height:80,justifyContent: 'center',alignItems: 'center',borderBottomLeftRadius:20,borderBottomRightRadius:20}}></View>
              </View>
              
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
    height: '12%',
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
    marginTop: 35,
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
    marginLeft: 40,
    marginTop: 50
  },
  scrollView: (darkTheme) => ({
    marginTop: 50,
    padding: 20,
    height: 250,
    backgroundColor: darkTheme ? "black" : '#fd5a43',
    marginHorizontal: 20,
    borderRadius: 20,
  }),
  innerBox: (darkTheme) => ({
    
    width: 150,
    height: "100%",
  }),
  image: {
    width:"100%",
    height:130,
  }



});