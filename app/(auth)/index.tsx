import React from 'react';
import { Text, View } from 'react-native';

const index = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Chat</Text>
      <Text className="text-lg">Welcome to the chat application!</Text>
      <Text className="text-sm text-gray-500">This is the chat index page.</Text>
      <View className="mt-4 p-4 bg-blue-100 rounded-lg">
        <Text className="text-blue-800">You can start chatting here.</Text>
      </View>
      <View className="mt-4 p-4 bg-green-100 rounded-lg">
        <Text className="text-green-800">Enjoy your conversations!</Text>
      </View>
      <Text>Chat indexjfjfk well, take premicy</Text>
    </View>
  );
};

export default index;
