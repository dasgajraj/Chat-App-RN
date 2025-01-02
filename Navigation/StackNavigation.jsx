import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen.jsx';
import ProfileScreen from '../Screens/ProfileScreen.jsx';
import LoadingScreen from '../Screens/LoadingScreen.jsx';
import React, { useState, useEffect } from 'react';

const Stack = createStackNavigator();

export default function StackNavigation() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Stack.Navigator initialRouteName="LoadingScreen" screenOptions={{ headerShown: true }}>
            {isLoading ? (
                <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            ) : (
                <Stack.Screen name="Home" component={HomeScreen} />
            )}
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
}