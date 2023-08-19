import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, take} from 'rxjs';
import {Salle} from "../../models/salle.model";

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  constructor( private http: HttpClient) { }

  urlAPI = environment.API_URL;
  urlSalles = this.urlAPI + "/salle"
  urlSalleByCinema = this.urlAPI + "/salle/byCinema"


  public getSalles(cinema: string) : Observable<Salle[]>{
    let params = new HttpParams();
    params = params.append('cinema', cinema);
    return this.http.get<Salle[]> (this.urlSalleByCinema, {params: params}).pipe(take(1));
  }

}
