// keycloak.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class KeycloakInterceptor implements HttpInterceptor {
  constructor(private keycloak: KeycloakService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Exclure les requêtes vers Keycloak et les assets
    if (req.url.includes('keycloak') || req.url.includes('assets') ||
      req.url.includes('http://localhost:8088')) {
      return next.handle(req);
    }

    return from(this.keycloak.getToken()).pipe(
      mergeMap(token => {
        if (token) {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          return next.handle(authReq);
        }
        return next.handle(req);
      }),
      catchError(error => {
        // Gérer les erreurs d'authentification
        if (error.status === 401 || error.status === 403) {
          console.warn('Token expiré ou invalide, tentative de rafraîchissement...');
          this.keycloak.login();
        }
        throw error;
      })
    );
  }
}
