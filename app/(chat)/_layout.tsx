import { IconSymbol } from '@/components/IconSymbol';
import { useUser } from '@clerk/clerk-expo';
import { Link, Redirect, Stack } from 'expo-router';
import { Image } from 'react-native';

export default function Layout() {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Chat Rooms',
          headerLargeTitle: true,
          headerLeft: () => (
            <Link href="/profile" style={{ marginLeft: 10 }}>
              <Image src={user?.imageUrl} style={{ width: 32, height: 32, borderRadius: 16 }} />
            </Link>
          ),
          headerRight: () => (
            <Link href="/new-room" style={{ marginRight: 10 }}>
              <IconSymbol name="plus" size={24} style={{ width: 24, height: 24 }} />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          presentation: 'modal',
          headerTitle: 'Profile',
          headerLeft: () => (
            <Link href="..">
              <IconSymbol name="chevron.left" />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="new-room"
        options={{
          presentation: 'modal',
          headerTitle: 'New Chat Room',
          headerLeft: () => (
            <Link href="..">
              <IconSymbol name="chevron.left" />
            </Link>
          ),
        }}
      />
      <Stack.Screen name="[chat]" options={{ headerShown: false }} />
    </Stack>
  );
}
