import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of, take} from "rxjs";
import {environment} from "../../../environments/environment";
import {Cinema} from "../../models/cinema.model";
import {Ville} from "../../models/ville.model";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  constructor(private http : HttpClient) { }

  urlApi = environment.API_URL;

  urlCinema = this.urlApi + "/cinema"
  urlCinemaByVille = this.urlApi + "/cinema/byVille"

  public host : String = "http://localhost:8080"

  public getCinema(ville: string) : Observable<Cinema[]>{
    let params = new HttpParams();
    params = params.append('ville', ville);
    return this.http.get<Cinema[]>(this.urlCinemaByVille, { params: params }).pipe(take(1));
    // return this.http.get(v._links.cinemas.href);
  }

  getSalles(c:any) {
    let url = c._links.salles.href.replace("{?projection}", "");
    return this.http.get(url + "?projection=salleProj");
  }

  getProjections(salle: any) {
      let url = salle._links.filmProjections.href.replace("{?projection}", "");
      return this.http.get(url + "?projection=p1");
  }

  getTicketsPlaces(p: any) {
    let url = p._links.tickets.href.replace("{?projection}", "");
    return this.http.get(url + "?projection=ticketProj");
  }

  payerTickets(dataForm: any) {
    return this.http.post(this.host + "/ticketsVendus", dataForm)
  }
}
