// Local Environment Configuration
// Used when running: ng serve --configuration=local
// Points to services running locally via cinema-api/docker-compose.yml
// (keycloak exposed on :8088, API exposed on :8082)

export const environment = {
  production: false,
  version: '1.0.0',
  API_URL: 'http://localhost:8082/api',

  // Keycloak Configuration - Local Docker
  keycloak: {
    url: 'http://localhost:8088',
    realm: 'cinemas-app',
    clientId: 'cinemas-app-client'
  }
};
