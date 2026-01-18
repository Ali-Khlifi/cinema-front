/**
 * Represents a seat with its availability status for a specific film projection
 */
export interface SeatAvailability {
  /** Seat ID */
  seatId: number;

  /** Seat number */
  number: number;

  /** Is this seat reserved? (matches backend property name) */
  reserved: boolean;

  /** Base price for this seat */
  basePrice: number;

  /** Room ID */
  roomId: number;

  /** Is this seat selected by the user? (UI state) */
  selected?: boolean;
}

