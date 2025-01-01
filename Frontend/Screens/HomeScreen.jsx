import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import {ActivityIndicator, Button} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation =useNavigation();
  return (
    <View>
      <Text>HomeScreen</Text>
        <Button title="Go to Profile" onPress={()=>navigation.navigate("Profile")} 
            mode="Loading" />
            <ActivityIndicator animating={true} color="red"  size="large"/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})