import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {from, Observable, take} from "rxjs";
import {Ville} from "../../models/ville.model";
import {KeycloakService} from "keycloak-angular";
import {mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  constructor(private http: HttpClient,
              private keycloak: KeycloakService ) { }
  apiUrl: string = environment.API_URL;
  urlVille: string = this.apiUrl + '/ville'

  getVilles(): Observable<Ville[]>{
    return from(this.keycloak.getToken()).pipe(
      mergeMap(token => {
        const headers = { 'Authorization': `Bearer ${token}` };
        return this.http.get<Ville[]>(this.urlVille, { headers });
      })
    );
  }
}
