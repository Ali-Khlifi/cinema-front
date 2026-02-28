// Production Environment Configuration
// This file is used when building with --configuration=production
// NOTE: Nginx reverse proxy handles /api and /auth routing

export const environment = {
  production: true,
  version: '1.0.0',
  buildDate: '2026-01-18',
  
  // Backend API URL - Relative path (Nginx handles routing)
  // From cinema.alikhlifi.ovh → /api/* goes to backend
  API_URL: '/api',
  
  // Keycloak Configuration - Relative path
  // From cinema.alikhlifi.ovh → /auth/* goes to keycloak
  keycloak: {
    url: '/auth',
    realm: 'cinemas-app',
    clientId: 'cinemas-app-client'
  }
};