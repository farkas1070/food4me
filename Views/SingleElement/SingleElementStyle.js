import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    },
    topRightIcon: {
        top: -10,
        right: -10,
    },
    bottomLeftIcon: {
        bottom: -10,
        left: -10,
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 4 / 3, // Change this to match your image aspect ratio
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '120%',



    },
    noitemimage: {

        width: 300,
        height: 300
    },
    appBar: {

        backgroundColor: 'transparent',
        justifyContent: "flex-start",
        alignItems: 'center',
        height: 450,
        width: "100%",
        flexDirection: "column",
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,

        overflow: 'hidden',




    },
    bordercontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    border: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: 'grey',
        position: 'relative',
    },
    iconContainer: {
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: 'white',
    },
    surface: {


        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 20
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(253, 90, 67, 0.1)',

        overflow: 'hidden', // Orange with 50% opacity
    },
    fade: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'white',
        opacity: 0.5,
    },
})