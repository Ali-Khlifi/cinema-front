

export const environment = {
  production: false,
  API_URL: 'http://localhost:8082',
  keycloak: {
    enable: true, //Enable or disable Keycloak for Frontend app
    authority: 'http://localhost:8088', //Keycloak URL
    redirectUri: 'http://localhost:4200', //Frontend app URL
    postLogoutRedirectUri: 'http://localhost:4200', //Optional value
    realm: 'cinemas-app',
    clientId: 'cinemas-app-client',
  },
};
