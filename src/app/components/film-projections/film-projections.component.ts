import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FilmProjectionService} from "../../services/film-projection/film-projection.service";
import {Observable} from "rxjs";
import {FilmProjection} from "../../models/film-projection.model";
import {Salle} from "../../models/salle.model";
import {TicketService} from "../../services/ticket/ticket.service";
import {Ticket} from "../../models/ticket.model";

@Component({
  selector: 'app-film-projections',
  templateUrl: './film-projections.component.html',
  styleUrls: ['./film-projections.component.css']
})
export class FilmProjectionsComponent implements OnInit{

  @Input() filmProjection !: FilmProjection;

  imageFilm!:any;

  salleId!: number;
  salle!: Salle;
  ticket !: Ticket;
  tickets : Ticket[] = [];
  selectedTickets : Ticket[] = [];
  selectedProjectionId: number | null = null;
  showTicketsList: boolean = false;



  constructor(private filmProjectionService: FilmProjectionService,
              private ticketService: TicketService) {
  }
  ngOnInit(): void {
    this.getTicketsByProjection(this.filmProjection.id);
  }

  ngOnChanges(changes: SimpleChanges) : void {
    if (changes['filmProjection'] && this.filmProjection.film.id){
      this.filmProjectionService.getImageByFilm(this.filmProjection.film.id).subscribe(data => {
        let read = new FileReader();
        read.readAsDataURL(data);
        read.onloadend = () => {
          this.imageFilm = read.result;
        }
      }, error => {
        console.log(error);
      });
    }
  }

  getTicketsByProjection(filmProjectionId: number){
    filmProjectionId = this.filmProjection.id
      this.ticketService.getTicketsByFilmProjection(filmProjectionId)
        .subscribe(tickets => {this.tickets = tickets;
        })
  }

  OnSelectTicket(t: any) {
    // initialize the selected ticket in true on click
    if(!t.selected) {
      // added a new selected ticket to the list
      t.selected = true;
      this.selectedTickets.push(t);
    } else {
      // removed a selected ticket from the list
      t.selected = false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(t), 1);
    }
    console.log(this.selectedTickets);
  }
  getTicketPlace(t: any) {
    let str ="btn ticket ";
    if(t.reservee == true){
      str +=" btn-danger'"
    }  else if (t.selected) {
      str += "btn-warning";
    } else {
      str += "btn-success"
    }
    return str;

  }
  getListTickets() {
    // Si showTicketsList est true, on le met à false et vice-versa.
    this.showTicketsList = !this.showTicketsList;
    if(this.showTicketsList){
      this.getTicketsByProjection(this.filmProjection.id)
    }
  }
}
