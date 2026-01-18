/**
 * Represents a film/movie in the cinema system
 * Corresponds to the FilmDto in the backend
 */
export interface Film {
  /** Unique identifier of the film */
  id: number;

  /** Title of the film */
  title: string;

  /** Duration of the film in minutes */
  duration: number;

  /** Director of the film */
  director: string;

  /** Brief description/synopsis of the film */
  description: string;

  /** Release date of the film */
  releaseDate: Date | string;

  /** ID of the film category/genre */
  categoryId: number;

  /** Category name (populated when needed) */
  categoryName?: string;

  /** Legacy field: title in French (for backward compatibility during migration) */
  /** @deprecated Use title instead */
  titre?: string;

  /** Legacy field: duration in French (for backward compatibility during migration) */
  /** @deprecated Use duration instead */
  duree?: number;

  /** Legacy field: director in French (for backward compatibility during migration) */
  /** @deprecated Use director instead */
  realisateur?: string;

  /** Legacy field: release date in French (for backward compatibility during migration) */
  /** @deprecated Use releaseDate instead */
  dateSortie?: Date | string;

  /** URL or path to the film's poster image */
  posterUrl?: string;

  /** URL or path to the film's trailer video */
  trailerUrl?: string;

  /** IMDb or other rating (0-10) */
  rating?: number;
}
