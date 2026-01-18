import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { City } from '../../models/city.model';

/**
 * Service for managing cities in the cinema system
 * Handles all HTTP requests related to cities
 */
@Injectable({
  providedIn: 'root'
})
export class CityService {
  /** Base URL for city endpoints */
  private readonly apiUrl = `${environment.API_URL}/city`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all cities from the API
   * @returns Observable of City array
   */
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a single city by its ID
   * @param id - City identifier
   * @returns Observable of City
   */
  getCityById(id: number): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/${id}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Searches cities by name (partial match)
   * @param name - Search term
   * @returns Observable of City array
   */
  searchCitiesByName(name: string): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/search`, {
      params: { name }
    }).pipe(
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



