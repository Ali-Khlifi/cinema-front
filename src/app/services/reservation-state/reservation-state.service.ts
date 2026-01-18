import { Injectable } from '@angular/core';
import { SeatAvailability } from '../../models/seat-availability.model';
import { FilmProjection } from '../../models/film-projection.model';
import { PriceType } from '../../models/price-type.model';

/**
 * Service to manage reservation state across multiple pages
 * Stores selected seats, price selections, and film projection info
 */
@Injectable({
  providedIn: 'root'
})
export class ReservationStateService {
  /** Selected film projection */
  private filmProjection: FilmProjection | null = null;

  /** Selected seats */
  private selectedSeats: SeatAvailability[] = [];

  /** Price selection for each seat (map: seatId -> priceTypeId) */
  private priceSelections: Map<number, number> = new Map();

  /** Price type counts (map: priceTypeId -> count) */
  private priceTypeCounts: Map<number, number> = new Map();

  constructor() {}

  /**
   * Initialize reservation with film projection and selected seats
   */
  initReservation(projection: FilmProjection, seats: SeatAvailability[]): void {
    this.filmProjection = projection;
    this.selectedSeats = [...seats];
    this.priceSelections.clear();
    this.priceTypeCounts.clear();
  }

  /**
   * Get current film projection
   */
  getFilmProjection(): FilmProjection | null {
    return this.filmProjection;
  }

  /**
   * Get selected seats
   */
  getSelectedSeats(): SeatAvailability[] {
    return this.selectedSeats;
  }

  /**
   * Set price type counts
   */
  setPriceTypeCounts(counts: Map<number, number>): void {
    this.priceTypeCounts = new Map(counts);
  }

  /**
   * Get price type counts
   */
  getPriceTypeCounts(): Map<number, number> {
    return this.priceTypeCounts;
  }

  /**
   * Get total number of seats selected
   */
  getTotalSeats(): number {
    return this.selectedSeats.length;
  }

  /**
   * Calculate total amount based on price selections
   */
  calculateTotal(priceTypes: PriceType[]): number {
    let total = 0;
    this.priceTypeCounts.forEach((count, priceTypeId) => {
      const priceType = priceTypes.find(pt => pt.id === priceTypeId);
      if (priceType && priceType.price) {
        total += count * priceType.price;
      }
    });
    return total;
  }

  /**
   * Clear all reservation state
   */
  clear(): void {
    this.filmProjection = null;
    this.selectedSeats = [];
    this.priceSelections.clear();
    this.priceTypeCounts.clear();
  }

  /**
   * Check if reservation state is valid
   */
  isValid(): boolean {
    return this.filmProjection !== null && this.selectedSeats.length > 0;
  }
}

