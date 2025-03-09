// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   Router,
//   RouterStateSnapshot
// } from '@angular/router';
// import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard extends KeycloakAuthGuard {
//   constructor(
//     protected override readonly router: Router,
//     protected readonly keycloak: KeycloakService
//   ) {
//     super(router, keycloak);
//   }

//   public async isAccessAllowed(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ) {
//     // Force the user to log in if currently unauthenticated.
//     if (!this.authenticated) {
//       await this.keycloak.login({
//         redirectUri: window.location.origin
//       });
//     }

//     // Get the roles required from the route.
//     const requiredRoles = route.data['roles'];

//     // Allow the user to proceed if no additional roles are required to access the route.
//     if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
//       return true;
//     }
//     // Allow the user to proceed if all the required roles are present.
//     return requiredRoles.every((role) => this.roles.includes(role));
//   }
// }
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(protected override readonly router: Router, protected readonly keycloak: KeycloakService) {
    super(router, keycloak);
  }

  public override async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // Vérifier si l'utilisateur est authentifié
    if (!this.authenticated) {
      await this.keycloak.login({ redirectUri: window.location.href });
      return false;
    }

    // Vérifier les rôles si nécessaire
    const requiredRoles = route.data['roles'];
    if (!requiredRoles || requiredRoles.some((role: string) => this.roles.includes(role))) {
      return true;
    }

    // Redirection si les rôles ne correspondent pas
    this.router.navigate(['/access-denied']);
    return false;
  }
}
