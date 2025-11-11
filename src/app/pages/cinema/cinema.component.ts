import { Component, OnInit, Output } from '@angular/core';
import { VilleService } from 'src/app/services/ville/ville.service';
import { CinemaService } from "../../services/cinema/cinema.service";
import { Ville } from "../../models/ville.model";
import { Cinema } from 'src/app/models/cinema.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css'],
  standalone: false
})
export class CinemaComponent implements OnInit
{

  public villes: Ville[] = [];
  public cinemas: Cinema[] = [];
  public currentVille: any;
  public currentCinema: any;
  public salles: any;
  public filmProjections: any;
  public currentProject: any;
  tickets: any;
  currentSeance: any;
  public selectedTickets: any[] = [];
  public filteredCinemas: Cinema[] = [];
  searchTerm: string = '';

  constructor(
    public serviceCinema: CinemaService,
    private router: Router,
    public villeService: VilleService
  ) { }

  async ngOnInit()
  {

    this.serviceCinema.getCinemas()
        .subscribe(data => {
          this.cinemas = data;
          this.filteredCinemas = [...data];
        });
     this.villeService.getVilles()
          .subscribe(villes => this.villes = villes);

    //this.OnGetTicketsPlaces(this.currentProject);

  }
  OnGetCinema(ville: Ville)
  {
    this.currentVille = ville;
    this.salles = undefined;
    this.serviceCinema.getCinema(ville.name)
      .subscribe((data: Cinema[]) =>
      {
        this.cinemas = data;
        this.filteredCinemas = [...data];
        this.searchTerm = '';
      })
  }
  OnGetSalles(c: Cinema)
  {
    this.currentCinema = c;
  }

  OnNavigateToSalles(cinemaId: number)
  {
    this.router.navigate(['/salles', cinemaId]);
  }

  handleSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
    if (!searchTerm || searchTerm.trim() === '') {
      this.filteredCinemas = [...this.cinemas];
      return;
    }
    const term = searchTerm.toLowerCase();
    this.filteredCinemas = this.cinemas.filter(c =>
      c.name.toLowerCase().includes(term) ||
      (c.adresse && c.adresse.toLowerCase().includes(term))
    );
  }
  onSearchTermChanged(newValue: string) {
    this.searchTerm = newValue;
    this.handleSearch(newValue);
  }


  // OnGetTicketsPlaces(p: any)
  // {
  //   this.currentProject = p;
  //   this.serviceCinema.getTicketsPlaces(p)
  //     .subscribe(data =>
  //     {
  //       this.currentProject.tickets = data;
  //       this.selectedTickets = [];
  //     })
  // }
}
