import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CinemaComponent} from "./pages/cinema/cinema.component";
import {FilmsComponent} from "./pages/films/films.component";
import {EvenementsComponent} from "./pages/evenements/evenements.component";
import {OffresComponent} from "./pages/offres/offres.component";

const routes: Routes = [
  {
    path : "cinemas", component: CinemaComponent,
  },
  {
    path : "films", component: FilmsComponent
  },
  {
    path : "evenements", component: EvenementsComponent
  },
  {
    path : "offres", component: OffresComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
