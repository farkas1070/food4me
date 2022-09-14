import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Switch } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { themeContext } from "../Components/SetData.js"
import { useState, useContext } from "react";


export default function ScreenOne({ navigation }) {

  const [darkTheme, setDarkTheme] = useContext(themeContext)


  const toggleSwitch = () => setDarkTheme(previousState => !previousState);

  const openMenu = () => {
    navigation.openDrawer();
  }


  return (
    <View style={styles.container}>

      <View style={styles.headerContainer(darkTheme)}>
        <TouchableOpacity onPress={() => { openMenu() }}><Feather style={styles.feathericon} name="menu" size={35} color="black"  /></TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          { darkTheme? <Feather name="moon" size={24} color="black" style={{marginTop: 35, marginRight:10}} /> : <Feather name="sun" size={24} color="black" style={{marginTop: 35, marginRight:10}} />}
          <Switch trackColor={{ false: "#767577", true: "#81b0ff" }} onValueChange={toggleSwitch} value={darkTheme} style={styles.switch} >

          </Switch>
        </View>
      </View>
      <View style={styles.bodyContainer(darkTheme)}>
        <View style={styles.innerbody}>
          <Text style={styles.text}>Welcome Back User!</Text>
          <View ><Text>sdfgs</Text></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: (darkTheme) => ({
    flex:1,
    backgroundColor: darkTheme ? "white" : '#fd5a43',
    padding: 25
  }),
  headerContainer: (darkTheme) => ({
    width: '100%',
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: darkTheme ? '#fd5a43' : "white",


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
    marginLeft:40,
    marginTop:50
  }


});