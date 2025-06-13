import logo from '@/assets/images/logo.png';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { isClerkAPIResponseError, useSignIn, useSSO } from '@clerk/clerk-expo';
import { ClerkAPIError } from '@clerk/types';
import * as AuthSession from 'expo-auth-session';
import React from 'react';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  const { startSSOFlow } = useSSO();
  const { signIn, setActive } = useSignIn();
  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);

  const handleSignInWithGoogle = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      } else {
        console.log('These is no session to log in');
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const handleSignInWithPasskey = async () => {
    try {
      const signInAttempt = await signIn?.authenticateWithPasskey({
        flow: 'discoverable',
      });

      if (signInAttempt?.status === 'complete') {
        if (setActive !== undefined) {
          await setActive({ session: signInAttempt.createdSessionId });
        }
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center">
      <Image source={logo} className="w-32 h-32 mb-4 object-contain" resizeMode="contain" />
      <Text className="text-6xl">Modern Chat</Text>
      <Text className=" text-2xl">Best chat application</Text>

      {errors.map((error, index) => (
        <Text key={index} className="text-red-500 mt-2">
          {error.message}
        </Text>
      ))}

      <View style={{ gap: 10, marginTop: 'auto', width: '100%' }}>
        <Button
          className="mt-auto bg-black"
          textClassName="font-extrabold"
          onPress={handleSignInWithPasskey}
        >
          Sign in with Passkey
        </Button>
        <Button className=" bg-black" onPress={handleSignInWithGoogle}>
          Continue with Google
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Index;
