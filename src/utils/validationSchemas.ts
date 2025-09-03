import * as yup from "yup";

export interface GroceryItemFormValues {
  title: string;
  amount: number | null;
}

export const groceryItemValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Item name is required")
    .min(2, "Item name must be at least 1 character")
    .max(100, "Item name must be less than 100 characters")
    .trim(),
  amount: yup
    .number()
    .required("Amount is required")
    .min(0.1, "Amount must be greater than 0")
    .max(999, "Amount must be less than 1000"),
});
