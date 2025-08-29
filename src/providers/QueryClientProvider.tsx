import React, { useMemo, useCallback, PropsWithChildren } from 'react';
import { QueryClient, QueryCache, MutationCache, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import {
  Toast,
  ToastTitle,
  ToastDescription,
  VStack,
  useToast,
} from '@gluestack-ui/themed';

interface CustomQueryClientProviderProps extends PropsWithChildren {
  // Add any additional props you might need
}

interface ApiError {
  message: string;
  status?: number;
  type: "network" | "server" | "unknown";
}

export const QueryClientProvider: React.FC<CustomQueryClientProviderProps> = ({ children }) => {
  const toast = useToast();

  const getErrorInfo = (error: unknown): ApiError => {
    if (error instanceof Error) {
      // Network/fetch errors
      if (
        error.message.includes("fetch") ||
        error.message.includes("Network")
      ) {
        return {
          message:
            "Network connection failed. Please check your internet connection.",
          type: "network",
        };
      }

      // Server errors (if your API returns structured errors)
      if (error.message.includes("500")) {
        return {
          message: "Server error occurred. Please try again later.",
          status: 500,
          type: "server",
        };
      }

      if (error.message.includes("404")) {
        return {
          message: "Requested resource not found.",
          status: 404,
          type: "server",
        };
      }

      return {
        message: error.message || "An unexpected error occurred.",
        type: "unknown",
      };
    }

    // Handle Response objects or other error types
    if (typeof error === "object" && error !== null) {
      const errorObj = error as any;

      if (errorObj.status) {
        const status = errorObj.status;
        if (status >= 500) {
          return {
            message: "Server error occurred. Please try again later.",
            status,
            type: "server",
          };
        }
        if (status === 404) {
          return {
            message: "Requested resource not found.",
            status,
            type: "server",
          };
        }
        if (status >= 400) {
          return {
            message:
              errorObj.message || "Request failed. Please check your input.",
            status,
            type: "server",
          };
        }
      }
    }

    return {
      message: "An unexpected error occurred. Please try again.",
      type: "unknown",
    };
  };

  const showApiError = useCallback((error: unknown) => {
    const errorInfo = getErrorInfo(error);

    console.error("Global API Error:", error, errorInfo);

    // Show toast notification
    toast.show({
      placement: "top",
      render: ({ id }) => (
        <Toast nativeID={`toast-${id}`} action="error" variant="accent">
          <VStack space="xs">
            <ToastTitle>
              {errorInfo.type === "network" ? "Connection Error" : "Error"}
            </ToastTitle>
            <ToastDescription>{errorInfo.message}</ToastDescription>
          </VStack>
        </Toast>
      ),
    });
  }, [toast]);

  const handleError = useCallback(
    (error: unknown, onError?: (...args: unknown[]) => unknown) => {
      // If there's a custom onError handler, let it handle the error
      if (onError) {
        return;
      }
      
      // Otherwise, use our global error handler
      showApiError(error);
    },
    [showApiError],
  );

  const queryClient = useMemo(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            // Check if the query has a custom onError handler
            const queryOptions = query.options as any;
            handleError(error, queryOptions?.onError);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, variables, context, mutation) => {
            // Check if the mutation has a custom onError handler
            handleError(error, mutation.options.onError);
          },
        }),
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            throwOnError: false,
            // Cache for 5 minutes
            gcTime: 5 * 60 * 1000,
          },
          mutations: {
            retry: 0,
            throwOnError: false,
          },
        },
      }),
    [handleError],
  );

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};
