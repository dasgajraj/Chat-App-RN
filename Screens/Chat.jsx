import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {GiftedAvatar, GiftedChat} from 'react-native-gifted-chat'
const Chat = () => {
  return (
    <View>
      <Text>Chat</Text>
<GiftedChat />
<GiftedAvatar/>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({})