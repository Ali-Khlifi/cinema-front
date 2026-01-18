import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Seat } from '../../models/seat.model';

/**
 * Service for managing cinema seats
 * Handles all HTTP requests related to seats
 */
@Injectable({
  providedIn: 'root'
})
export class SeatService {
  /** Base URL for seat endpoints */
  private readonly apiUrl = `${environment.API_URL}/seat`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all seats for a specific room
   * @param roomId - Room identifier
   * @returns Observable of Seat array
   */
  getSeatsByRoomId(roomId: number): Observable<Seat[]> {
    const params = new HttpParams().set('roomId', roomId.toString());
    
    return this.http.get<Seat[]>(`${this.apiUrl}/room/${roomId}`, { params }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves available seats for a specific film projection
   * @param filmProjectionId - Film projection identifier
   * @returns Observable of Seat array
   */
  getAvailableSeatsByProjection(filmProjectionId: number): Observable<Seat[]> {
    const params = new HttpParams().set('filmProjectionId', filmProjectionId.toString());
    
    return this.http.get<Seat[]>(`${this.apiUrl}/available`, { params }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a single seat by its ID
   * @param id - Seat identifier
   * @returns Observable of Seat
   */
  getSeatById(id: number): Observable<Seat> {
    return this.http.get<Seat>(`${this.apiUrl}/${id}`).pipe(
      retry(1),
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



