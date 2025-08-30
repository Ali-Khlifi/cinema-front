import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!environment.production) {
      console.log('Requête HTTP:', req.method, req.url, req.headers);
    }

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (!environment.production) {
            console.log('Réponse HTTP:', event);
          }
        },
        error: (error) => {
          if (!environment.production) {
            console.error('Erreur HTTP:', error);
          }
        }
      })
    );
  }
}
