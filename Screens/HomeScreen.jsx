import { StyleSheet, Text, View, Button, ImageBackground, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'

const HomeScreen = () => {
  const navigation = useNavigation();
  const onHandleSignOut = async () => {
    try {
      await auth.signOut();
      Alert.alert("Sign Out", "You have been signed out");
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.view}>
      <Text>HomeScreen</Text>
      <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.bg} />
      <Button title="Go to Profile" onPress={() => navigation.navigate("Profile")}/>
      <Button title="Go to Chat" onPress={() => navigation.navigate("Chat")}/>
      <Button title="Sign Out" onPress={onHandleSignOut}/>
    </View>
  )
}

export default HomeScreen

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