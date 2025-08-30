import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cinema-client';
  isAuthenticated = false;
  userProfile: KeycloakProfile | null = null;

  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit() {
    this.isAuthenticated = await this.keycloakService.isLoggedIn();

    if (this.isAuthenticated) {
      this.userProfile = await this.keycloakService.loadUserProfile();
    }
  }

  login() {
    this.keycloakService.login({
      redirectUri: window.location.origin // Redirige vers la page actuelle après login
    });
  }

  logout() {
    this.keycloakService.logout(window.location.origin); // Redirige vers la page d'accueil après logout
  }

  // Optionnel: Afficher le nom d'utilisateur
  get username(): string {
    return this.userProfile?.username || '';
  }
}
