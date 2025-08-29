import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonText,
  Heading,
} from "@gluestack-ui/themed";
import { useCreateGroceryItem, useUpdateGroceryItem, useGroceryItems } from "../hooks/useGroceryItems";
import { GroceryItemFormValues } from "../utils/validationSchemas";
import { GroceryItemForm } from "./shared/GroceryItemForm";

export const AddItemForm: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const createMutation = useCreateGroceryItem();
  const updateMutation = useUpdateGroceryItem();
  const { data: groceryItems = [] } = useGroceryItems();

  const initialValues: GroceryItemFormValues = {
    title: "",
    amount: null,
  };

  const handleSubmit = (values: GroceryItemFormValues) => {
    const trimmedTitle = values.title.trim();
    const amount = values.amount || 0;

    // Check if an item with the same title already exists (case-insensitive) and is not bought
    const existingUnboughtItem = groceryItems.find(
      item => item.title.toLowerCase() === trimmedTitle.toLowerCase() && !item.bought
    );

    if (existingUnboughtItem) {
      // Update existing unbought item by adding the amount
      updateMutation.mutate({
        id: existingUnboughtItem.id,
        amount: existingUnboughtItem.amount + amount,
      });
    } else {
      // Create new item (either doesn't exist or existing item is already bought)
      createMutation.mutate({
        title: trimmedTitle,
        amount: amount,
      });
    }
    
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <Box mb="$4">
        <Button action="primary" size="lg" onPress={() => setShowForm(true)}>
          <ButtonText>+ Add New Item</ButtonText>
        </Button>
      </Box>
    );
  }

  return (
    <Box
      bg="$white"
      borderRadius="$lg"
      p="$4"
      mb="$4"
      shadowColor="$black"
      shadowOffset={{ width: 0, height: 1 }}
      shadowOpacity={0.1}
      shadowRadius={3}
      elevation={2}
    >
      <Heading size="md" mb="$4">Add New Item</Heading>
      <GroceryItemForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Add Item"
      />
    </Box>
  );
};
