import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FilmProjectionService } from '../../services/film-projection/film-projection.service';
import { SeatAvailabilityService } from '../../services/seat-availability/seat-availability.service';
import { ReservationStateService } from '../../services/reservation-state/reservation-state.service';
import { FilmProjection } from '../../models/film-projection.model';
import { SeatAvailability } from '../../models/seat-availability.model';

/**
 * Component for displaying film projection details
 * Shows film information, showtimes, and ticket selection
 * @deprecated Seance concept - will be refactored to use FilmProjection directly
 */
@Component({
  selector: 'app-film-projections',
  templateUrl: './film-projections.component.html',
  styleUrls: ['./film-projections.component.css'],
  providers: [DatePipe]
})
export class FilmProjectionsComponent implements OnInit {
  /** Film projection to display */
  @Input() filmProjection!: FilmProjection;

  /** Media/poster image for the film */
  mediaFilm: any;

  /** List of available seats for this projection */
  seats: SeatAvailability[] = [];

  /** List of selected seats by user */
  selectedSeats: SeatAvailability[] = [];

  /** Whether to show the seats list */
  showSeatsList: boolean = false;

  /** Whether to show the showtimes list */
  showSeancesList: boolean = false;

  constructor(
    private router: Router,
    private filmProjectionService: FilmProjectionService,
    private seatAvailabilityService: SeatAvailabilityService,
    private reservationStateService: ReservationStateService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // Load tickets only when showSeancesList is toggled by user
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filmProjection'] && this.filmProjection?.film?.id) {
      this.filmProjectionService.getMediaFilm(this.filmProjection.film.id).subscribe(data => {
        let read = new FileReader();
        read.readAsDataURL(data);
        read.onloadend = () => {
          this.mediaFilm = read.result;
        }
      }, error => {
        console.log(error);
      });
    }
  }

  /**
   * Load available seats for this projection
   */
  loadSeats(): void {
    this.seatAvailabilityService.getAvailableSeats(this.filmProjection.id)
      .subscribe(seats => {
        this.seats = seats;
      });
  }

  /**
   * Handle seat selection
   */
  OnSelectSeat(seat: SeatAvailability): void {
    if (seat.reserved) {
      return; // Can't select a reserved seat
    }

    if (!seat.selected) {
      seat.selected = true;
      this.selectedSeats.push(seat);
    } else {
      seat.selected = false;
      this.selectedSeats.splice(this.selectedSeats.indexOf(seat), 1);
    }
  }

  /**
   * Get CSS class for seat button based on status
   * - Reserved seats: orange (btn-warning)
   * - Selected seats: blue (btn-info)
   * - Available seats: green (btn-success)
   */
  getSeatClass(seat: SeatAvailability): string {
    let cssClass = "btn ticket ";
    if (seat.reserved) {
      cssClass += "btn-warning"; // Orange for reserved seats
    } else if (seat.selected) {
      cssClass += "btn-info"; // Blue for selected seats
    } else {
      cssClass += "btn-success"; // Green for available seats
    }
    return cssClass;
  }

  /**
   * Toggle seats list visibility
   */
  getListSeances(): void {
    this.showSeancesList = !this.showSeancesList;
    if (this.showSeancesList) {
      this.loadSeats();
    }
  }

  /**
   * Get comma-separated list of selected seat numbers
   */
  getSelectedSeatNumbers(): string {
    return this.selectedSeats.map(s => s.number).join(', ');
  }

  /**
   * Calculate total price for selected seats
   */
  calculateTotal(): number {
    return this.selectedSeats.reduce((total, seat) => total + (seat.basePrice || 0), 0);
  }

  /**
   * Confirm seat selection and navigate to price selection page
   */
  confirmReservation(): void {
    if (this.selectedSeats.length === 0) {
      return;
    }

    // Initialize reservation state
    this.reservationStateService.initReservation(this.filmProjection, this.selectedSeats);

    // Navigate to price selection page
    this.router.navigate(['/reservation-prices']);
  }

}
