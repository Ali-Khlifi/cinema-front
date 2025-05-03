import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import {UserProfile} from './user-profile';
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
        onLoad: 'login-required',
        checkLoginIframe: false,
        redirectUri: window.location.origin
      });
  
      if (authenticated) {
        console.log('authenticated ok...');
        this._profile = await this.keycloak.loadUserProfile() as UserProfile;
        this._profile.token = this.keycloak.token || '';
      } else {
        console.warn('User not authenticated');
      }
    } catch (e) {
      console.error('Keycloak init error:', e);
    }
  }

async isAuthenticated(): Promise<boolean> {
  try {
    if (!this._keycloak) {
      return false;
    }
    return await this._keycloak.init({ onLoad: 'check-sso' });
  } catch (error) {
    console.error('Authentication check failed', error);
    return false;
  }
}

  login() {
    return this.keycloak.login();
  }

  logout() {
    // this.keycloak.accountManagement();
    return this.keycloak.logout({redirectUri: 'http://localhost:4200'});
  }
}
