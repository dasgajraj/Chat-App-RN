import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native'

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="Go To Profile" onPress={() => navigation.navigate("Home")} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})