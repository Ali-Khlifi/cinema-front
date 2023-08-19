import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Salle} from "../../models/salle.model";
import {SalleService} from "../../services/salle/salle.service";
import {Cinema} from "../../models/cinema.model";
import {FilmProjectionService} from "../../services/film-projection/film-projection.service";
import {FilmProjection} from "../../models/film-projection.model";
import {TicketService} from "../../services/ticket/ticket.service";
import {Ticket} from "../../models/ticket.model";

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

  constructor(private serviceSalle: SalleService,
              private serviceFilmProjection: FilmProjectionService,
              private serviceTicket : TicketService){}

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['cinema']) {
      this.OnGetSalles(this.cinema);
    }
  }
  OnGetSalles(c:Cinema) {
    if(this.cinema){
      this.serviceSalle.getSalles(c.name)
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
