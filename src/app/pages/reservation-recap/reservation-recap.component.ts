import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationStateService } from '../../services/reservation-state/reservation-state.service';
import { PriceTypeService } from '../../services/price-type/price-type.service';
import { FilmProjection } from '../../models/film-projection.model';
import { SeatAvailability } from '../../models/seat-availability.model';
import { PriceType } from '../../models/price-type.model';

/**
 * Component for reservation recap/summary
 * Shows all reservation details before payment
 */
@Component({
  selector: 'app-reservation-recap',
  templateUrl: './reservation-recap.component.html',
  styleUrls: ['./reservation-recap.component.css']
})
export class ReservationRecapComponent implements OnInit {
  /** Film projection */
  filmProjection: FilmProjection | null = null;

  /** Selected seats */
  selectedSeats: SeatAvailability[] = [];

  /** Price types */
  priceTypes: PriceType[] = [];

  /** Price type counts */
  priceTypeCounts: Map<number, number> = new Map();

  /** Terms and conditions accepted (for future use) */
  termsAccepted: boolean = false;

  /** Marketing consent (for future use) */
  marketingConsent: boolean = false;

  constructor(
    private router: Router,
    private reservationStateService: ReservationStateService,
    private priceTypeService: PriceTypeService
  ) {}

  ngOnInit(): void {
    // Check if reservation state is valid
    if (!this.reservationStateService.isValid()) {
      this.router.navigate(['/cinemas']);
      return;
    }

    // Get reservation data
    this.filmProjection = this.reservationStateService.getFilmProjection();
    this.selectedSeats = this.reservationStateService.getSelectedSeats();
    this.priceTypeCounts = this.reservationStateService.getPriceTypeCounts();

    // Load price types
    this.loadPriceTypes();
  }

  /**
   * Load price types and calculate prices
   */
  loadPriceTypes(): void {
    this.priceTypeService.getAllPriceTypes().subscribe({
      next: (priceTypes: PriceType[]) => {
        // Get base price from selected seats
        const basePrice = this.selectedSeats.length > 0 ? (this.selectedSeats[0].basePrice || 10) : 10;
        
        // Calculate price for each type based on discount
        this.priceTypes = priceTypes.map(pt => ({
          ...pt,
          price: basePrice * (1 - (pt.discountPercentage || 0) / 100)
        }));
      },
      error: (error: any) => {
        console.error('Error loading price types:', error);
      }
    });
  }

  /**
   * Get price type by ID
   */
  getPriceType(priceTypeId: number): PriceType | undefined {
    return this.priceTypes.find(pt => pt.id === priceTypeId);
  }

  /**
   * Get price details for display
   */
  getPriceDetails(): Array<{priceType: PriceType, count: number, subtotal: number}> {
    const details: Array<{priceType: PriceType, count: number, subtotal: number}> = [];
    
    this.priceTypeCounts.forEach((count, priceTypeId) => {
      if (count > 0) {
        const priceType = this.getPriceType(priceTypeId);
        if (priceType && priceType.price) {
          details.push({
            priceType,
            count,
            subtotal: priceType.price * count
          });
        }
      }
    });

    return details;
  }

  /**
   * Calculate total HT (without tax)
   */
  calculateTotalHT(): number {
    return this.reservationStateService.calculateTotal(this.priceTypes);
  }

  /**
   * Calculate TVA (20%)
   */
  calculateTVA(): number {
    return this.calculateTotalHT() * 0.20;
  }

  /**
   * Calculate total TTC (with tax)
   */
  calculateTotalTTC(): number {
    return this.calculateTotalHT() + this.calculateTVA();
  }

  /**
   * Get total number of seats
   */
  getTotalSeats(): number {
    let total = 0;
    this.priceTypeCounts.forEach(count => total += count);
    return total;
  }

  /**
   * Get seat numbers as comma-separated string
   */
  getSeatNumbers(): string {
    return this.selectedSeats.map(s => s.number).join(', ');
  }

  /**
   * Navigate back to prices page
   */
  goBack(): void {
    // Navigate back to price selection page
    window.history.back();
  }

  /**
   * Create reservation - TO BE IMPLEMENTED
   * This method will be implemented when payment system is integrated
   */
  // createReservation(): void {
  //   // Payment implementation coming soon
  //   // Will integrate with Stripe payment system
  // }
}
