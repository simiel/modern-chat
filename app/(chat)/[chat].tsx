import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';

const Chat = () => {
  const { chat: chatId } = useLocalSearchParams();
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  if (!chatId) {
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
          Chat Room Not Found
        </Text>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      </SafeAreaView>
    );
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitle: 'Back',
          title: `Chat Room: ${chatId}`,
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
        }}
      />
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
    </>
  );
};

export default Chat;
