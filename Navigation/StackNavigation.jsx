import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen.jsx';
import ProfileScreen from '../Screens/ProfileScreen.jsx';
import LoadingScreen from '../Screens/LoadingScreen.jsx';
import Chat from '../Screens/Chat.jsx';
import Login from '../Screens/Login.jsx';
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
        <Stack.Navigator>
            {isLoading ? (
                <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            ) : (
                <Stack.Screen name="Login" component={Login} />
            )}

            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    );
}