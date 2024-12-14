import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {FilmProjection} from "../../models/film-projection.model";
import {take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilmProjectionService {

  constructor(private http: HttpClient) { }

  urlApi = environment.API_URL;
  urlFilmProjection = this.urlApi + "/filmProjection/bySalle"


  public getMediaFilm(filmId: number){
    const urlMediaFilm = `${this.urlApi}/films/${filmId}/media`;
    return this.http.get(urlMediaFilm, {responseType: 'blob'})
  }

  public getFilmProjectionBySalle(salleId: number){
    let params = new HttpParams();
    params = params.append('salleId', salleId);
    return this.http.get<FilmProjection[]> (this.urlFilmProjection, { params : params}).pipe(take(1))

  }


}
