import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow:1,


        backgroundColor: "white"
    },
    AssetImage: {
        height: 50,
        width: 50
    },
    gradient: {
        width: '100%',
        alignItems: 'center'


    },
    surface: {
        height: 80,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,



        flexDirection: 'row',
    },
    bigSurface: {


        width: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        elevation: 10,
        borderRadius: 30,
        marginBottom: 20,
        backgroundColor: '#ffffff',


        flexDirection: 'column',
    },
    divider: {
        width: "100%",
        flex: 1,

    },
    
    profileImage: {
        width: 150,
        height: 150,
        marginBottom: 50,
        borderRadius: 400 / 2,

    },
    
    
})