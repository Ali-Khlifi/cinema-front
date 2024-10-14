import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Salle} from "../../models/salle.model";
import {SalleService} from "../../services/salle/salle.service";
import {Cinema} from "../../models/cinema.model";
import {FilmProjectionService} from "../../services/film-projection/film-projection.service";
import {FilmProjection} from "../../models/film-projection.model";
import {TicketService} from "../../services/ticket/ticket.service";
import {Ticket} from "../../models/ticket.model";
import { ActivatedRoute } from '@angular/router';
import { VilleService } from 'src/app/services/ville/ville.service';
import { Ville } from 'src/app/models/ville.model';
import { CinemaService } from 'src/app/services/cinema/cinema.service';

@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit {

  @Input() cinema!: Cinema;
  salles : Salle[] = [];
  public villes: Ville[] = [];
  filmProjections : FilmProjection[] = [];
  tickets : Ticket[] = [];
  public cinemaId: number | undefined;
  public currentVilleId: number | undefined;
  public currentCinemaName: string = '';
  public cinemas: Cinema[] = [];
  public otherCinemasInVille: Cinema[] = [];

  constructor(
    private route: ActivatedRoute,
    private serviceSalle: SalleService,
    private serviceCinema: CinemaService,
    private serviceFilmProjection: FilmProjectionService,
    private serviceVille: VilleService,
    private serviceTicket : TicketService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cinemaId = +params['cinemaId'];
      this.OnGetSalles(this.cinemaId);
      this.OnGetVilles();
      this.getCinemaName(this.cinemaId);
    });
  }

  OnGetSalles(cinemaId: number) {
    if(cinemaId){
      this.serviceSalle.getSallesByCinemaId(cinemaId)
        .subscribe(salles => {
          this.salles = salles
          this.salles.forEach((salle: Salle) => {
            this.serviceFilmProjection.getFilmProjectionBySalle(salle.id)
              .subscribe((filmProjections) => {
                salle.filmProjections = filmProjections;
              })
          })
        })
    }
  }

  OnGetVilles() {
    this.serviceVille.getVilles().subscribe(villes => {
      this.villes = villes;
      // find the current ville and get its cinemas
      this.villes.forEach(ville => {
        this.serviceCinema.getCinema(ville.name).subscribe(cinemas => {
          const currentCinema = cinemas.find(cinema => cinema.id === this.cinemaId);
          if(currentCinema) {
            this.currentVilleId = ville.id;
            this.cinemas = cinemas;
            // Filter out the current cinema from the list of cinemas in the same city
            this.otherCinemasInVille = cinemas.filter(cinema => cinema.id !== this.cinemaId);
            console.log(this.otherCinemasInVille);
          }
        });
      });
    });
  }
  getCinemaName(cinemaId: number): void {
    this.serviceCinema.getCinemaById(cinemaId).subscribe(cinema => {
      this.currentCinemaName = cinema.name;
    });
  }
  // When user clicks on a cinema, load its salles and update the cinema info
  onSelectCinema(cinema: Cinema) {
    this.cinemaId = cinema.id;
    this.currentCinemaName = cinema.name;
    this.OnGetSalles(cinema.id);
    
    // update list of others cinemas
    this.otherCinemasInVille = this.cinemas.filter(c => c.id !== cinema.id);
  }
}
