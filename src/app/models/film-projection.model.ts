import {Film} from "./film.model";
import {Seance} from "./seance.model";
import {Ticket} from "./ticket.model";

export interface FilmProjection {
  id: number;
  dateProjection: Date;
  prix: number;
  film : Film;
  salleId : number;
  seance: Seance;
  tickets: Ticket[];

}
