import { Seat } from './seat.model';
import { FilmProjection } from './film-projection.model';
import { PriceType } from './price-type.model';

/**
 * Represents a ticket for a specific film projection
 * Corresponds to the TicketDto in the backend
 */
export interface Ticket {
  /** Unique identifier of the ticket */
  id: number;

  /** Price of the ticket (in cents or main currency unit) */
  price: number;

  /** Whether the ticket has been reserved/sold */
  isReserved: boolean;

  /** ID of the seat associated with this ticket */
  seatId: number;

  /** Seat object (populated when needed) */
  seat?: Seat;

  /** ID of the film projection */
  filmProjectionId: number;

  /** Film projection object (populated when needed) */
  filmProjection?: FilmProjection;

  /** ID of the price type (Normal, Student, Senior, etc.) */
  priceTypeId: number;

  /** Price type object (populated when needed) */
  priceType?: PriceType;

  /** ID of the reservation this ticket belongs to */
  reservationId?: number;

  /** Formatted seat information for display (e.g., "Row 5, Seat 12") */
  seatDisplay?: string;
}
