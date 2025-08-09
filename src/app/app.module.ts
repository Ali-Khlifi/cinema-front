import { NgModule } from '@angular/core';
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
import { CinemaSearchComponent } from './components/search/cinema-search/cinema-search.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakInterceptor } from './services/security/keycloak.interceptor';

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
    TicketPaymentComponent,
    CinemaSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CinemaService,
    { provide: HTTP_INTERCEPTORS, useClass: KeycloakInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
