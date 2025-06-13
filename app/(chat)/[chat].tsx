import { messages as testMessages } from '@/utils/test-data'; // Assuming messa is an array of Message objects
import { Message } from '@/utils/types';
import { LegendList } from '@legendapp/list';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Chat = () => {
  const { chat: chatId } = useLocalSearchParams();
  const [messages, setMessages] = React.useState<Message[]>(testMessages);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const headerHeightFromHook = useHeaderHeight();
  const headerHeight = Platform.OS === 'ios' ? headerHeightFromHook : 0;

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
        }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={headerHeight}
        >
          <LegendList
            data={messages}
            renderItem={({ item }) => (
              <Text
                style={{ color: '#fff', padding: 10, borderBottomWidth: 1, borderColor: '#444' }}
              >
                {item.content}
              </Text>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Chat;
