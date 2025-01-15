import React, { useState, useLayoutEffect, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { ref, onValue, off, push, set } from "firebase/database";
import { signOut } from "firebase/auth";
import { auth, realtimeDb } from "../firebaseConfig";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { recipientId, recipientEmail } = route.params;

  const currentUserUid = auth.currentUser.uid;
  const chatId =
    currentUserUid < recipientId ? `${currentUserUid}_${recipientId}` : `${recipientId}_${currentUserUid}`;

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
    navigation.navigate("Login");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onSignOut} style={styles.logoutButton}>
          <AntDesign name="logout" size={24} color="#6366F1" />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: "#F8FAFC",
      },
      headerTintColor: "#6366F1",
      headerTitleStyle: {
        fontWeight: "600",
      },
      title: recipientEmail,
    });
  }, [navigation, recipientEmail]);

  useEffect(() => {
    const messagesRef = ref(realtimeDb, `messages/${chatId}`);
    onValue(messagesRef, (snapshot) => {
      const messageList = [];
      snapshot.forEach((child) => {
        messageList.push({ ...child.val(), _id: child.key });
      });

      setMessages(messageList.sort((a, b) => a.createdAt - b.createdAt));
    });

    return () => off(messagesRef); // Cleanup listener on unmount
  }, [chatId]);

  const sendMessage = useCallback(() => {
    if (!inputText.trim()) return;

    const messagesRef = ref(realtimeDb, `messages/${chatId}`);
    const newMessageRef = push(messagesRef);

    const message = {
      createdAt: Date.now(),
      text: inputText.trim(),
      user: {
        _id: auth.currentUser.uid,
        email: auth.currentUser.email,
      },
    };

    set(newMessageRef, message);
    setInputText("");
  }, [inputText, chatId]);

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.user._id === auth.currentUser.uid;
    const formattedTime = new Date(item.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View
        style={[styles.messageRowContainer, isCurrentUser ? styles.currentUserRow : styles.otherUserRow]}
      >
        {!isCurrentUser && (
          <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        )}
        <View>
          {!isCurrentUser ? (
            <Text style={styles.userIdText_current}>{item.user.email}</Text>
          ) : (
            <Text style={styles.userIdText_other}>You</Text>
          )}
          <View
            style={[
              styles.messageContainer,
              isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
            ]}
          >
            <Text
              style={[styles.messageText, isCurrentUser ? styles.currentUserText : styles.otherUserText]}
            >
              {item.text}
            </Text>
            <Text
              style={[styles.timeText, isCurrentUser ? styles.currentUserTime : styles.otherUserTime]}
            >
              {formattedTime}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const onContentSizeChange = useCallback(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={onContentSizeChange} // Scroll to bottom on content size change
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="add-circle-outline" size={24} color="#6366F1" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          multiline
          maxHeight={100}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton} disabled={!inputText.trim()}>
          <Ionicons name="send" size={24} color={inputText.trim() ? "#6366F1" : "#CBD5E1"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  messagesList: {
    padding: 15,
  },
  messageRowContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 4,
  },
  currentUserRow: {
    justifyContent: "flex-end",
  },
  otherUserRow: {
    justifyContent: "flex-start",
  },
  messageContainer: {
    maxWidth: width * 0.7,
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  currentUserMessage: {
    backgroundColor: "#6366F1",
    borderTopRightRadius: 4,
  },
  otherUserMessage: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  currentUserText: {
    color: "#FFFFFF",
  },
  otherUserText: {
    color: "#1E293B",
  },
  timeText: {
    fontSize: 12,
    marginTop: 4,
  },
  currentUserTime: {
    color: "#E2E8F0",
  },
  otherUserTime: {
    color: "#94A3B8",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E2E8F0",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
  attachButton: {
    padding: 8,
  },
  logoutButton: {
    marginRight: 12,
  },
  userIdText_current: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
    marginRight: 40,
    textAlign: "right",
  },
  userIdText_other: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
    marginLeft: 40,
    textAlign: "left",
  },
});
