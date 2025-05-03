

export const environment = {
  production: false,
  API_URL: 'http://localhost:8080',
  keycloak: {
    consfig: {
      authority: 'http://localhost:8088', // Keycloak server
      redirectUri: 'http://localhost:4200', // redirect
      postLogoutRedirectUri: 'http://localhost:4200/logout', // post logout url
      realm: 'cinemas-app',
      clientId: 'cinemas-app-client', // client id
    },
    initOptions: {
      onLoad: "check-sso",
      checkLoginIframe: false
      }
  }
}
