import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Room } from '../../models/room.model';

/**
 * Service for managing cinema rooms
 * Handles all HTTP requests related to rooms
 */
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  /** Base URL for room endpoints */
  private readonly apiUrl = `${environment.API_URL}/room`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all rooms for a specific cinema
   * @param cinemaId - Cinema identifier
   * @returns Observable of Room array
   */
  getRoomsByCinemaId(cinemaId: number): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.API_URL}/rooms/${cinemaId}`).pipe(
      take(1),
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a single room by its ID
   * @param id - Room identifier
   * @returns Observable of Room
   */
  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves all rooms
   * @returns Observable of Room array
   */
  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl).pipe(
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


