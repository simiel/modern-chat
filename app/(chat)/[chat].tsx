import { IconSymbol } from '@/components/IconSymbol';
import { appwriteConfig, db } from '@/utils/appwrite';
import { messages as testMessages } from '@/utils/test-data'; // Assuming messa is an array of Message objects
import { Message } from '@/utils/types';
import { useUser } from '@clerk/clerk-expo';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ID } from 'react-native-appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';

const Chat = () => {
  const { chat: chatId } = useLocalSearchParams();
  const { user } = useUser();
  const [messages, setMessages] = React.useState<Partial<Message[]>>(testMessages);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const headerHeightFromHook = useHeaderHeight();
  const headerHeight = Platform.OS === 'ios' ? headerHeightFromHook : 0;

  const sendDisabled = !inputValue.trim() || loading;

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

  const handleSendMessage = async () => {
    try {
      console.log('Sending message:', inputValue);
      if (!inputValue.trim()) return;
      const newMessage: Partial<Message> = {
        chatroomId: chatId as string,
        content: inputValue,
        senderId: user?.id,
      };
      setMessages([...messages, newMessage] as Partial<Message[]>);
      await db.createDocument(appwriteConfig.db!, appwriteConfig.col.messages!, ID.unique(), {
        content: inputValue,
        senderId: user?.id,
        chatroomId: chatId as string,
      });
      setInputValue('');

      await db.updateDocument(
        appwriteConfig.db!,
        appwriteConfig.col.chatrooms!,
        chatId.toString(),
        {
          $updatedAt: new Date().toISOString(),
        }
      );
      Keyboard.dismiss();
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Try again.');
    }
  };

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
          {/* <LegendList
            data={messages}
            renderItem={({ item }) => (
              <Text
                style={{ color: '#fff', padding: 10, borderBottomWidth: 1, borderColor: '#444' }}
              >
                {item?.content}
              </Text>
            )}
            keyExtractor={item => item?.$id.toString()!}
          /> */}

          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
            <TextInput
              style={{
                flex: 1,
                minHeight: 30,
                maxHeight: 150,
                borderColor: '#444',
                borderWidth: 1,
                paddingHorizontal: 10,
                color: '#fff',
                backgroundColor: '#222',
                borderRadius: 20,
                fontSize: 20,
              }}
              multiline
              placeholder="Type a message..."
              placeholderTextColor="#888"
              value={inputValue}
              onChangeText={setInputValue}
              onSubmitEditing={handleSendMessage}
              onFocus={() => setError('')}
              returnKeyType="send"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Pressable
              onPress={handleSendMessage}
              disabled={sendDisabled}
              style={{
                alignSelf: 'flex-end',
                padding: 10,
                backgroundColor: sendDisabled ? '#555' : '#007AFF',
                borderRadius: 50,
              }}
            >
              <IconSymbol name="paperplane" size={24} color={sendDisabled ? 'gray' : 'white'} />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Chat;
