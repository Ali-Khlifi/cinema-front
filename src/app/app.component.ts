import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cinema-client';
  isAuthenticated = false;
  userProfile: KeycloakProfile | null = null;

  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Log application version
    console.log(`🎬 Cinema App v${environment.version} ${environment.production ? '(Production)' : '(Development)'}`);
    
    this.isAuthenticated = await this.keycloakService.isLoggedIn();

    if (this.isAuthenticated) {
      this.userProfile = await this.keycloakService.loadUserProfile();

      // redirect to /cinemas after authentification
      if (this.router.url === '/') {
        this.router.navigate(['/cinemas']);
      }
    }
  }

  login() {
    this.keycloakService.login({
      redirectUri: window.location.origin + this.router.url
    });
  }

  logout() {
    this.keycloakService.logout(window.location.origin + '/');
  }

  get username(): string {
    return this.userProfile?.firstName || this.userProfile?.username || '';
  }
}
