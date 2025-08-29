import React from "react";
import {
  Center,
  VStack,
  Text,
  Button,
  ButtonText,
  Heading,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleRetry = () => {
    setTimeout(() => {
      this.setState({ hasError: false, error: null });
    }, 100);
  };

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Center flex={1} p="$6">
            <VStack space="lg" alignItems="center" maxWidth="$80">
              <VStack space="md" alignItems="center">
                <Text fontSize="$6xl">⚠️</Text>
                <Heading size="xl" textAlign="center">
                  Something went wrong
                </Heading>
                <Text size="md" color="$gray600" textAlign="center">
                  We encountered an unexpected error. Please try again or
                  restart the app.
                </Text>
              </VStack>

              <VStack space="sm" width="$full">
                <Button action="primary" onPress={this.handleRetry}>
                  <ButtonText>Try Again</ButtonText>
                </Button>

                <Button
                  variant="outline"
                  onPress={() => {
                    if (window.location?.reload) {
                      window.location.reload();
                    } else {
                      this.handleRetry();
                    }
                  }}
                >
                  <ButtonText>Restart App</ButtonText>
                </Button>
              </VStack>

              {__DEV__ && this.state.error && (
                <VStack space="xs" width="$full" mt="$4">
                  <Text size="sm" fontWeight="$bold" color="$error600">
                    Error Details (Development):
                  </Text>
                  <Text size="xs" color="$error500" fontFamily="$mono">
                    {this.state.error.message}
                  </Text>
                </VStack>
              )}
            </VStack>
          </Center>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}
