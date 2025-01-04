import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen.jsx";
import LoadingScreen from "../Screens/LoadingScreen.jsx";
import Chat from "../Screens/Chat.jsx";
import Login from "../Screens/Login.jsx";
import React, { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";  // Firebase Auth setup
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

const Stack = createStackNavigator();

const AuthenticatedUserContext = createContext(null);

// AuthenticatedUserProvider to provide authentication state throughout the app
const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export default function StackNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user data from AsyncStorage
    const loadUserFromStorage = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));  // If user is in AsyncStorage, set it to state
      }
    };

    loadUserFromStorage();  // Run on load

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);  // Set the user to logged-in user
        AsyncStorage.setItem('user', JSON.stringify(user));  // Save user to AsyncStorage
      } else {
        setUser(null);  // If no user is logged in, clear AsyncStorage
        AsyncStorage.removeItem('user');
      }
      setIsLoading(false);  // Hide the loading screen after authentication check
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  // If the app is still checking for authentication status, show the loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Based on the user state, navigate either to the Home screen or Login screen
  return (
    <Stack.Navigator initialRouteName={user ? "Home" : "Login"} screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
