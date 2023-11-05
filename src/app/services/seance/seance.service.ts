import { Injectable } from '@angular/core';
import {Observable, take} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Seance} from "../../models/seance.model";

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  constructor(private http : HttpClient) { }

  urlApi = environment.API_URL;

  urlSeance = this.urlApi + "/seance"
  urlSeanceByFilmProjection = this.urlApi + "/seance/byFilmProjection"

  public getSeancesByFilmProjection(filmProjectId: number) : Observable<Seance[]> {
    let params = new HttpParams();
    params = params.append('filmProjectId', filmProjectId)
    return this.http.get <Seance[]>(this.urlSeanceByFilmProjection, {params: params}).pipe(take(1));
  }
}
