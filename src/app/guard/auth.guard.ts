import {CanActivateFn, Router} from '@angular/router';
// import {TokenService} from '../token/token.service'; // Removed as the module is not found
import {inject} from '@angular/core';
import {KeycloakService} from '../services/keycloak/keycloak.service';

export const authGuard: CanActivateFn = () => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);
  if (keycloakService.keycloak.isTokenExpired()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};