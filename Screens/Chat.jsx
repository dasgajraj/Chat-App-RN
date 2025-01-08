import React, { useState, useLayoutEffect, useCallback, useRef } from 'react';
import { 
  View, Text, TouchableOpacity, TextInput, 
  FlatList, KeyboardAvoidingView, Platform,
  StyleSheet, Image, Dimensions 
} from 'react-native';
import { ref, onValue, off, push, set } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { auth, realtimeDb } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
    navigation.navigate('Login');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onSignOut} style={styles.logoutButton}>
          <AntDesign name="logout" size={24} color="#6366F1" />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#F8FAFC',
      },
      headerTintColor: '#6366F1',
      headerTitleStyle: {
        fontWeight: '600',
      },
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const messagesRef = ref(realtimeDb, 'messages');
    
    onValue(messagesRef, (snapshot) => {
      const messageList = [];
      snapshot.forEach((child) => {
        messageList.push({ ...child.val(), _id: child.key });
      });
      setMessages(messageList.sort((a, b) => b.createdAt - a.createdAt));
    });

    return () => off(messagesRef);
  }, []);

  const sendMessage = useCallback(() => {
    if (!inputText.trim()) return;

    const messagesRef = ref(realtimeDb, 'messages');
    const newMessageRef = push(messagesRef);

    const message = {
      createdAt: Date.now(),
      text: inputText.trim(),
      user: {
        _id: auth?.currentUser?.email,
        avatar: auth?.currentUser?.photoURL || 'https://i.pravatar.cc/300'
      }
    };

    set(newMessageRef, message);
    setInputText('');
  }, [inputText]);

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.user._id === auth?.currentUser?.email;
    const formattedTime = new Date(item.createdAt).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    return (
      <View style={[
        styles.messageRowContainer,
        isCurrentUser ? styles.currentUserRow : styles.otherUserRow
      ]}>
        {!isCurrentUser && (
          <Image 
            source={{ uri: item.user.avatar }} 
            style={styles.avatar}
          />
        )}
        <View style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
        ]}>
          <Text style={[
            styles.messageText,
            isCurrentUser ? styles.currentUserText : styles.otherUserText
          ]}>{item.text}</Text>
          <Text style={[
            styles.timeText,
            isCurrentUser ? styles.currentUserTime : styles.otherUserTime
          ]}>{formattedTime}</Text>
        </View>
        {isCurrentUser && (
          <Image 
            source={{ uri: auth?.currentUser?.photoURL || 'https://i.pravatar.cc/300' }} 
            style={styles.avatar}
          />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item._id}
        inverted
        contentContainerStyle={styles.messagesList}
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
        <TouchableOpacity 
          onPress={sendMessage} 
          style={styles.sendButton}
          disabled={!inputText.trim()}
        >
          <Ionicons 
            name="send" 
            size={24} 
            color={inputText.trim() ? "#6366F1" : "#CBD5E1"} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  messagesList: {
    padding: 15
  },
  messageRowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
  },
  currentUserRow: {
    justifyContent: 'flex-end',
  },
  otherUserRow: {
    justifyContent: 'flex-start',
  },
  messageContainer: {
    maxWidth: width * 0.7,
    padding: 12,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  currentUserMessage: {
    backgroundColor: '#6366F1',
    borderTopRightRadius: 4,
  },
  otherUserMessage: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  currentUserText: {
    color: '#FFFFFF',
  },
  otherUserText: {
    color: '#1E293B',
  },
  timeText: {
    fontSize: 12,
    marginTop: 4,
  },
  currentUserTime: {
    color: '#E2E8F0',
  },
  otherUserTime: {
    color: '#94A3B8',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F5F9',
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
  }
});
