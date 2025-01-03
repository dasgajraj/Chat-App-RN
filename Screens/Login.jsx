import { StyleSheet, Text, View, Modal, Alert, TouchableOpacity, SafeAreaView, TextInput, Image,Button } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import {useNavigation} from '@react-navigation/native';

const bg = require('../assets/images/bg.jpg')

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[isLogin,setIsLogin]=useState(true);

const navigation=useNavigation();

    const onHandleLogin = () => {
        if (email != "" && password != "") {
            signInWithEmailAndPassword(auth, email, password)
                .then(() =>navigation.navigate("Home")
                )
                .catch((err) => Alert.alert("Login Error", err.message));
        }
    };
    const onHandleSignIn = () => {
        if (email != "" && password != "") {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() =>navigation.navigate("Home")
                )
                .catch((err) => Alert.alert("Login Error", err.message));
        }
    };
   

    return (
        <SafeAreaView style={styles.container} >
            <Image source={bg} style={styles.bg} />
            <View style={styles.blank}>
                <SafeAreaView style={styles.form}>
                    <Text style={styles.title}>{isLogin?'Login':'Sign Up'}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Email'
                        autoCapitalize='none'
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Password'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    {isLogin ? (
                        <Button onPress={onHandleLogin} title="Login" color="green"/>
                    ) : (
                        <Button onPress={onHandleSignIn} title="Sign Up" color="green"/>
                    )}
                    <Text>Don't Have Account ? <TouchableOpacity onPress={()=> setIsLogin(!isLogin)}><Text>{isLogin?'Sign Up':'Login'}</Text></TouchableOpacity></Text>
                </SafeAreaView>

            </View>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#f2f2f2'
    },
    bg:{
        width:"100%",
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        top: 0,
        left: 0
    },
    blank:{
        width:"100%",
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    form:{
        width: '80%',
        height: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333'
    },
    input:{
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5
    }
})