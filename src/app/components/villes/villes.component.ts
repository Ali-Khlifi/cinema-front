import { Component, OnInit } from '@angular/core';
import { City } from '../../models/city.model';
import { CityService } from '../../services/city/city.service';

/**
 * Component for displaying and managing cities
 * @deprecated Consider using a more specific component or integrating into cinema component
 */
@Component({
  selector: 'app-villes',
  templateUrl: './villes.component.html',
  styleUrls: ['./villes.component.css']
})
export class VillesComponent implements OnInit {
  villes: City[] = [];

  constructor(private cityService: CityService) {}

  /**
   * Initializes the component
   * Loads cities on init
   */
  ngOnInit(): void {
  }

  getVilles() {
    this.cityService.getCities().subscribe(villes => this.villes = villes);
  }
}
