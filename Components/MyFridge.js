import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MyFridge = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>MyFridge</Text>
    </View>
  )
}

export default MyFridge

const styles = StyleSheet.create({
  mainContainer:{
    width:'100%',
    height:'100%',
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
  }
})