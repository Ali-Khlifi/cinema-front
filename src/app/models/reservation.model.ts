import { User } from './user.model';
import { Ticket } from './ticket.model';

/**
 * Represents a reservation made by a user
 * Corresponds to the ReservationDto in the backend
 */
export interface Reservation {
  /** Unique identifier of the reservation */
  id: number;

  /** ID of the user who made this reservation */
  userId: number;

  /** User object (populated when needed) */
  user?: User;

  /** Timestamp when the reservation was created */
  reservationDate: Date | string;

  /** Total amount for this reservation (in cents or main currency unit) */
  totalAmount: number;

  /** Current status of the reservation */
  status: ReservationStatus;

  /** Payment code/reference (if payment completed) */
  paymentCode?: string;

  /** List of tickets associated with this reservation */
  tickets?: Ticket[];

  /** Number of tickets in this reservation */
  ticketCount?: number;
}

/**
 * Status of a reservation
 */
export enum ReservationStatus {
  /** Reservation is pending payment */
  PENDING = 'PENDING',

  /** Reservation is confirmed and paid */
  CONFIRMED = 'CONFIRMED',

  /** Reservation was cancelled */
  CANCELLED = 'CANCELLED',

  /** Reservation payment failed */
  FAILED = 'FAILED'
}



