import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { groceryApi } from '../services/api';

const QUERY_KEY = 'groceryItems';

export const useGroceryItems = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: groceryApi.getGroceryItems,
  });
};

export const useCreateGroceryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: groceryApi.createGroceryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useUpdateGroceryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: groceryApi.updateGroceryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useDeleteGroceryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: groceryApi.deleteGroceryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};
