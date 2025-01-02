import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

const LoadingScreen = () => {
    return (
        <View style={styles.view}>
            <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.bg} />
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.MainText}>Realtime Chat App - React Native</Text>
            <ActivityIndicator animating={true} color="#24386" size="large" style={styles.Loader} />
            <View style={styles.viewNormal}><Text style={styles.txt}>__DAS GAJRAJ SHARMA</Text></View>

        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    bg: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    logo: {
        width: '30%',
        height: '30%'
    },
    MainText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    Loader: {
        marginTop: 50
    },
    viewNormal: {
        position: 'absolute',
        bottom: "1%",
        right: "40%",
    },
    txt: {
        fontSize: 10,
        position: 'absolute',
        bottom: 10,
        Left: 100,
    },
})