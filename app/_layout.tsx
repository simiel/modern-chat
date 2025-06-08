import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { resourceCache } from '@clerk/clerk-expo/resource-cache';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { passkeys } from '@clerk/expo-passkeys';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import './global.css';

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error('EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not defined');
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
      __experimental_passkeys={passkeys}
      __experimental_resourceCache={resourceCache}
    >
      <ClerkLoaded>
        <ThemeProvider value={DarkTheme}>
          <Slot />
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
