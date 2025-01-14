import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { auth, realtimeDb } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  // Fetch list of users from Firebase
  useEffect(() => {
    const usersRef = ref(realtimeDb, "users");
    onValue(usersRef, (snapshot) => {
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

    return () => {
      // Cleanup listener on unmount
      const usersRef = ref(realtimeDb, "users");
      off(usersRef);
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
});

export default Home;
