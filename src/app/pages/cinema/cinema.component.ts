import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CinemaService } from '../../services/cinema/cinema.service';
import { CityService } from '../../services/city/city.service';
import { City } from '../../models/city.model';
import { Cinema } from '../../models/cinema.model';

/**
 * Component for displaying and managing cinemas
 * Allows users to filter cinemas by city and search by name
 */
@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css'],
  standalone: false
})
export class CinemaComponent implements OnInit {
  /** List of all cities */
  public cities: City[] = [];
  
  /** List of all cinemas */
  public cinemas: Cinema[] = [];
  
  /** Currently selected city */
  public currentCity: City | null = null;
  
  /** Currently selected cinema */
  public currentCinema: Cinema | null = null;
  
  /** Filtered list of cinemas based on search */
  public filteredCinemas: Cinema[] = [];
  
  /** Current search term */
  public searchTerm: string = '';

  /** Loading state */
  public isLoading: boolean = false;

  /** Error message */
  public errorMessage: string = '';

  // Keep original property names
  public villes: City[] = [];
  public currentVille: City | null = null;

  constructor(
    private cinemaService: CinemaService,
    private cityService: CityService,
    private router: Router
  ) {}

  /**
   * Initializes the component
   * Loads all cities and cinemas
   */
  async ngOnInit() {
    this.cinemaService.getCinemas()
      .subscribe(data => {
        this.cinemas = data;
        this.filteredCinemas = [...data];
      });
    this.cityService.getCities()
      .subscribe(villes => this.villes = villes);
  }

  /**
   * Handles city selection
   * Filters cinemas by the selected city
   * @param city - Selected city
   */
  OnGetCinema(ville: City) {
    this.currentVille = ville;
    this.cinemaService.getCinemasByCity(ville.name)
      .subscribe((data: Cinema[]) => {
        this.cinemas = data;
        this.filteredCinemas = [...data];
        this.searchTerm = '';
      })
  }

  OnGetSalles(c: Cinema) {
    this.currentCinema = c;
    this.cinemaService.setCurrentCinema(c);
  }

  OnNavigateToSalles(cinemaId: number) {
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
      (c.city && c.city.toLowerCase().includes(term)) ||
      (c.streetName && c.streetName.toLowerCase().includes(term)) ||
      (c.postalCode && c.postalCode.toLowerCase().includes(term)) ||
      (c.adresse && c.adresse.toLowerCase().includes(term))
    );
  }
  
  onSearchTermChanged(newValue: string) {
    this.searchTerm = newValue;
    this.handleSearch(newValue);
  }

  /**
   * Format cinema address in the pattern: "street_number street_name, postal_code city"
   */
  formatAddress(cinema: Cinema): string {
    const parts: string[] = [];

    // Add street address (street_number street_name)
    const streetParts: string[] = [];
    if (cinema.streetNumber) {
      streetParts.push(cinema.streetNumber);
    }
    if (cinema.streetName) {
      streetParts.push(cinema.streetName);
    }
    if (streetParts.length > 0) {
      parts.push(streetParts.join(' '));
    }

    // Add postal code and city (postal_code city)
    const cityParts: string[] = [];
    if (cinema.postalCode) {
      cityParts.push(cinema.postalCode);
    }
    if (cinema.city) {
      cityParts.push(cinema.city);
    }
    if (cityParts.length > 0) {
      parts.push(cityParts.join(' '));
    }

    // Join with comma and space
    return parts.length > 0 ? parts.join(', ') : (cinema.adresse || 'Adresse non disponible');
  }
}
