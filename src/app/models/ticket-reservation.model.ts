import { Ticket } from './ticket.model';

/**
 * @deprecated Use Reservation model instead (models/reservation.model.ts)
 * This interface is kept for backward compatibility during migration
 * Will be removed in a future version
 */
export interface TicketReservation {
  /** @deprecated */
  nomClient: string;
  
  /** @deprecated */
  codePayment: string;
  
  /** @deprecated */
  ticketIds: number[];
}
