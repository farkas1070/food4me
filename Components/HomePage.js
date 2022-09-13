import React from 'react';
import { StyleSheet, View, Text, Dimensions,TouchableOpacity,Switch } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Feather } from '@expo/vector-icons'; 
function WavyHeader({ customStyles }) {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: '#fd5a43', height: 140 }}>
        <Svg
          height="80%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: 'absolute', top: 120 }}
        >
          <Path
            fill="#fd5a43"
            d="M0,288L14.1,250.7C28.2,213,56,139,85,101.3C112.9,64,141,64,169,58.7C197.6,53,226,43,254,64C282.4,85,311,139,339,160C367.1,181,395,171,424,176C451.8,181,480,203,508,197.3C536.5,192,565,160,593,165.3C621.2,171,649,213,678,229.3C705.9,245,734,235,762,229.3C790.6,224,819,224,847,218.7C875.3,213,904,203,932,202.7C960,203,988,213,1016,186.7C1044.7,160,1073,96,1101,85.3C1129.4,75,1158,117,1186,144C1214.1,171,1242,181,1271,192C1298.8,203,1327,213,1355,224C1383.5,235,1412,245,1426,250.7L1440,256L1440,0L1425.9,0C1411.8,0,1384,0,1355,0C1327.1,0,1299,0,1271,0C1242.4,0,1214,0,1186,0C1157.6,0,1129,0,1101,0C1072.9,0,1045,0,1016,0C988.2,0,960,0,932,0C903.5,0,875,0,847,0C818.8,0,791,0,762,0C734.1,0,706,0,678,0C649.4,0,621,0,593,0C564.7,0,536,0,508,0C480,0,452,0,424,0C395.3,0,367,0,339,0C310.6,0,282,0,254,0C225.9,0,198,0,169,0C141.2,0,113,0,85,0C56.5,0,28,0,14,0L0,0Z"
          />
        </Svg>
      </View>
    </View>
  );
}

export default function ScreenOne({navigation}) {

  const openMenu =() => {
    navigation.openDrawer();
  }


  return (
    <View style={styles.container}>
      <WavyHeader customStyles={styles.svgCurve} />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() =>{openMenu()}}><Feather  style={styles.feathericon} name="menu" size={35} color="white" /></TouchableOpacity>
        <Text style={styles.headerText}>Welcome To Food4Me!</Text>
        <Switch style={styles.switch}></Switch>
      </View>
      <View style={styles.bodyContainer}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
   
    marginHorizontal: 20
  },
  headerText: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 35
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  feathericon:{
    marginTop: 35,
    marginRight:30

  },
  switch:{
    marginTop: 35,
    marginLeft:30,
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }]
  },
  bodyContainer:{
    padding:10,
    marginTop: 180,
    borderRadius: 50,
    width: "100%",
    height: "60%",

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fd5a43'
  }
  
});