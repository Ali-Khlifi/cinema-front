import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { take, catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Cinema } from '../../models/cinema.model';

/**
 * Service for managing cinemas
 * Handles all HTTP requests related to cinemas
 */
@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  /** Base URL for cinema endpoints */
  private readonly apiUrl = `${environment.API_URL}/cinema`;

  /** 
   * BehaviorSubject to share the currently selected cinema across components
   * Useful for maintaining state when navigating between components
   */
  private currentCinema = new BehaviorSubject<Cinema | null>(null);
  
  /** Observable stream of the current cinema */
  public currentCinema$ = this.currentCinema.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all cinemas from the API
   * @returns Observable of Cinema array
   */
  public getCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(this.apiUrl).pipe(
      take(1),
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a single cinema by its ID
   * @param cinemaId - Cinema identifier
   * @returns Observable of Cinema
   */
  public getCinemaById(cinemaId: number): Observable<Cinema> {
    return this.http.get<Cinema>(`${this.apiUrl}/${cinemaId}`).pipe(
      take(1),
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves cinemas by city name
   * @param cityName - Name of the city
   * @returns Observable of Cinema array
   * @deprecated Use getCinemasByCityId instead for better type safety
   */
  public getCinemasByCity(cityName: string): Observable<Cinema[]> {
    const params = new HttpParams().set('city', cityName);
    return this.http.get<Cinema[]>(`${this.apiUrl}/byCity`, { params }).pipe(
      take(1),
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves cinemas by city ID (preferred method)
   * @param cityId - City identifier
   * @returns Observable of Cinema array
   */
  public getCinemasByCityId(cityId: number): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(`${this.apiUrl}/city/${cityId}`).pipe(
      take(1),
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Legacy method: Retrieves cinemas by "ville" (old French naming)
   * @deprecated Use getCinemasByCity or getCinemasByCityId instead
   * @param ville - City name in French
   * @returns Observable of Cinema array
   */
  public getCinema(ville: string): Observable<Cinema[]> {
    console.warn('getCinema() is deprecated. Use getCinemasByCity() instead.');
    return this.getCinemasByCity(ville);
  }

  /**
   * Sets the currently selected cinema
   * Updates the BehaviorSubject to notify all subscribers
   * @param cinema - Cinema to set as current
   */
  public setCurrentCinema(cinema: Cinema): void {
    this.currentCinema.next(cinema);
  }

  /**
   * Gets the currently selected cinema as an Observable
   * @returns Observable of Cinema or null
   */
  public getCurrentCinema(): Observable<Cinema | null> {
    return this.currentCinema$;
  }

  /**
   * Clears the currently selected cinema
   */
  public clearCurrentCinema(): void {
    this.currentCinema.next(null);
  }

  /**
   * Searches cinemas by name (partial match)
   * @param searchTerm - Search term
   * @returns Observable of Cinema array
   */
  public searchCinemas(searchTerm: string): Observable<Cinema[]> {
    const params = new HttpParams().set('name', searchTerm);
    return this.http.get<Cinema[]>(`${this.apiUrl}/search`, { params }).pipe(
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

  // ========================================
  // DEPRECATED METHODS (Legacy HATEOAS API)
  // These will be removed in a future version
  // ========================================

  /**
   * @deprecated Legacy HATEOAS method - no longer used
   */
  getSalles(c: any): Observable<any> {
    console.error('getSalles() is deprecated and should not be used');
    throw new Error('Method not supported. Use RoomService.getRoomsByCinemaId() instead.');
  }

  /**
   * @deprecated Legacy HATEOAS method - no longer used
   */
  getProjections(salle: any): Observable<any> {
    console.error('getProjections() is deprecated and should not be used');
    throw new Error('Method not supported. Use FilmProjectionService instead.');
  }

  /**
   * @deprecated Legacy HATEOAS method - no longer used
   */
  getTicketsPlaces(p: any): Observable<any> {
    console.error('getTicketsPlaces() is deprecated and should not be used');
    throw new Error('Method not supported. Use TicketService or SeatService instead.');
  }

  /**
   * @deprecated Legacy payment method - use payment module instead
   */
  payerTickets(dataForm: any): Observable<any> {
    console.error('payerTickets() is deprecated and should not be used');
    throw new Error('Method not supported. Use ReservationService and PaymentService instead.');
  }
}
