import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PriceType } from '../../models/price-type.model';

/**
 * Service for managing price types (ticket categories)
 * Handles all HTTP requests related to price types
 * Examples: Normal, Student, Senior, Child
 */
@Injectable({
  providedIn: 'root'
})
export class PriceTypeService {
  /** Base URL for price type endpoints */
  private readonly apiUrl = `${environment.API_URL}/priceType`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all available price types
   * @returns Observable of PriceType array
   */
  getAllPriceTypes(): Observable<PriceType[]> {
    return this.http.get<PriceType[]>(this.apiUrl).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a single price type by its ID
   * @param id - Price type identifier
   * @returns Observable of PriceType
   */
  getPriceTypeById(id: number): Observable<PriceType> {
    return this.http.get<PriceType>(`${this.apiUrl}/${id}`).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  /**
   * Calculates the final price for a specific price type and base price
   * @param priceTypeId - Price type identifier
   * @param basePrice - Base ticket price
   * @returns Calculated price (considering discounts)
   */
  calculatePrice(priceTypeId: number, basePrice: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${priceTypeId}/calculate`, {
      params: { basePrice: basePrice.toString() }
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


