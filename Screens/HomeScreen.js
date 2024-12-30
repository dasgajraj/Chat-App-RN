import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
            <Button onPress={()=>navigation.navigate('About')} title="Go to Home" />
      
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})