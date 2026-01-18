import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SeatAvailability } from '../../models/seat-availability.model';

/**
 * Service for managing seat availability
 */
@Injectable({
  providedIn: 'root'
})
export class SeatAvailabilityService {
  private readonly apiUrl = `${environment.API_URL}/seat`;

  constructor(private http: HttpClient) {}

  /**
   * Get available seats for a film projection
   * @param filmProjectionId - Film projection ID
   * @returns Observable of SeatAvailability array
   */
  getAvailableSeats(filmProjectionId: number): Observable<SeatAvailability[]> {
    return this.http.get<SeatAvailability[]>(
      `${this.apiUrl}/availableByFilmProjection/${filmProjectionId}`
    ).pipe(
      take(1),
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
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error (${error.status}): ${error.message}`;
      console.error('Backend returned:', error.status, error.error);
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}


