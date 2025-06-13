import { IconSymbol } from '@/components/IconSymbol';
import { appwriteConfig, client, db } from '@/utils/appwrite';
import { Message } from '@/utils/types';
import { useUser } from '@clerk/clerk-expo';
import { LegendList } from '@legendapp/list';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ID, Query } from 'react-native-appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';

const Chat = () => {
  const { chat: chatId } = useLocalSearchParams();
  const { user } = useUser();
  const [messages, setMessages] = React.useState<Partial<Message[]>>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const headerHeightFromHook = useHeaderHeight();
  const headerHeight = Platform.OS === 'ios' ? headerHeightFromHook : 0;

  const sendDisabled = !inputValue.trim() || loading;

  const getMessages = React.useCallback(async () => {
    try {
      const { documents, total } = await db.listDocuments(
        appwriteConfig.db!,
        appwriteConfig.col.messages!,
        [
          Query.equal('chatroomId', chatId as string),
          Query.limit(100),
          Query.orderDesc('$createdAt'),
        ]
      );

      documents.reverse();

      setMessages(documents as Partial<Message[]>);
      console.log(`Fetched ${total} messages for chatroom ${chatId}`);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages. Try again.');
    }
  }, [chatId]);

  const handleFirstLoad = React.useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching messages for chatroom:', chatId);
      await getMessages();
      setLoading(false);
    } catch (error) {
      console.error('Error during first load:', error);
      setError('Failed to load chatroom. Try again.');
    }
  }, [chatId, getMessages]);

  React.useEffect(() => {
    handleFirstLoad();
  }, [chatId, getMessages, handleFirstLoad]);

  React.useEffect(() => {
    const channel = `databases.${appwriteConfig.db!}.collections.${appwriteConfig.col
      .messages!}.documents`;
    const unsubscribe = client.subscribe(channel, () => {
      getMessages();
    });

    return () => {
      unsubscribe();
    };
  }, [chatId, getMessages]);

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

      await db.updateDocument(appwriteConfig.db!, appwriteConfig.col.chatrooms!, chatId as string, {
        $updatedAt: new Date().toISOString(),
      });
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
          <LegendList
            data={messages as Message[]}
            alignItemsAtEnd
            initialScrollIndex={messages.length - 1}
            renderItem={({ item }) => {
              const isSender = item.senderId === user?.id;
              if (!item.content) return null; // Skip empty messages

              return isSender ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                    alignSelf: item.senderId === user?.id ? 'flex-end' : 'flex-start',
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      marginVertical: 5,
                      backgroundColor: '#222',
                      borderRadius: 10,
                      maxWidth: '80%',
                    }}
                  >
                    <Text style={{ color: '#fff', fontSize: 16 }}>{item.content}</Text>
                    <Text style={{ color: '#888', fontSize: 12, marginTop: 5 }}>
                      {user.fullName || 'Unknown User'}
                    </Text>
                  </View>
                  <Image
                    source={{ uri: user.imageUrl || 'https://via.placeholder.com/40' }}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      alignSelf: 'flex-end',
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    padding: 10,
                    marginVertical: 5,
                    backgroundColor: '#333',
                    borderRadius: 10,
                    maxWidth: '80%',
                    alignSelf: item.senderId === user?.id ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 16 }}>{item.content}</Text>
                  <Text style={{ color: '#888', fontSize: 12, marginTop: 5 }}>
                    {item.senderName || 'Unknown User'}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => (item?.$id ? String(item.$id) : String(index))}
          />

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
