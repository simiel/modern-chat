import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const Chat = () => {
  const { chat: chatId } = useLocalSearchParams();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <Text
        style={{
          flex: 1,
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 20,
          color: '#fff',
        }}
      >
        {chatId ? `Chat Room: ${chatId}` : 'Chat Room Not Found'}
      </Text>
    </SafeAreaView>
  );
};

export default Chat;
