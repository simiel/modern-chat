import { useUser } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';

export default function Layout() {
  const { isSignedIn } = useUser();
  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
}
