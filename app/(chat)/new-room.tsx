import Button from '@/components/Button';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { Secondary } from '@/utils/colors';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, View } from 'react-native';

const COLORS = {
  primary: '#000', // Black background
  secondary: '#fff', // White text and accents
  error: '#FF3B30',
  border: '#222', // Slightly lighter black for borders
  inputBg: '#181818', // Dark input background
  placeholder: '#888',
};

const NewRoom = () => {
  const [roomName, setRoomName] = React.useState('');
  const [roomDescription, setRoomDescription] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const router = useRouter();

  const disabled = !roomName.trim() || loading;

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      setError('Room name is required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // Replace this with your actual create room logic
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Success', 'Room created!');
        router.back();
      }, 1200);
    } catch (e) {
      setLoading(false);
      setError('Failed to create room. Try again.');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              onPress={handleCreateRoom}
              disabled={disabled}
              style={{
                backgroundColor: disabled ? COLORS.border : COLORS.secondary,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}
              textStyle={{ color: COLORS.primary, fontWeight: 'bold' }}
            >
              {loading ? 'Creating...' : 'Create'}
            </Button>
          ),
        }}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={{
          flex: 1,
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
          padding: 24,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: COLORS.secondary,
              marginBottom: 8,
            }}
          >
            Create a New Room
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.secondary,
              textAlign: 'center',
              opacity: 0.7,
            }}
          >
            Give your chat room a unique name and start the conversation!
          </Text>
        </View>
        <View>
          <View style={{ marginBottom: 16, gap: 8 }}>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 18,
                color: COLORS.secondary,
                opacity: 0.85,
              }}
            >
              Room Name
            </Text>
            <Input
              value={roomName}
              onChangeText={setRoomName}
              placeholder="e.g. Study Group"
              placeholderTextColor={COLORS.placeholder}
              style={{
                borderWidth: 1,
                borderColor: error ? COLORS.error : COLORS.border,
                borderRadius: 12,
                padding: 14,
                fontSize: 18,
                backgroundColor: Secondary,
                color: COLORS.secondary,
              }}
              editable={!loading}
              returnKeyType="done"
              onSubmitEditing={handleCreateRoom}
              maxLength={200}
            />
          </View>
          <View style={{ marginBottom: 16, gap: 8 }}>
            <Text
              style={{
                marginBottom: 8,
                fontSize: 18,
                color: COLORS.secondary,
                opacity: 0.85,
              }}
            >
              Room Description (optional)
            </Text>
            <Input
              value={roomDescription}
              onChangeText={setRoomDescription}
              placeholder="e.g. A place to discuss study materials"
              placeholderTextColor={COLORS.placeholder}
              style={{
                borderWidth: 1,
                borderColor: COLORS.border,
                borderRadius: 12,
                padding: 14,
                fontSize: 18,
                backgroundColor: Secondary,
                color: COLORS.secondary,
                height: 100,
                textAlignVertical: 'top',
              }}
              multiline
              editable={!loading}
              returnKeyType="done"
              onSubmitEditing={handleCreateRoom}
              maxLength={200}
            />
          </View>

          {error ? <Text style={{ color: COLORS.error, marginTop: 8 }}>{error}</Text> : null}
        </View>
        <Button
          style={{
            backgroundColor: COLORS.secondary,
            marginTop: 16,
            borderRadius: 12,
            paddingVertical: 14,
            alignItems: 'center',
          }}
          onPress={handleCreateRoom}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color={COLORS.primary} /> : 'Create Room'}
        </Button>
      </KeyboardAvoidingView>
    </>
  );
};

export default NewRoom;
