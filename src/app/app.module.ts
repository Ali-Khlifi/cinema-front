import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CinemaComponent } from './pages/cinema/cinema.component';
import {HttpClientModule} from "@angular/common/http";
import {CinemaService} from "./services/cinema/cinema.service";
import {FormsModule} from "@angular/forms";
import { VillesComponent } from './components/villes/villes.component';
import { HomeComponent } from './pages/home/home.component';
import { SallesComponent } from './components/salles/salles.component';
import { FilmProjectionsComponent } from './components/film-projections/film-projections.component';
import { FilmsComponent } from './pages/films/films.component';
import { EvenementsComponent } from './pages/evenements/evenements.component';
import { OffresComponent } from './pages/offres/offres.component';
import { TicketPaymentComponent } from './components/ticket-payment/ticket-payment.component';

import {KeycloakAngularModule, KeycloakEventType, KeycloakService} from "keycloak-angular";
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {environment} from '../environments/environment';


/**
 * function to initialize keycloak (keycloak-angular) with keycloak Adapter
 * @param keycloak 
 * @returns 
 */

// function initializeKeycloak(keycloak: KeycloakService) {
//   return () =>
//     keycloak.init({
//       config: {
//         url: 'http://localhost:8088',
//         realm: 'cinemas-app',
//         clientId: 'cinemas-app-client'
//       },
//       initOptions: {
//         onLoad: 'check-sso',
//         checkLoginIframe : false,
//         silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
//       }
//     });
// }
export const initializeKeycloak = (keycloak: KeycloakService) => async () => {
  console.log('🟢 Démarrage de l\'initialisation Keycloak...');

  if (!environment.keycloak?.enable) {
    console.warn('⚠️ Keycloak désactivé dans environment.ts');
    return Promise.resolve();
  }
  console.log('🔍 environment.keycloak:', environment.keycloak);
  try {
    keycloak.keycloakEvents$.subscribe({
      next(event) {
        if (event.type == KeycloakEventType.OnTokenExpired) {
          console.log('🔄 Token expiré, mise à jour...');
          keycloak.updateToken(20);
        }
      },
    });

    const keycloakInit = await keycloak.init({
      config: {
        url: environment.keycloak?.authority ?? '',
        realm: environment.keycloak?.realm ?? '',
        clientId: environment.keycloak?.clientId ?? '',
      },
      loadUserProfileAtStartUp: true,
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        checkLoginIframe: false,
        redirectUri: environment.keycloak?.redirectUri ?? '',
      },
      bearerExcludedUrls: ['/assets'],
    });

    console.log('✅ Keycloak initialisé avec succès:', keycloakInit);
    return keycloakInit;
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation Keycloak:', error);
    return Promise.resolve(); // Éviter que l'application plante
  }
};




@NgModule({
  declarations: [
    AppComponent,
    CinemaComponent,
    VillesComponent,
    HomeComponent,
    SallesComponent,
    FilmProjectionsComponent,
    FilmsComponent,
    EvenementsComponent,
    OffresComponent,
    TicketPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    KeycloakAngularModule
  ],
  providers: [CinemaService, 
    {provide : APP_INITIALIZER, useFactory: initializeKeycloak,  multi : true, deps : [KeycloakService]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
