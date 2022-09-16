import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RecipeBrowser = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>RecipeBrowser</Text>
    </View>
  )
}

export default RecipeBrowser

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        padding:20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"white"
    }
})