/**
 * Represents a physical seat in a cinema room
 * Corresponds to the SeatDto in the backend
 */
export interface Seat {
  /** Unique identifier of the seat */
  id: number;

  /** Row number (e.g., 1, 2, 3...) */
  rowNumber: number;

  /** Seat number within the row (e.g., 1, 2, 3...) */
  seatNumber: number;

  /** ID of the room this seat belongs to */
  roomId: number;

  /** Whether this seat is currently reserved for a specific projection */
  isReserved?: boolean;

  /** Optional: Status for UI purposes (available, reserved, selected) */
  status?: 'available' | 'reserved' | 'selected';
}



