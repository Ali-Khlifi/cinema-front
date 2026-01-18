import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Ville } from '../../models/ville.model';
import { KeycloakService } from 'keycloak-angular';

/**
 * @deprecated Use CityService instead (services/city/city.service.ts)
 * This service is kept for backward compatibility during migration
 * Will be removed in a future version
 */
@Injectable({
  providedIn: 'root'
})
export class VilleService {
  /** @deprecated */
  apiUrl: string = environment.API_URL;
  
  /** @deprecated Use CityService.apiUrl instead */
  urlVille: string = this.apiUrl + '/ville';

  constructor(
    private http: HttpClient,
    private keycloak: KeycloakService
  ) {
    console.warn('VilleService is deprecated. Please use CityService instead.');
  }

  /**
   * @deprecated Use CityService.getCities() instead
   */
  getVilles(): Observable<Ville[]> {
    console.warn('getVilles() is deprecated. Use CityService.getCities() instead.');
    return this.http.get<Ville[]>(this.urlVille);
  }
}
