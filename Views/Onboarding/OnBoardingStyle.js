import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    
      },
      AssetImage: {
        width: '100%',
        height: 250,
        marginTop: 60
      },
      topText: {
        fontFamily: 'CustomFont',
        fontSize: 30,
        color: 'black',
        textAlign: 'center'
    
      },
      viewPager: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    
      },
      page: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Orange with 50% opacity
      },
      imagebackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
})