// Production Environment Configuration
// This file is used when building with --configuration=production

export const environment = {
  production: true,
  version: '1.0.0',
  buildDate: '2026-01-18',
  
  // Backend API URL - Update with your Render URL after deployment
  // Example: https://cinema-api-xxxxx.onrender.com/api
  API_URL: 'https://cinema-api.onrender.com/api',
  
  // Keycloak Configuration
  // Option 1: If you have a Keycloak instance, update the URL below
  // Option 2: If not using Keycloak yet, comment this section
  keycloak: {
    url: 'http://localhost:8088', // TODO: Replace with production Keycloak URL
    realm: 'cinemas-app',
    clientId: 'cinemas-app-client'
  }
};

