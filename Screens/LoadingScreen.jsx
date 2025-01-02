import { StyleSheet, Text, View, Image, ImageBackground, StatusBar, Animated } from 'react-native';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';

const LoadingScreen = () => {
    const logoScale = new Animated.Value(0);

    useEffect(() => {
        Animated.spring(logoScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.view}>
            <StatusBar hidden />
            <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.bg} />
            <Animated.Image source={require('../assets/images/logo.png')} style={[styles.logo, { transform: [{ scale: logoScale }] }]} />
            <Text style={styles.MainText}>Bubble Link</Text>
            <Text style={styles.MainSubText}>Powered by React Native</Text>
            <ActivityIndicator animating={true} color="#4A90E7" size="small" style={styles.Loader} />

            <View style={styles.footerView}>
                <Text style={styles.footerText}>__DAS GAJRAJ SHARMA</Text>
            </View>
        </View>
    );
};

export default LoadingScreen;

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
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
        elevation: 10,
    },
    MainText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4A90E2',
        marginBottom: 10,
    },
    MainSubText: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 30,
    },
    Loader: {
        marginTop: 20,
    },
    footerView: {
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#95a5a6',
    },
});