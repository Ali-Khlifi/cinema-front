import {Component, OnInit, Output} from '@angular/core';
import { VilleService } from 'src/app/services/ville/ville.service';
import {CinemaService} from "../../services/cinema/cinema.service";
import {Ville} from "../../models/ville.model";
import { Cinema } from 'src/app/models/cinema.model';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit{

  public villes: Ville[] = [];
  public cinemas: Cinema[] = [];
  public currentVille : any;
  public currentCinema :any;
  public salles:any;
  public filmProjections: any;
  public currentProject :any;
  tickets: any;
  currentSeance: any;
  public selectedTickets: any[] = [];
  constructor( public serviceCinema: CinemaService,
               public  villeService: VilleService) {}
  ngOnInit() {
    this.villeService.getVilles()
      .subscribe(villes => this.villes = villes);

    this.OnGetTicketsPlaces(this.currentProject);
  }
  OnGetCinema(ville: Ville) {
    this.currentVille = ville;
    this.salles = undefined;  // vider la liste des salles
    this.serviceCinema.getCinema(ville.name)
      .subscribe(data =>{
        this.cinemas = data;
      })
  }
  OnGetSalles(c: Cinema){
    this.currentCinema = c;
  }
  OnGetTicketsPlaces(p:any) {
    this.currentProject = p;
    this.serviceCinema.getTicketsPlaces(p)
      .subscribe(data => {
        this.currentProject.tickets = data;
        this.selectedTickets = [];
      })
  }
}
