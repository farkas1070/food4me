import { StyleSheet } from 'react-native'

export const generateStyles  = (darkTheme) => {
    return StyleSheet.create({
        headerContainer: (darkTheme) => ({
            width: '100%',
            height: "11%",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: darkTheme ? 'black' : "#fd5a43",
            borderBottomWidth: darkTheme ? 5 : 0,
            borderColor: darkTheme ? "#181616" : "transparent",
        
        
          }),
          headerText: {
            fontSize: 20,
            
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
          mainContainer: (darkTheme) => ({
            height: "89%",
            backgroundColor: darkTheme ? "black" : "white",
          }),
          questioncontainer: (darkTheme) => ({
            width: "100%",
            height: "100%",
            alignItems: 'center',
            justifyContent: 'center',
          }),
        
        
        
        
          quoteText: (darkTheme) => ({
            fontSize: 25,
            
            textAlign: "center",
            color: "#fff",
          }),
          button: (darkTheme) => ({
            marginTop: 30,
            width: "60%",
            height: 50,
            marginBottom: 50,
            backgroundColor: darkTheme ? "white" : "#fd5a43",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center"
          }),
          text: (darkTheme)=>({
            
            color:darkTheme? "black": "white",
            textAlign: "center"
          }),
          dontshowtext:{
            textAlign: "center",
            fontWeight: "700",
            marginTop: 30,
            marginLeft: 50,
            marginRight: 50,
            fontSize: 15,
            color: "black"
          }
    });
  };
