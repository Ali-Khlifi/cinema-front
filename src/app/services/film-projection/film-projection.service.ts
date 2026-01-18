import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { take, catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FilmProjection } from '../../models/film-projection.model';

/**
 * Service for managing film projections (showtimes)
 * Handles all HTTP requests related to film projections
 * Note: Seance concept has been merged into FilmProjection
 */
@Injectable({
  providedIn: 'root'
})
export class FilmProjectionService {
  /** Base URL for film projection endpoints */
  private readonly apiUrl = `${environment.API_URL}/filmProjection`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all film projections
   * @returns Observable of FilmProjection array
   */
  public getAllFilmProjections(): Observable<FilmProjection[]> {
    return this.http.get<FilmProjection[]>(this.apiUrl).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a single film projection by its ID
   * @param id - Film projection identifier
   * @returns Observable of FilmProjection
   */
  public getFilmProjectionById(id: number): Observable<FilmProjection> {
    return this.http.get<FilmProjection>(`${this.apiUrl}/${id}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves film projections for a specific room
   * @param roomId - Room identifier
   * @returns Observable of FilmProjection array
   */
  public getFilmProjectionsByRoomId(roomId: number): Observable<FilmProjection[]> {
    const params = new HttpParams().set('roomId', roomId.toString());
    return this.http.get<FilmProjection[]>(`${this.apiUrl}/byRoom`, { params }).pipe(
      take(1),
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Legacy method: Retrieves film projections by "salle" (old French naming)
   * @deprecated Use getFilmProjectionsByRoomId instead
   * @param salleId - Room identifier (salle in French)
   * @returns Observable of FilmProjection array
   */
  public getFilmProjectionBySalle(salleId: number): Observable<FilmProjection[]> {
    console.warn('getFilmProjectionBySalle() is deprecated. Use getFilmProjectionsByRoomId() instead.');
    return this.getFilmProjectionsByRoomId(salleId);
  }

  /**
   * Retrieves film projections for a specific film
   * @param filmId - Film identifier
   * @returns Observable of FilmProjection array
   */
  public getFilmProjectionsByFilmId(filmId: number): Observable<FilmProjection[]> {
    return this.http.get<FilmProjection[]>(`${this.apiUrl}/film/${filmId}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves film projections for a specific cinema
   * @param cinemaId - Cinema identifier
   * @returns Observable of FilmProjection array
   */
  public getFilmProjectionsByCinemaId(cinemaId: number): Observable<FilmProjection[]> {
    return this.http.get<FilmProjection[]>(`${this.apiUrl}/cinema/${cinemaId}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves film projections within a date range
   * @param startDate - Start date (ISO string or Date)
   * @param endDate - End date (ISO string or Date)
   * @returns Observable of FilmProjection array
   */
  public getFilmProjectionsByDateRange(startDate: string | Date, endDate: string | Date): Observable<FilmProjection[]> {
    const params = new HttpParams()
      .set('startDate', startDate instanceof Date ? startDate.toISOString() : startDate)
      .set('endDate', endDate instanceof Date ? endDate.toISOString() : endDate);

    return this.http.get<FilmProjection[]>(`${this.apiUrl}/date-range`, { params }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves the poster/media image for a specific film
   * @param filmId - Film identifier
   * @returns Observable of Blob (image data)
   */
  public getMediaFilm(filmId: number): Observable<Blob> {
    const urlMediaFilm = `${environment.API_URL}/films/${filmId}/media`;
    return this.http.get(urlMediaFilm, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors
   * @param error - HTTP error response
   * @returns Observable error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server Error (${error.status}): ${error.message}`;
      console.error('Backend returned:', error.status, error.error);
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
