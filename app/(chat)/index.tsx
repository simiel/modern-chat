import { IconSymbol } from '@/components/IconSymbol';
import { Grey, Secondary } from '@/utils/colors';
import { chatRooms } from '@/utils/test-data';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

const Index = () => {
  // const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <FlatList
      data={chatRooms}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['red', 'white']} />
      }
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: `/[chat]`,
            params: { chat: item.id },
          }}
          style={{}}
        >
          <View
            style={{
              gap: 6,
              padding: 16,
              width: '100%',
              borderRadius: 16,
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: Secondary,
              justifyContent: 'space-between',
            }}
          >
            <ItemTitleAndDescription
              title={item.title}
              description={item.description}
              // isPrivate={item.isPrivate}
            />
            <IconSymbol
              name="chevron.right"
              size={20}
              color="#666666"
              style={{ marginLeft: 'auto' }}
            />
          </View>
        </Link>
      )}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: 16, gap: 8 }}
    />
  );
};

export default Index;

function ItemTitle({ title, isPrivate }: { title: string; isPrivate: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Text style={{ fontSize: 17, color: 'white' }}>{title}</Text>
      {isPrivate && <IconSymbol name="lock.fill" size={20} color="#666666" />}
    </View>
  );
}

function ItemTitleAndDescription({
  title,
  description,
  isPrivate = false,
}: {
  title: string;
  description: string;
  isPrivate?: boolean;
}) {
  return (
    <View style={{ gap: 4 }}>
      <ItemTitle title={title} isPrivate={isPrivate} />
      <Text style={{ fontSize: 13, color: Grey }}>{description}</Text>
    </View>
  );
}
