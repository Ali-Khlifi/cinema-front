import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable, take} from "rxjs";
import {Ville} from "../../models/ville.model";
import {HttpClient} from "@angular/common/http";
import {Film} from "../../models/film.model";

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }
  apiUrl: string = environment.API_URL;
  urlFilm: string = this.apiUrl + '/film'

  getFilms(): Observable<Film[]>{
    return this.http.get<Film[]>(this.urlFilm).pipe(take(1));
  }
}
