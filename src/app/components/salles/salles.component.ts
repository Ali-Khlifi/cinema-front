import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Salle} from "../../models/salle.model";
import {SalleService} from "../../services/salle/salle.service";
import {Cinema} from "../../models/cinema.model";
import {FilmProjectionService} from "../../services/film-projection/film-projection.service";
import {FilmProjection} from "../../models/film-projection.model";
import {TicketService} from "../../services/ticket/ticket.service";
import {Ticket} from "../../models/ticket.model";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit {

  @Input() cinema!: Cinema;
  salles : Salle[] = [];

  filmProjections : FilmProjection[] = [];
  tickets : Ticket[] = [];
  public cinemaId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private serviceSalle: SalleService,
    private serviceFilmProjection: FilmProjectionService,
    private serviceTicket : TicketService
  ){}

  //ngOnInit(): void {
  //}
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['cinema']) {
  //     this.OnGetSalles(this.cinema);
  //   }
  // }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cinemaId = +params['cinemaId'];
      this.OnGetSalles(this.cinemaId);
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
}
