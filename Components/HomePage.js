import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { themeContext, userContext } from "../Components/SetData.js"
import { useContext } from "react";
import SecondLogo from "../assets/second.png"
import FirstLogo from "../assets/first.jpeg"
import ThirdLogo from "../assets/third.jpg"
import homepicture from "../assets/homepicture.jpg"


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
        <TouchableOpacity onPress={() => { openMenu() }}><Feather style={styles.feathericon} name="menu" size={35} color={darkTheme ? "#fd5a43" : "white"} /></TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          {darkTheme ? <Feather name="moon" size={25} color={darkTheme ? "#fd5a43" : "white"} style={{ marginTop: 25, marginRight: 10 }} /> : <Feather name="sun" size={25} color={darkTheme ? "#fd5a43" : "white"} style={{ marginTop: 25, marginRight: 10 }} />}
          <Switch trackColor={{ false: "#767577", true: "#661b1c" }} thumbColor="white" onValueChange={toggleSwitch} value={darkTheme} style={styles.switch} >

          </Switch>
        </View>
      </View>
      <View style={{ height: "88%", width: "100%" }}>
        <ScrollView style={styles.bodyContainer(darkTheme)}>
          <View>

            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20, height: 150 }}>
              {user.photoURL == null ? <MaterialIcons name="account-circle" size={100} color="black" /> : <Image
                style={styles.profileImage(darkTheme)}
                source={{ uri: user.photoURL }}
              />}
              <Text style={styles.text(darkTheme)}>Welcome Back {user.displayName}</Text>
            </View>
            <Text style={styles.whatwillyoudotext(darkTheme)} >What will you do today?</Text>
            <SafeAreaView style={styles.container}>
              <ScrollView horizontal={true} style={styles.scrollView}>
                <TouchableOpacity onPress={() => { navigation.navigate("RecipeFinder") }}>
                  <View style={styles.innerBox}>
                    <View style={{ backgroundColor: '#fd5a43', borderRadius: 30 }}>
                      <View style={{ backgroundColor: '#fd5a43', borderTopEndRadius: 30, borderTopStartRadius: 30, }}>
                        <Image
                          style={styles.image}
                          source={FirstLogo}
                        />
                      </View>
                      <View style={{ backgroundColor: '#fd5a43', width: "100%", height: 80, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Find A recipe</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("MenuCreator") }} >
                  <View style={styles.innerBox}>
                    <View style={{ backgroundColor: '#fd5a43', borderRadius: 30 }}>
                      <View style={{ backgroundColor: '#fd5a43', borderTopEndRadius: 30, borderTopStartRadius: 30, }}>
                        <Image
                          style={styles.image}
                          source={SecondLogo}
                        />
                      </View>
                      <View style={{ backgroundColor: '#fd5a43', width: "100%", height: 80, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Create a Menu</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("RecipeBrowser") }} >
                  <View style={styles.innerBox}>
                    <View style={{ backgroundColor: '#fd5a43', borderRadius: 30 }}>
                      <View style={{ backgroundColor: '#fd5a43', borderTopEndRadius: 30, borderTopStartRadius: 30, }}>
                        <Image
                          style={styles.image}
                          source={ThirdLogo}
                        />
                      </View>
                      <View style={{ backgroundColor: '#fd5a43', width: "100%", height: 80, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Browse Recipes</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

              </ScrollView>

              <View style={styles.homepictureview(darkTheme)}>

                <Image
                  style={styles.homepic}
                  source={homepicture}
                />
                <Text style={{ marginTop: 20, textAlign: 'center', padding: 30, fontWeight: 'bold', color: darkTheme ? 'white' : '#fd5a43' }}>Pick the foods you love, and make them with detailed instructions!</Text>
              </View>

            </SafeAreaView>
          </View>
        </ScrollView>
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
    height: "12%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: darkTheme ? 'black' : "#fd5a43",
    borderBottomWidth: darkTheme ? 5 : 0,
    borderColor: darkTheme ? "#181616" : "transparent",

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

    backgroundColor: darkTheme ? 'black' : "white"

  }),
  text: (darkTheme) => ({
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 30,
    color: darkTheme ? "white" : "black",

  }),

  scrollView: {
    marginTop: 30,
    marginBottom: 20,
    height: 250,

    marginHorizontal: 20,
    borderRadius: 20,
  },
  innerBox: {
    padding: 5,
    width: 160,
    height: "100%",

  },
  profileImage: (darkTheme) => ({
    width: 100,
    height: 100,
    borderRadius: 400 / 2,
    borderWidth: 2,
    borderColor: darkTheme ? "white" : "black"

  }),
  image: {
    width: "100%",
    height: 130,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  whatwillyoudotext: (darkTheme) => ({
    marginTop: 50,
    marginLeft: 30,
    fontSize: 15,
    fontWeight: '700',
    color: darkTheme ? "white" : "black"
  }),
  posterimage: {
    width: "100%",
    height: 200,
  },
  homepictureview: (darkTheme) => ({
    borderTopColor: darkTheme ? '#fd5a43' : '#d3d3d3',
    borderTopWidth: 1,
    alignItems: 'center',

    width: '100%',
    height: 400,
    marginTop: 30,
    backgroundImage: 'url'
  }),
  homepic: {
    width: "80%",
    height: 200,
    borderRadius: 10,
    marginTop: 50,
  }
});