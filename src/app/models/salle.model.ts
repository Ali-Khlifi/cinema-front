import { FilmProjection } from './film-projection.model';

/**
 * @deprecated Use Room model instead (models/room.model.ts)
 * This interface is kept for backward compatibility during migration
 * Will be removed in a future version
 */
export interface Salle {
  /** @deprecated */
  id: number;
  
  /** @deprecated */
  name: string;
  
  /** @deprecated Use capacity instead */
  nombrePlaces: number;
  
  /** @deprecated */
  cinema: string;
  
  /** @deprecated */
  filmProjections: FilmProjection[];
}
