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

import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {APP_INITIALIZER, NgModule} from '@angular/core';


/**
 * function to initialize keycloak (keycloak-angular) with keycloak Adapter
 * @param keycloak 
 * @returns 
 */

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8088',
        realm: 'cinemas-app',
        clientId: 'cinemas-app-client'
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe : false,
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

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
    {provide : APP_INITIALIZER, deps : [KeycloakService],useFactory : initializeKeycloak, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
