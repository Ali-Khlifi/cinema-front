import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Salle } from '../../models/salle.model';

/**
 * @deprecated Use RoomService instead (services/room/room.service.ts)
 * This service is kept for backward compatibility during migration
 * Will be removed in a future version
 */
@Injectable({
  providedIn: 'root'
})
export class SalleService {
  /** @deprecated */
  urlAPI = environment.API_URL;
  
  /** @deprecated Use RoomService instead */
  urlSalles = this.urlAPI + '/salle';
  
  /** @deprecated Use RoomService instead */
  urlSalleByCinema = this.urlAPI + '/salle/byCinema';
  
  /** @deprecated Use RoomService instead */
  urlSallesByCinemaId = this.urlAPI + '/salles';

  constructor(private http: HttpClient) {
    console.warn('SalleService is deprecated. Please use RoomService instead.');
  }

  /**
   * @deprecated Use RoomService.getRoomsByCinemaId() instead
   */
  public getSalles(cinema: string): Observable<Salle[]> {
    console.warn('getSalles() is deprecated. Use RoomService.getRoomsByCinemaId() instead.');
    let params = new HttpParams();
    params = params.append('cinema', cinema);
    return this.http.get<Salle[]>(this.urlSalleByCinema, { params: params }).pipe(take(1));
  }

  /**
   * @deprecated Use RoomService.getRoomsByCinemaId() instead
   */
  public getSallesByCinemaId(cinemaId: number): Observable<Salle[]> {
    console.warn('getSallesByCinemaId() is deprecated. Use RoomService.getRoomsByCinemaId() instead.');
    let params = new HttpParams();
    params = params.append('cinemaId', cinemaId.toString());
    return this.http.get<Salle[]>(`${this.urlSallesByCinemaId}/${cinemaId}`, { params: params }).pipe(take(1));
  }
}
