import { StyleSheet,  } from 'react-native'


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    gridItem: {
      flex: 1,
      aspectRatio: 1, // 1:1 aspect ratio for square grid items
      margin: 5,
      borderRadius: 10,
      overflow: 'hidden',
    },
    fullWidth: {
      flex: 3, // Takes up full width
    },
    imageBackground: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      color: 'white',
      fontWeight: 'bold',
    },
  });