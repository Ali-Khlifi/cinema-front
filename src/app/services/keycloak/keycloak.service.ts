import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import {UserProfile} from './user-profile';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8088',
        realm: 'cinemas-app',
        clientId: 'cinemas-app-client'
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  async init() {
    try {
      console.log('authenticating user...');
      const authenticated = await this.keycloak.init({
        onLoad: environment.keycloak.initOptions.onLoad as Keycloak.KeycloakOnLoad,
        silentCheckSsoRedirectUri:
        window.location.origin + "/assets/silent-check-sso.html",
        
      });
      console.log('je suis ici');

      if (!authenticated) {
        console.log('je suis ici!!!!!!!!!');

          return authenticated;
      }
        this._profile = await this.keycloak.loadUserProfile() as UserProfile;
        this._profile.token = this.keycloak.token || '';
      
      return true;
    } catch (e) {
      console.error('Keycloak init error:', e);
      return false;
    }
  }

// async isAuthenticated(): Promise<boolean> {
//   try {
//     if (!this._keycloak) {
//       return false;
//     }
//     return await this._keycloak.init({ onLoad: 'check-sso' });
//   } catch (error) {
//     console.error('Authentication check failed', error);
//     return false;
//   }
// }

  login() {
    return this.keycloak.login();
  }

  logout() {
    // this.keycloak.accountManagement();
    return this.keycloak.logout({redirectUri: 'http://localhost:4200'});
  }
}
