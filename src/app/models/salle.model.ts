import {FilmProjection} from "./film-projection.model";

export interface Salle {
  id: number;
  name: string;
  nombrePlaces: number;
  cinema: string;
  filmProjections : FilmProjection[];
}
