import React, { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { auth, realtimeDb } from "../firebaseConfig";
import { ref, onValue, off } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { signOut } from "firebase/auth";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chatData, setChatData] = useState({});
  const navigation = useNavigation();
  const currentUserUid = auth.currentUser.uid;

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
        backgroundColor: "#6366F1",
        elevation: 0,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
    });
  }, [navigation]);

  // Fetch users
  useEffect(() => {
    const usersRef = ref(realtimeDb, "users");

    const handleUsers = (snapshot) => {
      const usersData = [];
      snapshot.forEach((child) => {
        const user = child.val();
        if (user.email && user.email !== auth.currentUser.email) {
          usersData.push({ id: child.key, email: user.email });
        }
      });
      setUsers(usersData);
    };

    onValue(usersRef, handleUsers);
    return () => off(usersRef, "value", handleUsers);
  }, []);

  // Monitor all messages in a single listener
  useEffect(() => {
    const messagesRef = ref(realtimeDb, "messages");

    const handleMessages = (snapshot) => {
      const newChatData = {};

      snapshot.forEach((chatSnapshot) => {
        const chatId = chatSnapshot.key;
        // Only process chats involving current user
        if (!chatId.includes(currentUserUid)) return;

        const messages = [];
        let unreadCount = 0;
        let lastMessage = null;

        chatSnapshot.forEach((messageSnapshot) => {
          const message = { ...messageSnapshot.val(), _id: messageSnapshot.key };
          messages.push(message);

          // Update unread count
          if (message.user._id !== currentUserUid &&
            (message.status === "sent" || message.status === "delivered")) {
            unreadCount++;
          }

          // Update last message
          if (!lastMessage || message.createdAt > lastMessage.createdAt) {
            lastMessage = message;
          }
        });

        // Extract other user's ID from chat ID
        const otherUserId = chatId.split('_').find(id => id !== currentUserUid);

        if (otherUserId) {
          newChatData[otherUserId] = {
            unreadCount,
            lastMessage,
            messages: messages.sort((a, b) => b.createdAt - a.createdAt)
          };
        }
      });

      setChatData(newChatData);
    };

    onValue(messagesRef, handleMessages);
    return () => off(messagesRef, "value", handleMessages);
  }, [currentUserUid]);

  const renderUser = useCallback(({ item }) => {
    const userData = chatData[item.id] || { unreadCount: 0, lastMessage: null };
    const { unreadCount, lastMessage } = userData;

    const lastMessageTime = lastMessage
      ? new Date(lastMessage.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
      : '';

    return (
      <TouchableOpacity
        style={[
          styles.userItem,
          unreadCount > 0 && styles.userItemUnread
        ]}
        onPress={() => {
          navigation.navigate("Chat", {
            recipientId: item.id,
            recipientEmail: item.email
          });
        }}
      >
        <View style={styles.userItemContent}>
          <View style={styles.userInfo}>
            <Text style={[
              styles.userEmail,
              unreadCount > 0 && styles.unreadText
            ]}>
              {item.email}
            </Text>
            {lastMessage && (
              <Text style={styles.lastMessage} numberOfLines={1}>
                {lastMessage.user._id === currentUserUid ? "You: " : ""}
                {lastMessage.text}
              </Text>
            )}
          </View>
          <View style={styles.messageInfo}>
            {lastMessageTime && (
              <Text style={styles.timeText}>{lastMessageTime}</Text>
            )}
            {unreadCount > 0 && (
              <View style={styles.notificationBubble}>
                <Text style={styles.bubbleText}>{unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }, [chatData, navigation, currentUserUid]);

  const totalUnread = Object.values(chatData).reduce(
    (sum, chat) => sum + (chat.unreadCount || 0),
    0
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={users}
          renderItem={renderUser}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            totalUnread > 0 ? (
              <Text style={styles.totalUnread}>
                {totalUnread} unread message{totalUnread !== 1 ? 's' : ''}
              </Text>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  userItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  userItemUnread: {
    backgroundColor: '#F1F5F9',
  },
  userItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfo: {
    flex: 1,
    marginRight: 16,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#1E293B',
  },
  lastMessage: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  messageInfo: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
  notificationBubble: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  bubbleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  totalUnread: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
  },
  unreadText: {
    color: '#6366F1',
    fontWeight: '600',
  },
});

export default Home;