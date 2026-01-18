import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinemaComponent } from "./pages/cinema/cinema.component";
import { FilmsComponent } from "./pages/films/films.component";
import { EvenementsComponent } from "./pages/evenements/evenements.component";
import { OffresComponent } from "./pages/offres/offres.component";
import { SallesComponent } from './components/salles/salles.component';
import { ReservationPricesComponent } from './pages/reservation-prices/reservation-prices.component';
import { ReservationRecapComponent } from './pages/reservation-recap/reservation-recap.component';

const routes: Routes = [
  {
    path: "cinemas", component: CinemaComponent,
  },
  {
    path: "films", component: FilmsComponent
  },
  {
    path: "evenements", component: EvenementsComponent
  },
  { path: 'salles/:cinemaId', component: SallesComponent },
  {
    path: "offres", component: OffresComponent
  },
  {
    path: "reservation-prices", component: ReservationPricesComponent
  },
  {
    path: "reservation-recap", component: ReservationRecapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
