import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "../Screens/LoadingScreen.jsx";
import Chat from "../Screens/Chat.jsx";
import Login from "../Screens/Login.jsx";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Stack = createStackNavigator();

export default function StackNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={user ? "Chat" : "Login"}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: "#e5e5ea",
        },
        headerTitleStyle: {
          color: "#1c1c1e",
          fontSize: 18,
          fontWeight: "600",
        },
      }}
    >
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerBackTitle: true,
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
