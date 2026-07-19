// Remote (VPS) Environment Configuration
// Used when running: ng serve --configuration=remote
// Points to the distant server hosting the API and Keycloak directly (no reverse proxy)

export const environment = {
  production: false,
  version: '1.0.0',
  API_URL: 'http://94.250.202.228:8082/api',

  // Keycloak Configuration - Remote VPS
  keycloak: {
    url: 'http://94.250.202.228:8080',
    realm: 'cinemas-app',
    clientId: 'cinemas-app-client'
  }
};
