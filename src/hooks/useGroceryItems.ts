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
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });
      const previousItems = queryClient.getQueryData([QUERY_KEY]);
      queryClient.setQueryData([QUERY_KEY], (old: any[] = []) => [...(old ?? []), newItem]);
      return { previousItems };
    },
    onError: (err, newItem, context) => {
      queryClient.setQueryData([QUERY_KEY], context?.previousItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useUpdateGroceryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groceryApi.updateGroceryItem,
    onMutate: async (updatedItem) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });
      const previousItems = queryClient.getQueryData([QUERY_KEY]);
      queryClient.setQueryData([QUERY_KEY], (old: any[] = []) =>
        old?.map(item => item.id === updatedItem.id ? { ...item, ...updatedItem } : item)
      );
      return { previousItems };
    },
    onError: (err, updatedItem, context) => {
      queryClient.setQueryData([QUERY_KEY], context?.previousItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useDeleteGroceryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groceryApi.deleteGroceryItem,
    onMutate: async (deletedItemId) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });
      const previousItems = queryClient.getQueryData([QUERY_KEY]);
      queryClient.setQueryData([QUERY_KEY], (old: any[] = []) =>
        old?.filter(item => item.id !== deletedItemId)
      );
      return { previousItems };
    },
    onError: (err, deletedItemId, context) => {
      queryClient.setQueryData([QUERY_KEY], context?.previousItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};
