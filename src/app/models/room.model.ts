import { FilmProjection } from './film-projection.model';
import { Seat } from './seat.model';

/**
 * Represents a cinema room (screening room)
 * Corresponds to the RoomDto in the backend
 */
export interface Room {
  /** Unique identifier of the room */
  id: number;

  /** Name/number of the room (e.g., "Room 1", "IMAX") */
  name: string;

  /** Total number of seats in this room */
  capacity: number;

  /** ID of the cinema this room belongs to */
  cinemaId: number;

  /** Optional: Name of the cinema (for display purposes) */
  cinemaName?: string;

  /** List of film projections scheduled in this room */
  filmProjections?: FilmProjection[];

  /** List of seats in this room */
  seats?: Seat[];
}



