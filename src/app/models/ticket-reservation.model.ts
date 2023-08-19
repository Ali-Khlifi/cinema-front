import {Ticket} from "./ticket.model";

export interface TicketReservation{
  nomClient : string;
  codePayment : string;
  ticketIds: number[];
}
