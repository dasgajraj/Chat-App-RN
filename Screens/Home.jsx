import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { auth, realtimeDb } from "../firebaseConfig";
import { ref, onValue } from "firebase/database"; // off is part of the older Firebase API
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { signOut } from "firebase/auth";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
    navigation.navigate("Login");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onSignOut} style={styles.logoutButton}>
          <AntDesign name="logout" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: "#6366F1", // Custom background color
        elevation: 0, // Removing shadow in Android
      },
      headerTintColor: "#fff", // White color for title and icons
      headerTitleStyle: {
        fontWeight: "bold", // Make the title bold
        fontSize: 20, // Adjust the font size for the title
      },
    });
  }, [navigation]);

  // Fetch list of users from Firebase
  useEffect(() => {
    const usersRef = ref(realtimeDb, "users");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const usersData = [];
      snapshot.forEach((child) => {
        const user = child.val();
        // Check if email exists and exclude the current user
        if (user.email && user.email !== auth.currentUser.email) {
          usersData.push({ id: child.key, email: user.email });
        }
      });
      setUsers(usersData); // Update the state with the fetched users
    });

    // Firebase v9+ update: Unsubscribe by using the cleanup function
    return () => {
      unsubscribe(); // Calling unsubscribe function instead of off() to remove the listener
    };
  }, []); // Empty dependency array ensures this runs once on component mount

  const navigateToChat = (recipientId, recipientEmail) => {
    navigation.navigate("Chat", { recipientId, recipientEmail });
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => navigateToChat(item.id, item.email)}
    >
      <Text style={styles.userText}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Users</Text>
        {users.length > 0 ? (
          <FlatList
            data={users}
            renderItem={renderUser}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text>No users available.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8FAFC",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  userItem: {
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 5,
    elevation: 2,
  },
  userText: {
    fontSize: 16,
  },
  logoutButton: {
    marginRight: 12,
  },
});

export default Home;
