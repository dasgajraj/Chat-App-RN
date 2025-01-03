import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native'

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.view}>
      <Text>ProfileScreen</Text>
      <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.bg} />
      <Button title="Go To Profile" onPress={() => navigation.navigate("Home")} />

      <Button title="Go to Chat" onPress={() => navigation.navigate("Chat")} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
})