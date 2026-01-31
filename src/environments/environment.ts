export const environment = {
  production: false,
  version: '1.0.0',
  API_URL: 'http://94.250.202.228:8082/api',
  
  // Keycloak Configuration - Dev
  keycloak: {
    url: 'http://94.250.202.228:8080',
    realm: 'cinemas-app',
    clientId: 'cinemas-app-client'
  }
}
