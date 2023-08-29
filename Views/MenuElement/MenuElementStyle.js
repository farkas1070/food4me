import { StyleSheet } from 'react-native'

export const generateStyles  = (darkTheme) => {
    return StyleSheet.create({
        maincontainer: (darkTheme) => ({
            width: '100%',
            height: '100%',
            
            backgroundColor: darkTheme ? "black" : "white",
            
          }),
          carouselcontainer: (darkTheme) => ({
            flex: 1,
            borderWidth: 1,
            justifyContent: 'center',
          }),
          backgroundimage: {
            width: '100%',
            height: '100%',
            
            flexDirection: 'row'
          },
          image: {
            marginTop: 30,
            width: '70%',
            height: 200,
            borderRadius:20,
          },
          leftbuttoncontainer: (darkTheme) => ({
            width:'10%',
            alignItems: 'center',
            justifyContent: 'center'
        
          }),
          rightbuttoncontainer: (darkTheme) => ({
            width:'10%',
            alignItems: 'center',
            justifyContent: 'center'
          }),
          toptext: (darkTheme) => ({
            textAlign: 'center',
             fontSize: 20,
             marginTop:50,
             fontWeight: 'bold',
             color:darkTheme? "white" : "black"
          }),
          leftbutton: (darkTheme) => ({
            backgroundColor:'white',
            width:'100%',
            height:200,
            alignItems:"center",
            justifyContent: 'center',
            borderTopEndRadius:30,
            borderBottomRightRadius:30
          }),
          rightbutton: (darkTheme) => ({
            backgroundColor:'white',
            width:'100%',
            height:200,
            alignItems:"center",
            justifyContent: 'center',
            borderTopStartRadius:30,
            borderBottomLeftRadius:30
          }),
          difficultytext: (darkTheme) => ({
            alignItems: 'center',
            marginTop: 20,
            marginBottom:10,
            fontWeight: 'bold',
            color:darkTheme? "white" : "black"
          }),
          descriptiontext: (darkTheme) => ({
            alignItems: 'center',
            marginTop: 20,
            marginBottom:10,
            fontWeight: 'bold',
            color:darkTheme? "white" : "black"
          }),
          recipebutton: (darkTheme) => ({
            backgroundColor:"white",
            marginBottom: 30,
            width:120,
            height:60,
            borderRadius:30,
            justifyContent: 'center',
            alignItems:"center",
            padding:10,
            borderWidth:2,
            BorderColor:"black"
          })
    });
  };
