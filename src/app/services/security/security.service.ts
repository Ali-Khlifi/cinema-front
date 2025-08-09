import { Injectable } from '@angular/core';
import Keycloak, { KeycloakInstance } from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class SecurityService {
  private keycloak: KeycloakInstance;

  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8088',
      realm: 'cinemas-app',
      clientId: 'cinemas-app-client'
    });
  }

  async init(): Promise<void> {
    await this.keycloak.init({ onLoad: 'login-required' });
    console.log('Token:', this.keycloak.token);
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }
}