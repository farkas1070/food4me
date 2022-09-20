import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ImageBackground, Dimensions, KeyboardAvoidingView } from 'react-native'
import React, {  useContext } from 'react'
import { themeContext } from "../Components/SetData.js"
import Svg, { Path } from 'react-native-svg';

const WavyHeaderComponent = ({ customStyles }) => {
    return (
        <View style={customStyles}>
            <View style={{ backgroundColor: '#fd5a43', height: 120 }}>
                <Svg
                    height="90%"
                    width="100%"
                    viewBox="0 0 1440 320"
                    style={{ position: 'absolute', top: 100 }}
                >
                    <Path
                        fill="#fd5a43"
                        d="M0,256L8.9,229.3C17.8,203,36,149,53,144C71.1,139,89,181,107,197.3C124.4,213,142,203,160,170.7C177.8,139,196,85,213,64C231.1,43,249,53,267,69.3C284.4,85,302,107,320,122.7C337.8,139,356,149,373,138.7C391.1,128,409,96,427,106.7C444.4,117,462,171,480,176C497.8,181,516,139,533,149.3C551.1,160,569,224,587,245.3C604.4,267,622,245,640,208C657.8,171,676,117,693,96C711.1,75,729,85,747,128C764.4,171,782,245,800,272C817.8,299,836,277,853,245.3C871.1,213,889,171,907,133.3C924.4,96,942,64,960,48C977.8,32,996,32,1013,64C1031.1,96,1049,160,1067,170.7C1084.4,181,1102,139,1120,106.7C1137.8,75,1156,53,1173,48C1191.1,43,1209,53,1227,80C1244.4,107,1262,149,1280,176C1297.8,203,1316,213,1333,192C1351.1,171,1369,117,1387,128C1404.4,139,1422,213,1431,250.7L1440,288L1440,0L1431.1,0C1422.2,0,1404,0,1387,0C1368.9,0,1351,0,1333,0C1315.6,0,1298,0,1280,0C1262.2,0,1244,0,1227,0C1208.9,0,1191,0,1173,0C1155.6,0,1138,0,1120,0C1102.2,0,1084,0,1067,0C1048.9,0,1031,0,1013,0C995.6,0,978,0,960,0C942.2,0,924,0,907,0C888.9,0,871,0,853,0C835.6,0,818,0,800,0C782.2,0,764,0,747,0C728.9,0,711,0,693,0C675.6,0,658,0,640,0C622.2,0,604,0,587,0C568.9,0,551,0,533,0C515.6,0,498,0,480,0C462.2,0,444,0,427,0C408.9,0,391,0,373,0C355.6,0,338,0,320,0C302.2,0,284,0,267,0C248.9,0,231,0,213,0C195.6,0,178,0,160,0C142.2,0,124,0,107,0C88.9,0,71,0,53,0C35.6,0,18,0,9,0L0,0Z"
                    />
                </Svg>
            </View>
        </View>
    )
}

const GetRandomFood = ({ navigation, route }) => {
    const { item } = route.params;
    const [darkTheme] = useContext(themeContext)
    


    return (
        <KeyboardAvoidingView style={styles.mainContainer(darkTheme)}>
            <ScrollView contentContainerStyle={styles.randomContainer}>
                <WavyHeaderComponent customStyles={styles.svgCurve} />
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>{item.name}</Text>

                </View>


                <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                <Text style={styles.descriptiontext(darkTheme)}>Description: {item.description}</Text>
                <Text style={styles.difficultytext(darkTheme)}>Dish Difficulty: {item.difficulty}</Text>
                <Text style={styles.typetext(darkTheme)}>Dish Type: {item.type}</Text>
                <Text style={styles.upperrecipetext(darkTheme)}>Recipe for this Meal:</Text>
                <Text style={styles.recipeText(darkTheme)}>{item.recipe}</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.gobackButton(darkTheme)} onPress={() => { navigation.navigate("Homepage") }}><Text style={styles.gobackbuttontext(darkTheme)}>Go back</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.gobackButton(darkTheme)} onPress={() => { navigation.navigate("RecipeBrowser") }}><Text style={styles.gobackbuttontext(darkTheme)}>Go To Browser</Text></TouchableOpacity>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default GetRandomFood

const styles = StyleSheet.create({
    mainContainer: (darkTheme) => ({
        flex: 1,
        backgroundColor: darkTheme ? "black" : "white",
      }),
      questioncontainer: (darkTheme) => ({
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: darkTheme ? "black" : "white"
      }),
      headerContainer: {
        marginTop: 20,
        marginHorizontal: 10
      },
      svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width
      },
      headerText: {
        fontSize: 25,
        fontWeight: 'bold',
    
        color: '#fff',
        textAlign: 'center',
        marginTop: 35,
        marginBottom: 100
      },
    
      quoteText: (darkTheme) => ({
        fontSize: 25,
        fontWeight: "700",
        textAlign: "center",
        color: "#fff",
      }),
      button: (darkTheme) => ({
        marginTop: 50,
        width: "80%",
        height: 50,
        backgroundColor: darkTheme ? "white" : "black",
        borderRadius: 20,
    
        justifyContent: "center",
        alignItems: "center"
      }),
      text: {
        fontweight: "700",
        color: "#fd5a43",
        textAlign: "center"
      },
      image: {
        marginTop: 50,
        width: "90%",
        height: 250,
        borderRadius: 10,
    
      },
      randomContainer: {
        shadowColor: "white",
        shadowOffset: {
          width: 20,
          height: 20,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 6,
    
      },
    
      buttonContainer: {
        padding: 20,
        height: 100,
        marginTop: 50,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center'
    
    
      },
      gobackButton: (darkTheme) => ({
    
        marginLeft:20,
        marginRight:20,
        width: "40%",
        height: 50,
        backgroundColor: darkTheme ? "white" : "#fd5a43",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
      }),
    
      recipeText:(darkTheme) => ({
        marginLeft: 30,
        marginRight: 20,
        marginTop: 20,
        fontSize: 16,
        color: darkTheme ? "white" : "black"
      }),
      gobackbuttontext: (darkTheme) => ({
        color: darkTheme ? "black" : "white",
        fontSize: 16,
        fontWeight: "700",
        
      }),
      descriptiontext: (darkTheme) => ({
        marginTop: 30,
        marginLeft: 30,
        fontWeight: "700",
        fontSize: 15,
        color: darkTheme ? "white" : "black"
      }),
      difficultytext: (darkTheme) => ({
        marginTop: 30,
        marginLeft: 30,
        fontWeight: "700",
        fontSize: 20,
        color: darkTheme ? "white" : "black"
      }),
      typetext: (darkTheme) => ({
        marginTop: 30,
        marginLeft: 30,
        fontWeight: "700",
        fontSize: 15,
        color: darkTheme ? "white" : "black"
      }),
      upperrecipetext: (darkTheme) => ({
        marginTop: 10,
        marginLeft: 30,
        fontWeight: "700",
        fontSize: 13,
        color: darkTheme ? "white" : "black"
      }),
      dontshowtext: (darkTheme) => ({
        textAlign: "center",
        fontWeight: "700",
         marginLeft: 50,
          marginRight: 50,
           fontSize: 18,
           color: darkTheme ? "white" : "black"
      })
})