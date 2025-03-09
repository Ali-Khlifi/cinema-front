import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {SecurityService} from "./services/security/security-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cinema-client';
  constructor(
    public securityService: SecurityService,
    public keycloakService: KeycloakService ) 
    { 
     }
  ngOnInit() {}
  isLoggedIn() {
    console.log('User is logged in:');
    return this.keycloakService.isLoggedIn();
  }

  async login() {
    await this.keycloakService.login({
      redirectUri: window.location.origin
    });
    console.log('User is logginnnn:');
  }

  logout() {
    this.keycloakService.logout(window.location.origin)
    console.log('User is loggeouut:');
  }
}
