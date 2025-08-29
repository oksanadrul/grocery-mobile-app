import React, { Suspense } from "react";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { config } from "./src/config/gluestack-ui.config";
import { Loading } from "./src/components/Loading";
import { ErrorBoundary } from "./src/components/ErrorBoundary";
import { QueryClientProvider } from "./src/providers/QueryClientProvider";

const GroceryListScreen = React.lazy(() =>
  import("./src/screens/GroceryListScreen").then((module) => ({
    default: module.GroceryListScreen,
  }))
);

export default function App() {
  return (
    <ErrorBoundary>
      <GluestackUIProvider config={config}>
        <OverlayProvider>
          <QueryClientProvider>
            <StatusBar style="auto" />
            <Suspense fallback={<Loading />}>
              <GroceryListScreen />
            </Suspense>
          </QueryClientProvider>
        </OverlayProvider>
      </GluestackUIProvider>
    </ErrorBoundary>
  );
}
