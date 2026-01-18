/**
 * @deprecated This concept has been merged into FilmProjection
 * The Seance entity no longer exists in the backend
 * Use FilmProjection with startTime, endTime, and basePrice instead
 * This interface is kept for backward compatibility during migration
 * Will be removed in a future version
 */
export interface Seance {
  /** @deprecated Use FilmProjection.startTime instead */
  id: number;
  
  /** @deprecated Use FilmProjection.startTime instead */
  heureDebut: Date;
  
  /** @deprecated Use FilmProjection.endTime instead */
  heureFin: Date;
  
  /** @deprecated Use FilmProjection.basePrice instead */
  prix: number;
  
  /** @deprecated FilmProjection is the parent now */
  filmProjectionId: number;
}
