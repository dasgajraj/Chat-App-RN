import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Go to Profile" onPress={() => navigation.navigate("Profile")}/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})