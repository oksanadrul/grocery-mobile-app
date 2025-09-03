export interface Config {
  API_BASE_URL: string;
  APP_NAME: string;
  VERSION: string;
}

const development: Config = {
  API_BASE_URL: "http://localhost:3001",
  APP_NAME: "Grocery List (Dev)",
  VERSION: "1.0.0-dev",
};

const staging: Config = {
  API_BASE_URL: "https://staging-api.grocery-app.com",
  APP_NAME: "Grocery List (Staging)",
  VERSION: "1.0.0-staging",
};

const production: Config = {
  API_BASE_URL: "https://api.grocery-app.com",
  APP_NAME: "Grocery List",
  VERSION: "1.0.0",
};

const getConfig = (): Config => {
  const env = process.env.NODE_ENV || "development";
  const variant = process.env.EXPO_PUBLIC_VARIANT || "development";

  switch (variant) {
    case "staging":
      return staging;
    case "production":
      return production;
    default:
      return development;
  }
};

export const config = getConfig();
