import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, take} from "rxjs";
import {Ville} from "../../models/ville.model";

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  constructor(private http: HttpClient) { }
  apiUrl: string = environment.API_URL;
  urlVille: string = this.apiUrl + '/ville'

  getVilles(): Observable<Ville[]>{
    return this.http.get<Ville[]>(this.urlVille).pipe(take(1));
  }
}
