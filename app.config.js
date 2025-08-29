export default ({ config }) => {
  const variant = process.env.EXPO_PUBLIC_VARIANT || 'development';
  
  const baseConfig = {
    expo: {
      name: 'Grocery List',
      slug: 'grocery-list-app',
      version: '1.0.0',
      orientation: 'portrait',
      icon: './assets/icon.png',
      userInterfaceStyle: 'light',
      splash: {
        image: './assets/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff'
      },
      assetBundlePatterns: [
        '**/*'
      ],
      ios: {
        supportsTablet: true,
        bundleIdentifier: 'com.groceryapp.grocerylist'
      },
      android: {
        adaptiveIcon: {
          foregroundImage: './assets/adaptive-icon.png',
          backgroundColor: '#4CAF50'
        },
        package: 'com.groceryapp.grocerylist'
      },
      web: {
        favicon: './assets/favicon.png'
      }
    }
  };

  // Customize config based on variant
  switch (variant) {
    case 'staging':
      return {
        ...baseConfig,
        expo: {
          ...baseConfig.expo,
          name: 'Grocery List (Staging)',
          ios: {
            ...baseConfig.expo.ios,
            bundleIdentifier: 'com.groceryapp.grocerylist.staging'
          },
          android: {
            ...baseConfig.expo.android,
            package: 'com.groceryapp.grocerylist.staging'
          }
        }
      };
    
    case 'production':
      return {
        ...baseConfig,
        expo: {
          ...baseConfig.expo,
          name: 'Grocery List',
        }
      };
    
    default:
      return {
        ...baseConfig,
        expo: {
          ...baseConfig.expo,
          name: 'Grocery List (Dev)',
          ios: {
            ...baseConfig.expo.ios,
            bundleIdentifier: 'com.groceryapp.grocerylist.dev'
          },
          android: {
            ...baseConfig.expo.android,
            package: 'com.groceryapp.grocerylist.dev'
          }
        }
      };
  }
};
