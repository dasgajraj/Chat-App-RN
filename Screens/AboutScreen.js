import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const AboutScreen = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>AboutScreen</Text>
      <Button onPress={()=>navigation.navigate('Home')} title="Go to Home" />
    </View>
  )
}

export default AboutScreen

const styles = StyleSheet.create({})