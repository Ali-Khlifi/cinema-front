import { Component } from '@angular/core';
import { KeycloakService } from './services/keycloak/keycloak.service';
import { UserProfile } from './services/keycloak/user-profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cinema-client';
  isAuthenticated = false;
  userProfile: UserProfile | undefined;

  constructor(private keycloakService: KeycloakService) {}

  // async ngOnInit() {
  //   this.isAuthenticated = await this.keycloakService.isAuthenticated();
  //   if (this.isAuthenticated) {
  //     this.userProfile = this.keycloakService.profile;
  //   }
  // }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }
}
