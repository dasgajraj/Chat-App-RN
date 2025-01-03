import { StyleSheet, Text, View, Modal, Alert, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { firebaseConfig } from '../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'

const bg = require('../assets/images/bg.jpg')

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onHandleLogin = () => {
        if (email != "" && password != "") {
            signInWithWmailAndPassword(auth, email, password)
                .then(() => console.warn("Login Success"))
                .catch((err) => Alert.alert("Login Error", err.message));
        }
    };

    return (
        <View styles={styles.container} >
            <Image source={bg} style={styles.bg} />
            <View style={styles.blank}>
                <SafeAreaView style={styles.form}>
                    <Text style={styles.title}>Login</Text>
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
                        keyboardType="email-address"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Text style={styles.label}>Email</Text>
                </SafeAreaView>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({

})