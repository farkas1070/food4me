import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    subInformationView:{
        flexDirection:'row',
        width:'90%',
        alignItems:'center',
        justifyContent:'space-between',
        
        paddingBottom:5,
        borderBottomColor:'grey',
        marginBottom:20,
        borderBottomWidth:1
      },
      icon:{
        width:30,height:30
      },
      informationText:{
        fontSize:16,
        marginLeft:10,
        marginBottom:2,
        color:'#989898'
      },
      leftContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-end'
      },
      rightContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-end'
      },
      rightIcon:{
        marginLeft:5
      },
      changeButton:{
        backgroundColor:'#fd5a43',
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        width:35,height:35,
        marginLeft:10
        

      }
})