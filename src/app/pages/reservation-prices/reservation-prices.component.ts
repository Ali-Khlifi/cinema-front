import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PriceTypeService } from '../../services/price-type/price-type.service';
import { ReservationStateService } from '../../services/reservation-state/reservation-state.service';
import { PriceType } from '../../models/price-type.model';
import { FilmProjection } from '../../models/film-projection.model';
import { SeatAvailability } from '../../models/seat-availability.model';

/**
 * Component for selecting price types for reserved seats
 * Allows user to choose different price categories (Normal, -26ans, -14ans, etc.)
 */
@Component({
  selector: 'app-reservation-prices',
  templateUrl: './reservation-prices.component.html',
  styleUrls: ['./reservation-prices.component.css']
})
export class ReservationPricesComponent implements OnInit {
  /** Available price types */
  priceTypes: PriceType[] = [];

  /** Current film projection */
  filmProjection: FilmProjection | null = null;

  /** Selected seats */
  selectedSeats: SeatAvailability[] = [];

  /** Number of selected seats */
  totalSeats: number = 0;

  /** Price type counters (map: priceTypeId -> count) */
  priceTypeCounts: Map<number, number> = new Map();

  /** Loading state */
  isLoading: boolean = true;

  /** Error message */
  errorMessage: string = '';

  constructor(
    private router: Router,
    private priceTypeService: PriceTypeService,
    private reservationStateService: ReservationStateService
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
    this.totalSeats = this.reservationStateService.getTotalSeats();

    // Debug: Check filmProjection data
    console.log('FilmProjection data:', this.filmProjection);
    console.log('StartTime:', this.filmProjection?.startTime);
    console.log('ProjectionDate:', this.filmProjection?.projectionDate);

    // Load price types
    this.loadPriceTypes();
  }

  /**
   * Load available price types from backend
   */
  loadPriceTypes(): void {
    this.isLoading = true;
    this.priceTypeService.getAllPriceTypes().subscribe({
      next: (priceTypes: PriceType[]) => {
        // Get base price from selected seats
        const basePrice = this.selectedSeats.length > 0 ? (this.selectedSeats[0].basePrice || 10) : 10;
        
        // Calculate price for each type based on discount
        this.priceTypes = priceTypes.map(pt => ({
          ...pt,
          price: basePrice * (1 - (pt.discountPercentage || 0) / 100)
        })).sort((a, b) => ((a.price || 0) - (b.price || 0))); // Sort by price
        
        // Initialize counters
        this.priceTypes.forEach(pt => this.priceTypeCounts.set(pt.id, 0));
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'Erreur lors du chargement des tarifs';
        console.error('Error loading price types:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Increment counter for a price type
   */
  increment(priceTypeId: number): void {
    const currentCount = this.priceTypeCounts.get(priceTypeId) || 0;
    const totalSelected = this.getTotalSelectedSeats();
    
    if (totalSelected < this.totalSeats) {
      this.priceTypeCounts.set(priceTypeId, currentCount + 1);
    }
  }

  /**
   * Decrement counter for a price type
   */
  decrement(priceTypeId: number): void {
    const currentCount = this.priceTypeCounts.get(priceTypeId) || 0;
    if (currentCount > 0) {
      this.priceTypeCounts.set(priceTypeId, currentCount - 1);
    }
  }

  /**
   * Get counter value for a price type
   */
  getCount(priceTypeId: number): number {
    return this.priceTypeCounts.get(priceTypeId) || 0;
  }

  /**
   * Get total number of selected seats across all price types
   */
  getTotalSelectedSeats(): number {
    let total = 0;
    this.priceTypeCounts.forEach(count => total += count);
    return total;
  }

  /**
   * Calculate total amount
   */
  calculateTotal(): number {
    return this.reservationStateService.calculateTotal(this.priceTypes);
  }

  /**
   * Check if can proceed to next step
   */
  canProceed(): boolean {
    return this.getTotalSelectedSeats() === this.totalSeats;
  }

  /**
   * Navigate back to seat selection
   */
  goBack(): void {
    // Use browser back button to return to previous page
    window.history.back();
  }

  /**
   * Proceed to recap page
   */
  continueToRecap(): void {
    if (!this.canProceed()) {
      return;
    }

    // Save price selections
    this.reservationStateService.setPriceTypeCounts(this.priceTypeCounts);

    // Navigate to recap page
    this.router.navigate(['/reservation-recap']);
  }

  /**
   * Format time string from HH:mm:ss to HH:mm
   */
  formatTime(timeString: string | Date | undefined): string {
    if (!timeString) {
      return 'N/A';
    }

    // If it's a string in HH:mm:ss format
    if (typeof timeString === 'string') {
      const parts = timeString.split(':');
      if (parts.length >= 2) {
        return `${parts[0]}:${parts[1]}`;
      }
      return timeString;
    }

    // If it's a Date object
    if (timeString instanceof Date) {
      return timeString.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }

    return 'N/A';
  }
}
