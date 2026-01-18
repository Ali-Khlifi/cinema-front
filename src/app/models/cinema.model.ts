import { City } from './city.model';
import { Room } from './room.model';

/**
 * Represents a cinema complex
 * Corresponds to the CinemaDto in the backend
 */
export interface Cinema {
  /** Unique identifier of the cinema */
  id: number;

  /** Name of the cinema */
  name: string;

  /** Number of screening rooms in this cinema */
  roomCount?: number;

  /** City name */
  city?: string;

  /** Postal code */
  postalCode?: string;

  /** Street number */
  streetNumber?: string;

  /** Street name */
  streetName?: string;

  /** ID of the city where this cinema is located */
  cityId?: number;

  /** City object (populated when needed) */
  cityEntity?: City;

  /** Legacy field: city name (for backward compatibility during migration) */
  /** @deprecated Use city instead */
  ville?: string;

  /** Legacy field: room count (for backward compatibility during migration) */
  /** @deprecated Use roomCount instead */
  nombreSalles?: number;

  /** Legacy field: address (for backward compatibility during migration) */
  /** @deprecated Use separate address fields instead */
  adresse?: string;

  /** List of rooms in this cinema */
  rooms?: Room[];
}
