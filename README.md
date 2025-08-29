# Grocery List Mobile App

A React Native grocery list application built with Expo, featuring a clean UI with Gluestack UI components, API integration with JSON Server, and React Query for state management.

## Features

✅ **Implemented:**
- **Complete CRUD Operations** - Create, read, update, and delete grocery items
- **Smart Organization** - Items automatically organized by completion status (bought/unbought)
- **Inline Editing** - Edit item names and amounts directly in the list
- **Visual Feedback** - Strikethrough text and checkboxes for bought items
- **Confirmation Dialogs** - Safe deletion with user confirmation
- **Form Validation** - Robust client-side validation for all inputs
- **Loading States** - Smooth loading indicators during API operations
- **Error Handling** - Graceful error recovery with user-friendly messages
- **Responsive Design** - Optimized for various screen sizes
- **Type Safety** - Full TypeScript implementation for better developer experience

## Technical Stack

- **React Native** with **Expo** - Cross-platform mobile development
- **TypeScript** - Type safety and better development experience
- **Gluestack UI** - Modern, accessible UI component library
- **React Query** - Data fetching, caching, and synchronization
- **JSON Server** - Mock REST API for development

## Architecture Features

- **Environment Configuration** - Support for Development, Staging, and Production variants
- **Clean Architecture** - Separation of concerns with dedicated folders for components, screens, services, hooks, and types
- **Type Safety** - Full TypeScript implementation with strict type checking
- **State Management** - React Query for server state, React hooks for local state
- **Error Handling** - Comprehensive error handling with Error Boundaries and user-friendly messages
- **Form Management** - Formik and Yup for robust form handling and validation
- **Provider Pattern** - Centralized providers for React Query and other global state
- **Component Reusability** - Shared components for consistent UI across the app
- **Optimistic Updates** - Immediate UI feedback while API calls are in progress

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd grocery-mobile-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   > **Troubleshooting npm install errors:**
   >
   > If you see a dependency conflict (for example, involving `react-dom`), this is because React Native projects do **not** use `react-dom` and some packages may have peer dependencies for web. However, some UI libraries like Gluestack UI may require `react-dom` for certain components. In this case:
   > ```bash
   > npm install --legacy-peer-deps
   > ```
   > This will safely install all required packages for React Native.
   >
   > **Note:** This project includes `react-dom` as a dev dependency to satisfy Gluestack UI's @react-aria dependencies, but it won't be bundled in the final React Native app.

## Running the Application

### Development Mode (Recommended)

1. **Start both JSON Server and Expo in development mode:**
   ```bash
   npm run dev
   ```
   This runs both the JSON Server (port 3001) and Expo simultaneously.

### Manual Mode

1. **Start JSON Server (in one terminal):**
   ```bash
   npm run server
   ```

2. **Start Expo (in another terminal):**
   ```bash
   npm start
   ```

### Different Variants

- **Development:** `npm start` (default)
- **Staging:** `npm run start:staging`
- **Production:** `npm run start:production`

## Building/Exporting the App

### Development and Testing

For development and testing purposes, you can export your app:

```bash
# Export staging version
npm run export:staging

# Export production version  
npm run export:production

# Or use Expo CLI directly
EXPO_PUBLIC_VARIANT=staging expo export
EXPO_PUBLIC_VARIANT=production expo export
```

### Creating APK/IPA (Alternative Methods)

If you need to create installable files:

1. **Using Expo CLI:**
   ```bash
   # For Android APK
   EXPO_PUBLIC_VARIANT=staging expo run:android

   # For iOS
   EXPO_PUBLIC_VARIANT=staging expo run:ios
   ```

2. **Using Legacy Expo Build (if available):**
   ```bash
   expo build:android --type apk
   expo build:ios --type archive
   ```

> **Note:** This project is configured for development and testing. For production deployment, consider setting up proper build pipelines or using cloud build services.

## API Endpoints

The JSON Server provides the following endpoints:

- `GET /groceryItems` - Get all grocery items
- `POST /groceryItems` - Create a new grocery item
- `PATCH /groceryItems/:id` - Update a grocery item
- `DELETE /groceryItems/:id` - Delete a grocery item

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddItemForm.tsx     # Form for adding new items
│   ├── ErrorBoundary.tsx   # Error boundary for graceful error handling
│   ├── Loading.tsx         # Loading component
│   └── shared/             # Shared UI components
│       ├── ConfirmationDialog.tsx # Reusable confirmation dialog
│       ├── GroceryItemCard.tsx    # Individual grocery item component
│       └── GroceryItemForm.tsx    # Grocery item form component
├── screens/             # Screen components
│   └── GroceryListScreen.tsx # Main grocery list screen
├── hooks/               # Custom React hooks
│   └── useGroceryItems.ts   # React Query hooks for data management
├── services/            # API and external services
│   └── api.ts              # API service functions
├── types/               # TypeScript type definitions
│   └── index.ts            # Grocery item types
├── config/              # Configuration files
│   ├── environment.ts      # Environment-specific configuration
│   └── gluestack-ui.config.ts # Gluestack UI configuration
├── providers/           # React context providers
│   └── QueryClientProvider.tsx # React Query provider setup
└── utils/               # Utility functions
    └── validationSchemas.ts # Form validation schemas
```

## Build Variants

The app supports three build variants with different configurations:

### 1. Development (Default)
- **Start Development:** `npm start` or `npm run dev`
- Local development with JSON Server
- Uses development API endpoints

### 2. Staging
- **Start Staging:** `npm run start:staging`
- **Export Staging:** `npm run export:staging`
- Staging environment with staging API endpoints
- Used for testing before production release

### 3. Production
- **Start Production:** `npm run start:production`
- **Export Production:** `npm run export:production`
- Production environment with production API endpoints
- Optimized for production deployment

Each variant has:
- Different API endpoints (configured via environment variables)
- Environment-specific configurations
- Different behavior based on `EXPO_PUBLIC_VARIANT` value

### Exporting for Different Environments

```bash
# Export staging version
npm run export:staging

# Export production version
npm run export:production

# Or use Expo CLI directly with environment variables
EXPO_PUBLIC_VARIANT=staging expo export
EXPO_PUBLIC_VARIANT=production expo export
```

## Key Components

### GroceryItemCard
- Displays individual grocery items with clean, modern UI
- Supports inline editing of item name and amount
- Toggle bought/unbought status with visual feedback
- Delete functionality with confirmation dialog
- Optimistic updates for smooth user experience

### GroceryItemForm
- Reusable form component for item creation and editing
- Built with Formik for form state management
- Yup validation for data integrity
- Responsive design with Gluestack UI components

### AddItemForm
- Collapsible form for adding new items
- Form validation with user-friendly error messages
- Clean, intuitive interface with smooth animations

### ConfirmationDialog
- Reusable confirmation dialog component
- Used for destructive actions like item deletion
- Consistent UX across the app

### ErrorBoundary
- Catches JavaScript errors in component tree
- Provides graceful fallback UI
- Helps maintain app stability

### Loading
- Centralized loading component
- Consistent loading states across the app
- Smooth user experience during data fetching

## State Management

- **Server State:** React Query manages all API interactions with automatic caching, background updates, error handling, and optimistic updates
- **Local State:** React hooks for component-level state (forms, UI toggles, loading states)
- **Form State:** Formik for complex form state management with validation
- **Global Configuration:** Environment-based configuration for different build variants
- **Provider Pattern:** Centralized providers for React Query client and other global state

## Error Handling

- **Error Boundaries:** React Error Boundaries catch JavaScript errors and provide fallback UI
- **Network Errors:** Gracefully handled with user-friendly messages and retry options
- **Loading States:** Comprehensive loading feedback during all API operations
- **Form Validation:** Client-side validation with Yup schemas prevents invalid data submission
- **Optimistic Updates:** Immediate UI feedback with automatic rollback on failure
- **Graceful Degradation:** App remains functional even when API is unavailable

## Future Enhancements

Potential additional features:
- Categories for grocery items
- Shopping lists (multiple lists)
- Offline support with sync
- Sharing lists with other users
- Barcode scanning
- Price tracking
- Push notifications

## Dependencies

### Main Dependencies
- `expo` - Expo SDK for cross-platform development
- `react` & `react-native` - React Native framework
- `@gluestack-ui/themed` - Modern, accessible UI component library
- `@tanstack/react-query` - Powerful data fetching and state management
- `react-native-safe-area-context` - Safe area handling for different devices
- `formik` - Build forms without tears
- `yup` - JavaScript schema validation

### Development Dependencies
- `json-server` - Mock REST API for development
- `concurrently` - Run multiple commands simultaneously
- `typescript` - TypeScript support for type safety
- `@babel/core` - JavaScript compiler

## License

This project is created as a technical assessment task.
