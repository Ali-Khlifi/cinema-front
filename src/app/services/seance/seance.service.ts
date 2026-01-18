import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Seance } from '../../models/seance.model';

/**
 * @deprecated Seance concept has been merged into FilmProjection
 * Use FilmProjectionService instead (services/film-projection/film-projection.service.ts)
 * This service is kept for backward compatibility during migration
 * Will be removed in a future version
 */
@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  /** @deprecated */
  urlApi = environment.API_URL;

  /** @deprecated Use FilmProjectionService instead */
  urlSeance = this.urlApi + '/seance';
  
  /** @deprecated Use FilmProjectionService instead */
  urlSeanceByFilmProjection = this.urlApi + '/seance/byFilmProjection';

  constructor(private http: HttpClient) {
    console.warn('SeanceService is deprecated. Seance has been merged into FilmProjection. Use FilmProjectionService instead.');
  }

  /**
   * @deprecated Seance concept no longer exists. Use FilmProjectionService.getFilmProjectionById() instead
   * FilmProjection now contains startTime, endTime, and basePrice directly
   */
  public getSeancesByFilmProjection(filmProjectId: number): Observable<Seance[]> {
    console.warn('getSeancesByFilmProjection() is deprecated. Use FilmProjectionService.getFilmProjectionById() instead.');
    let params = new HttpParams();
    params = params.append('filmProjectId', filmProjectId);
    return this.http.get<Seance[]>(this.urlSeanceByFilmProjection, { params: params }).pipe(take(1));
  }
}
