import { Injectable } from '@angular/core';
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SecurityService {
  private keycloak: KeycloakInstance;

  constructor() {
    this.keycloak = new Keycloak({
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId
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