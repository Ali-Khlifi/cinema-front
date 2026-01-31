// Production Environment Configuration
// This file is used when building with --configuration=production

export const environment = {
  production: true,
  version: '1.0.0',
  buildDate: '2026-01-18',
  
  // Backend API URL - Production VPS
  API_URL: 'http://94.250.202.228:8082/api',
  
  // Keycloak Configuration - Production VPS
  keycloak: {
    url: 'http://94.250.202.228:8080',
    realm: 'cinemas-app',
    clientId: 'cinemas-app-client'
  }
};

