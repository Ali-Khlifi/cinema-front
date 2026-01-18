import { Film } from './film.model';
import { Room } from './room.model';
import { Ticket } from './ticket.model';

/**
 * Represents a scheduled projection of a film in a specific room
 * Corresponds to the FilmProjectionDto in the backend
 * Note: Seance concept has been merged into FilmProjection
 */
export interface FilmProjection {
  /** Unique identifier of the film projection */
  id: number;

  /** Date of the projection (separate from time) */
  projectionDate: Date | string;

  /** Time when the projection starts */
  startTime: Date | string;

  /** Time when the projection ends */
  endTime: Date | string;

  /** Maximum number of projections */
  maxProjections?: number;

  /** Base price for this projection (in cents or main currency unit) */
  basePrice?: number;

  /** ID of the film being projected */
  filmId: number;

  /** Film object (populated when needed) */
  film?: Film;

  /** ID of the room where the projection takes place */
  roomId: number;

  /** Room object (populated when needed) */
  room?: Room;

  /** List of tickets available for this projection */
  tickets?: Ticket[];

  /** Number of available seats for this projection */
  availableSeats?: number;

  /** Total capacity of the room */
  totalSeats?: number;

  /** Whether this projection is sold out */
  isSoldOut?: boolean;
}
