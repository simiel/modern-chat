import Button from '@/components/Button';
import Text from '@/components/Text';
import { useAuth, useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const passkeys = user?.passkeys || [];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
        <Text style={styles.name}>{user?.fullName}</Text>
      </View>
      <Button onPress={handleSignOut}> Sign Out</Button>

      {/* add passkey */}
      <Button
        onPress={async () => {
          try {
            await user?.createPasskey();
            console.log('Passkey created');
          } catch (error) {
            console.error(error);
          }
        }}
        style={{ marginTop: 16, backgroundColor: '#007AFF' }}
      >
        Add Passkey
      </Button>

      <View style={{ width: '90%', marginTop: 24 }}>
        {passkeys.length > 0 ? (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Passkeys:</Text>
            {passkeys.map((key, index) => (
              <View key={key.id}>
                <Text style={{ marginLeft: 12, marginBottom: 2 }}>• {key.name}</Text>
                <Button
                  onPress={() => {
                    key.delete().catch(error => {
                      console.error('Error deleting passkey:', error);
                    });
                  }}
                  style={{ marginLeft: 12, marginBottom: 8 }}
                >
                  Delete Passkey
                </Button>
              </View>
            ))}
          </View>
        ) : (
          <Text style={{ marginBottom: 16 }}>
            No passkeys found. Please add a passkey to your account.
          </Text>
        )}

        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <Text style={{ fontWeight: 'bold', width: 120 }}>Profile ID:</Text>
          <Text>{user?.id}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <Text style={{ fontWeight: 'bold', width: 120 }}>Email:</Text>
          <Text>{user?.emailAddresses[0]?.emailAddress}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <Text style={{ fontWeight: 'bold', width: 120 }}>Username:</Text>
          <Text>{user?.username}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <Text style={{ fontWeight: 'bold', width: 120 }}>Created At:</Text>
          <Text>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <Text style={{ fontWeight: 'bold', width: 120 }}>Updated At:</Text>
          <Text>{user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : ''}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profileContainer: { alignItems: 'center', marginBottom: 32 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  name: { fontSize: 20, fontWeight: 'bold' },
});

export default Profile;
