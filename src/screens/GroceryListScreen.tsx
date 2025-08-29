import React, { useMemo } from "react";
import {
  VStack,
  ScrollView,
  Heading,
  Text,
  Center,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGroceryItems } from "../hooks/useGroceryItems";
import { GroceryItemCard } from "../components/shared/GroceryItemCard";
import { AddItemForm } from "../components/AddItemForm";

export const GroceryListScreen: React.FC = () => {
  const { data: groceryItems } = useGroceryItems();

  const { boughtItems, unboughtItems } = useMemo(() => {
    if (!groceryItems) {
      return { boughtItems: [], unboughtItems: [] };
    }

    return {
      boughtItems: groceryItems.filter((item) => item.bought),
      unboughtItems: groceryItems.filter((item) => !item.bought),
    };
  }, [groceryItems]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <VStack flex={1} p="$4">
        <Heading size="xl" mb="$4" textAlign="center">
          My Grocery List
        </Heading>

        <ScrollView showsVerticalScrollIndicator={false}>
          <AddItemForm />

          {unboughtItems.length > 0 && (
            <VStack space="xs" mb="$6">
              <Heading size="lg" color="$gray700" mb="$2">
                To Buy ({unboughtItems.length})
              </Heading>
              {unboughtItems.map((item) => (
                <GroceryItemCard key={item.id} item={item} />
              ))}
            </VStack>
          )}

          {boughtItems.length > 0 && (
            <VStack space="xs">
              <Heading size="lg" color="$gray500" mb="$2">
                Completed ({boughtItems.length})
              </Heading>
              {boughtItems.map((item) => (
                <GroceryItemCard key={item.id} item={item} />
              ))}
            </VStack>
          )}

          {groceryItems?.length === 0 && (
            <Center py="$8">
              <Text color="$gray500" textAlign="center">
                Your grocery list is empty.{"\n"}
                Add your first item above!
              </Text>
            </Center>
          )}
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
};
