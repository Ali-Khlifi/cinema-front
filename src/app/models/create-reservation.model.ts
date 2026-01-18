/**
 * Request model for creating a reservation
 */
export interface CreateReservationRequest {
  filmProjectionId: number;
  seatIds: number[];
  priceTypeId?: number;
  termsAccepted: boolean;
  marketingConsent?: boolean;
}

/**
 * Response model for reservation creation
 */
export interface CreateReservationResponse {
  reservationId: number;
  referenceNumber: string;
  totalAmount: number;
  ticketCount: number;
  seatNumbers: number[];
  status: string;
  message: string;
}


