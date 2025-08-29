import React from 'react';
import {
  Center,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Loading: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Center flex={1}>
        <VStack space="md" alignItems="center">
          <Spinner size="large" />
          <Text size="lg" fontWeight="$medium">
            Loading...
          </Text>
        </VStack>
      </Center>
    </SafeAreaView>
  );
};
