import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, realtimeDb } from "../firebaseConfig";
import { ref, set } from "firebase/database";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);  // This controls whether we're signing up or signing in
  const navigation = useNavigation();

  // Function for handling sign-up
  const handleSignUp = () => {
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          // Create a user record in RTDB
          const userRef = ref(realtimeDb, `users/${user.uid}`);
          set(userRef, {
            email: user.email,
          })
            .then(() => {
              // Navigate to Home after adding user to RTDB
              navigation.navigate("Home");
            })
            .catch((error) => {
              Alert.alert("Error", "Failed to store user data in Realtime Database");
            });
        })
        .catch((error) => {
          Alert.alert("Sign Up Failed", "Please try again with a different email");
        });
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  // Function for handling sign-in
  const handleSignIn = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Navigate to Home after successful sign-in
          navigation.navigate("Home");
        })
        .catch((error) => {
          Alert.alert("Sign In Failed", "Invalid email or password");
        });
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.formBox}>
          <Text style={styles.title}>{isLoginMode ? "Welcome Back" : "Create Account"}</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.mainButton} onPress={isLoginMode ? handleSignIn : handleSignUp}>
            <Text style={styles.buttonText}>{isLoginMode ? "Login" : "Sign Up"}</Text>
          </TouchableOpacity>

          <View style={styles.switchModeContainer}>
            <Text>
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={() => setIsLoginMode(!isLoginMode)}>
              <Text style={styles.switchModeText}>{isLoginMode ? "Sign Up" : "Login"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
    justifyContent: "center",
  },
  formBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },
  mainButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchModeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  switchModeText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
