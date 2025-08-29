import React, { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Text,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckIcon,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { GroceryItemForm } from "./GroceryItemForm";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { GroceryItemFormValues } from "../../utils/validationSchemas";
import { GroceryItem } from "../../types";
import {
  useUpdateGroceryItem,
  useDeleteGroceryItem,
  useGroceryItems,
} from "../../hooks/useGroceryItems";

interface GroceryItemCardProps {
  item: GroceryItem;
}

export const GroceryItemCard: React.FC<GroceryItemCardProps> = ({ item }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const updateMutation = useUpdateGroceryItem();
  const deleteMutation = useDeleteGroceryItem();
  const { data: groceryItems = [] } = useGroceryItems();

  const initialEditValues: GroceryItemFormValues = {
    title: item.title,
    amount: item.amount,
  };

  const handleToggleBought = () => {
    // Find other items with the same title (case-insensitive), excluding the current item
    const otherItemsWithSameTitle = groceryItems.filter(
      (otherItem) =>
        otherItem.id !== item.id &&
        otherItem.title.toLowerCase() === item.title.toLowerCase()
    );

    if (otherItemsWithSameTitle.length > 0) {
      // If there are other items with the same title, add current item's amount to one of them
      const targetItem = otherItemsWithSameTitle[0]; // Take the first one

      // Use a single mutation with proper async handling
      updateMutation
        .mutateAsync({
          id: targetItem.id,
          amount: targetItem.amount + item.amount,
        })
        .then(() => {
          // Delete after update completes
          deleteMutation.mutate(item.id);
        })
        .catch((error) => {
          // Fallback to just toggling if consolidation fails
          updateMutation.mutate({
            id: item.id,
            bought: !item.bought,
          });
        });
    } else {
      // If no other items with same title, just toggle bought status
      updateMutation.mutate({
        id: item.id,
        bought: !item.bought,
      });
    }
  };

  const handleSaveEdit = (values: GroceryItemFormValues) => {
    updateMutation.mutate({
      id: item.id,
      title: values.title.trim(),
      amount: values.amount || 0,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteMutation.mutate(item.id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Box
        bg="$white"
        borderRadius="$lg"
        p="$4"
        mb="$3"
        shadowColor="$black"
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.1}
        shadowRadius={3}
        elevation={2}
      >
        <HStack space="md" alignItems="center">
          {!isEditing && (
            <Checkbox
              value="checked"
              isChecked={item.bought}
              onChange={handleToggleBought}
              size="md"
            >
              <CheckboxIndicator mr="$2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
            </Checkbox>
          )}

          <VStack flex={1} space="xs">
            {isEditing ? (
              <GroceryItemForm
                initialValues={initialEditValues}
                onSubmit={handleSaveEdit}
                onCancel={handleCancelEdit}
                submitLabel="Save"
                isInline={true}
              />
            ) : (
              <>
                <Text
                  size="md"
                  fontWeight="$medium"
                  textDecorationLine={item.bought ? "line-through" : "none"}
                  color={item.bought ? "$gray400" : "$gray900"}
                >
                  {item.title}
                </Text>
                <Text
                  size="sm"
                  color={item.bought ? "$gray400" : "$gray600"}
                  textDecorationLine={item.bought ? "line-through" : "none"}
                >
                  {item.amount}
                </Text>
              </>
            )}
          </VStack>

          <HStack space="xs">
            <>
              {!isEditing && !item.bought && (
                <Button
                  size="sm"
                  variant="outline"
                  onPress={() => setIsEditing(true)}
                >
                  <ButtonText>Edit</ButtonText>
                </Button>
              )}
              {!isEditing && (
                <Button
                  size="sm"
                  action="negative"
                  onPress={() => setShowDeleteDialog(true)}
                >
                  <ButtonText>Delete</ButtonText>
                </Button>
              )}
            </>
          </HStack>
        </HStack>
      </Box>

      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title={`Delete ${item.title}?`}
        message={`Are you sure you want to delete "${item.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmAction="negative"
      />
    </>
  );
};
