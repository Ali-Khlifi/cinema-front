import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../models/room.model';
import { Cinema } from '../../models/cinema.model';
import { City } from '../../models/city.model';
import { FilmProjection } from '../../models/film-projection.model';
import { Ticket } from '../../models/ticket.model';
import { RoomService } from '../../services/room/room.service';
import { CinemaService } from '../../services/cinema/cinema.service';
import { FilmProjectionService } from '../../services/film-projection/film-projection.service';
import { CityService } from '../../services/city/city.service';
import { TicketService } from '../../services/ticket/ticket.service';

/**
 * Component for displaying cinema rooms and their film projections
 * Allows users to browse rooms by cinema and city
 */
@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit {
  /** Cinema input (optional, can be passed from parent) */
  @Input() cinema!: Cinema;

  /** List of rooms in the selected cinema */
  public rooms: Room[] = [];

  /** List of all cities */
  public cities: City[] = [];

  /** List of film projections */
  public filmProjections: FilmProjection[] = [];

  /** List of tickets */
  public tickets: Ticket[] = [];

  /** Current cinema ID from route params */
  public cinemaId: number | undefined;

  /** Current city ID */
  public currentCityId: number | undefined;

  /** Current cinema name for display */
  public currentCinemaName: string = '';

  /** List of all cinemas */
  public cinemas: Cinema[] = [];

  /** Other cinemas in the same city */
  public otherCinemasInCity: Cinema[] = [];

  /** Currently selected city */
  public currentCity: City | undefined;

  /** Loading state */
  public isLoading: boolean = false;

  /** Error message */
  public errorMessage: string = '';

  // Keep original property names for template compatibility
  public salles: Room[] = [];
  public villes: City[] = [];
  public currentVilleId: number | undefined;
  public currentVille: City | undefined;
  public otherCinemasInVille: Cinema[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private cinemaService: CinemaService,
    private filmProjectionService: FilmProjectionService,
    private cityService: CityService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cinemaId = +params['cinemaId'];
      this.OnGetSalles(this.cinemaId);
      this.OnGetVilles();
    });
  }

  /**
   * Load rooms for a given cinema
   * Fetches rooms by cinema ID and loads film projections for each room
   */
  OnGetSalles(cinemaId: number): void {
    if (cinemaId) {
      this.roomService.getRoomsByCinemaId(cinemaId)
        .subscribe(salles => {
          this.salles = salles;
          this.salles.forEach((salle: Room) => {
            this.filmProjectionService.getFilmProjectionsByRoomId(salle.id)
              .subscribe((filmProjections) => {
                salle.filmProjections = filmProjections;
              })
          })
        })
    }
  }

  OnGetVilles(): void {
    this.cityService.getCities().subscribe(villes => {
      this.villes = villes;
    });
  }

  // When user clicks on a cinema, load its salles and update the cinema info
  onSelectCinema(cinema: Cinema): void {
    this.cinemaId = cinema.id;
    this.currentCinemaName = cinema.name;
    this.OnGetSalles(cinema.id);

    // update list of others cinemas
    this.otherCinemasInVille = this.cinemas.filter(c => c.id !== cinema.id);
    this.router.navigate(['/salles', cinema.id]);
  }

  OnGetCinema(ville: City): void {
    this.currentVille = ville;
    this.salles = [];
    this.cinemaService.getCinemasByCity(ville.name)
      .subscribe(cinemas => {
        this.cinemas = cinemas;
        if (this.cinemas.length > 0) {
          const defaultCinema = this.cinemas[0];
          this.onSelectCinema(defaultCinema);
        }
      })
  }
}
