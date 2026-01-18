import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Reservation } from '../../models/reservation.model';
import { CreateReservationRequest, CreateReservationResponse } from '../../models/create-reservation.model';

/**
 * Service for managing reservations
 * Handles all HTTP requests related to reservations
 */
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  /** Base URL for reservation endpoints */
  private readonly apiUrl = `${environment.API_URL}/reservation`;

  constructor(private http: HttpClient) {}

  /**
   * Creates a new reservation
   * @param reservation - Reservation data
   * @returns Observable of created Reservation
   */
  createReservation(reservation: Partial<Reservation>): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Creates a new reservation with seats
   * @param request - Reservation creation request
   * @returns Observable of CreateReservationResponse
   */
  createReservationWithSeats(request: CreateReservationRequest): Observable<CreateReservationResponse> {
    return this.http.post<CreateReservationResponse>(`${this.apiUrl}/create`, request).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves all reservations for the authenticated user
   * @returns Observable of Reservation array
   */
  getMyReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/my-reservations`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a single reservation by its ID
   * @param id - Reservation identifier
   * @returns Observable of Reservation
   */
  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Cancels a reservation
   * @param id - Reservation identifier
   * @returns Observable of void
   */
  cancelReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Updates reservation status
   * @param id - Reservation identifier
   * @param status - New status
   * @returns Observable of updated Reservation
   */
  updateReservationStatus(id: number, status: string): Observable<Reservation> {
    return this.http.patch<Reservation>(`${this.apiUrl}/${id}/status`, { status }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves reservations by user ID (admin only)
   * @param userId - User identifier
   * @returns Observable of Reservation array
   */
  getReservationsByUserId(userId: number): Observable<Reservation[]> {
    const params = new HttpParams().set('userId', userId.toString());
    
    return this.http.get<Reservation[]>(`${this.apiUrl}/by-user`, { params }).pipe(
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


