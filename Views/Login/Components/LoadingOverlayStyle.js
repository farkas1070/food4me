import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      },
      container: {
        backgroundColor: '#fd5a43',
        borderRadius: 8,
        padding: 16,
        width: '100%',
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontWeight: 'bold',
        marginBottom: 8,
      },
      text:{
        
        fontSize: 22,
        color: "white",
        marginBottom: 10,
        textAlign: "center",
      }
})