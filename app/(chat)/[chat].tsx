import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const Chat = () => {
  const { chat } = useLocalSearchParams();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text
        style={{
          flex: 1,
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 20,
          color: '#333',
        }}
      >
        {chat ? `Chat Room: ${chat}` : 'Chat Room Not Found'}
      </Text>
    </SafeAreaView>
  );
};

export default Chat;
