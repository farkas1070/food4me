import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    background:{
        width:'100%',
        height:'100%'
    },
    container: {
    flex: 1,
    padding: 5,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    borderRadius: 8,
    margin: 4,
  },
})