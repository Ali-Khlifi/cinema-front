// keycloak.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class KeycloakInterceptor implements HttpInterceptor {
  constructor(private keycloak: KeycloakService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Exclure les requêtes vers Keycloak elle-même
    if (req.url.includes('keycloak') || req.url.includes('assets')) {
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
          console.log('Token ajouté à la requête vers:', req.url); // Debug
          return next.handle(authReq);
        }
        console.warn('Aucun token disponible pour:', req.url); // Debug
        return next.handle(req);
      })
    );
  }
}
