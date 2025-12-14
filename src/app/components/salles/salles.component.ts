import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Salle } from "../../models/salle.model";
import { SalleService } from "../../services/salle/salle.service";
import { Cinema } from "../../models/cinema.model";
import { FilmProjectionService } from "../../services/film-projection/film-projection.service";
import { FilmProjection } from "../../models/film-projection.model";
import { TicketService } from "../../services/ticket/ticket.service";
import { Ticket } from "../../models/ticket.model";
import { ActivatedRoute, Router } from '@angular/router';
import { VilleService } from 'src/app/services/ville/ville.service';
import { Ville } from 'src/app/models/ville.model';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
//test 

@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit
{

  @Input() cinema!: Cinema;
  salles: Salle[] = [];
  public villes: Ville[] = [];
  filmProjections: FilmProjection[] = [];
  tickets: Ticket[] = [];
  public cinemaId: number | undefined;
  public currentVilleId: number | undefined;
  public currentCinemaName: string = '';
  public cinemas: Cinema[] = [];
  public otherCinemasInVille: Cinema[] = [];
  public currentVille: Ville | undefined;

  constructor(
    private route: ActivatedRoute,
    private serviceSalle: SalleService,
    private serviceCinema: CinemaService,
    private serviceFilmProjection: FilmProjectionService,
    private serviceVille: VilleService,
    private serviceTicket: TicketService,
    private router: Router,
  ) { }

  ngOnInit(): void
  {
    this.route.params.subscribe(params =>
    {
      this.cinemaId = +params['cinemaId'];
      this.OnGetSalles(this.cinemaId);
      this.OnGetVilles();
      
      // Get cinema name from service or fetch it by ID
      this.serviceCinema.getCurrentCinema().subscribe(cinema => {
        if (cinema && cinema.id === this.cinemaId) {
          this.currentCinemaName = cinema.name;
        } else if (this.cinemaId) {
          // Fallback: fetch cinema by ID
          this.serviceCinema.getCinemaById(this.cinemaId).subscribe(cinema => {
            this.currentCinemaName = cinema.name;
            this.serviceCinema.setCurrentCinema(cinema);
          });
        }
      });
    });
  }

  OnGetSalles(cinemaId: number)
  {
    if (cinemaId) {
      this.serviceSalle.getSallesByCinemaId(cinemaId)
        .subscribe(salles =>
        {
          this.salles = salles
          this.salles.forEach((salle: Salle) =>
          {
            this.serviceFilmProjection.getFilmProjectionBySalle(salle.id)
              .subscribe((filmProjections) =>
              {
                salle.filmProjections = filmProjections;
              })
          })
        })
    }
  }

  OnGetVilles()
  {
    this.serviceVille.getVilles().subscribe(villes =>
    {
      this.villes = villes;
      // find the current ville and get its cinemas
      this.villes.forEach(ville =>
      {
        this.serviceCinema.getCinema(ville.name).subscribe(cinemas =>
        {
          const currentCinema = cinemas.find(cinema => cinema.id === this.cinemaId);
        });
      });
    });
  }
  // When user clicks on a cinema, load its salles and update the cinema info
  onSelectCinema(cinema: Cinema)
  {
    this.cinemaId = cinema.id;
    this.currentCinemaName = cinema.name;
    this.OnGetSalles(cinema.id);

    // update list of others cinemas
    this.otherCinemasInVille = this.cinemas.filter(c => c.id !== cinema.id);
    this.router.navigate(['/salles', cinema.id]);
  }
  OnGetCinema(ville: Ville)
  {
    this.currentVille = ville;
    this.salles = [];
    this.serviceCinema.getCinema(ville.name)
      .subscribe(cinemas => 
      {
        this.cinemas = cinemas;
        if (this.cinemas.length > 0) {
          const defaultCinema = this.cinemas[0];
          this.onSelectCinema(defaultCinema);
        }
      })
  }
}
