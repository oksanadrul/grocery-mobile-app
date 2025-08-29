import React from "react";
import {
  VStack,
  HStack,
  Input,
  InputField,
  Button,
  ButtonText,
  Text,
} from "@gluestack-ui/themed";
import { Formik, FormikProps } from "formik";
import { groceryItemValidationSchema, GroceryItemFormValues } from "../../utils/validationSchemas";

interface GroceryItemFormProps {
  initialValues: GroceryItemFormValues;
  onSubmit: (values: GroceryItemFormValues) => void;
  onCancel: () => void;
  submitLabel?: string;
  isInline?: boolean;
}

export const GroceryItemForm: React.FC<GroceryItemFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  isInline = false,
}) => {
  const handleSubmit = (values: GroceryItemFormValues, { resetForm }: { resetForm: () => void }) => {
    onSubmit(values);
    if (initialValues.title === "" && (initialValues.amount === null || initialValues.amount === 0)) {
      // Only reset form for add scenario, not edit
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={groceryItemValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true} // Important for edit scenarios
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit: formikSubmit,
        isValid,
        dirty,
        setFieldValue,
      }: FormikProps<GroceryItemFormValues>) => (
        <VStack space={isInline ? "xs" : "sm"}>
          <VStack space="xs">
            {!isInline && (
              <Text size="sm" fontWeight="$medium">
                Item Name
              </Text>
            )}
            <Input size={isInline ? "sm" : "md"}>
              <InputField
                value={values.title}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                placeholder={isInline ? "Item name" : "e.g., Milk, Bread, Eggs"}
                autoFocus={!isInline}
              />
            </Input>
            {touched.title && errors.title && (
              <Text size="xs" color="$error500">
                {errors.title}
              </Text>
            )}
          </VStack>

          <VStack space="xs">
            {!isInline && (
              <Text size="sm" fontWeight="$medium">
                Amount
              </Text>
            )}
            <Input size={isInline ? "sm" : "md"}>
              <InputField
                value={values.amount?.toString() || ""}
                onChangeText={(text: string) => {
                  const numValue = text === "" ? null : parseFloat(text);
                  setFieldValue("amount", isNaN(numValue as number) ? null : numValue);
                }}
                onBlur={handleBlur("amount")}
                placeholder={isInline ? "Amount" : "e.g., 2, 1.5, 12"}
                keyboardType="numeric"
              />
            </Input>
            {touched.amount && errors.amount && (
              <Text size="xs" color="$error500">
                {errors.amount}
              </Text>
            )}
          </VStack>

          <HStack 
            space={isInline ? "xs" : "md"} 
            justifyContent={isInline ? "flex-start" : "flex-end"}
            mt={isInline ? "$2" : "$0"}
          >
            <Button
              size="sm"
              action="primary"
              onPress={() => formikSubmit()}
              isDisabled={!isValid || (!dirty && submitLabel !== "Add Item")}
              flex={isInline ? 1 : undefined}
            >
              <ButtonText>{submitLabel}</ButtonText>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onPress={onCancel}
              flex={isInline ? 1 : undefined}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
          </HStack>
        </VStack>
      )}
    </Formik>
  );
};
