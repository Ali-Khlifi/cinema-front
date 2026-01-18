import { Cinema } from './cinema.model';

/**
 * Represents a city in the cinema system
 * Corresponds to the CityDto in the backend
 */
export interface City {
  /** Unique identifier of the city */
  id: number;

  /** Name of the city */
  name: string;

  /** Postal code of the city */
  postalCode: string;

  /** List of cinemas located in this city */
  cinemas?: Cinema[];
}



